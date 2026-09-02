import { HERO_COPY } from "@/components/hero/heroConfig";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./footer.module.css";

export function SiteFooter() {
  const t = useTranslations("footer");

  const columns = [
    {
      title: t("platform"),
      links: [
        { href: "#mercados", label: t("markets") },
        { href: "#por-que-bullex", label: t("why") },
        { href: "#sobre", label: t("about") },
        { href: "#precos", label: t("pricing") },
      ],
    },
    {
      title: t("support"),
      links: [
        { href: "#faq", label: t("faq") },
        { href: HERO_COPY.ctaHref, label: t("openAccount") },
        { href: HERO_COPY.ctaHref, label: t("login") },
      ],
    },
    {
      title: t("legal"),
      links: [
        { href: "#", label: t("terms") },
        { href: "#", label: t("privacy") },
        { href: "#", label: t("risk") },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <Link className={styles.brand} href="/">
              <Image
                src="/images/bullex-logo.png"
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
                      {...(link.href.startsWith("http")
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className={styles.bottom}>
          <p className={styles.legal}>{t("disclaimer")}</p>
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
