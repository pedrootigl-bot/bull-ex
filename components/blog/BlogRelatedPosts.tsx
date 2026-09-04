"use client";

import { BlogNavLink } from "@/components/blog/BlogNavLink";
import { useTranslations } from "next-intl";
import {
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
      <h2 className={styles.relatedTitle} id="blog-related-title">
        {t("relatedTitle")}
      </h2>
      <ul className={styles.relatedList}>
        {related.map((id) => (
          <li key={id}>
            <BlogNavLink className={styles.relatedCard} href={blogHref(id)}>
              <span className={styles.relatedEyebrow}>{t("eyebrow")}</span>
              <span className={styles.relatedPostTitle}>{t(`posts.${id}.title`)}</span>
              <span className={styles.relatedExcerpt}>{t(`posts.${id}.excerpt`)}</span>
            </BlogNavLink>
          </li>
        ))}
      </ul>
    </aside>
  );
}
