import type { CheckoutStep } from "@/constants";
import { paymentMethods, shippingMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { CreditCard, Lock, MapPinHouse, Truck } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

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
    const { city, country, firstName, lastName, postalCode, streetAddress } =
      shipping;
    const { paymentMethod, cardNumber, cardholderName, expiryDate } = payment;

    const selectedShippingMethod = shippingMethods.find(
      (method) => method.id === shipping.shippingMethod,
    );
    const selectedPaymentMethod = paymentMethods.find(
      (method) => method.id === paymentMethod,
    );
    const maskedCardNumber = cardNumber
      ? "**** **** **** " + cardNumber.slice(-4)
      : "---- ---- ---- ----";

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
            <Card className="flex flex-col gap-6 w-full">
              <CardHeader className="relative">
                <Button
                  variant="link"
                  className="absolute top-0 right-4"
                  type="button"
                  onClick={() => onEditSection?.("shipping")}
                  aria-label={`${translation("actions.edit")} ${translation("review.shippingAddress")}`}
                >
                  {translation("actions.edit")}
                </Button>
                <h4 className="text-lg font-medium flex items-center">
                  <MapPinHouse
                    className="inline-block mr-2 text-muted-foreground"
                    size={16}
                  />
                  {translation("review.shippingAddress")}
                </h4>
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle>
                  {firstName && lastName ? `${firstName} ${lastName}` : "-"}
                </CardTitle>
                <CardDescription className="mt-2">
                  <p>{streetAddress || "-"}</p>
                  <p>
                    {postalCode || city ? `${postalCode} ${city}`.trim() : "-"}
                  </p>
                  <p>{country || "-"}</p>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {translation("deliveryInfo.fields.street.label")},{" "}
                  {translation("deliveryInfo.fields.city.label")},{" "}
                  {translation("deliveryInfo.fields.postalCode.label")}
                </p>
              </CardFooter>
            </Card>

            <Card className="flex flex-col gap-6 w-full">
              <CardHeader className="relative">
                <Button
                  variant="link"
                  className="absolute top-0 right-4"
                  type="button"
                  onClick={() => onEditSection?.("shipping")}
                  aria-label={`${translation("actions.edit")} ${translation("review.shippingMethod")}`}
                >
                  {translation("actions.edit")}
                </Button>
                <h4 className="text-lg font-medium flex items-center">
                  <Truck
                    className="inline-block mr-2 text-muted-foreground"
                    size={16}
                  />
                  {translation("review.shippingMethod")}
                </h4>
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle>
                  {selectedShippingMethod?.name[resolvedLanguage] ?? "-"}
                </CardTitle>
                <CardDescription className="mt-2">
                  {selectedShippingMethod?.description[resolvedLanguage] ?? "-"}
                  <p className="font-medium text-muted-foreground">
                    {selectedShippingMethod
                      ? selectedShippingMethod.price === 0
                        ? translation("shippingMethod.free")
                        : formatPrice(selectedShippingMethod.price, locale)
                      : "-"}
                  </p>
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  {translation("review.includesTrackingAndInsurance")}
                </p>
              </CardFooter>
            </Card>

            <Card className="flex flex-col gap-6 w-full md:col-span-2">
              <CardHeader className="relative">
                <Button
                  variant="link"
                  className="absolute top-0 right-4"
                  type="button"
                  onClick={() => onEditSection?.("payment")}
                  aria-label={`${translation("actions.edit")} ${translation("review.paymentMethod")}`}
                >
                  {translation("actions.edit")}
                </Button>
                <h4 className="text-lg font-medium flex items-center">
                  <CreditCard
                    className="inline-block mr-2 text-muted-foreground"
                    size={16}
                  />
                  {translation("review.paymentMethod")}
                </h4>
              </CardHeader>
              <CardContent className="flex-1">
                <CardTitle>
                  {selectedPaymentMethod?.name[resolvedLanguage] ?? "-"}
                </CardTitle>
                <CardDescription className="mt-2">
                  {paymentMethod === "payment-card" && (
                    <>
                      <p className="text-muted-foreground">
                        {maskedCardNumber}
                      </p>
                      {expiryDate && (
                        <p className="text-muted-foreground">
                          {translation("review.expires", {
                            date: payment.expiryDate,
                          })}
                        </p>
                      )}
                      <p className="text-muted-foreground">
                        {cardholderName || "-"}
                      </p>
                    </>
                  )}
                </CardDescription>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Lock className="inline-block" size={14} />
                  {translation("paymentMethod.secureForm.securityInfo")}
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    );
  },
});

export default CheckoutReview;
