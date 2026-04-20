import { Star } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

type RatingFilterProps = {
  rating?: number;
  patchSearch: (updates: Partial<{ rating: number | undefined }>) => void;
};

const RatingFilter = ({ rating, patchSearch }: RatingFilterProps) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.catalog);

  return (
    <div className="flex flex-col gap-2">
      <Label
        htmlFor="rating"
        className="uppercase text-base text-muted-foreground"
      >
        {t("filters.rating")}
      </Label>
      <RadioGroup
        id="rating"
        value={rating ? String(rating) : undefined}
        onValueChange={(value) => {
          const next = Number(value);
          patchSearch({ rating: Number.isFinite(next) ? next : undefined });
        }}
        className="flex flex-row items-center justify-start"
      >
        <RadioGroupItem
          value="5"
          id="rating-5"
          className="peer sr-only absolute"
        />
        <Button
          variant="outline"
          className="w-fit"
          render={
            <Label
              htmlFor="rating-5"
              className="flex items-center gap-2 cursor-pointer"
            >
              5<Star size={16} className="text-yellow-500" />
            </Label>
          }
        />
        <RadioGroupItem
          value="4"
          id="rating-4"
          className="peer sr-only absolute"
        />
        <Button
          variant="outline"
          className="w-fit"
          render={
            <Label
              htmlFor="rating-4"
              className="flex items-center gap-2 cursor-pointer"
            >
              4+
              <Star size={16} className="text-yellow-500" />
            </Label>
          }
        />
        <RadioGroupItem
          value="3"
          id="rating-3"
          className="peer sr-only absolute"
        />
        <Button
          variant="outline"
          className="w-fit"
          render={
            <Label
              htmlFor="rating-3"
              className="flex items-center gap-2 cursor-pointer"
            >
              3+
              <Star size={16} className="text-yellow-500" />
            </Label>
          }
        />
      </RadioGroup>
    </div>
  );
};

export default RatingFilter;
