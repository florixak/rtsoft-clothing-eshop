import { products } from "@/data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { SizeCode, TypeCode } from "@/types";
import { ListFilter, ShoppingBasket, Star, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Link } from "@tanstack/react-router";
import CatalogFilter from "./catalog-filter";

const Catalog = () => {
  const { addItem } = useCartStore();
  const { t, i18n } = useTranslation("catalog");
  const countOfProducts = products.length;
  const showingFrom = 1;
  const showingTo = countOfProducts < 12 ? countOfProducts : 12;

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
    <section className="container mx-auto">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-2xl font-heading font-semibold">
            {t("catalog.title")}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t("catalog.showing", {
              from: showingFrom,
              to: showingTo,
              total: countOfProducts,
            })}
          </p>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row items-center justify-between w-full">
            <div className="flex flex-row items-center gap-2">
              <Badge className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3">
                <X size={12} /> Red
              </Badge>
              <Badge className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3">
                <X size={12} /> Blue
              </Badge>
            </div>
            <Drawer direction="left">
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  <ListFilter size={16} />
                  {t("filters.title")}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle>{t("filters.title")}</DrawerTitle>
                  <DrawerDescription>
                    Refine your product search
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerContent>
                  <CatalogFilter />
                </DrawerContent>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
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
                <div
                  key={product.id}
                  className="flex flex-row items-center gap-1"
                >
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
                <p className="text-muted-foreground">
                  {product.description[locale]}
                </p>
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
        ))}
      </div>
    </section>
  );
};

export default Catalog;
