import { shippingMethods } from "@/data";
import type { CheckoutForm } from "@/hooks/form";
import useLocale from "@/hooks/use-locale";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { getErrorMessage } from "@/lib/validators";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import PickupPointDrawer from "./pickup-point-drawer";

type ShippingMethodsProps = {
  form: CheckoutForm;
};

const ShippignMethods = ({ form }: ShippingMethodsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const [isPacketaDrawerOpen, setIsPacketaDrawerOpen] = useState(false);
  const locale = useLocale();

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold">
        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
          1
        </span>
        {t("shippingMethod.title")}
      </h3>
      <div className="flex flex-col md:flex-row w-full gap-2 items-stretch">
        {shippingMethods.map((method) => (
          <form.AppField
            key={method.id}
            name="shipping.shippingMethod"
            children={(field) => {
              const shouldShowPacketaButton =
                method.id === "packeta" && field.state.value === method.id;
              return (
                <field.RadioButtonField value={method.id} className="w-full">
                  <CardHeader>{method.name[locale]}</CardHeader>
                  <CardContent className="text-sm text-muted-foreground flex flex-col gap-2 w-full relative">
                    <p>{method.description[locale]}</p>

                    <span className="font-semibold text-lg">
                      {method.price === 0
                        ? t("shippingMethod.free")
                        : formatPrice(method.price, locale)}
                    </span>
                  </CardContent>
                  {shouldShowPacketaButton ? (
                    <form.Subscribe
                      selector={(state) => state.submissionAttempts}
                    >
                      {(submissionAttempts) => (
                        <form.AppField
                          name="shipping.packetaPickupPointId"
                          children={(pickupPointField) => {
                            const hasError =
                              pickupPointField.state.meta.errors.length > 0;
                            const shouldShowError =
                              hasError &&
                              (pickupPointField.state.meta.isTouched ||
                                submissionAttempts > 0);
                            const helperText = shouldShowError
                              ? t(
                                  getErrorMessage(
                                    pickupPointField.state.meta.errors[0],
                                  ),
                                )
                              : pickupPointField.state.value
                                ? t("shippingMethod.packetaSelected")
                                : t("shippingMethod.packetaHelper");

                            return (
                              <>
                                <CardFooter className="p-2 flex gap-1 flex-col items-start">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    type="button"
                                    onClick={(event) => {
                                      event.stopPropagation();
                                      setIsPacketaDrawerOpen(true);
                                    }}
                                  >
                                    {pickupPointField.state.value
                                      ? t("shippingMethod.packetaButtonChange")
                                      : t(
                                          "shippingMethod.packetaButtonRequired",
                                        )}
                                  </Button>
                                  <p
                                    className={`text-sm ${shouldShowError ? "text-destructive" : "text-muted-foreground"}`}
                                  >
                                    {helperText}
                                  </p>
                                </CardFooter>
                              </>
                            );
                          }}
                        />
                      )}
                    </form.Subscribe>
                  ) : null}
                </field.RadioButtonField>
              );
            }}
          />
        ))}
      </div>

      <form.AppField
        name="shipping.packetaPickupPointId"
        children={(pickupPointField) => (
          <PickupPointDrawer
            open={isPacketaDrawerOpen}
            onOpenChange={(open) => {
              setIsPacketaDrawerOpen(open);
              if (!open) {
                pickupPointField.handleBlur();
              }
            }}
            selectedPickupPointId={
              pickupPointField.state.value as string | undefined
            }
            onSelectPickupPoint={(pickupPoint) => {
              pickupPointField.handleChange(pickupPoint.id);
            }}
            onConfirm={() => {
              pickupPointField.handleBlur();
            }}
            isLoading={false}
          />
        )}
      />
    </div>
  );
};

export default ShippignMethods;
