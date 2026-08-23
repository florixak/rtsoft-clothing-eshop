import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

type DialogCopyKey =
  | "wishlists.deleteDialog.title"
  | "wishlists.deleteDialog.description"
  | "wishlists.deleteDialog.action"
  | "wishlists.removeItemDialog.title"
  | "wishlists.removeItemDialog.description"
  | "wishlists.removeItemDialog.action";

type WishlistDeleteDialogProps = {
  open: boolean;
  name: string;
  isPending?: boolean;
  titleKey?: DialogCopyKey;
  descriptionKey?: DialogCopyKey;
  actionKey?: DialogCopyKey;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
};

const WishlistDeleteDialog = ({
  open,
  name,
  isPending = false,
  titleKey = "wishlists.deleteDialog.title",
  descriptionKey = "wishlists.deleteDialog.description",
  actionKey = "wishlists.deleteDialog.action",
  onOpenChange,
  onConfirm,
}: WishlistDeleteDialogProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>{t(titleKey)}</DialogTitle>
          <DialogDescription>{t(descriptionKey, { name })}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common:buttons.cancel")}
          </Button>
          <Button variant="destructive" disabled={isPending} onClick={onConfirm}>
            {t(actionKey)}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistDeleteDialog;
