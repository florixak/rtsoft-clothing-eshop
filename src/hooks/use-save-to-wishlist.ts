import { MAX_WISHLISTS } from "@/constants";
import { createWishlistsQueryOptions } from "@/hooks/query-options";
import useUser from "@/hooks/use-user";
import useWishlistMutations from "@/hooks/use-wishlist-mutations";
import { WishlistLimitError } from "@/lib/errors";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product, Wishlist } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";

const listContainsProduct = (wishlist: Wishlist, productId: Product["id"]) =>
  wishlist.items.some((item) => item.productId === productId);

const useSaveToWishlist = (productId: Product["id"]) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);
  const user = useUser();
  const navigate = useNavigate();
  const locationHref = useRouterState({
    select: (state) => state.location.href,
  });
  const [pickerOpen, setPickerOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);

  const {
    data: wishlists = [],
    isSuccess: hasLoadedLists,
    isError: hasFailedToLoadLists,
    isPending: isListsPending,
  } = useQuery({
    ...createWishlistsQueryOptions(user?.id ?? ""),
    enabled: Boolean(user),
  });

  const { create, saveProduct, removeProduct } = useWishlistMutations(
    user?.id ?? "",
  );

  const isSaved = wishlists.some((wishlist) =>
    listContainsProduct(wishlist, productId),
  );

  const saveToList = async (wishlist: Wishlist) => {
    try {
      await saveProduct.mutateAsync({
        wishlistId: wishlist.id,
        productId,
      });
      toast.success(t("wishlists.toast.saved", { name: wishlist.name }));
      setPickerOpen(false);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  const removeFromList = async (wishlist: Wishlist) => {
    try {
      await removeProduct.mutateAsync({
        wishlistId: wishlist.id,
        productId,
      });
      toast.success(t("wishlists.toast.removed", { name: wishlist.name }));
      setPickerOpen(false);
    } catch {
      toast.error(t("common:toast.genericError"));
    }
  };

  const toggleOnList = async (wishlist: Wishlist) => {
    if (listContainsProduct(wishlist, productId)) {
      await removeFromList(wishlist);
      return;
    }

    await saveToList(wishlist);
  };

  const createAndSave = async (name: string) => {
    try {
      const wishlist = await create.mutateAsync(name);
      await saveProduct.mutateAsync({
        wishlistId: wishlist.id,
        productId,
      });
      toast.success(t("wishlists.toast.saved", { name: wishlist.name }));
      setCreateOpen(false);
      setPickerOpen(false);
    } catch (error) {
      if (error instanceof WishlistLimitError) {
        toast.error(t("wishlists.toast.limitReached", { max: MAX_WISHLISTS }));
        return;
      }

      toast.error(t("common:toast.genericError"));
    }
  };

  const onHeartClick = () => {
    if (!user) {
      void navigate({
        to: "/{-$locale}/login",
        search: { redirect: locationHref },
      });
      return;
    }

    if (hasFailedToLoadLists) {
      toast.error(t("common:toast.genericError"));
      return;
    }

    if (!hasLoadedLists) {
      return;
    }

    if (wishlists.length === 0) {
      setCreateOpen(true);
      return;
    }

    if (wishlists.length === 1) {
      const [onlyList] = wishlists;
      if (onlyList) {
        void toggleOnList(onlyList);
      }
      return;
    }

    setPickerOpen(true);
  };

  return {
    isSaved,
    wishlists,
    pickerOpen,
    createOpen,
    isPending:
      create.isPending ||
      saveProduct.isPending ||
      removeProduct.isPending ||
      Boolean(user && isListsPending),
    setPickerOpen,
    setCreateOpen,
    onHeartClick,
    toggleOnList,
    createAndSave,
  };
};

export default useSaveToWishlist;
export { listContainsProduct };
