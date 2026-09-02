import { useTranslations } from "next-intl";
import { CompanyLogo } from "./CompanyLogo";
import { MARKET_ITEMS, MARKETS_COPY } from "./marketsConfig";
import { Sparkline } from "./Sparkline";
import styles from "./markets.module.css";

function MarketCard({
  item,
  gradientId,
}: {
  item: (typeof MARKET_ITEMS)[number];
  gradientId: string;
}) {
  const tone = item.direction === "positive" ? styles.positive : styles.negative;

  return (
    <article className={styles.card}>
      <div className={styles.brand}>
        <CompanyLogo name={item.logo} />
      </div>
      <div className={styles.meta}>
        <span className={styles.ticker}>{item.ticker}</span>
        <span className={styles.name}>{item.name}</span>
      </div>
      <span className={`${styles.change} ${tone}`}>{item.change}</span>
      <div className={styles.chart}>
        <Sparkline series={item.series} direction={item.direction} gradientId={gradientId} />
      </div>
      <span className={styles.price}>{item.price}</span>
    </article>
  );
}

function MarqueeRow({ reverse }: { reverse?: boolean }) {
  const prefix = reverse ? "b" : "a";

  return (
    <div className={styles.viewport}>
      <div className={`${styles.track} ${reverse ? styles.trackReverse : ""}`}>
        {[0, 1].map((copy) => (
          <div className={styles.set} key={`${prefix}-set-${copy}`} aria-hidden={copy === 1}>
            {MARKET_ITEMS.map((item) => (
              <MarketCard
                key={`${prefix}-${copy}-${item.ticker}`}
                item={item}
                gradientId={`${prefix}-${copy}-${item.ticker}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function MarketsSection() {
  const t = useTranslations("markets");

  return (
    <section className={styles.section} id={MARKETS_COPY.id} aria-labelledby="markets-title">
      <div className={styles.header}>
        <p className={styles.miniCard}>{t("badge")}</p>
        <h2 className={styles.title} id="markets-title">
          {t("title")}
        </h2>
        <p className={styles.subtitle}>{t("subtitle")}</p>
      </div>
      <MarqueeRow />
      <MarqueeRow reverse />
    </section>
  );
}
