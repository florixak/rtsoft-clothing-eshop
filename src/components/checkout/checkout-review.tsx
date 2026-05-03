import type { CheckoutStep } from "@/constants";
import { paymentMethods, shippingMethods } from "@/data";
import { pickupPoints } from "@/data/shipping";
import { withForm, type CheckoutForm } from "@/hooks/form";
import useLocale from "@/hooks/use-locale";
import { checkoutFormOpts } from "@/lib/checkout-form";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import OrderDetailCards, {
  type OrderDetailCardsModel,
} from "../order/order-detail-cards";

type CheckoutReviewProps = {
  form: CheckoutForm;
  onEditSection: (section: CheckoutStep) => void;
};

const CheckoutReviewContent = ({
  form,
  onEditSection,
}: CheckoutReviewProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const locale = useLocale();
  const { payment, shipping } = form.state.values;
  const {
    city,
    country,
    differentShippingAddress,
    firstName,
    lastName,
    email,
    phone,
    postalCode,
    streetAddress,
    useDifferentShippingAddress,
  } = shipping;
  const { paymentMethod } = payment;

  const selectedShippingMethod = shippingMethods.find(
    (method) => method.id === shipping.shippingMethod,
  );
  const selectedPaymentMethod = paymentMethods.find(
    (method) => method.id === paymentMethod,
  );
  const selectedPickupPoint = shipping.packetaPickupPointId
    ? pickupPoints.find((point) => point.id === shipping.packetaPickupPointId)
    : undefined;

  const detailsModel: OrderDetailCardsModel = {
    shippingAddress: {
      name: firstName && lastName ? `${firstName} ${lastName}` : "-",
      lines: [
        email || "-",
        phone || "-",
        useDifferentShippingAddress
          ? differentShippingAddress.streetAddress || "-"
          : streetAddress || "-",
        useDifferentShippingAddress
          ? differentShippingAddress.postalCode || differentShippingAddress.city
            ? `${differentShippingAddress.postalCode} ${differentShippingAddress.city}`.trim()
            : "-"
          : postalCode || city
            ? `${postalCode} ${city}`.trim()
            : "-",
        useDifferentShippingAddress
          ? differentShippingAddress.country || "-"
          : country || "-",
      ],
      footer: (
        <p className="text-sm text-muted-foreground">
          {useDifferentShippingAddress
            ? t("review.billingAddress")
            : `${t("deliveryInfo.fields.street.label")}, ${t("deliveryInfo.fields.city.label")}, ${t("deliveryInfo.fields.postalCode.label")}`}
        </p>
      ),
    },
    shippingMethod: {
      name: selectedShippingMethod?.name[locale] ?? "-",
      description: selectedShippingMethod?.description[locale] ?? "-",
      priceLabel: selectedShippingMethod
        ? selectedShippingMethod.price === 0
          ? t("shippingMethod.free")
          : formatPrice(selectedShippingMethod.price, locale)
        : "-",
      footer: (
        <div className="space-y-1 text-sm text-muted-foreground">
          {selectedShippingMethod?.id === "packeta" && selectedPickupPoint ? (
            <>
              <p className="font-medium text-foreground">
                {t("pickupDrawer.selectedTitle")}
              </p>
              <p>
                {selectedPickupPoint.name}, {selectedPickupPoint.address},{" "}
                {selectedPickupPoint.city}
              </p>
            </>
          ) : null}
          <p>{t("review.includesTrackingAndInsurance")}</p>
        </div>
      ),
    },
    paymentMethod: {
      name: selectedPaymentMethod?.name[locale] ?? "-",
      footer:
        paymentMethod === "payment-card" || paymentMethod === "apple-pay" ? (
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            <Lock className="inline-block" size={14} />
            {t("paymentMethod.redirect.description")}
          </p>
        ) : undefined,
    },
  };

  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold">
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
            4
          </span>
          {t("review.title")}
        </h3>
        <OrderDetailCards
          model={detailsModel}
          labels={{
            shippingAddress: t("review.shippingAddress"),
            shippingMethod: t("review.shippingMethod"),
            paymentMethod: t("review.paymentMethod"),
            edit: t("actions.edit"),
          }}
          editable
          onEditSection={onEditSection}
        />
      </div>
    </div>
  );
};

const CheckoutReview = withForm({
  ...checkoutFormOpts,
  props: {
    onEditSection: (() => {}) as (section: CheckoutStep) => void,
  },
  render: ({ form, onEditSection }) => (
    <CheckoutReviewContent form={form} onEditSection={onEditSection} />
  ),
});

export default CheckoutReview;
