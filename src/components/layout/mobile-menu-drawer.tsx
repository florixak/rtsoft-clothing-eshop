import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Heart,
  Menu,
  ShoppingBag,
  ShoppingCart,
  UserCircle,
  X,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "../ui/drawer";
import ThemeSwitcher from "./theme-switcher";
import LanguageSwitcher from "./language-switcher";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const MobileMenuDrawer = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation("common");

  const closeDrawer = () => {
    setOpen(false);
  };

  return (
    <Drawer direction="left" open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label={t("header.aria.openMenu")}
        >
          <Menu aria-hidden="true" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="gap-8">
        <DrawerHeader className="flex flex-row items-center justify-between pl-4">
          <Link
            to="/{-$locale}"
            className="flex-1 flex items-center"
            aria-label={t("header.aria.logo")}
          >
            <ShoppingBag size={32} className="inline-block mr-2" />
            <h1 className="text-3xl font-heading">E-Shop</h1>
          </Link>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Close</span>
              <X />
            </Button>
          </DrawerClose>
        </DrawerHeader>

        <ul className="flex flex-col gap-8 p-4">
          <li>
            <Link
              to="/{-$locale}/account"
              aria-label={t("header.aria.account")}
              onClick={closeDrawer}
              className="flex items-center"
            >
              <UserCircle size={24} className="inline-block mr-2" />
              {t("header.menu.account")}
              <ArrowRight size={16} className="inline-block ml-auto" />
            </Link>
          </li>
          <li>
            <Link
              to="."
              aria-label={t("header.aria.wishlist")}
              onClick={closeDrawer}
              className="flex items-center"
            >
              <Heart size={24} className="inline-block mr-2" />
              {t("header.menu.wishlist")}
              <ArrowRight size={16} className="inline-block ml-auto" />
            </Link>
          </li>
          <li>
            <Link
              to="/{-$locale}/cart"
              aria-label={t("header.aria.cart")}
              onClick={closeDrawer}
              className="flex items-center"
            >
              <ShoppingCart size={24} className="inline-block mr-2" />
              {t("header.menu.cart")}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-muted-foreground">
                  {t("header.menu.cartItemCount", { count: 0 })}
                </span>
                <ArrowRight size={16} />
              </div>
            </Link>
          </li>
        </ul>
        <DrawerFooter className="bg-footer">
          <span className="text-muted-foreground">
            {t("header.menu.settingsAndPreferences")}
          </span>
          <div>
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenuDrawer;
