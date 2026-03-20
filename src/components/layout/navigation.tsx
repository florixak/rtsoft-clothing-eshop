import { clamp, cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { Product } from "@/types";
import { useTranslation } from "react-i18next";

type NavigationProps = {
  page: number;
  pageSize: number;
  pagedItems: Product[];
  totalItemsCount: number;
  onPageChange: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  isLoading?: boolean;
  disabled?: boolean;
  pageSizeOptions?: number[];
  showSummary?: boolean;
  showPageSizeSelector?: boolean;
  className?: string;
};

const Navigation = ({
  page,
  pageSize,
  pagedItems,
  totalItemsCount,
  onPageChange,
  onPageSizeChange,
  disabled = false,
  isLoading = false,
  pageSizeOptions = [8, 12, 24, 48],
  showSummary = true,
  showPageSizeSelector = true,
  className,
}: NavigationProps) => {
  const { t } = useTranslation("catalog");
  const isDisabled = disabled || isLoading;
  const normalizedPageSizeOptions = Array.from(
    new Set([...pageSizeOptions, pageSize]),
  ).sort((a, b) => a - b);
  const totalPages = Math.max(1, Math.ceil(totalItemsCount / pageSize));
  const safePage = clamp(page, 1, totalPages);
  const from = pagedItems.length === 0 ? 0 : (safePage - 1) * pageSize + 1;
  const to = Math.min(pagedItems.length, safePage * pageSize);

  const canGoBack = safePage > 1;
  const canGoForward = safePage < totalPages;

  const buttonSize = "icon";

  return (
    <nav
      aria-label={t("pagination.title")}
      className={cn(
        "mt-8 flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-3">
        {showPageSizeSelector && onPageSizeChange ? (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {t("pagination.perPage", { count: pageSize })}
            </span>
            <Select
              value={String(pageSize)}
              onValueChange={(value) => {
                if (!value) return;
                const nextPageSize = Number(value);
                if (!Number.isFinite(nextPageSize)) return;
                onPageSizeChange(nextPageSize);
              }}
            >
              <SelectTrigger size="sm" className="w-20">
                <SelectValue placeholder={String(pageSize)} />
              </SelectTrigger>
              <SelectContent align="start">
                {normalizedPageSizeOptions.map((option) => (
                  <SelectItem key={option} value={String(option)}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ) : null}
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(1)}
          disabled={!canGoBack || isDisabled}
          aria-label={t("pagination.first")}
        >
          <ChevronsLeft size={16} />
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(safePage - 1)}
          disabled={!canGoBack || isDisabled}
          aria-label={t("pagination.previous")}
        >
          <ChevronLeft size={16} />
        </Button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((token) => {
          return (
            <Button
              key={token}
              variant={token === safePage ? "default" : "outline"}
              size={buttonSize}
              onClick={() => onPageChange(token)}
              aria-current={token === safePage ? "page" : undefined}
              aria-label={`${t("pagination.page")} ${token}`}
              className="min-w-8"
            >
              {token}
            </Button>
          );
        })}

        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(safePage + 1)}
          disabled={!canGoForward || isDisabled}
          aria-label={t("pagination.next")}
        >
          <ChevronRight size={16} />
        </Button>
        <Button
          variant="outline"
          size={buttonSize}
          onClick={() => onPageChange(totalPages)}
          disabled={!canGoForward || isDisabled}
          aria-label={t("pagination.last")}
        >
          <ChevronsRight size={16} />
        </Button>
      </div>

      {showSummary ? (
        <p className="text-sm text-muted-foreground">
          {t("pagination.showing", { from, to, total: totalItemsCount })}
        </p>
      ) : null}
    </nav>
  );
};

export type { NavigationProps };
export default Navigation;
