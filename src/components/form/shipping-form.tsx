import { shippingMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { CardContent, CardHeader } from "../ui/card";

const ShippingForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    const locale = i18n.resolvedLanguage == "cs" ? "cs" : "en";
    const translation = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
    return (
      <div className="flex flex-col gap-4 w-full">
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
    );
  },
});

export default ShippingForm;
