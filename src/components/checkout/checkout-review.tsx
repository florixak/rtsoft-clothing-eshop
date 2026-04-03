import type { CheckoutStep } from "@/constants";
import { paymentMethods, shippingMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import {
  CreditCard,
  Lock,
  MapPinHouse,
  Truck,
  type LucideIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

const CheckoutReview = withForm({
  ...checkoutFormOpts,
  props: {
    onEditSection: (() => {}) as (section: CheckoutStep) => void,
  },
  render: ({ form, onEditSection }) => {
    const locale = i18n.resolvedLanguage == "cs" ? "cs" : "en";
    const translation = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
    const resolvedLanguage = i18n.resolvedLanguage === "cs" ? "cs" : "en";
    const { payment, shipping } = form.state.values;
    const {
      city,
      country,
      firstName,
      lastName,
      email,
      phone,
      postalCode,
      streetAddress,
    } = shipping;
    const { paymentMethod } = payment;

    const selectedShippingMethod = shippingMethods.find(
      (method) => method.id === shipping.shippingMethod,
    );
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.id === paymentMethod,
    );

    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
              4
            </span>
            {translation("review.title")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ReviewCard
              icon={MapPinHouse}
              title={translation("review.shippingAddress")}
              cardTitle={
                firstName && lastName ? `${firstName} ${lastName}` : "-"
              }
              cardDescription={
                <>
                  <p>{email || "-"}</p>
                  <p>{phone || "-"}</p>
                  <p>{streetAddress || "-"}</p>
                  <p>
                    {postalCode || city ? `${postalCode} ${city}`.trim() : "-"}
                  </p>
                  <p>{country || "-"}</p>
                </>
              }
              cardFooter={
                <p className="text-sm text-muted-foreground">
                  {translation("deliveryInfo.fields.street.label")},{" "}
                  {translation("deliveryInfo.fields.city.label")},{" "}
                  {translation("deliveryInfo.fields.postalCode.label")}
                </p>
              }
              editSection={onEditSection!}
              editStep="shipping"
            />

            <ReviewCard
              icon={Truck}
              title={translation("review.shippingMethod")}
              cardTitle={selectedShippingMethod?.name[resolvedLanguage] ?? "-"}
              cardDescription={
                <>
                  {selectedShippingMethod?.description[resolvedLanguage] ?? "-"}
                  <p className="font-medium text-muted-foreground">
                    {selectedShippingMethod
                      ? selectedShippingMethod.price === 0
                        ? translation("shippingMethod.free")
                        : formatPrice(selectedShippingMethod.price, locale)
                      : "-"}
                  </p>
                </>
              }
              cardFooter={
                <p className="text-sm text-muted-foreground">
                  {translation("review.includesTrackingAndInsurance")}
                </p>
              }
              editSection={onEditSection!}
              editStep="shipping"
            />

            <ReviewCard
              icon={CreditCard}
              title={translation("review.paymentMethod")}
              cardTitle={selectedPaymentMethod?.name[resolvedLanguage] ?? "-"}
              cardDescription={
                !paymentMethod && translation("review.noPaymentInfo")
              }
              cardFooter={
                (paymentMethod === "payment-card" ||
                  paymentMethod === "apple-pay") && (
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Lock className="inline-block" size={14} />
                    {translation("paymentMethod.redirect.description")}
                  </p>
                )
              }
              editSection={onEditSection!}
              editStep="payment"
              className="md:col-span-2"
            />
          </div>
        </div>
      </div>
    );
  },
});

const ReviewCard = ({
  icon,
  title,
  cardTitle,
  cardDescription,
  cardFooter,
  editSection,
  editStep,
  className,
}: {
  icon: LucideIcon;
  title: string;
  cardTitle: string;
  cardDescription: React.ReactNode;
  cardFooter: React.ReactNode;
  editSection: (section: CheckoutStep) => void;
  editStep: CheckoutStep;
  className?: string;
}) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const Icon = icon;
  return (
    <Card className={clsx("flex flex-col gap-6 w-full", className)}>
      <CardHeader className="relative">
        <Button
          variant="link"
          className="absolute top-0 right-4"
          type="button"
          onClick={() => editSection(editStep)}
          aria-label={`${t("actions.edit")} ${title}`}
        >
          {t("actions.edit")}
        </Button>
        <h4 className="text-lg font-medium flex items-center">
          <Icon className="inline-block mr-2 text-muted-foreground" size={16} />
          {title}
        </h4>
      </CardHeader>
      <CardContent className="flex-1">
        <CardTitle>{cardTitle}</CardTitle>
        <CardDescription className="mt-2">{cardDescription}</CardDescription>
      </CardContent>
      <CardFooter>{cardFooter}</CardFooter>
    </Card>
  );
};

export default CheckoutReview;
