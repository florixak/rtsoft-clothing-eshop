import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, ShoppingCart, UserCircle } from "lucide-react";

import { useTranslation } from "react-i18next";
import MobileMenuDrawer from "./mobile-menu-drawer";
import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  const { t } = useTranslation("common");

  return (
    <header className="border-b bg-header px-4 py-3">
      <div className="flex items-center justify-between gap-4">
        <Link
          to="/{-$locale}"
          className="flex-1 flex items-center"
          aria-label={t("header.aria.logo")}
        >
          <ShoppingBag size={32} className="inline-block mr-2" />
          <h1 className="text-3xl font-heading">E-Shop</h1>
        </Link>
        {/*<HeaderSearch mode="desktop" />*/}
        <nav className="flex flex-1 justify-end">
          <ul className="flex flex-row items-center gap-4">
            <li className="hidden md:block">
              <Link to="." aria-label={t("header.aria.wishlist")}>
                <Heart size={24} />
              </Link>
            </li>
            <li className="relative">
              <Link to="/{-$locale}/cart" aria-label={t("header.aria.cart")}>
                <ShoppingCart size={24} />
              </Link>
              <span className="absolute -top-1 -right-1 text-xs bg-primary text-white rounded-full px-1">
                3
              </span>
            </li>
            <li className="hidden md:block">
              <Link
                to="/{-$locale}/account"
                aria-label={t("header.aria.account")}
              >
                <UserCircle size={24} />
              </Link>
            </li>
            <li className="hidden md:block">{/*<LanguageSwitcher />} */}</li>
            <li className="hidden md:block">
              <ThemeSwitcher />
            </li>
            <li className="md:hidden">
              <MobileMenuDrawer />
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-3 md:hidden">{/*<HeaderSearch mode="mobile" />*/}</div>
    </header>
  );
};

export default Header;
