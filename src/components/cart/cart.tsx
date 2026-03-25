import { useCartStore } from "@/stores/cart-store";
import CartItems from "./cart-items";
import OrderSummary from "../order-summary";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

const Cart = () => {
  const { itemsCount } = useCartStore();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.cart);
  return (
    <section className="max-w-6xl mx-auto space-y-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-heading font-bold">{t("title")}</h1>
        <p className="text-muted-foreground">
          {t("itemsReady", { count: itemsCount() })}
        </p>
      </div>
      <div className="flex flex-col md:flex-row w-full gap-8">
        <CartItems />
        <OrderSummary showProducts={false} />
      </div>
    </section>
  );
};

export default Cart;
