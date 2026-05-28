import UserProfileForm from "@/components/form/user-profile-form";
import RouteError from "@/components/layout/route-error";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/{-$locale}/account/profile/")({
  component: RouteComponent,
  pendingComponent: () => <Skeleton className="h-96 w-full" />,
  errorComponent: RouteError,
});

function RouteComponent() {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.account);

  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold">{t("profile.title")}</h2>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<Skeleton className="h-96 w-full" />}>
          <UserProfileForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
