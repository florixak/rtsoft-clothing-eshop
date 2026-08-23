import UserWishlists from "@/components/user/wishlists/user-wishlists";
import RouteError from "@/components/layout/route-error";
import { WishlistListSkeleton } from "@/components/skeletons";
import { createWishlistsQueryOptions } from "@/hooks/query-options";
import { getCurrentUserId } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/{-$locale}/account/wishlists/")({
  component: RouteComponent,
  pendingComponent: WishlistListSkeleton,
  errorComponent: RouteError,
  loader: async ({ context }) => {
    const userId = getCurrentUserId();
    if (!userId) {
      return;
    }

    await context.queryClient.ensureQueryData(
      createWishlistsQueryOptions(userId),
    );
  },
});

function RouteComponent() {
  return (
    <Suspense fallback={<WishlistListSkeleton />}>
      <UserWishlists />
    </Suspense>
  );
}
