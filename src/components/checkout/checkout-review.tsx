import type { CheckoutStep } from "@/constants";
import { paymentMethods, shippingMethods } from "@/data";
import { pickupPoints } from "@/data/shipping";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Lock } from "lucide-react";
import OrderDetailCards, {
  type OrderDetailCardsModel,
} from "../order/order-detail-cards";

const CheckoutReview = withForm({
  ...checkoutFormOpts,
  props: {
    onEditSection: (() => {}) as (section: CheckoutStep) => void,
  },
  render: ({ form, onEditSection }) => {
    const locale = i18n.resolvedLanguage == "en" ? "en" : "cs";
    const translation = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
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
            ? differentShippingAddress.postalCode ||
              differentShippingAddress.city
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
              ? translation("review.billingAddress")
              : `${translation("deliveryInfo.fields.street.label")}, ${translation("deliveryInfo.fields.city.label")}, ${translation("deliveryInfo.fields.postalCode.label")}`}
          </p>
        ),
      },
      shippingMethod: {
        name: selectedShippingMethod?.name[locale] ?? "-",
        description: selectedShippingMethod?.description[locale] ?? "-",
        priceLabel: selectedShippingMethod
          ? selectedShippingMethod.price === 0
            ? translation("shippingMethod.free")
            : formatPrice(selectedShippingMethod.price, locale)
          : "-",
        footer: (
          <div className="space-y-1 text-sm text-muted-foreground">
            {selectedShippingMethod?.id === "packeta" && selectedPickupPoint ? (
              <>
                <p className="font-medium text-foreground">
                  {translation("pickupDrawer.selectedTitle")}
                </p>
                <p>
                  {selectedPickupPoint.name}, {selectedPickupPoint.address},{" "}
                  {selectedPickupPoint.city}
                </p>
              </>
            ) : null}
            <p>{translation("review.includesTrackingAndInsurance")}</p>
          </div>
        ),
      },
      paymentMethod: {
        name: selectedPaymentMethod?.name[locale] ?? "-",
        footer:
          paymentMethod === "payment-card" || paymentMethod === "apple-pay" ? (
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              <Lock className="inline-block" size={14} />
              {translation("paymentMethod.redirect.description")}
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
            {translation("review.title")}
          </h3>
          <OrderDetailCards
            model={detailsModel}
            labels={{
              shippingAddress: translation("review.shippingAddress"),
              shippingMethod: translation("review.shippingMethod"),
              paymentMethod: translation("review.paymentMethod"),
              edit: translation("actions.edit"),
            }}
            editable
            onEditSection={onEditSection}
          />
        </div>
      </div>
    );
  },
});

export default CheckoutReview;
