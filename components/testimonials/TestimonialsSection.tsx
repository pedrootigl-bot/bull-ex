import Image from "next/image";
import { TESTIMONIALS, TESTIMONIALS_COPY, type TestimonialStars } from "./testimonialsConfig";
import styles from "./testimonials.module.css";

function StarRow({ count }: { count: TestimonialStars }) {
  return (
    <div className={styles.stars} aria-label={`${count} de 5 estrelas`}>
      {Array.from({ length: 5 }, (_, index) => {
        const filled = index < count;
        return (
          <svg
            key={index}
            className={filled ? styles.starOn : styles.starOff}
            width="15"
            height="15"
            viewBox="0 0 15 15"
            aria-hidden="true"
          >
            <path d="M7.5 1.2 9.2 5l4.1.4-3.1 2.7.9 4-3.6-2.1-3.6 2.1.9-4L1.7 5.4 5.8 5 7.5 1.2Z" />
          </svg>
        );
      })}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section
      className={styles.section}
      id={TESTIMONIALS_COPY.id}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>{TESTIMONIALS_COPY.eyebrow}</p>
          <h2 className={styles.title} id="testimonials-title">
            {TESTIMONIALS_COPY.title}
          </h2>
          <p className={styles.subtitle}>{TESTIMONIALS_COPY.subtitle}</p>
        </header>

        <ul className={styles.grid}>
          {TESTIMONIALS.map((item) => (
            <li key={item.id} className={styles.card}>
              <div className={styles.cardTop}>
                <Image
                  className={styles.photo}
                  src={item.photo}
                  alt={item.photoAlt}
                  width={72}
                  height={72}
                  quality={100}
                  unoptimized
                />
                <div>
                  <p className={styles.name}>{item.name}</p>
                  <StarRow count={item.stars} />
                </div>
              </div>
              <p className={styles.quote}>{item.quote}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
