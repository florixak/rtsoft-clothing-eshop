import { Link, useRouter } from "@tanstack/react-router";
import { Home } from "lucide-react";
import type { ReactNode } from "react";

import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Button } from "../ui/button";

export interface NotFoundProps {
  title?: ReactNode;
  description?: ReactNode;
  primary?: {
    to?: string;
    onClick?: () => void;
    label?: ReactNode;
    icon?: ReactNode;
  };
  secondary?: {
    onClick?: () => void;
    label?: ReactNode;
  };
  className?: string;
}

const NotFound = ({
  title,
  description,
  primary,
  secondary,
  className,
}: NotFoundProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const router = useRouter();

  const primaryLabel = primary?.label ?? t("buttons.goHome");
  const secondaryLabel = secondary?.label ?? t("buttons.tryAgain");

  return (
    <section
      className={`container mx-auto text-center mt-20 ${className ?? ""}`}
    >
      <h2 className="text-4xl font-heading font-semibold mb-4 flex items-center flex-col gap-2">
        <span className="text-6xl font-bold text-primary">404</span>
        {title ?? t("meta.notFound.title")}
      </h2>
      <p className="text-muted-foreground mb-6">
        {description ?? t("meta.notFound.description")}
      </p>

      <div className="flex gap-4 justify-center items-center">
        <Button
          nativeButton={false}
          render={
            <Link to={primary?.to ?? "/{-$locale}"}>
              {primary?.icon ?? <Home size={18} />}
              {primaryLabel}
            </Link>
          }
          onClick={primary?.onClick}
        />

        <Button
          variant="outline"
          onClick={secondary?.onClick ?? (() => router.invalidate())}
        >
          {secondaryLabel}
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
