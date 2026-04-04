import { ADMIN_MENU_ITEMS } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

const AdminSidebar = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.admin);
  return (
    <aside className="w-64 p-4">
      <Card>
        <CardHeader>
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
        </CardHeader>
        <CardContent>
          <nav className="flex flex-col gap-2">
            {ADMIN_MENU_ITEMS.map((item) => (
              <Button
                nativeButton={false}
                key={item.path}
                className="w-full p-0"
                variant="ghost"
                render={() => (
                  <Link
                    to={item.path}
                    className="flex items-center px-3 py-2 rounded-md hover:bg-muted"
                  >
                    <item.icon className="inline-block mr-2" size={20} />
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
