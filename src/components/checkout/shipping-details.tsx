import type { CheckoutForm } from "@/hooks/form";
import useUser from "@/hooks/use-user";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type ShippingDetailsProps = {
  form: CheckoutForm;
};

const ShippingDetails = ({ form }: ShippingDetailsProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const user = useUser();
  const isLoggedIn = user !== null;

  return (
    <div className="flex flex-col gap-6">
      <h3 className="text-lg font-semibold">
        <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
          2
        </span>
        {t("deliveryInfo.title")}
      </h3>
      <p className="text-sm text-muted-foreground">
        <span className="text-destructive">*</span>{" "}
        {t("deliveryInfo.requiredFieldsHint")}
      </p>
      {!isLoggedIn && (
        <div className="text-sm text-muted-foreground">
          <span>{t("deliveryInfo.returningUser")}</span>
          <Link
            to="/{-$locale}"
            className="text-primary ml-1 font-semibold hover:underline"
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
              type="email"
              maxLength={254}
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
                      placeholder={t("deliveryInfo.fields.city.placeholder")}
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
  );
};

export default ShippingDetails;
