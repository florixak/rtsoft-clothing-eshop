import WishlistNameDialog from "@/components/user/wishlists/wishlist-name-dialog";
import WishlistPickerDialog from "@/components/wishlist/wishlist-picker-dialog";
import { Button } from "@/components/ui/button";
import useSaveToWishlist from "@/hooks/use-save-to-wishlist";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

type SaveToWishlistButtonProps = {
  productId: Product["id"];
  variant?: "actions" | "overlay";
};

const SaveToWishlistButton = ({
  productId,
  variant = "actions",
}: SaveToWishlistButtonProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.account);
  const {
    isSaved,
    wishlists,
    pickerOpen,
    createOpen,
    isPending,
    setPickerOpen,
    setCreateOpen,
    onHeartClick,
    toggleOnList,
    createAndSave,
  } = useSaveToWishlist(productId);

  return (
    <>
      <Button
        type="button"
        variant={variant === "overlay" ? "secondary" : "outline"}
        size="icon"
        disabled={isPending}
        aria-label={
          isSaved ? t("wishlists.aria.saved") : t("wishlists.aria.save")
        }
        aria-pressed={isSaved}
        className={cn(
          variant === "overlay" &&
            "absolute top-2 right-2 z-10 bg-background/90 hover:bg-background",
        )}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          onHeartClick();
        }}
      >
        <Heart className={isSaved ? "fill-current" : undefined} />
      </Button>

      <WishlistPickerDialog
        open={pickerOpen}
        productId={productId}
        wishlists={wishlists}
        isPending={isPending}
        onOpenChange={setPickerOpen}
        onSelect={toggleOnList}
        onCreate={() => setCreateOpen(true)}
      />
      <WishlistNameDialog
        open={createOpen}
        mode="create"
        isPending={isPending}
        onOpenChange={setCreateOpen}
        onSubmit={createAndSave}
      />
    </>
  );
};

export default SaveToWishlistButton;
