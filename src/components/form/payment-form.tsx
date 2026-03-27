import { paymentMethods } from "@/data";
import { withForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import { CardHeader } from "../ui/card";
import i18n from "@/lib/i18n";

const PaymentForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    return (
      <>
        {paymentMethods.map((method) => (
          <form.AppField
            key={method.id}
            name="payment.paymentMethod"
            children={(field) => (
              <field.RadioButtonField value={method.id}>
                <CardHeader>
                  {method.name[i18n.resolvedLanguage == "cs" ? "cs" : "en"]}
                </CardHeader>
              </field.RadioButtonField>
            )}
          />
        ))}
      </>
    );
  },
});

export default PaymentForm;
