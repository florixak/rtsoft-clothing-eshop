import { shippingMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { CardContent, CardHeader } from "../ui/card";
import { Link } from "@tanstack/react-router";

const ShippingForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    const locale = i18n.resolvedLanguage == "cs" ? "cs" : "en";
    const translation = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
    const isLoggedIn = false;
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
              1
            </span>
            {translation("shippingMethod.title")}
          </h3>
          <div className="flex flex-col md:flex-row w-full gap-2">
            {shippingMethods.map((method) => (
              <form.AppField
                key={method.id}
                name="shipping.shippingMethod"
                children={(field) => (
                  <field.RadioButtonField value={method.id} className="w-full">
                    <CardHeader>{method.name[locale]}</CardHeader>
                    <CardContent className="text-sm text-muted-foreground flex flex-col gap-2 w-full">
                      <p>{method.description[locale]}</p>

                      <span className="font-semibold text-lg">
                        {method.price === 0
                          ? translation("shippingMethod.free")
                          : formatPrice(method.price, locale)}
                      </span>
                    </CardContent>
                  </field.RadioButtonField>
                )}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
              2
            </span>
            {translation("deliveryInfo.title")}
          </h3>
          {!isLoggedIn && (
            <div className="text-sm text-muted-foreground">
              <span>{translation("deliveryInfo.returningUser")}</span>
              <Link
                to="/{-$locale}"
                className="text-primary ml-1 font-semibold"
              >
                {translation("deliveryInfo.logIn")}
              </Link>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <form.AppField
              name="shipping.firstName"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.firstName.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.firstName.placeholder",
                  )}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.lastName"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.lastName.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.lastName.placeholder",
                  )}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.email"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.email.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.email.placeholder",
                  )}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.phone"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.phone.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.phone.placeholder",
                  )}
                />
              )}
            />

            <div className="md:col-span-2">
              <form.AppField
                name="shipping.streetAddress"
                children={(field) => (
                  <field.TextField
                    label={translation("deliveryInfo.fields.street.label")}
                    placeholder={translation(
                      "deliveryInfo.fields.street.placeholder",
                    )}
                    required
                  />
                )}
              />
            </div>

            <form.AppField
              name="shipping.city"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.city.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.city.placeholder",
                  )}
                  required
                />
              )}
            />
            <form.AppField
              name="shipping.postalCode"
              children={(field) => (
                <field.TextField
                  label={translation("deliveryInfo.fields.postalCode.label")}
                  placeholder={translation(
                    "deliveryInfo.fields.postalCode.placeholder",
                  )}
                  required
                />
              )}
            />
            <div className="md:col-span-2">
              <form.AppField
                name="shipping.country"
                children={(field) => (
                  <field.TextField
                    label={translation("deliveryInfo.fields.country.label")}
                    placeholder={translation(
                      "deliveryInfo.fields.country.placeholder",
                    )}
                    required
                  />
                )}
              />
            </div>
          </div>
        </div>
      </div>
    );
  },
});

export default ShippingForm;
