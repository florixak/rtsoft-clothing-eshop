import { createCheckoutOrderQueryOptions } from "@/hooks/query-options";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Link, useSearch } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SuccessOrderSummary } from "./order-summary";
import { Button } from "../ui/button";

const CheckoutSuccess = () => {
  const { orderId } = useSearch({ from: "/{-$locale}/checkout/success" });
  const { data: order } = useSuspenseQuery(
    createCheckoutOrderQueryOptions(orderId),
  );

  const { t } = useTranslation(TRANSLATION_NAMESPACES.orderConfirmation);

  return (
    <section className="container mx-auto w-full flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col items-center justify-center gap-8 mt-16">
        <div className="rounded-full bg-primary p-4">
          <Check className="text-primary-foreground" size={48} />
        </div>

        <div className="flex flex-col items-center gap-2">
          <h2 className="text-2xl font-bold">{t("thankYou")}</h2>
          <p className="text-center text-muted-foreground">{t("preparing")}</p>
        </div>

        <div className="flex flex-col items-center gap-1">
          <p className="uppercase">{t("orderNumber")}</p>
          <strong className="text-xl">#{order?.id}</strong>
        </div>

        <div className="flex gap-4 w-full justify-center items-center">
          <Button
            variant="outline"
            nativeButton={false}
            render={
              <Link to="/{-$locale}/account/$orderId" params={{ orderId }}>
                {t("actions.viewDetails")}
              </Link>
            }
          />
          <Button
            nativeButton={false}
            render={
              <Link to="/{-$locale}">{t("actions.continueShopping")}</Link>
            }
          />
        </div>

        <SuccessOrderSummary order={order} />
      </div>
    </section>
  );
};

export default CheckoutSuccess;
