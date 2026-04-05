import { ADMIN_MENU_ITEMS } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const AdminSidebar = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  return (
    <aside className="w-full md:w-64">
      <Card className="w-full md:gap-6">
        <CardHeader>
          <h2 className="text-2xl font-bold">Dashboard</h2>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-row md:flex-col gap-2 w-full justify-center md:justify-start">
            {ADMIN_MENU_ITEMS.map((item) => (
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
          </nav>
        </CardContent>
      </Card>
    </aside>
  );
};

export default AdminSidebar;
