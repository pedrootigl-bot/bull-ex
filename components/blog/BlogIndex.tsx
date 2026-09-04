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

function BlogCard({ id, featured = false }: { id: BlogPostId; featured?: boolean }) {
  const t = useTranslations("blog");

  return (
    <li className={featured ? styles.indexFeaturedItem : undefined}>
      <BlogNavLink
        className={featured ? styles.indexFeatured : styles.indexCard}
        href={blogHref(id)}
      >
        <div className={featured ? styles.indexFeaturedMedia : styles.indexCardMedia}>
          <Image
            src={BLOG_POST_IMAGES[id]}
            alt={t(`posts.${id}.imageAlt`)}
            fill
            sizes={
              featured
                ? "(max-width: 900px) 100vw, 1100px"
                : "(max-width: 640px) 100vw, 360px"
            }
            className={featured ? styles.indexFeaturedImage : styles.indexCardImage}
            priority={featured}
            quality={featured ? 90 : 85}
          />
          <div className={featured ? styles.indexFeaturedShade : styles.indexCardShade} />
        </div>
        <div className={featured ? styles.indexFeaturedBody : styles.indexCardBody}>
          {featured ? (
            <span className={styles.indexFeaturedBadge}>{t("featuredLabel")}</span>
          ) : (
            <span className={styles.indexCardEyebrow}>{t("eyebrow")}</span>
          )}
          <h3 className={featured ? styles.indexFeaturedTitle : styles.indexCardTitle}>
            {t(`posts.${id}.title`)}
          </h3>
          <p className={featured ? styles.indexFeaturedExcerpt : styles.indexCardExcerpt}>
            {t(`posts.${id}.excerpt`)}
          </p>
          <div className={featured ? styles.indexFeaturedMeta : styles.indexCardMetaRow}>
            <span className={styles.indexCardMeta}>
              {t("readTime", { minutes: t(`posts.${id}.minutes`) })}
            </span>
            <span className={styles.indexCardAction}>
              {t("readArticle")}
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path
                  d="M3.5 8h9M9.2 4.8 13 8l-3.8 3.2"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </BlogNavLink>
    </li>
  );
}

export function BlogIndex() {
  const t = useTranslations("blog");
  const [featured, ...rest] = BLOG_POST_IDS;

  return (
    <div className={styles.index}>
      <div className={styles.indexGlow} aria-hidden="true" />

      <header className={styles.indexHero}>
        <p className={styles.indexEyebrow}>{t("eyebrow")}</p>
        <h1 className={styles.indexTitle}>{t("indexTitle")}</h1>
        <p className={styles.indexSubtitle}>{t("indexSubtitle")}</p>
      </header>

      <section className={styles.indexSection} aria-labelledby="blog-guides-title">
        <div className={styles.indexSectionHead}>
          <h2 className={styles.indexSectionTitle} id="blog-guides-title">
            {t("guidesSection")}
          </h2>
        </div>

        <ul className={styles.indexFeaturedList}>
          <BlogCard id={featured} featured />
        </ul>

        <ul className={styles.indexList}>
          {rest.map((id) => (
            <BlogCard key={id} id={id} />
          ))}
        </ul>
      </section>
    </div>
  );
}
