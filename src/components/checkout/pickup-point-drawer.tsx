import { Search, X } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { pickupPoints } from "@/data/shipping";
import useDebounce from "@/hooks/use-debounce";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { PickupPoint as PickupPointType } from "@/types";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { Input } from "../ui/input";
import PickupPointList from "./pickup-point-list";
import useMediaQuery from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";

type PickupPointDrawerProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPickupPointId?: string;
  onSelectPickupPoint: (pickupPoint: PickupPointType) => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

const PickupPointDrawer = ({
  open,
  onOpenChange,
  selectedPickupPointId,
  onSelectPickupPoint,
  onConfirm,
  isLoading = false,
}: PickupPointDrawerProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [search, setSearch] = useState("");

  const { debouncedValue: debouncedSearch } = useDebounce({
    value: search,
    delay: 300,
  });

  const filteredPickupPoints = () => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return pickupPoints;
    }

    return pickupPoints.filter((pickupPoint) => {
      const searchableText = [
        pickupPoint.name,
        pickupPoint.address,
        pickupPoint.city,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  };

  const selectedPickupPoint = pickupPoints.find(
    (pickupPoint) => pickupPoint.id === selectedPickupPointId,
  );

  const handleSelect = (pickupPoint: PickupPointType) => {
    onSelectPickupPoint(pickupPoint);
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!nextOpen) {
      setSearch("");
    }

    onOpenChange(nextOpen);
  };

  const handleConfirm = () => {
    onConfirm();
    handleOpenChange(false);
  };

  const filteredPickupPointsList = filteredPickupPoints();

  return (
    <Drawer
      direction={isMobile ? "bottom" : "right"}
      open={open}
      onOpenChange={handleOpenChange}
    >
      <DrawerContent
        className={cn("gap-0", isMobile ? "h-[80dvh]" : "w-[80dvw]")}
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <DrawerHeader className="border-b px-4 pb-4 pt-4 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <DrawerTitle>{t("pickupDrawer.title")}</DrawerTitle>
              <DrawerDescription>
                {t("pickupDrawer.description")}
              </DrawerDescription>
            </div>
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="shrink-0">
                <X aria-hidden="true" />
                <span className="sr-only">{t("pickupDrawer.close")}</span>
              </Button>
            </DrawerClose>
          </div>

          <div className="relative mt-4">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder={t("pickupDrawer.searchPlaceholder")}
              className="pl-9"
            />
          </div>
        </DrawerHeader>

        <PickupPointList
          selectedPickupPointId={selectedPickupPointId}
          filteredPickupPoints={filteredPickupPointsList}
          onSelectPickupPoint={handleSelect}
        />

        <DrawerFooter className="border-t bg-background">
          {selectedPickupPoint ? (
            <div className="rounded-xl bg-muted p-3 text-sm">
              <p className="font-medium">{t("pickupDrawer.selectedTitle")}</p>
              <p className="text-muted-foreground">
                {selectedPickupPoint.name}, {selectedPickupPoint.address},{" "}
                {selectedPickupPoint.city}
              </p>
            </div>
          ) : (
            <div className="rounded-xl bg-muted p-3 text-sm text-muted-foreground">
              {t("pickupDrawer.emptySelection")}
            </div>
          )}

          <div className="flex gap-2">
            <DrawerClose asChild>
              <Button variant="outline" className="flex-1">
                {t("pickupDrawer.cancel")}
              </Button>
            </DrawerClose>
            <Button
              className="flex-1"
              onClick={handleConfirm}
              disabled={!selectedPickupPoint || isLoading}
            >
              {isLoading
                ? t("pickupDrawer.saving")
                : t("pickupDrawer.useSelected")}
            </Button>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default PickupPointDrawer;
