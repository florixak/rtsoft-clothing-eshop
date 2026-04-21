import { shippingMethods } from "@/data";
import { useCheckoutForm, withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { getErrorMessage } from "@/lib/validators";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import PickupPointDrawer from "../checkout/pickup-point-drawer";
import { Button } from "../ui/button";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import useUser from "@/hooks/use-user";

type ShippingContentProps = {
  form: ReturnType<typeof useCheckoutForm>;
};

const ShippingContent = ({ form }: ShippingContentProps) => {
  const {
    t,
    i18n: { resolvedLanguage },
  } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const [isPacketaDrawerOpen, setIsPacketaDrawerOpen] = useState(false);
  const locale = resolvedLanguage == "en" ? "en" : "cs";
  const user = useUser();
  const isLoggedIn = user !== null;

  return (
    <>
      <div className="flex flex-col gap-8 w-full">
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
                    <field.RadioButtonField
                      value={method.id}
                      className="w-full"
                    >
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
                                          ? t(
                                              "shippingMethod.packetaButtonChange",
                                            )
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
                                    <PickupPointDrawer
                                      open={isPacketaDrawerOpen}
                                      onOpenChange={(open) => {
                                        setIsPacketaDrawerOpen(open);
                                        if (!open) {
                                          pickupPointField.handleBlur();
                                        }
                                      }}
                                      selectedPickupPointId={
                                        pickupPointField.state.value as
                                          | string
                                          | undefined
                                      }
                                      onSelectPickupPoint={(pickupPoint) => {
                                        pickupPointField.handleChange(
                                          pickupPoint.id,
                                        );
                                      }}
                                      onConfirm={() => {
                                        pickupPointField.handleBlur();
                                      }}
                                      isLoading={false}
                                    />
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
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
              2
            </span>
            {t("deliveryInfo.title")}
          </h3>
          {!isLoggedIn && (
            <div className="text-sm text-muted-foreground">
              <span>{t("deliveryInfo.returningUser")}</span>
              <Link
                to="/{-$locale}"
                className="text-primary ml-1 font-semibold"
              >
                {t("deliveryInfo.logIn")}
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <form.AppField
              name="shipping.firstName"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.firstName.label")}
                  placeholder={t("deliveryInfo.fields.firstName.placeholder")}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.lastName"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.lastName.label")}
                  placeholder={t("deliveryInfo.fields.lastName.placeholder")}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.email"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.email.label")}
                  placeholder={t("deliveryInfo.fields.email.placeholder")}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.phone"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.phone.label")}
                  placeholder={t("deliveryInfo.fields.phone.placeholder")}
                />
              )}
            />

            <div className="md:col-span-2">
              <form.AppField
                name="shipping.streetAddress"
                children={(field) => (
                  <field.TextField
                    label={t("deliveryInfo.fields.street.label")}
                    placeholder={t("deliveryInfo.fields.street.placeholder")}
                    required
                  />
                )}
              />
            </div>

            <form.AppField
              name="shipping.city"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.city.label")}
                  placeholder={t("deliveryInfo.fields.city.placeholder")}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.postalCode"
              children={(field) => (
                <field.TextField
                  label={t("deliveryInfo.fields.postalCode.label")}
                  placeholder={t("deliveryInfo.fields.postalCode.placeholder")}
                  required
                />
              )}
            />
            <div className="md:col-span-2">
              <form.AppField
                name="shipping.country"
                children={(field) => (
                  <field.TextField
                    label={t("deliveryInfo.fields.country.label")}
                    placeholder={t("deliveryInfo.fields.country.placeholder")}
                    required
                  />
                )}
              />
            </div>

            <div className="md:col-span-2 border-t pt-4">
              <form.AppField
                name="shipping.useDifferentShippingAddress"
                children={(field) => (
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id="useDifferentShippingAddress"
                      checked={Boolean(field.state.value)}
                      onCheckedChange={(checked) =>
                        field.handleChange(Boolean(checked))
                      }
                      onBlur={field.handleBlur}
                    />
                    <Label
                      htmlFor="useDifferentShippingAddress"
                      className="text-sm leading-5"
                    >
                      {t("deliveryInfo.useDifferentShippingAddress")}
                    </Label>
                  </div>
                )}
              />
            </div>

            <form.Subscribe
              selector={(state) =>
                (
                  state as {
                    values: {
                      shipping: { useDifferentShippingAddress: boolean };
                    };
                  }
                ).values.shipping.useDifferentShippingAddress
              }
            >
              {(useDifferentShippingAddress) =>
                useDifferentShippingAddress ? (
                  <>
                    <div className="md:col-span-2">
                      <h4 className="font-medium">
                        {t("deliveryInfo.differentShippingAddressTitle")}
                      </h4>
                    </div>
                    <div className="md:col-span-2">
                      <form.AppField
                        name="shipping.differentShippingAddress.streetAddress"
                        children={(field) => (
                          <field.TextField
                            label={t("deliveryInfo.fields.street.label")}
                            placeholder={t(
                              "deliveryInfo.fields.street.placeholder",
                            )}
                            required
                          />
                        )}
                      />
                    </div>
                    <form.AppField
                      name="shipping.differentShippingAddress.city"
                      children={(field) => (
                        <field.TextField
                          label={t("deliveryInfo.fields.city.label")}
                          placeholder={t(
                            "deliveryInfo.fields.city.placeholder",
                          )}
                          required
                        />
                      )}
                    />
                    <form.AppField
                      name="shipping.differentShippingAddress.postalCode"
                      children={(field) => (
                        <field.TextField
                          label={t("deliveryInfo.fields.postalCode.label")}
                          placeholder={t(
                            "deliveryInfo.fields.postalCode.placeholder",
                          )}
                          required
                        />
                      )}
                    />
                    <div className="md:col-span-2">
                      <form.AppField
                        name="shipping.differentShippingAddress.country"
                        children={(field) => (
                          <field.TextField
                            label={t("deliveryInfo.fields.country.label")}
                            placeholder={t(
                              "deliveryInfo.fields.country.placeholder",
                            )}
                            required
                          />
                        )}
                      />
                    </div>
                  </>
                ) : null
              }
            </form.Subscribe>
          </div>
        </div>
      </div>
    </>
  );
};

const ShippingForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    return (
      <ShippingContent
        form={form as unknown as ReturnType<typeof useCheckoutForm>}
      />
    );
  },
});

export default ShippingForm;
