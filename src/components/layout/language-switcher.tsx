import useLanguage from "@/hooks/use-language";
import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { ButtonGroup } from "../ui/button-group";
import { Select, SelectContent, SelectItem, SelectTrigger } from "../ui/select";
import { ChevronDownIcon, Languages } from "lucide-react";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";

const LanguageSwitcher = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const { currentLanguage, changeLanguage } = useLanguage();

  return (
    <Select value={currentLanguage} onValueChange={changeLanguage}>
      <SelectTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-full px-0 justify-center"
          >
            {t(`language.${currentLanguage}`)}
            <ChevronDownIcon className="text-muted-foreground" />
          </Button>
        }
      ></SelectTrigger>
      <SelectContent>
        <SelectItem value="cs">{t("language.cs")}</SelectItem>
        <SelectItem value="en">{t("language.en")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

const MobileLanguageSwitcher = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const { changeLanguage, currentLanguage } = useLanguage();

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="relative flex items-center gap-2 text-sm font-medium">
        <Languages size={24} className="h-[1.2rem] w-[1.2rem]" />
        {t("header.menu.language")}
      </div>
      <ButtonGroup>
        <Button
          variant={currentLanguage === "cs" ? "default" : "outline"}
          onClick={() => changeLanguage("cs")}
          aria-label={t("language.cs")}
        >
          {t("language.cs")}
        </Button>
        <Button
          variant={currentLanguage === "en" ? "default" : "outline"}
          onClick={() => changeLanguage("en")}
          aria-label={t("language.en")}
        >
          {t("language.en")}
        </Button>
      </ButtonGroup>
    </div>
  );
};

export { LanguageSwitcher, MobileLanguageSwitcher };
