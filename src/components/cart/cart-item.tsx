import { createProductIdQueryOptions } from "@/hooks/query-options";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { getImageBySelectedColor, hasInStockSku } from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { CartItem as CartItemType } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Trash } from "lucide-react";
import { useTranslation } from "react-i18next";
import QuantityCounter from "../product/quantity-counter";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

type CartItemProps = {
  item: CartItemType;
  compact?: boolean;
};

const CartItem = ({ item, compact = false }: CartItemProps) => {
  const { removeItem, changeItemQuantity } = useCartStore();
  const { data: product } = useSuspenseQuery(
    createProductIdQueryOptions(item.productId),
  );
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.cart);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const handleRemove = () => {
    removeItem(item.id);
  };

  const handleQuantityChange = (newQuantity: number) => {
    changeItemQuantity(item.id, newQuantity);
  };

  const isInStock = hasInStockSku(
    product,
    item.selectionSnapshot.color,
    item.selectionSnapshot.size,
  );

  const formattedPrice = formatPrice(
    item.priceSnapshot * item.quantity,
    locale,
  );

  const images = getImageBySelectedColor(product, item.selectionSnapshot.color);

  if (compact) {
    return (
      <div className="flex items-center gap-4">
        <img
          src={images.primary}
          alt={product.name[locale]}
          className="size-16 object-cover rounded"
          loading="lazy"
        />

        <div className="flex-1">
          <h2 className="text-sm font-medium">
            <span className="text-muted-foreground">{item.quantity} ×</span>{" "}
            {product.name[locale]}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("item.size", {
              size: item.selectionSnapshot.size.toUpperCase(),
            })}{" "}
            | {t("item.color", { color: item.selectionSnapshot.color })}
          </p>
          <p className="text-sm font-semibold text-muted-foreground">
            {formattedPrice}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start w-full gap-3 sm:gap-4">
      <img
        src={images.primary}
        alt={product?.name[locale] ?? ""}
        className="size-20 sm:size-24 md:size-36 object-cover rounded shrink-0"
        loading="lazy"
      />
      <div className="flex flex-col justify-between flex-1 gap-2 w-full min-w-0">
        <div className="flex flex-col gap-1">
          <Link
            to="/{-$locale}/product/$productSlug"
            params={{ productSlug: product.slug[locale] }}
          >
            <h2 className="text-base sm:text-lg font-bold leading-tight line-clamp-2">
              {product?.name[locale] ?? ""}
            </h2>
          </Link>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs sm:text-sm text-muted-foreground">
            <p>
              {t("item.size", {
                size: item.selectionSnapshot.size.toUpperCase(),
              })}{" "}
              | {t("item.color", { color: item.selectionSnapshot.color })}
            </p>
            {!isInStock && (
              <Badge
                variant="destructive"
                className="h-5 px-1.5 text-[10px] sm:text-xs"
              >
                {t("item.outOfStock")}
              </Badge>
            )}
          </div>
          <p className="text-base sm:text-lg font-bold">{formattedPrice}</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <QuantityCounter
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            disabled={!isInStock}
            size="compact"
          />
          <Button
            variant="outline"
            size="icon-sm"
            onClick={handleRemove}
            aria-label={t("item.remove")}
          >
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
