import type { PickupPoint as PickupPointType } from "@/types";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";

import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import PickupPoint from "./pickup-point";

type PickupPointListProps = {
  selectedPickupPointId?: PickupPointType["id"];
  filteredPickupPoints: PickupPointType[];
  onSelectPickupPoint: (pickupPoint: PickupPointType) => void;
};

const PickupPointList = ({
  selectedPickupPointId,
  filteredPickupPoints,
  onSelectPickupPoint,
}: PickupPointListProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.checkout);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {t("pickupDrawer.list.locationsFound", {
            count: filteredPickupPoints.length,
          })}
        </span>
        {selectedPickupPointId ? (
          <span className="inline-flex items-center gap-1 text-primary">
            <Check className="size-4" aria-hidden="true" />
            {t("pickupDrawer.list.selected")}
          </span>
        ) : null}
      </div>

      <div className="space-y-2">
        {filteredPickupPoints.length ? (
          filteredPickupPoints.map((pickupPoint) => {
            const isSelected = pickupPoint.id === selectedPickupPointId;

            return (
              <PickupPoint
                key={pickupPoint.id}
                pickupPoint={pickupPoint}
                isSelected={isSelected}
                onSelect={onSelectPickupPoint}
              />
            );
          })
        ) : (
          <div className="rounded-xl border border-dashed p-6 text-center text-sm text-muted-foreground">
            {t("pickupDrawer.list.noResults")}
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupPointList;
