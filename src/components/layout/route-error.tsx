import { Link, useRouter } from "@tanstack/react-router";
import type { ErrorComponentProps } from "@tanstack/react-router";
import {
  AlertTriangle,
  Home,
  RotateCcw,
  ShieldAlert,
  TriangleAlert,
} from "lucide-react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";

import { AppError } from "@/lib/errors";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

type RouteErrorProps = ErrorComponentProps & {
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
    icon?: ReactNode;
  };
  className?: string;
};

type RouteErrorCopy = {
  icon: ReactNode;
  title: ReactNode;
  description: ReactNode;
};

const getHttpStatus = (error: unknown) => {
  if (error instanceof Response) {
    return error.status;
  }

  if (typeof error === "object" && error !== null) {
    const candidate = error as { status?: number; statusCode?: number };
    return candidate.status ?? candidate.statusCode;
  }

  return undefined;
};

const getRouteErrorCopy = (
  error: unknown,
  t: ReturnType<typeof useTranslation>["t"],
): RouteErrorCopy => {
  const status = getHttpStatus(error);

  if (status === 401) {
    return {
      icon: <ShieldAlert size={64} className="text-primary" />,
      title: t("errors.unauthorized"),
      description: t("errors.unauthorized"),
    };
  }

  if (status === 403) {
    return {
      icon: <ShieldAlert size={64} className="text-primary" />,
      title: t("errors.forbidden"),
      description: t("errors.forbidden"),
    };
  }

  if (status === 404) {
    return {
      icon: <TriangleAlert size={64} className="text-primary" />,
      title: t("errors.notFound"),
      description: t("errors.notFound"),
    };
  }

  if (status && status >= 500) {
    return {
      icon: <AlertTriangle size={64} className="text-primary" />,
      title: t("errors.server"),
      description: t("errors.server"),
    };
  }

  if (error instanceof AppError) {
    return {
      icon: <AlertTriangle size={64} className="text-primary" />,
      title: t("errors.generic"),
      description: error.message,
    };
  }

  if (error instanceof Error && error.message.trim()) {
    return {
      icon: <AlertTriangle size={64} className="text-primary" />,
      title: t("errors.generic"),
      description: error.message,
    };
  }

  return {
    icon: <AlertTriangle size={64} className="text-primary" />,
    title: t("errors.generic"),
    description: t("errors.generic"),
  };
};

const RouteError = ({
  error,
  reset,
  title,
  description,
  primary,
  secondary,
  className,
}: RouteErrorProps) => {
  const { t } = useTranslation();
  const router = useRouter();

  const copy = getRouteErrorCopy(error, t);

  const primaryLabel = primary?.label ?? t("buttons.goHome");
  const secondaryLabel = secondary?.label ?? t("buttons.tryAgain");

  return (
    <section
      className={cn(
        "container mx-auto mt-20 flex min-h-80 flex-col items-center justify-center text-center",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-center">{copy.icon}</div>
      <h2 className="mb-4 flex flex-col items-center gap-2 text-4xl font-heading font-semibold">
        <span className="text-4xl font-heading font-semibold">
          {title ?? copy.title}
        </span>
      </h2>
      <p className="text-muted-foreground mb-6">
        {description ?? copy.description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          nativeButton={false}
          onClick={primary?.onClick}
          render={
            <Link to={primary?.to ?? "/{-$locale}"}>
              {primary?.icon ?? <Home size={18} />}
              {primaryLabel}
            </Link>
          }
        />

        <Button
          variant="outline"
          onClick={secondary?.onClick ?? reset ?? (() => router.invalidate())}
        >
          {secondary?.icon ?? <RotateCcw size={18} />}
          {secondaryLabel}
        </Button>
      </div>
    </section>
  );
};

export type { RouteErrorProps };
export default RouteError;
