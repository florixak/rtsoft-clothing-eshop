import { QUERY_KEYS } from "@/constants";
import {
  addItem,
  createWishlist,
  deleteWishlist,
  removeItem,
  renameWishlist,
} from "@/lib/wishlist-storage";
import type { User, Wishlist } from "@/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useWishlistMutations = (userId: User["id"]) => {
  const queryClient = useQueryClient();

  const invalidateWishlists = async (wishlistId?: Wishlist["id"]) => {
    await queryClient.invalidateQueries({
      queryKey: QUERY_KEYS.wishlists(userId),
    });

    if (wishlistId) {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.wishlist(userId, wishlistId),
      });
    }
  };

  const create = useMutation({
    mutationFn: (name: string) => createWishlist(userId, name),
    onSuccess: () => invalidateWishlists(),
  });

  const rename = useMutation({
    mutationFn: ({
      wishlistId,
      name,
    }: {
      wishlistId: Wishlist["id"];
      name: string;
    }) => renameWishlist(userId, wishlistId, name),
    onSuccess: (wishlist) => invalidateWishlists(wishlist.id),
  });

  const remove = useMutation({
    mutationFn: (wishlistId: Wishlist["id"]) =>
      deleteWishlist(userId, wishlistId),
    onSuccess: async (_result, wishlistId) => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.wishlist(userId, wishlistId),
      });
      await invalidateWishlists();
    },
  });

  const saveProduct = useMutation({
    mutationFn: ({
      wishlistId,
      productId,
    }: {
      wishlistId: Wishlist["id"];
      productId: string;
    }) => addItem(userId, wishlistId, productId),
    onSuccess: (wishlist) => invalidateWishlists(wishlist.id),
  });

  const removeProduct = useMutation({
    mutationFn: ({
      wishlistId,
      productId,
    }: {
      wishlistId: Wishlist["id"];
      productId: string;
    }) => removeItem(userId, wishlistId, productId),
    onSuccess: (wishlist) => invalidateWishlists(wishlist.id),
  });

  return { create, rename, remove, saveProduct, removeProduct };
};

export default useWishlistMutations;
