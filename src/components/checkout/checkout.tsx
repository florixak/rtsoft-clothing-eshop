import type { CheckoutStep } from "@/constants";
import { shippingMethods } from "@/data";
import { useCheckoutForm } from "@/hooks/form";
import useUser from "@/hooks/use-user";
import {
  checkoutFormOpts,
  getCheckoutDefaultValues,
} from "@/lib/checkout-form";
import {
  handleCreateOrder,
  handlePaymentSimulation,
} from "@/lib/checkout-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import {
  formSchema,
  paymentSchema,
  shippingSchema,
  type FormValues,
} from "@/lib/validators";
import { useCartStore } from "@/stores/cart-store";
import type { Order } from "@/types";
import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import PaymentForm from "../form/payment-form";
import ShippingForm from "../form/shipping-form";
import { Skeleton } from "../ui/skeleton";
import CheckoutReview from "./checkout-review";
import CheckoutStepper from "./checkout-stepper";
import { OrderSummary } from "./order-summary";

const Checkout = () => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.checkout,
    TRANSLATION_NAMESPACES.common,
  ]);
  const { i18n } = useTranslation();
  const { section } = useSearch({ from: "/{-$locale}/checkout/" });
  const navigate = useNavigate({ from: "/{-$locale}/checkout/" });
  const user = useUser();
  const {
    clearCart,
    cart: { items },
    subtotal: sub,
  } = useCartStore();
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const form = useCheckoutForm({
    ...checkoutFormOpts,
    defaultValues: getCheckoutDefaultValues(user),
    onSubmit: async () => {
      if (section === "shipping") {
        navigate({
          to: "/{-$locale}/checkout",
          search: { section: "payment" },
          replace: true,
        });
      } else if (section === "payment") {
        navigate({
          to: "/{-$locale}/checkout",
          search: { section: "review" },
          replace: true,
        });
      } else {
        try {
          await mutateAsync(form.state.values);
        } catch {
          // onError handles the toast
        }
      }
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: (values: FormValues) =>
      handleCreateOrder(values, items, locale, sub()),
    onSuccess: async (order: Order) => {
      if (
        order.paymentMethod.id === "payment-card" ||
        order.paymentMethod.id === "apple-pay"
      ) {
        await handlePaymentSimulation();
      }
      toast.success(t("common:toast.orderPlaced"));
      navigate({
        to: "/{-$locale}/checkout/success",
        search: {
          orderId: order.id,
        },
        replace: true,
      });
      clearCart();
    },
    onError: () => {
      toast.error(t("common:toast.genericError"));
    },
  });

  const currentValues = useStore(form.store, (state) => state.values);

  const currentShipping = useStore(
    form.store,
    (state) => state.values.shipping.shippingMethod,
  );
  const shippingCost =
    shippingMethods.find((m) => m.id === currentShipping)?.price || 0;

  const buttonLabel =
    section === "shipping"
      ? t("actions.continueToPayment")
      : section === "payment"
        ? t("actions.continueToReview")
        : t("actions.placeOrder");

  const backLabel =
    section === "payment"
      ? t("actions.backToShipping")
      : section === "review"
        ? t("actions.backToPayment")
        : undefined;

  const isCurrentStepValid = (
    values: FormValues,
    currentSection: CheckoutStep,
  ) => {
    if (currentSection === "shipping") {
      return shippingSchema.safeParse(values).success;
    }
    if (currentSection === "payment") {
      return paymentSchema.safeParse(values).success;
    }
    return formSchema.safeParse(values).success;
  };

  const canContinue = isCurrentStepValid(currentValues, section);

  const handleBack = () => {
    if (section === "payment") {
      navigate({
        to: "/{-$locale}/checkout",
        search: { section: "shipping" },
        replace: true,
      });
    } else if (section === "review") {
      navigate({
        to: "/{-$locale}/checkout",
        search: { section: "payment" },
        replace: true,
      });
    }
  };

  const handleEditSection = (targetSection: CheckoutStep) => {
    navigate({
      to: "/{-$locale}/checkout",
      search: { section: targetSection },
      replace: true,
    });
  };

  return (
    <section className="container mx-auto flex flex-col gap-8">
      <h2 className="text-2xl font-heading font-semibold">{t("title")}</h2>
      <CheckoutStepper />
      <div className="flex flex-col lg:flex-row gap-8 w-full items-start justify-between">
        <form
          className="flex-1 flex flex-col gap-8 w-full"
          onSubmit={(e) => {
            e.preventDefault();
            if (!canContinue) {
              return;
            }
            form.handleSubmit();
          }}
        >
          <Suspense fallback={<Skeleton className="h-64 w-full" />}>
            <form.AppForm>
              {section === "shipping" && <ShippingForm form={form} />}
              {section === "payment" && <PaymentForm form={form} />}
              {section === "review" && (
                <CheckoutReview form={form} onEditSection={handleEditSection} />
              )}
              <form.SubscribeButton
                label={buttonLabel}
                backLabel={backLabel}
                onBack={handleBack}
                isFirstStep={section === "shipping"}
                isCurrentStepValid={canContinue}
              />
            </form.AppForm>
          </Suspense>
        </form>
        <OrderSummary data={{ shipping: shippingCost }} isCheckout />
      </div>
    </section>
  );
};

export default Checkout;
