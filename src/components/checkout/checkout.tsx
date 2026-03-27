import { shippingMethods } from "@/data";
import { useCheckoutForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useStore } from "@tanstack/react-form";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import OrderSummary from "../order-summary";
import CheckoutStepper from "./checkout-stepper";
import ShippingForm from "../form/shipping-form";
import PaymentForm from "../form/payment-form";
import CheckoutReview from "./checkout-review";

const Checkout = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const { section } = useSearch({ from: "/{-$locale}/checkout/" });
  const navigate = useNavigate({ from: "/{-$locale}/checkout/" });

  const form = useCheckoutForm({
    ...checkoutFormOpts,
    onSubmit: ({ value, formApi }) => {
      if (section === "shipping") {
        formApi.setFieldValue("section", "payment");
        navigate({
          to: "/{-$locale}/checkout",
          search: { section: "payment" },
          replace: true,
        });
      } else if (section === "payment") {
        formApi.setFieldValue("section", "review");
        navigate({
          to: "/{-$locale}/checkout",
          search: { section: "review" },
          replace: true,
        });
      } else {
        alert(
          "Submitting order with values: " + JSON.stringify(value, null, 2),
        );
      }
    },
  });

  const currentSection = useStore(form.store, (state) => state.values.section);
  const currentShipping = useStore(
    form.store,
    (state) => state.values.shipping.shippingMethod,
  );
  const shippingCost =
    shippingMethods.find((m) => m.id === currentShipping)?.price || 0;

  const buttonLabel =
    currentSection === "shipping"
      ? t("actions.continueToPayment")
      : currentSection === "payment"
        ? t("actions.continueToReview")
        : t("actions.placeOrder");

  const handleBack = () => {
    if (currentSection === "payment") {
      form.setFieldValue("section", "shipping");
      navigate({
        to: "/{-$locale}/checkout",
        search: { section: "shipping" },
        replace: true,
      });
    } else if (currentSection === "review") {
      form.setFieldValue("section", "payment");
      navigate({
        to: "/{-$locale}/checkout",
        search: { section: "payment" },
        replace: true,
      });
    }
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
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            {currentSection === "shipping" && <ShippingForm form={form} />}
            {currentSection === "payment" && <PaymentForm form={form} />}
            {currentSection === "review" && <CheckoutReview />}
            <form.SubscribeButton label={buttonLabel} onBack={handleBack} />
          </form.AppForm>
        </form>
        <OrderSummary data={{ shipping: shippingCost, tax: 0 }} isCheckout />
      </div>
    </section>
  );
};

export default Checkout;
