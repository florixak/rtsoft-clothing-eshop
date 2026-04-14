import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import clsx from "clsx";
import type { LucideIcon } from "lucide-react";

type OrderDetailCardProps = {
  icon: LucideIcon;
  title: string;
  cardTitle?: string;
  cardDescription?: React.ReactNode;
  cardContent?: React.ReactNode;
  cardFooter?: React.ReactNode;
  editLabel?: string;
  onEdit?: () => void;
  className?: string;
};

const OrderDetailCard = ({
  icon,
  title,
  cardTitle,
  cardDescription,
  cardContent,
  cardFooter,
  editLabel,
  onEdit,
  className,
}: OrderDetailCardProps) => {
  const Icon = icon;
  return (
    <Card className={clsx("flex flex-col gap-6 w-full", className)}>
      <CardHeader className="relative">
        {onEdit && editLabel && (
          <Button
            variant="link"
            className="absolute top-0 right-4"
            type="button"
            onClick={onEdit}
            aria-label={`${editLabel} ${title}`}
          >
            {editLabel}
          </Button>
        )}
        <h4 className="text-lg font-medium flex items-center">
          <Icon className="inline-block mr-2 text-muted-foreground" size={16} />
          {title}
        </h4>
      </CardHeader>
      <CardContent className="flex-1">
        {cardTitle == null ? null : <CardTitle>{cardTitle}</CardTitle>}
        {cardDescription == null ? null : (
          <CardDescription className="mt-2">{cardDescription}</CardDescription>
        )}
        {cardContent == null ? null : <>{cardContent}</>}
      </CardContent>
      {cardFooter == null ? null : <CardFooter>{cardFooter}</CardFooter>}
    </Card>
  );
};
export default OrderDetailCard;
