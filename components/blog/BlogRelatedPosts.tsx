"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { useTranslations } from "next-intl";
import Image from "next/image";
import {
  BLOG_POST_IMAGES,
  blogHref,
  getRelatedPostIds,
  type BlogPostId,
} from "./blogConfig";
import styles from "./blog.module.css";

export function BlogRelatedPosts({ currentId }: { currentId: BlogPostId }) {
  const t = useTranslations("blog");
  const related = getRelatedPostIds(currentId);

  return (
    <aside className={styles.related} aria-labelledby="blog-related-title">
      <div className={styles.relatedInner}>
        <h2 className={styles.relatedTitle} id="blog-related-title">
          {t("relatedTitle")}
        </h2>
        <ul className={styles.relatedList}>
          {related.map((id) => (
            <li key={id}>
              <BlogNavLink className={styles.relatedCard} href={blogHref(id)}>
                <div className={styles.relatedMedia}>
                  <Image
                    src={BLOG_POST_IMAGES[id]}
                    alt={t(`posts.${id}.imageAlt`)}
                    fill
                    sizes="(max-width: 720px) 100vw, 280px"
                    className={styles.relatedImage}
                  />
                </div>
                <div className={styles.relatedBody}>
                  <span className={styles.relatedEyebrow}>{t("eyebrow")}</span>
                  <span className={styles.relatedPostTitle}>{t(`posts.${id}.title`)}</span>
                  <span className={styles.relatedExcerpt}>{t(`posts.${id}.excerpt`)}</span>
                  <span className={styles.relatedAction}>
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
              </BlogNavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
