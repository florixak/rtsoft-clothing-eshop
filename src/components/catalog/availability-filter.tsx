import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useTranslation } from "react-i18next";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

type AvailabilityProps = {
  availability?: "inStock" | "outOfStock";
  patchSearch: (
    updates: Partial<{ availability: "inStock" | "outOfStock" | undefined }>,
  ) => void;
};

const AvailabilityFilter = ({
  availability,
  patchSearch,
}: AvailabilityProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);
  return (
    <div className="flex flex-col gap-2">
      <Label className="uppercase text-base text-muted-foreground">
        {t("filters.availability.title")}
      </Label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-4">
          <Checkbox
            id="in-stock"
            className="size-4 accent-accent-foreground"
            checked={availability === "inStock"}
            onCheckedChange={(checked) =>
              patchSearch({
                availability: checked ? "inStock" : undefined,
              })
            }
          />
          <Label
            htmlFor="in-stock"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{t("filters.availability.inStock")}</span>
          </Label>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            id="pre-order"
            className="size-4 accent-accent-foreground"
            checked={availability === "outOfStock"}
            onCheckedChange={(checked) =>
              patchSearch({
                availability: checked ? "outOfStock" : undefined,
              })
            }
          />
          <Label
            htmlFor="pre-order"
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{t("filters.availability.outOfStock")}</span>
          </Label>
        </div>
      </div>
    </div>
  );
};

export default AvailabilityFilter;
