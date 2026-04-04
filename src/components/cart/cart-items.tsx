import { MAX_CART_ITEMS_TO_SHOW } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useCartStore } from "@/stores/cart-store";
import { Link } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Skeleton } from "../ui/skeleton";
import CartItem from "./cart-item";

const CartItems = () => {
  const {
    cart: { items },
  } = useCartStore();
  const [showAll, setShowAll] = useState(false);

  const { t } = useTranslation(TRANSLATION_NAMESPACES.cart);

  const visibleItems = showAll ? items : items.slice(0, MAX_CART_ITEMS_TO_SHOW);

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
        <Suspense key={item.id} fallback={<Skeleton className="h-16 w-full" />}>
          <CartItem item={item} />
        </Suspense>
      ))}
      {items.length > MAX_CART_ITEMS_TO_SHOW && (
        <Button variant="outline" onClick={handleShowMore}>
          {showAll ? t("actions.showLess") : t("actions.showMore")}
        </Button>
      )}
    </div>
  );
};

export default CartItems;
