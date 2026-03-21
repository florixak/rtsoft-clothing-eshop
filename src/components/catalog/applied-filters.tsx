import { Badge } from "../ui/badge";
import { ListFilter, X } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import CatalogFilter from "./catalog-filter";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { getAppliedFiltersLabel } from "@/lib/product-utils";

const AppliedFilters = () => {
  const { t, i18n } = useTranslation("catalog");
  const navigate = useNavigate({ from: "/{-$locale}/" });
  const search = useSearch({ from: "/{-$locale}/" });

  const language = i18n.resolvedLanguage == "cs" ? "cs" : "en";

  const appliedFilters = getAppliedFiltersLabel(search, language);

  const clearFilter = (key: string) => {
    navigate({
      search: (prev) => ({ ...prev, [key]: undefined, page: 1 }),
      replace: true,
    });
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          {appliedFilters.map((label) => (
            <Badge
              key={label.key}
              className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3"
            >
              <button
                type="button"
                onClick={() => clearFilter(label.key)}
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
        <Drawer direction="left">
          <DrawerTrigger asChild>
            <Button variant="outline" size="sm">
              <ListFilter size={16} />
              {t("filters.title")}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>{t("filters.title")}</DrawerTitle>
              <DrawerDescription>Refine your product search</DrawerDescription>
            </DrawerHeader>
            <DrawerContent>
              <CatalogFilter />
            </DrawerContent>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
};

export default AppliedFilters;
