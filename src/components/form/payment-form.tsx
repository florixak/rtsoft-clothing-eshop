import { paymentMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import i18n, { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Lock } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";

const PaymentForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    const locale = i18n.resolvedLanguage == "cs" ? "cs" : "en";
    const translation = i18n.getFixedT(locale, TRANSLATION_NAMESPACES.checkout);
    const resolvedLanguage = i18n.resolvedLanguage === "cs" ? "cs" : "en";
    return (
      <div className="flex flex-col gap-8 w-full">
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold">
            <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
              3
            </span>
            {translation("paymentMethod.title")}
          </h3>
          <div className="flex flex-col gap-2 w-full">
            {paymentMethods.map((method) => (
              <form.AppField
                key={method.id}
                name="payment.paymentMethod"
                children={(field) => (
                  <field.RadioButtonField value={method.id}>
                    <CardHeader>{method.name[resolvedLanguage]}</CardHeader>
                  </field.RadioButtonField>
                )}
              />
            ))}
          </div>
        </div>
        <Card className="max-w-lg w-full">
          <CardHeader>
            <h4 className="text-lg font-medium flex items-center">
              <Lock
                className="inline-block mr-2 text-muted-foreground"
                size={16}
              />
              {translation("paymentMethod.redirect.title")}
            </h4>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {translation("paymentMethod.redirect.description")}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  },
});

export default PaymentForm;
