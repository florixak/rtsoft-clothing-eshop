import type { LucideIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card, CardContent, CardHeader } from "../ui/card";

type MetricCardProps = {
  title: string;
  value: string | number;
  evolution_percentage: number;
  icon: LucideIcon;
};

const MetricCard = ({
  title,
  value,
  evolution_percentage,
  icon,
}: MetricCardProps) => {
  const Icon = icon;
  return (
    <Card className="w-full">
      <CardHeader className="flex items-center justify-between">
        <div className="bg-muted p-2 rounded-full">
          <Icon size={24} className="text-primary" />
        </div>
        <Badge
          variant="outline"
          className={
            evolution_percentage >= 0 ? "text-green-500" : "text-red-500"
          }
        >
          {evolution_percentage >= 0 ? (
            <span>↑ {evolution_percentage.toFixed(2)}%</span>
          ) : (
            <span>↓ {Math.abs(evolution_percentage).toFixed(2)}%</span>
          )}
        </Badge>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-md font-medium text-muted-foreground">
              {title}
            </h3>
            <p className="text-xl font-semibold">
              {typeof value === "number" ? value.toFixed(2) : value}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
