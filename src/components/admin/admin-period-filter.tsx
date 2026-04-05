import { dashboardPeriods } from "@/data/stats";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import type { DashboardPeriod } from "@/types";

const AdminPeriodFilter = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  const { period: selectedPeriod = "all" } = useSearch({
    from: "/{-$locale}/admin/",
  });
  const navigate = useNavigate({ from: "/{-$locale}/admin/" });

  const handlePeriodChange = (period: DashboardPeriod) => {
    navigate({ search: (prev) => ({ ...prev, period }) });
  };

  return (
    <div className="flex flex-wrap gap-2">
      {dashboardPeriods.map((period) => {
        const isSelected = period === selectedPeriod;

        return (
          <Button
            key={period}
            size="sm"
            variant={isSelected ? "default" : "outline"}
            onClick={() => handlePeriodChange(period)}
          >
            {t(`overview.periods.${period}`)}
          </Button>
        );
      })}
    </div>
  );
};

export default AdminPeriodFilter;
