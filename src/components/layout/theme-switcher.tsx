import { Computer, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/layout/theme-provider";
import { ButtonGroup } from "../ui/button-group";
import { useTranslation } from "react-i18next";

const ThemeSwitcher = () => {
  const { setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button variant="ghost" size="icon">
            <Sun className="size-[1.3rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon className="absolute size-[1.3rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          </Button>
        }
      ></DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          {t("theme.light")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          {t("theme.dark")}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          {t("theme.system")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const MobileThemeSwitcher = () => {
  const { setTheme } = useTheme();
  const { t } = useTranslation("common");

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="relative flex items-center gap-2 text-sm font-medium">
        <Sun
          size={24}
          className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
        />
        <Moon
          size={24}
          className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
        />
        {t("header.menu.theme")}
      </div>
      <ButtonGroup>
        <Button
          variant="outline"
          onClick={() => setTheme("light")}
          aria-label={t("theme.light")}
        >
          <Sun size={16} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setTheme("dark")}
          aria-label={t("theme.dark")}
        >
          <Moon size={16} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant="outline"
          onClick={() => setTheme("system")}
          aria-label={t("theme.system")}
        >
          <Computer size={16} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </ButtonGroup>
    </div>
  );
};

export { ThemeSwitcher, MobileThemeSwitcher };
