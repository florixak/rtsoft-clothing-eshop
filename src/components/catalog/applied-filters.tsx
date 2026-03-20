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

const AppliedFilters = () => {
  const { t } = useTranslation("catalog");
  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-row items-center justify-between w-full">
        <div className="flex flex-row items-center gap-2">
          <Badge className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3">
            <X size={12} /> Red
          </Badge>
          <Badge className="flex flex-row items-center gap-1 text-sm bg-primary text-primary-foreground rounded-full px-2 py-3">
            <X size={12} /> Blue
          </Badge>
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
