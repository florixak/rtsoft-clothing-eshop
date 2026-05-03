import { paymentMethods } from "@/data";
import { withForm, type CheckoutForm } from "@/hooks/form";
import useLocale from "@/hooks/use-locale";
import { checkoutFormOpts } from "@/lib/checkout-form";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Lock } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

type PaymentContentProps = {
  form: CheckoutForm;
};

const PaymentFormContent = ({ form }: PaymentContentProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const locale = useLocale();
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex flex-col gap-6">
        <h3 className="text-lg font-semibold">
          <span className="bg-primary text-primary-foreground rounded-full px-3 py-1 mr-2">
            3
          </span>
          {t("paymentMethod.title")}
        </h3>
        <div className="flex flex-col gap-2 w-full">
          {paymentMethods.map((method) => (
            <form.AppField
              key={method.id}
              name="payment.paymentMethod"
              children={(field) => (
                <Button
                  variant="outline"
                  className="h-full items-start"
                  render={
                    <field.RadioButtonField value={method.id}>
                      {method.name[locale]}
                    </field.RadioButtonField>
                  }
                />
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
            {t("paymentMethod.redirect.title")}
          </h4>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            {t("paymentMethod.redirect.description")}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

const PaymentForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    return <PaymentFormContent form={form} />;
  },
});

export default PaymentForm;
