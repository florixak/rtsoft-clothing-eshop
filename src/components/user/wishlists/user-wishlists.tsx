import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MAX_WISHLISTS } from "@/constants";
import useWishlistMutations from "@/hooks/use-wishlist-mutations";
import { createWishlistsQueryOptions } from "@/hooks/query-options";
import useLocale from "@/hooks/use-locale";
import useUser from "@/hooks/use-user";
import { WishlistLimitError } from "@/lib/errors";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { findProductById } from "@/lib/product-utils";
import { formatDate, isDefined } from "@/lib/utils";
import type { Wishlist } from "@/types";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Pencil, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import WishlistDeleteDialog from "./wishlist-delete-dialog";
import WishlistNameDialog from "./wishlist-name-dialog";

const UserWishlists = () => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);
  const locale = useLocale();
  const user = useUser();

  if (!user) {
    throw new Error("User must be authenticated to view wishlists");
  }

  const { data: wishlists } = useSuspenseQuery(
    createWishlistsQueryOptions(user.id),
  );
  const { create, rename, remove } = useWishlistMutations(user.id);

  const [createOpen, setCreateOpen] = useState(false);
  const [renameTarget, setRenameTarget] = useState<Wishlist | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Wishlist | null>(null);

  const isAtLimit = wishlists.length >= MAX_WISHLISTS;

  const handleCreate = async (name: string) => {
    try {
      await create.mutateAsync(name);
      toast.success(t("wishlists.toast.created"));
      setCreateOpen(false);
    } catch (error) {
      if (error instanceof WishlistLimitError) {
        toast.error(t("wishlists.toast.limitReached", { max: MAX_WISHLISTS }));
        return;
      }

      toast.error(t("common:toast.genericError"));
    }
  };

  const handleRename = async (name: string) => {
    if (!renameTarget) {
      return;
    }

    try {
      await rename.mutateAsync({ wishlistId: renameTarget.id, name });
      toast.success(t("wishlists.toast.renamed"));
      setRenameTarget(null);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      await remove.mutateAsync(deleteTarget.id);
      toast.success(t("wishlists.toast.deleted"));
      setDeleteTarget(null);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <h2 className="text-lg font-semibold">{t("wishlists.title")}</h2>
        <Button disabled={isAtLimit} onClick={() => setCreateOpen(true)}>
          <Plus />
          {t("wishlists.create")}
        </Button>
      </CardHeader>
      <CardContent>
        {wishlists.length === 0 ? (
          <p className="text-muted-foreground">{t("wishlists.empty")}</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {wishlists.map((wishlist) => (
              <li
                key={wishlist.id}
                className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex flex-col gap-1">
                  <Link
                    to="/{-$locale}/account/wishlists/$wishlistId"
                    params={{ locale, wishlistId: wishlist.id }}
                    className="font-medium hover:underline"
                  >
                    {wishlist.name}
                  </Link>
                  <p className="text-sm text-muted-foreground">
                    {t("wishlists.itemCount", {
                      count: wishlist.items
                        .map((item) => findProductById(item.productId))
                        .filter(isDefined).length,
                    })}
                    {" · "}
                    {t("wishlists.createdAt", {
                      date: formatDate(wishlist.createdAt, locale),
                    })}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setRenameTarget(wishlist)}
                  >
                    <Pencil />
                    {t("common:buttons.edit")}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => setDeleteTarget(wishlist)}
                  >
                    <Trash2 />
                    {t("common:buttons.delete")}
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </CardContent>

      <WishlistNameDialog
        open={createOpen}
        mode="create"
        isPending={create.isPending}
        onOpenChange={setCreateOpen}
        onSubmit={handleCreate}
      />
      <WishlistNameDialog
        open={Boolean(renameTarget)}
        mode="rename"
        initialName={renameTarget?.name}
        isPending={rename.isPending}
        onOpenChange={(open) => {
          if (!open) {
            setRenameTarget(null);
          }
        }}
        onSubmit={handleRename}
      />
      <WishlistDeleteDialog
        open={Boolean(deleteTarget)}
        name={deleteTarget?.name ?? ""}
        isPending={remove.isPending}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </Card>
  );
};

export default UserWishlists;
