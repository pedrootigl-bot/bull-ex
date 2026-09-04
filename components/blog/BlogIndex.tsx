"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import {
  BLOG_POST_IDS,
  BLOG_POST_IMAGES,
  blogHref,
  type BlogPostId,
} from "@/components/blog/blogConfig";
import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "./blog.module.css";

function BlogCard({ id }: { id: BlogPostId }) {
  const t = useTranslations("blog");

  return (
    <li>
      <BlogNavLink className={styles.indexCard} href={blogHref(id)}>
        <div className={styles.indexCardMedia}>
          <Image
            src={BLOG_POST_IMAGES[id]}
            alt={t(`posts.${id}.imageAlt`)}
            fill
            sizes="(max-width: 640px) 100vw, 360px"
            className={styles.indexCardImage}
          />
        </div>
        <div className={styles.indexCardBody}>
          <span className={styles.indexCardEyebrow}>{t("eyebrow")}</span>
          <h3 className={styles.indexCardTitle}>{t(`posts.${id}.title`)}</h3>
          <p className={styles.indexCardExcerpt}>{t(`posts.${id}.excerpt`)}</p>
          <span className={styles.indexCardMeta}>
            {t("readTime", { minutes: t(`posts.${id}.minutes`) })}
          </span>
        </div>
      </BlogNavLink>
    </li>
  );
}

export function BlogIndex() {
  const t = useTranslations("blog");

  return (
    <div className={styles.index}>
      <header className={styles.indexHero}>
        <p className={styles.indexEyebrow}>{t("eyebrow")}</p>
        <h1 className={styles.indexTitle}>{t("indexTitle")}</h1>
        <p className={styles.indexSubtitle}>{t("indexSubtitle")}</p>
      </header>

      <section className={styles.indexSection} aria-labelledby="blog-guides-title">
        <h2 className={styles.indexSectionTitle} id="blog-guides-title">
          {t("guidesSection")}
        </h2>
        <ul className={styles.indexList}>
          {BLOG_POST_IDS.map((id) => (
            <BlogCard key={id} id={id} />
          ))}
        </ul>
      </section>
    </div>
  );
}
