import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Order } from "@/types";
import { useTranslation } from "react-i18next";
import CartItem from "../cart/cart-item";
import OrderDetailCard from "./order-detail-card";

type OrderItemsProps = {
  orderItems: Order["items"];
};

const OrderItems = ({ orderItems }: OrderItemsProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.checkout,
    TRANSLATION_NAMESPACES.orderDetails,
  ]);

  return (
    <OrderDetailCard
      title={t("checkout:review.items", { count: orderItems.length })}
      titleClassName="text-lg font-semibold"
      cardContent={
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orderItems.map((item) => (
            <li
              key={`${item.productId}-${item.selectionSnapshot.color}-${item.selectionSnapshot.size}`}
            >
              <CartItem compact item={{ id: item.productId, ...item }} />
            </li>
          ))}
        </ul>
      }
    />
  );
};

export default OrderItems;
