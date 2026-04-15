import type { CheckoutStep } from "@/constants";
import OrderDetailCard from "./order-detail-card";
import { CreditCard, MapPinHouse, Truck } from "lucide-react";

export type OrderDetailCardsModel = {
  shippingAddress: {
    name: string;
    lines: string[];
    footer?: React.ReactNode;
  };
  shippingMethod: {
    name: string;
    description?: string;
    priceLabel: string;
    footer?: React.ReactNode;
  };
  paymentMethod: {
    name: string;
    description?: React.ReactNode;
    footer?: React.ReactNode;
  };
};

type OrderDetailCardsProps = {
  model: OrderDetailCardsModel;
  labels: {
    shippingAddress: string;
    shippingMethod: string;
    paymentMethod: string;
    edit: string;
  };
  editable?: boolean;
  onEditSection?: (section: CheckoutStep) => void;
};

const OrderDetailCards = ({
  model,
  labels,
  editable = false,
  onEditSection,
}: OrderDetailCardsProps) => {
  const onEditShipping =
    editable && onEditSection ? () => onEditSection("shipping") : undefined;
  const onEditPayment =
    editable && onEditSection ? () => onEditSection("payment") : undefined;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <OrderDetailCard
        icon={MapPinHouse}
        title={labels.shippingAddress}
        cardTitle={model.shippingAddress.name}
        cardDescription={
          <>
            {model.shippingAddress.lines.map((line, index) => (
              <p key={`${line}-${index}`}>{line}</p>
            ))}
          </>
        }
        cardFooter={model.shippingAddress.footer}
        editLabel={labels.edit}
        onEdit={onEditShipping}
      />

      <OrderDetailCard
        icon={Truck}
        title={labels.shippingMethod}
        cardTitle={model.shippingMethod.name}
        cardDescription={
          <>
            {model.shippingMethod.description ?? "-"}
            <p className="font-medium text-muted-foreground">
              {model.shippingMethod.priceLabel}
            </p>
          </>
        }
        cardFooter={model.shippingMethod.footer}
        editLabel={labels.edit}
        onEdit={onEditShipping}
      />

      <OrderDetailCard
        icon={CreditCard}
        title={labels.paymentMethod}
        cardTitle={model.paymentMethod.name}
        cardDescription={model.paymentMethod.description}
        cardFooter={model.paymentMethod.footer}
        editLabel={labels.edit}
        onEdit={onEditPayment}
        className="md:col-span-2"
      />
    </div>
  );
};

export default OrderDetailCards;
