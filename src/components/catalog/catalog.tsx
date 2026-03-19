import { products } from "@/data";
import { formatPrice } from "@/lib/utils";
import { ListFilter, ShoppingBasket, Star, X } from "lucide-react";
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
import { useTranslation } from "react-i18next";

const Catalog = () => {
  const { t, i18n } = useTranslation("catalog");
  const countOfProducts = 48;
  const showingFrom = 1;
  const showingTo = 12;

  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  return (
    <section>
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
                <DrawerContent>{/* Filter options go here */}</DrawerContent>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card className="p-0 shadow-sm gap-2" key={product.id}>
            <CardHeader className="p-0">
              <img
                src={product.images[0]}
                alt={product.name[locale]}
                className="size-100 w-full object-cover"
              />
            </CardHeader>
            <CardContent className="pb-4 flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <div key={product.id} className="flex items-center gap-1">
                  <Star size={16} className="inline-block text-yellow-500" />
                  {product.rating}
                </div>
                <h3 className="text-lg font-bold">{product.name[locale]}</h3>
                <p className="text-muted-foreground">
                  {product.description[locale]}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold">
                  {formatPrice(product.price, locale)}
                </p>
                <Button variant="outline" size="default">
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
