import type { PickupPoint as PickupPointType } from "@/types";
import { Check } from "lucide-react";
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
  return (
    <div className="flex-1 overflow-y-auto px-4 py-4">
      <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
        <span>{filteredPickupPoints.length} locations found</span>
        {selectedPickupPointId ? (
          <span className="inline-flex items-center gap-1 text-primary">
            <Check className="size-4" aria-hidden="true" />
            Selected
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
            No pickup points match your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default PickupPointList;
