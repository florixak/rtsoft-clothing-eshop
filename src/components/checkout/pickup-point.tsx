import { cn } from "@/lib/utils";
import type { PickupPoint as PickupPointType } from "@/types";
import { MapPin } from "lucide-react";
import { Button } from "../ui/button";

type PickupPointProps = {
  pickupPoint: PickupPointType;
  isSelected: boolean;
  onSelect: (pickupPoint: PickupPointType) => void;
};

const PickupPoint = ({
  pickupPoint,
  isSelected,
  onSelect,
}: PickupPointProps) => {
  return (
    <Button
      key={pickupPoint.id}
      type="button"
      onClick={() => onSelect(pickupPoint)}
      variant="outline"
      className={cn(
        "w-full rounded-xl border p-4 text-left transition-colors hover:border-primary hover:bg-accent/40 h-fit justify-start",
        isSelected && "border-primary bg-primary/5",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-full bg-muted p-2 text-muted-foreground">
          <MapPin className="size-4" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium text-foreground">{pickupPoint.name}</p>
              <p className="text-sm text-muted-foreground">
                {pickupPoint.address}, {pickupPoint.city}
              </p>
            </div>
            {pickupPoint.distance ? (
              <span className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                {pickupPoint.distance}
              </span>
            ) : null}
          </div>

          {pickupPoint.openingHours ? (
            <p className="text-xs text-muted-foreground">
              Open: {pickupPoint.openingHours}
            </p>
          ) : null}

          {isSelected ? (
            <p className="text-sm font-medium text-primary">
              Selected pickup point
            </p>
          ) : null}
        </div>
      </div>
    </Button>
  );
};

export default PickupPoint;
