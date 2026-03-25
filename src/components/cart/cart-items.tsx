import { useCartStore } from "@/stores/cart-store";
import CartItem from "./cart-item";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";

const CartItems = () => {
  const {
    cart: { items },
  } = useCartStore();

  const { t } = useTranslation(TRANSLATION_NAMESPACES.cart);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 w-full">
        <h2 className="text-xl font-semibold font-heading">
          {t("empty.title")}
        </h2>
        <p className="text-muted-foreground">{t("empty.description")}</p>
        <Button render={<Link to="/{-$locale}">{t("empty.action")}</Link>} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 w-full">
      {items.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default CartItems;
