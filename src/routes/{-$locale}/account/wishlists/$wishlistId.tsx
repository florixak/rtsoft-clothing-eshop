import WishlistDetail from "@/components/user/wishlists/wishlist-detail";
import WishlistNotFound from "@/components/user/wishlists/wishlist-not-found";
import RouteError from "@/components/layout/route-error";
import { WishlistDetailSkeleton } from "@/components/skeletons";
import { createWishlistQueryOptions } from "@/hooks/query-options";
import { getCurrentUserId } from "@/lib/auth";
import { ERROR_CODES, isErrorCode } from "@/lib/errors";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/{-$locale}/account/wishlists/$wishlistId")({
  component: RouteComponent,
  pendingComponent: WishlistDetailSkeleton,
  errorComponent: RouteError,
  notFoundComponent: () => <WishlistNotFound />,
  loader: async ({ params, context }) => {
    const userId = getCurrentUserId();
    if (!userId) {
      throw notFound();
    }

    try {
      await context.queryClient.ensureQueryData(
        createWishlistQueryOptions(userId, params.wishlistId),
      );
    } catch (error) {
      if (isErrorCode(error, ERROR_CODES.wishlistNotFound)) {
        throw notFound();
      }

      throw error;
    }
  },
});

function RouteComponent() {
  const { wishlistId } = Route.useParams();

  return (
    <Suspense fallback={<WishlistDetailSkeleton />}>
      <WishlistDetail wishlistId={wishlistId} />
    </Suspense>
  );
}
