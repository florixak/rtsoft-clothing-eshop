import type { Product, SizeCode, TypeCode } from "@/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { useTranslation } from "react-i18next";
import { ShoppingBasket, Star } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { formatPrice } from "@/lib/utils";
import { Button } from "../ui/button";
import { useCartStore } from "@/stores/cart-store";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { addItem } = useCartStore();
  const { t, i18n } = useTranslation("catalog");
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const handleAddToCart = (
    productId: string,
    defaultSize: SizeCode,
    defaultColor?: TypeCode,
    defaultMaterial?: TypeCode,
  ) => {
    addItem({
      productId,
      size: defaultSize,
      color: defaultColor,
      material: defaultMaterial,
    });
  };

  return (
    <Card
      className="p-0 shadow-sm gap-2 overflow-hidden group"
      key={product.id}
    >
      <CardHeader className="p-0">
        <img
          src={product.images[0]}
          alt={product.name[locale]}
          className="max-h-100 md:max-h-80 w-full object-cover group-hover:hidden"
          loading="lazy"
        />
        <img
          src={product.images[1] || product.images[0]}
          alt={product.name[locale]}
          className="max-h-100 md:max-h-80 w-full object-cover hidden group-hover:block"
          loading="lazy"
        />
      </CardHeader>
      <CardContent className="pb-4 flex flex-col gap-4 justify-between h-full">
        <div className="flex flex-col gap-1">
          <div key={product.id} className="flex flex-row items-center gap-1">
            <Star size={16} className="inline-block text-yellow-500" />
            {product.rating}
            <span className="text-xs text-muted-foreground">
              {t("productCard.reviews", {
                count: product.reviewsCount,
              })}
            </span>
          </div>
          <h3 className="text-lg font-bold hover:underline cursor-pointer">
            <Link
              to="/{-$locale}/product/$productSlug"
              params={{ locale, productSlug: product.slug[locale] }}
            >
              {product.name[locale]}
            </Link>
          </h3>
          <p className="text-muted-foreground">{product.description[locale]}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">
            {formatPrice(product.price, locale)}
          </p>
          <Button
            variant="default"
            size="default"
            className="cursor-pointer"
            onClick={() =>
              handleAddToCart(
                product.id,
                product.options.sizes[0].code,
                product.options.colors?.[0]?.code,
                product.options.material?.[0]?.code,
              )
            }
          >
            <ShoppingBasket size={16} />
            {t("productCard.addToCart")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
