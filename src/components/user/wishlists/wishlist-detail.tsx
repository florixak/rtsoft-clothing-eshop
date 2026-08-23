import { useState } from "react";

import ProductCard from "@/components/catalog/product-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useWishlistMutations from "@/hooks/use-wishlist-mutations";
import { createWishlistQueryOptions } from "@/hooks/query-options";
import useLocale from "@/hooks/use-locale";
import useUser from "@/hooks/use-user";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { findProductById } from "@/lib/product-utils";
import { isDefined } from "@/lib/utils";
import type { Product, Wishlist } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import WishlistDeleteDialog from "./wishlist-delete-dialog";
import WishlistNameDialog from "./wishlist-name-dialog";

type WishlistDetailProps = {
  wishlistId: Wishlist["id"];
};

const resolveWishlistProducts = (wishlist: Wishlist) =>
  wishlist.items
    .slice()
    .sort((left, right) => right.addedAt.localeCompare(left.addedAt))
    .map((item) => findProductById(item.productId))
    .filter(isDefined);

const WishlistDetail = ({ wishlistId }: WishlistDetailProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);
  const locale = useLocale();
  const navigate = useNavigate();
  const user = useUser();

  if (!user) {
    throw new Error("User must be authenticated to view a wishlist");
  }

  const { data: wishlist } = useSuspenseQuery(
    createWishlistQueryOptions(user.id, wishlistId),
  );
  const { rename, remove, removeProduct } = useWishlistMutations(user.id);
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<Product | null>(null);

  const products = resolveWishlistProducts(wishlist);

  const handleRename = async (name: string) => {
    try {
      await rename.mutateAsync({ wishlistId, name });
      toast.success(t("wishlists.toast.renamed"));
      setRenameOpen(false);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  const handleDelete = async () => {
    try {
      await remove.mutateAsync(wishlistId);
      toast.success(t("wishlists.toast.deleted"));
      setDeleteOpen(false);
      await navigate({ to: "/{-$locale}/account/wishlists" });
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  const handleRemoveProduct = async () => {
    if (!productToRemove) {
      return;
    }

    try {
      await removeProduct.mutateAsync({
        wishlistId,
        productId: productToRemove.id,
      });
      toast.success(
        t("wishlists.toast.removedItem", { name: productToRemove.name[locale] }),
      );
      setProductToRemove(null);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-col gap-4">
        <Link
          to="/{-$locale}/account/wishlists"
          params={{ locale }}
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft size={16} />
          {t("wishlists.back")}
        </Link>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold">{wishlist.name}</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setRenameOpen(true)}>
              <Pencil />
              {t("common:buttons.edit")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => setDeleteOpen(true)}
            >
              <Trash2 />
              {t("common:buttons.delete")}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {products.length === 0 ? (
          <p className="text-muted-foreground">{t("wishlists.detailEmpty")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                wishlistMode="remove"
                onRemoveFromWishlist={() => setProductToRemove(product)}
              />
            ))}
          </div>
        )}
      </CardContent>

      <WishlistNameDialog
        open={renameOpen}
        mode="rename"
        initialName={wishlist.name}
        isPending={rename.isPending}
        onOpenChange={setRenameOpen}
        onSubmit={handleRename}
      />
      <WishlistDeleteDialog
        open={deleteOpen}
        name={wishlist.name}
        isPending={remove.isPending}
        onOpenChange={setDeleteOpen}
        onConfirm={handleDelete}
      />
      <WishlistDeleteDialog
        open={Boolean(productToRemove)}
        name={productToRemove?.name[locale] ?? ""}
        isPending={removeProduct.isPending}
        titleKey="wishlists.removeItemDialog.title"
        descriptionKey="wishlists.removeItemDialog.description"
        actionKey="wishlists.removeItemDialog.action"
        onOpenChange={(open) => {
          if (!open) {
            setProductToRemove(null);
          }
        }}
        onConfirm={handleRemoveProduct}
      />
    </Card>
  );
};

export default WishlistDetail;
