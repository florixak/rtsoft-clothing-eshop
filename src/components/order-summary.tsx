type OrderSummaryProps = {
  showProducts?: boolean;
  showProductImages?: boolean;
};

const OrderSummary = ({
  showProducts = true,
  showProductImages = true,
}: OrderSummaryProps) => {
  return <aside>OrderSummary</aside>;
};

export default OrderSummary;
