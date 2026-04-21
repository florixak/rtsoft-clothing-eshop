import { FOOTER_LINKS } from "@/constants";
import { TRANSLATION_NAMESPACES } from "@/lib/i18n";
import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  return (
    <footer className="bg-footer text-secondary-foreground py-8 mt-12 px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4 font-heading">
            <ShoppingBag className="inline-block" />
            <h3 className="font-bold text-lg">E-Shop</h3>
          </div>
          <p className="text-sm">{t("footer.description")}</p>
        </div>
        <FooterColumn title="footer.shop.title" links={FOOTER_LINKS.SHOP} />
        <FooterColumn
          title="footer.account.title"
          links={FOOTER_LINKS.ACCOUNT}
        />
        <FooterColumn
          title="footer.support.title"
          links={FOOTER_LINKS.SUPPORT}
        />
      </div>
      <p className="text-xs col-span-full text-center mt-4">
        {t("footer.copyright", {
          year: new Date().getFullYear(),
          name: "E-Shop",
        })}
      </p>
    </footer>
  );
};

const FooterColumn = ({
  title,
  links,
}: {
  title: string;
  links: (typeof FOOTER_LINKS)[keyof typeof FOOTER_LINKS];
}) => {
  const { t } = useTranslation(TRANSLATION_NAMESPACES.common);
  return (
    <div>
      <h3 className="font-bold text-lg mb-4">{t(title)}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link to={link.path} className="text-sm hover:underline">
              {t(link.label)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Footer;
