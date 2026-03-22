import { ChevronDownIcon, Computer, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useTheme } from "@/components/layout/theme-provider";
import { ButtonGroup } from "../ui/button-group";
import { useTranslation } from "react-i18next";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

const ThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);

  return (
    <Select
      value={theme}
      onValueChange={(value) => {
        if (value === "light" || value === "dark" || value === "system") {
          setTheme(value);
        }
      }}
    >
      <SelectTrigger
        className="justify-center relative h-8 px-2"
        aria-label={t("header.aria.theme")}
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-full px-0 justify-center"
          >
            {theme === "light" && (
              <Sun className="scale-100 rotate-0 transition-all duration-300 dark:scale-0 dark:-rotate-90" />
            )}
            {theme === "dark" && (
              <Moon className="scale-0 rotate-90 transition-all duration-300 dark:scale-100 dark:rotate-0" />
            )}
            <ChevronDownIcon className="text-muted-foreground" />
          </Button>
        }
      />
      <SelectContent align="end">
        <SelectItem value="light">{t("theme.light")}</SelectItem>
        <SelectItem value="dark">{t("theme.dark")}</SelectItem>
        <SelectItem value="system">{t("theme.system")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

const MobileThemeSwitcher = () => {
  const { setTheme, theme } = useTheme();
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);

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
          variant={theme === "light" ? "default" : "outline"}
          onClick={() => setTheme("light")}
          aria-label={t("theme.light")}
        >
          <Sun size={16} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant={theme === "dark" ? "default" : "outline"}
          onClick={() => setTheme("dark")}
          aria-label={t("theme.dark")}
        >
          <Moon size={16} className="h-[1.2rem] w-[1.2rem]" />
        </Button>
        <Button
          variant={theme === "system" ? "default" : "outline"}
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
