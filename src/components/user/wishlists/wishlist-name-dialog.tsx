import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { MAX_WISHLIST_NAME_LENGTH } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { wishlistNameSchema } from "@/lib/schema";
import { useTranslation } from "react-i18next";

type WishlistNameDialogProps = {
  open: boolean;
  mode: "create" | "rename";
  initialName?: string;
  isPending?: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (name: string) => Promise<void>;
};

type WishlistNameFormProps = Omit<WishlistNameDialogProps, "open">;

const WishlistNameForm = ({
  mode,
  initialName = "",
  isPending = false,
  onOpenChange,
  onSubmit,
}: WishlistNameFormProps) => {
  const { t } = useTranslation([
    TRANSLATION_NAMESPACES.account,
    TRANSLATION_NAMESPACES.common,
  ]);
  const [name, setName] = useState(initialName);
  const [error, setError] = useState<string>();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const result = wishlistNameSchema.safeParse({ name });

    if (!result.success) {
      const issue = result.error.issues[0];
      setError(issue?.message);
      return;
    }

    await onSubmit(result.data.name);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <DialogHeader>
        <DialogTitle>
          {mode === "create"
            ? t("wishlists.nameDialog.createTitle")
            : t("wishlists.nameDialog.renameTitle")}
        </DialogTitle>
        <DialogDescription>
          {t("wishlists.nameDialog.description")}
        </DialogDescription>
      </DialogHeader>

      <Field className="py-4">
        <FieldLabel htmlFor="wishlist-name">
          {t("wishlists.nameDialog.nameLabel")}
        </FieldLabel>
        <Input
          id="wishlist-name"
          value={name}
          maxLength={MAX_WISHLIST_NAME_LENGTH}
          placeholder={t("wishlists.nameDialog.namePlaceholder")}
          aria-invalid={Boolean(error)}
          onChange={(event) => {
            setName(event.target.value);
            if (error) {
              setError(undefined);
            }
          }}
        />
        {error && (
          <em className="text-destructive text-sm" role="alert">
            {t(`common:${error}`, { max: MAX_WISHLIST_NAME_LENGTH })}
          </em>
        )}
      </Field>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={() => onOpenChange(false)}
        >
          {t("common:buttons.cancel")}
        </Button>
        <Button type="submit" disabled={isPending}>
          {mode === "create"
            ? t("wishlists.nameDialog.submitCreate")
            : t("wishlists.nameDialog.submitRename")}
        </Button>
      </DialogFooter>
    </form>
  );
};

const WishlistNameDialog = ({
  open,
  initialName = "",
  ...formProps
}: WishlistNameDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={formProps.onOpenChange}>
      <DialogContent showCloseButton={false}>
        {open ? (
          <WishlistNameForm initialName={initialName} {...formProps} />
        ) : null}
      </DialogContent>
    </Dialog>
  );
};

export default WishlistNameDialog;
