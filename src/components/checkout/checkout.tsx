import type { CheckoutStep } from "@/constants";
import { shippingMethods } from "@/data";
import { useCheckoutForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import {
  createOrderSimulation,
  handlePaymentSimulation,
} from "@/lib/checkout-utils";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import {
  formSchema,
  paymentSchema,
  shippingSchema,
  type FormValues,
} from "@/lib/validators";
import { Route } from "@/routes/{-$locale}/checkout";
import { useStore } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";
import PaymentForm from "../form/payment-form";
import ShippingForm from "../form/shipping-form";
import OrderSummary from "../order-summary";
import { Skeleton } from "../ui/skeleton";
import CheckoutReview from "./checkout-review";
import CheckoutStepper from "./checkout-stepper";
import { useCartStore } from "@/stores/cart-store";

const Checkout = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const { locale } = Route.useParams();
  const { section } = useSearch({ from: "/{-$locale}/checkout/" });
  const navigate = useNavigate({ from: "/{-$locale}/checkout/" });
  const { clearCart } = useCartStore();

  const { mutateAsync } = useMutation({
    mutationFn: async (paymentMethod: string) => {
      const orderId = await createOrderSimulation();
      return { orderId, paymentMethod };
    },
    onSuccess: async ({ orderId, paymentMethod }) => {
      if (paymentMethod === "payment-card" || paymentMethod === "apple-pay") {
        await handlePaymentSimulation();
      }
      navigate({
        to: "/{-$locale}/account/$orderId",
        params: {
          locale,
          orderId,
        },
      });
      clearCart();
    },
  });

  const form = useCheckoutForm({
    ...checkoutFormOpts,
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
        await mutateAsync(currentValues.payment.paymentMethod);
      }
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
