import { Link, useRouter } from "@tanstack/react-router";
import { Home } from "lucide-react";

import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Button } from "../ui/button";

const NotFound = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const router = useRouter();

  return (
    <section className="container mx-auto text-center mt-20">
      <h2 className="text-4xl font-heading font-semibold mb-4 flex items-center flex-col gap-2">
        <span className="text-6xl font-bold text-primary">404</span>
        {t("meta.notFound.title")}
      </h2>
      <p className="text-muted-foreground mb-6">
        {t("meta.notFound.description")}
      </p>
      <div className="flex gap-4 justify-center items-center">
        <Button
          nativeButton={false}
          render={
            <Link to="/{-$locale}">
              <Home size={18} />
              {t("buttons.goHome")}
            </Link>
          }
        />
        <Button variant="outline" onClick={() => router.invalidate()}>
          {t("buttons.tryAgain")}
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
