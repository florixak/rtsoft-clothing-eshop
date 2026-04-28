import { USER_MENU_ITEMS } from "@/constants";
import { logout } from "@/lib/auth";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link, useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader } from "../ui/card";

const UserSidebar = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.account);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate({ to: "/{-$locale}/login" });
  };
  return (
    <aside className="w-full md:w-64">
      <Card className="w-full md:gap-6">
        <CardHeader>
          <h2 className="text-2xl font-bold">{t("title")}</h2>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-row md:flex-col gap-2 w-full justify-center md:justify-start">
            {USER_MENU_ITEMS.map((item) => (
              <Button
                nativeButton={false}
                key={item.path}
                className="w-full p-0"
                variant="ghost"
                render={() => (
                  <Link
                    to={item.path}
                    className="flex flex-col md:flex-row items-center px-3 py-2 rounded-md hover:bg-muted gap-2"
                    activeProps={{ className: "bg-muted" }}
                    activeOptions={{ exact: true }}
                  >
                    <item.icon
                      className="inline-block text-primary"
                      size={20}
                    />
                    {t(item.label)}
                  </Link>
                )}
              />
            ))}
            <Button
              nativeButton={false}
              className="w-full p-0 mt-2"
              variant="outline"
              onClick={handleLogout}
            >
              {t("nav.logout")}
            </Button>
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

export default UserSidebar;
