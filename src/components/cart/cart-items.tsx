import { useCartStore } from "@/stores/cart-store";
import CartItem from "./cart-item";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { CART_ITEM_SHOW_MORE } from "@/constants";

const CartItems = () => {
  const {
    cart: { items },
  } = useCartStore();
  const [showAll, setShowAll] = useState(false);

  const { t } = useTranslation(TRANSLATION_NAMESPACES.cart);

  const visibleItems = showAll ? items : items.slice(0, CART_ITEM_SHOW_MORE);

  const handleShowMore = () => {
    setShowAll((prev) => !prev);
  };

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
      {visibleItems.map((item) => (
        <CartItem key={item.id} item={item} />
      ))}
      {items.length > CART_ITEM_SHOW_MORE && (
        <Button variant="outline" onClick={handleShowMore}>
          {showAll ? t("actions.showLess") : t("actions.showMore")}
        </Button>
      )}
    </div>
  );
};

export default CartItems;
