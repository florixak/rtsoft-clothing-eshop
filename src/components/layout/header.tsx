import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag, ShoppingCart, UserCircle } from "lucide-react";

import useLocale from "@/hooks/use-locale";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { showInfoToast } from "@/lib/toasts";
import { useCartStore } from "@/stores/cart-store";
import { useTranslation } from "react-i18next";
import HeaderSearch from "./header-search";
import { LanguageSwitcher } from "./language-switcher";
import MobileMenuDrawer from "./mobile-menu-drawer";
import { ThemeSwitcher } from "./theme-switcher";

const Header = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  const locale = useLocale();
  const itemsCount = useCartStore((state) =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0),
  );

  return (
    <header className="fixed w-full border-b bg-header px-4 py-3 z-50">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <Link
            to="/{-$locale}"
            params={{ locale }}
            className="flex items-center w-fit"
            aria-label={t("header.aria.logo")}
          >
            <ShoppingBag size={32} className="inline-block mr-2" />
            <h1 className="text-3xl font-heading font-semibold">E-Shop</h1>
          </Link>
        </div>

        <HeaderSearch mode="desktop" />
        <nav className="flex flex-1 justify-end">
          <ul className="flex flex-row items-center gap-4">
            <li className="hidden md:block">
              <Link
                to="."
                aria-label={t("header.aria.wishlist")}
                disabled
                onClick={() => showInfoToast(t("toast.comingSoon"))}
              >
                <Heart size={24} />
              </Link>
            </li>
            <li className="relative">
              <Link to="/{-$locale}/cart" aria-label={t("header.aria.cart")}>
                <ShoppingCart size={24} />
              </Link>
              <span className="absolute -top-1 -right-1 text-xs bg-primary text-primary-foreground rounded-full px-1">
                {itemsCount}
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
            <li className="hidden md:flex flex-row items-center gap-2">
              <LanguageSwitcher />
              <ThemeSwitcher />
            </li>
            <li className="md:hidden">
              <MobileMenuDrawer />
            </li>
          </ul>
        </nav>
      </div>

      <div className="mt-3 md:hidden">
        <HeaderSearch mode="mobile" />
      </div>
    </header>
  );
};

export default Header;
