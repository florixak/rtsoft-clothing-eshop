import { getAppliedFiltersLabel } from "@/lib/product-utils";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { ListFilter, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "../ui/drawer";
import CatalogFilter from "./catalog-filter";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

const AppliedFilters = () => {
  const { t, i18n } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  const navigate = useNavigate({ from: "/{-$locale}/" });
  const search = useSearch({ from: "/{-$locale}/" });

  const language = i18n.resolvedLanguage == "cs" ? "cs" : "en";

  const appliedFilters = getAppliedFiltersLabel(search, language);

  const clearFilter = (key: string, removeValue?: string) => {
    navigate({
      search: (prev) => {
        if (!removeValue || (key !== "size" && key !== "color")) {
          return { ...prev, [key]: undefined, page: 1 };
        }

        const currentValues = key === "size" ? prev.size : prev.color;
        const nextValues = currentValues?.filter(
          (value) => value !== removeValue,
        );

        return {
          ...prev,
          [key]: nextValues && nextValues.length > 0 ? nextValues : undefined,
          page: 1,
        };
      },
      replace: true,
    });
  };

  return (
    <div className="flex flex-row items-start justify-between w-full">
      <div className="flex flex-wrap items-center gap-2">
        {appliedFilters.map((label) => (
          <Badge
            key={`${label.key}-${label.removeValue ?? "all"}`}
            className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3"
          >
            <button
              type="button"
              onClick={() => clearFilter(label.key, label.removeValue)}
              aria-label={t("filters.activeTags.remove", {
                label: label.label,
              })}
              className="inline-flex items-center gap-1"
            >
              <X size={12} /> {label.label}
            </button>
          </Badge>
        ))}
      </div>
      <Drawer direction="left" handleOnly={true}>
        <DrawerTrigger asChild>
          <Button variant="outline" size="sm">
            <ListFilter size={16} />
            {t("filters.title")}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="absolute top-4 right-4">
            <DrawerClose asChild>
              <Button variant="ghost" size="sm" aria-label={t("filters.close")}>
                <X size={16} />
              </Button>
            </DrawerClose>
          </div>
          <CatalogFilter />
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default AppliedFilters;
