import type { Order } from "@/types";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import CartItem from "../cart/cart-item";
import OrderDetailCard from "./order-detail-card";
import { ShoppingCart } from "lucide-react";
import { useTranslation } from "react-i18next";

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
      icon={ShoppingCart}
      title={t("checkout:review.items", { count: orderItems.length })}
      cardContent={
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {orderItems.map((item) => (
            <li
              key={
                item.productId +
                item.selectionSnapshot.color +
                item.selectionSnapshot.size
              }
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
