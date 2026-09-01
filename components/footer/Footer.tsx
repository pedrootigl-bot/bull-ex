import { HERO_THEME } from "@/components/hero/heroConfig";
import { FOOTER_COPY } from "./footerConfig";
import styles from "./footer.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.top}>
          <div>
            <a className={styles.brand} href="/">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                <path d="M4 16.5 11 4.5l7 12" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" />
                <path d="M7.2 16.5h7.6" stroke={HERO_THEME.accent} strokeWidth="1.8" strokeLinecap="round" />
              </svg>
              {FOOTER_COPY.brand}
            </a>
            <p className={styles.tagline}>{FOOTER_COPY.tagline}</p>
            <a className={styles.cta} href={FOOTER_COPY.ctaHref} target="_blank" rel="noopener noreferrer">
              {FOOTER_COPY.cta}
            </a>
          </div>

          {FOOTER_COPY.columns.map((column) => (
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
          <p className={styles.legal}>{FOOTER_COPY.legal}</p>
          <p>{FOOTER_COPY.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
