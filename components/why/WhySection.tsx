import Image from "next/image";
import { WhyIcon } from "./WhyIcon";
import { WHY_COPY } from "./whyConfig";
import styles from "./why.module.css";

function highlightCallout(text: string, highlights: readonly string[]) {
  const pattern = new RegExp(`(${highlights.map((item) => item.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  const parts = text.split(pattern);

  return parts.map((part, index) =>
    highlights.includes(part) ? (
      <span className={styles.highlight} key={`${part}-${index}`}>
        {part}
      </span>
    ) : (
      <span key={`${part}-${index}`}>{part}</span>
    ),
  );
}

export function WhySection() {
  return (
    <section className={styles.section} id={WHY_COPY.id} aria-labelledby="why-title">
      <div className={styles.inner}>
        <div className={styles.layout}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>{WHY_COPY.eyebrow}</p>
            <h2 className={styles.title} id="why-title">
              {WHY_COPY.titleBefore}
              <span className={styles.highlight}>{WHY_COPY.titleHighlight}</span>
            </h2>
            <p className={styles.subtitle}>{WHY_COPY.subtitle}</p>
          </div>

          <div className={styles.aside}>
            <div className={styles.visual}>
              <Image
                className={styles.photo}
                src="/images/bullex-bull-suit.jpg"
                alt="Figura com máscara de touro verde, representando a identidade da Bullex"
                width={720}
                height={960}
                sizes="(max-width: 980px) 100vw, 42vw"
                quality={100}
                unoptimized
              />
            </div>

            <div className={styles.bar}>
              {WHY_COPY.bars.map((item) => (
                <article className={styles.barItem} key={item.title}>
                  <div className={styles.iconWrap}>
                    <WhyIcon name={item.icon} />
                  </div>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className={styles.features}>
            {WHY_COPY.features.map((feature) => (
              <article className={styles.feature} key={feature.title}>
                <div className={styles.iconWrap}>
                  <WhyIcon name={feature.icon} />
                </div>
                <div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </div>
              </article>
            ))}
          </div>

          <p className={styles.callout}>
            <WhyIcon name="bull" />
            <span>{highlightCallout(WHY_COPY.callout, WHY_COPY.calloutHighlights)}</span>
          </p>
        </div>
      </div>
      <div className={styles.divider} aria-hidden="true" />
    </section>
  );
}
