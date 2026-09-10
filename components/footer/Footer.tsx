import { HERO_COPY, TRADE_LOGIN_HREF_PT_BR, TRADE_REGISTER_HREF_PT_BR } from "@/components/hero/heroConfig";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FOOTER_LEGAL_DOCS, SUPPORT_EMAIL } from "./footerConfig";
import styles from "./footer.module.css";

export function SiteFooter() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("platform"),
      links: [
        { href: "#mercados", label: t("markets"), external: false },
        { href: "#por-que-bullex", label: t("why"), external: false },
        { href: "#premios", label: t("prizes"), external: false },
        { href: "#faq", label: t("faq"), external: false },
      ],
    },
    {
      title: t("support"),
      links: [
        { href: "#faq", label: t("faq"), external: false },
        { href: `mailto:${SUPPORT_EMAIL}`, label: SUPPORT_EMAIL, external: false },
        { href: TRADE_REGISTER_HREF_PT_BR, label: t("openAccount"), external: true },
        { href: TRADE_LOGIN_HREF_PT_BR, label: t("login"), external: true },
      ],
    },
    {
      title: t("legal"),
      links: FOOTER_LEGAL_DOCS.map((doc) => ({
        href: doc.href,
        label: t(doc.labelKey),
        external: true,
      })),
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Link className={styles.brand} href="/" prefetch={false}>
              <Image
                src="/images/bullex-logo.webp"
                alt={t("brand")}
                width={755}
                height={330}
                className={styles.brandLogo}
              />
            </Link>
            <p className={styles.tagline}>{t("tagline")}</p>
            <a className={styles.cta} href={HERO_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
              {t("cta")}
            </a>
          </div>

          {columns.map((column) => (
            <nav className={styles.column} key={column.title} aria-label={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={`${column.title}-${link.label}`}>
                    <a
                      href={link.href}
                      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.notices}>
          <p>{t("riskAlert")}</p>
          <p>{t("companyLegal")}</p>
          <p>{t("paymentsLegal")}</p>
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>{t("disclaimer")}</p>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
