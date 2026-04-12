import type { HeaderContext } from "@tanstack/react-table";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";

const createSortableHeader = <T,>(label: string) => {
  return ({ column }: HeaderContext<T, unknown>) => (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="-ml-2"
    >
      {label}
      <ArrowUpDown />
    </Button>
  );
};

export default createSortableHeader;
