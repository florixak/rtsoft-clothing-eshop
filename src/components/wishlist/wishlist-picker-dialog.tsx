import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MAX_WISHLISTS } from "@/constants";
import { listContainsProduct } from "@/hooks/use-save-to-wishlist";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Product, Wishlist } from "@/types";
import { Check, Plus } from "lucide-react";
import { useTranslation } from "react-i18next";

type WishlistPickerDialogProps = {
  open: boolean;
  productId: Product["id"];
  wishlists: Wishlist[];
  isPending?: boolean;
  onOpenChange: (open: boolean) => void;
  onSelect: (wishlist: Wishlist) => void;
  onCreate: () => void;
};

const WishlistPickerDialog = ({
  open,
  productId,
  wishlists,
  isPending = false,
  onOpenChange,
  onSelect,
  onCreate,
}: WishlistPickerDialogProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);
  const isAtLimit = wishlists.length >= MAX_WISHLISTS;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t("wishlists.picker.title")}</DialogTitle>
          <DialogDescription>
            {t("wishlists.picker.description")}
          </DialogDescription>
        </DialogHeader>

        <ul className="flex flex-col gap-2 py-2">
          {wishlists.map((wishlist) => {
            const containsProduct = listContainsProduct(wishlist, productId);

            return (
              <li key={wishlist.id}>
                <Button
                  type="button"
                  variant={containsProduct ? "secondary" : "outline"}
                  className="w-full justify-between"
                  disabled={isPending}
                  onClick={() => onSelect(wishlist)}
                >
                  <span>{wishlist.name}</span>
                  {containsProduct ? <Check /> : null}
                </Button>
              </li>
            );
          })}
        </ul>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            {t("common:buttons.cancel")}
          </Button>
          <Button
            type="button"
            disabled={isAtLimit || isPending}
            onClick={onCreate}
          >
            <Plus />
            {t("wishlists.create")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistPickerDialog;
