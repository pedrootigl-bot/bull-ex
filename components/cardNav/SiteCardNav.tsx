"use client";

import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { bullexLoginHref, bullexRegisterHref } from "@/components/hero/heroConfig";
import {
  RISKFREE_PAGE_HREF,
  SALDOPROMO_PAGE_HREF,
  TICKETS_OFFER_PAGE_HREF,
} from "@/components/offers/offersConfig";
import { usePathname } from "@/i18n/navigation";
import { useLocale, useTranslations } from "next-intl";
import { CardNav, type CardNavItem } from "./CardNav";

export function SiteCardNav() {
  const t = useTranslations("navigation");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const homeSection = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const items: CardNavItem[] = [
    {
      label: t("cardPlatform"),
      bgColor: "#0c1509",
      textColor: "#e9f5e6",
      links: [
        { label: t("demoAccount"), href: homeSection("conta-demo") },
        { label: t("markets"), href: homeSection("mercados") },
        { label: t("why"), href: homeSection("por-que-bullex") },
        { label: t("createAccount"), href: homeSection("criar-conta") },
      ],
    },
    {
      label: t("cardOffers"),
      bgColor: "#101c0c",
      textColor: "#e9f5e6",
      links: [
        { label: t("prizes"), href: "/ofertas" },
        { label: t("riskFree"), href: RISKFREE_PAGE_HREF },
        { label: t("saldoPromo"), href: SALDOPROMO_PAGE_HREF },
        { label: t("tickets"), href: TICKETS_OFFER_PAGE_HREF },
      ],
    },
    {
      label: t("cardContent"),
      bgColor: "#0c1509",
      textColor: "#e9f5e6",
      links: [
        { label: t("blog"), href: "/blog" },
        { label: t("testimonials"), href: homeSection("depoimentos") },
        { label: t("faq"), href: homeSection("faq") },
      ],
    },
  ];

  return (
    <CardNav
      logo="/images/bullex-logo.webp"
      logoAlt={t("brand")}
      logoHref="/"
      items={items}
      navAriaLabel={t("aria")}
      openLabel={t("menuOpen")}
      closeLabel={t("menuClose")}
      ctaLabel={t("register")}
      ctaHref={bullexRegisterHref(locale)}
      secondaryLabel={t("login")}
      secondaryHref={bullexLoginHref(locale)}
    >
      <LanguageSwitcher />
    </CardNav>
  );
}
