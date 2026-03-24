import { createCategoryQueryOptions } from "@/hooks/query-options";
import useProductVariants from "@/hooks/use-product-variants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { getImageBySelectedColor } from "@/lib/product-utils";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import ProductActions from "./product-actions";
import ProductImage from "./product-image";

type ProductHeaderProps = {
  product: Product;
};

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { data: categoryData } = useSuspenseQuery(
    createCategoryQueryOptions(product.categoryId),
  );

  const productVariants = useProductVariants(product);

  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.product);
  const locale = i18n.resolvedLanguage === "en" ? "en" : "cs";

  const category = categoryData?.name[locale] ?? "";

  const images = getImageBySelectedColor(
    product,
    productVariants.selectedColor,
  );

  return (
    <>
      <Breadcrumb className="uppercase text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="text-xs" href="/">
              {t("breadcrumbs.home")}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              className="text-xs"
              href={`/?category=${product?.categoryId}`}
            >
              {category}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs">
              {product?.name[locale]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex flex-col items-start gap-12 md:gap-8 md:flex-row w-full">
        <ProductImage images={images} product={product} locale={locale} />

        <div className="flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-4">
            <div className="flex flex-row items-center gap-2">
              <Badge className="text-xs uppercase">{category}</Badge>
              <div
                key={product?.id}
                className="flex flex-row items-center gap-1 text-sm"
              >
                <Star size={16} className="inline-block text-yellow-500" />
                {product?.rating}
                <span className="text-xs text-muted-foreground">
                  {t("rating.reviews", {
                    count: product?.reviewsCount,
                  })}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-2xl font-bold">{product?.name[locale]}</h2>
                <h3 className="text-xl">
                  {formatPrice(product?.basePrice ?? 0, locale)}
                </h3>
              </div>

              <p className="text-base text-muted-foreground">
                {product?.description[locale]}
              </p>
            </div>
            <ProductActions {...productVariants} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductHeader;
