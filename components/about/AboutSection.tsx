import Image from "next/image";
import { ABOUT_COPY } from "./aboutConfig";
import styles from "./about.module.css";

export function AboutSection() {
  return (
    <section className={styles.section} id={ABOUT_COPY.id} aria-labelledby="about-title">
      <div className={styles.grid}>
        <div className={styles.media}>
          <Image
            className={styles.image}
            src="/images/bull-quem-somos.jpg"
            alt="Touro em posição de ataque diante de uma cidade iluminada em verde, símbolo de mercado em alta"
            fill
            sizes="(max-width: 900px) 100vw, 60vw"
            quality={100}
            unoptimized
            priority
          />
          <div className={styles.mediaFade} aria-hidden="true" />
        </div>

        <div className={styles.copy}>
          <h2 className={styles.title} id="about-title">
            {ABOUT_COPY.title}
          </h2>
          <div className={styles.paragraphs}>
            <p className={styles.lead}>{ABOUT_COPY.lead}</p>
            <p>{ABOUT_COPY.body}</p>
            <p className={styles.tagline}>{ABOUT_COPY.tagline}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
