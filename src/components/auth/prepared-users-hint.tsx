import { Button } from "@/components/ui/button";
import { preparedUsers } from "@/data";
import type { MockUser } from "@/data/users";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";

export const PREPARED_USERS_HINT_ID = "login-prepared-users";

type PreparedUsersHintProps = {
  onFill: (user: MockUser) => void;
};

export function PreparedUsersHint({ onFill }: PreparedUsersHintProps) {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.auth);

  return (
    <div
      id={PREPARED_USERS_HINT_ID}
      tabIndex={-1}
      role="region"
      aria-labelledby="login-prepared-users-heading"
      className="scroll-mt-24 rounded-lg border bg-muted/40 p-3 text-left"
    >
      <p
        id="login-prepared-users-heading"
        className="mb-2 text-xs font-medium text-muted-foreground"
      >
        {t("login.hints.preparedUsers")}
      </p>
      <div className="flex flex-col gap-2">
        {preparedUsers.map((user) => (
          <Button
            key={user.id}
            type="button"
            variant="outline"
            className="h-auto w-full flex-col items-start gap-0.5 whitespace-normal py-2 text-left font-medium"
            onClick={() => onFill(user)}
          >
            <span>
              {user.firstName} {user.lastName}
              <span className="font-normal text-muted-foreground">
                {" — "}
                {user.role === "admin"
                  ? t("login.hints.purposes.admin")
                  : t("login.hints.purposes.shopper")}
              </span>
            </span>
            <span className="text-xs font-normal text-muted-foreground">
              {user.email} / {user.password}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}
