import { withForm, type CheckoutForm } from "@/hooks/form";
import { checkoutFormOpts } from "@/lib/checkout-form";
import ShippingDetails from "../checkout/shipping-details";
import ShippignMethods from "../checkout/shipping-methods";

type ShippingContentProps = {
  form: CheckoutForm;
};

const ShippingContent = ({ form }: ShippingContentProps) => {
  return (
    <div className="flex flex-col gap-8 w-full">
      <ShippignMethods form={form} />
      <ShippingDetails form={form} />
    </div>
  );
};

const ShippingForm = withForm({
  ...checkoutFormOpts,
  render: ({ form }) => {
    return <ShippingContent form={form} />;
  },
});

export default ShippingForm;
