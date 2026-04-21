import { shippingMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { isAuthenticated } from "@/lib/auth";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { CardContent, CardFooter, CardHeader } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

const ShippingForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    const locale = i18n.resolvedLanguage == "cs" ? "cs" : "en";
    const t = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
    const isLoggedIn = isAuthenticated();
    return (
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
                  const errorNotes = field.state.meta.errors.length;
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
                      {shouldShowPacketaButton && (
                        <CardFooter className="p-2 flex gap-1 flex-col items-start">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            {t("shippingMethod.packetaButton")}
                          </Button>
                          <p
                            className={`text-sm ${errorNotes ? "text-destructive" : "text-muted-foreground"}`}
                          >
                            {t("shippingMethod.packetaHelper")}
                          </p>
                        </CardFooter>
                      )}
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
                      checked={field.state.value}
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
                state.values.shipping.useDifferentShippingAddress
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
    );
  },
});

export default ShippingForm;
