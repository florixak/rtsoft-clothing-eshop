import {
  MAX_WISHLIST_NAME_LENGTH,
  MAX_WISHLISTS,
  WISHLISTS_STORAGE_KEY,
} from "@/constants";
import type { User, Wishlist } from "@/types";
import {
  ERROR_CODES,
  NotFoundError,
  WishlistLimitError,
  WishlistNameError,
} from "./errors";
import { delayFor } from "./network";

type StoredWishlists = Record<User["id"], Wishlist[]>;

const nowIso = () => new Date().toISOString();

const readStoredWishlists = (): StoredWishlists => {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const parsed = JSON.parse(
      localStorage.getItem(WISHLISTS_STORAGE_KEY) ?? "{}",
    );

    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    return parsed as StoredWishlists;
  } catch {
    return {};
  }
};

const writeStoredWishlists = (wishlists: StoredWishlists) => {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(WISHLISTS_STORAGE_KEY, JSON.stringify(wishlists));
  } catch {
    console.warn("Failed to persist wishlists to localStorage");
  }
};

const readUserWishlists = (userId: User["id"]): Wishlist[] => {
  return readStoredWishlists()[userId] ?? [];
};

const writeUserWishlists = (userId: User["id"], wishlists: Wishlist[]) => {
  const stored = readStoredWishlists();
  stored[userId] = wishlists;
  writeStoredWishlists(stored);
};

const normalizeName = (name: string) => name.trim();

const assertValidName = (name: string) => {
  const normalized = normalizeName(name);

  if (!normalized || normalized.length > MAX_WISHLIST_NAME_LENGTH) {
    throw new WishlistNameError();
  }

  return normalized;
};

const findWishlistIndex = (wishlists: Wishlist[], wishlistId: Wishlist["id"]) =>
  wishlists.findIndex((wishlist) => wishlist.id === wishlistId);

export const getWishlists = async (userId: User["id"]): Promise<Wishlist[]> => {
  await delayFor("wishlist");
  return readUserWishlists(userId);
};

export const getWishlist = async (
  userId: User["id"],
  wishlistId: Wishlist["id"],
): Promise<Wishlist> => {
  await delayFor("wishlist");

  const wishlist = readUserWishlists(userId).find(
    (entry) => entry.id === wishlistId,
  );

  if (!wishlist) {
    throw new NotFoundError(ERROR_CODES.wishlistNotFound);
  }

  return wishlist;
};

export const createWishlist = async (
  userId: User["id"],
  name: string,
): Promise<Wishlist> => {
  await delayFor("wishlist");

  const normalizedName = assertValidName(name);
  const wishlists = readUserWishlists(userId);

  if (wishlists.length >= MAX_WISHLISTS) {
    throw new WishlistLimitError();
  }

  const wishlist: Wishlist = {
    id: crypto.randomUUID(),
    name: normalizedName,
    createdAt: nowIso(),
    items: [],
  };

  writeUserWishlists(userId, [...wishlists, wishlist]);

  return wishlist;
};

export const renameWishlist = async (
  userId: User["id"],
  wishlistId: Wishlist["id"],
  name: string,
): Promise<Wishlist> => {
  await delayFor("wishlist");

  const normalizedName = assertValidName(name);
  const wishlists = readUserWishlists(userId);
  const index = findWishlistIndex(wishlists, wishlistId);

  if (index === -1) {
    throw new NotFoundError(ERROR_CODES.wishlistNotFound);
  }

  const updated: Wishlist = {
    ...wishlists[index],
    name: normalizedName,
  };

  writeUserWishlists(
    userId,
    wishlists.map((wishlist, wishlistIndex) =>
      wishlistIndex === index ? updated : wishlist,
    ),
  );

  return updated;
};

export const deleteWishlist = async (
  userId: User["id"],
  wishlistId: Wishlist["id"],
) => {
  await delayFor("wishlist");

  const wishlists = readUserWishlists(userId);
  const index = findWishlistIndex(wishlists, wishlistId);

  if (index === -1) {
    throw new NotFoundError(ERROR_CODES.wishlistNotFound);
  }

  writeUserWishlists(
    userId,
    wishlists.filter((wishlist) => wishlist.id !== wishlistId),
  );
};

export const addItem = async (
  userId: User["id"],
  wishlistId: Wishlist["id"],
  productId: string,
): Promise<Wishlist> => {
  await delayFor("wishlist");

  const wishlists = readUserWishlists(userId);
  const index = findWishlistIndex(wishlists, wishlistId);

  if (index === -1) {
    throw new NotFoundError(ERROR_CODES.wishlistNotFound);
  }

  const wishlist = wishlists[index];

  if (wishlist.items.some((item) => item.productId === productId)) {
    return wishlist;
  }

  const updated: Wishlist = {
    ...wishlist,
    items: [...wishlist.items, { productId, addedAt: nowIso() }],
  };

  writeUserWishlists(
    userId,
    wishlists.map((entry, wishlistIndex) =>
      wishlistIndex === index ? updated : entry,
    ),
  );

  return updated;
};

export const removeItem = async (
  userId: User["id"],
  wishlistId: Wishlist["id"],
  productId: string,
): Promise<Wishlist> => {
  await delayFor("wishlist");

  const wishlists = readUserWishlists(userId);
  const index = findWishlistIndex(wishlists, wishlistId);

  if (index === -1) {
    throw new NotFoundError(ERROR_CODES.wishlistNotFound);
  }

  const wishlist = wishlists[index];

  if (!wishlist.items.some((item) => item.productId === productId)) {
    return wishlist;
  }

  const updated: Wishlist = {
    ...wishlist,
    items: wishlist.items.filter((item) => item.productId !== productId),
  };

  writeUserWishlists(
    userId,
    wishlists.map((entry, wishlistIndex) =>
      wishlistIndex === index ? updated : entry,
    ),
  );

  return updated;
};
