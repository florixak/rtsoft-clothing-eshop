import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import type { Order } from "@/types";

type OrderDetailsHeaderProps = {
  orderId: Order["id"];
  ordersListPath: "/{-$locale}/admin/orders" | "/{-$locale}/account/orders";
};

const OrderDetailsHeader = ({
  orderId,
  ordersListPath,
}: OrderDetailsHeaderProps) => {
  const { t } = useTranslation([TRANSLATION_NAMESPACES.orderDetails]);
  return (
    <div className="flex flex-col gap-4">
      <Breadcrumb className="uppercase text-muted-foreground">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              render={
                <Link to={ordersListPath} className="text-xs">
                  {t("orderDetails:breadcrumbs.orders")}
                </Link>
              }
            />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage className="text-xs">#{orderId}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h2 className="text-2xl font-bold">
        {t("orderDetails:title", { id: orderId })}
      </h2>
    </div>
  );
};

export default OrderDetailsHeader;
