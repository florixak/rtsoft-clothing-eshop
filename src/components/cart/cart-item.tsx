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

  const price = formatPrice(item.priceSnapshot * item.quantity, locale);

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
          <p className="text-sm font-semibold text-muted-foreground">{price}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start w-full gap-4">
      <img
        src={images.primary}
        alt={product?.name[locale] ?? ""}
        className="size-64 object-cover rounded"
        loading="lazy"
      />
      <div className="flex flex-col justify-between flex-1 gap-2 w-full h-full">
        <div className="flex flex-col gap-1">
          <Link
            to="/{-$locale}/product/$productSlug"
            params={{ productSlug: product.slug[locale] }}
          >
            <h2 className="text-xl font-bold">{product?.name[locale] ?? ""}</h2>
          </Link>
          <p className="text-sm text-muted-foreground">
            {t("item.size", {
              size: item.selectionSnapshot.size.toUpperCase(),
            })}{" "}
            | {t("item.color", { color: item.selectionSnapshot.color })}
          </p>
          {!isInStock ? (
            <Badge variant="destructive" className="text-sm">
              {t("item.outOfStock")}
            </Badge>
          ) : (
            <Badge variant="default" className="text-sm">
              {t("item.inStock")}
            </Badge>
          )}
          <p className="text-lg font-bold">{price}</p>
        </div>
        <div className="flex items-center gap-4">
          <QuantityCounter
            quantity={item.quantity}
            onQuantityChange={handleQuantityChange}
            disabled={!isInStock}
          />
          <Button variant="outline" onClick={handleRemove} className="h-8">
            <Trash size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
