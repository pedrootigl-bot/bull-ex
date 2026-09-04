import { BlogHeader } from "@/components/blog/BlogHeader";
import { BlogPageReady } from "@/components/blog/BlogPageReady";
import { BlogRelatedPosts } from "@/components/blog/BlogRelatedPosts";
import styles from "@/components/blog/blog.module.css";
import {
  BLOG_POST_IDS,
  BLOG_POST_IMAGES,
  BLOG_POST_PARAGRAPH_KEYS,
  BLOG_POST_SLUGS,
  blogIdFromSlug,
} from "@/components/blog/blogConfig";
import { SiteFooter } from "@/components/footer/Footer";
import { HERO_COPY } from "@/components/hero/heroConfig";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type BlogPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    BLOG_POST_IDS.map((id) => ({
      locale,
      slug: BLOG_POST_SLUGS[id],
    })),
  );
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const postId = blogIdFromSlug(slug);
  if (!postId || !hasLocale(routing.locales, locale)) {
    return {};
  }

  const t = await getTranslations({ locale, namespace: "blog" });

  return {
    title: `${t(`posts.${postId}.title`)} | Bullex`,
    description: t(`posts.${postId}.excerpt`),
  };
}

export default async function BlogPostPage({ params }: BlogPageProps) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const postId = blogIdFromSlug(slug);
  if (!postId) {
    notFound();
  }

  setRequestLocale(locale);
  const t = await getTranslations("blog");

  return (
    <div className={styles.page}>
      <BlogPageReady />
      <BlogHeader />

      <article className={styles.article}>
        <div className={styles.articleHero}>
          <Image
            className={styles.articleHeroImage}
            src={BLOG_POST_IMAGES[postId]}
            alt={t(`posts.${postId}.imageAlt`)}
            fill
            sizes="100vw"
            priority
            quality={90}
          />
          <div className={styles.articleHeroShade} aria-hidden="true" />
          <div className={styles.articleHeroContent}>
            <p className={styles.eyebrow}>{t("eyebrow")}</p>
            <h1 className={styles.title}>{t(`posts.${postId}.title`)}</h1>
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                {t("publishedAt", { date: t(`posts.${postId}.date`) })}
              </span>
              <span className={styles.metaDot} aria-hidden="true" />
              <span className={styles.metaItem}>
                {t("readTime", { minutes: t(`posts.${postId}.minutes`) })}
              </span>
            </div>
          </div>
        </div>

        <div className={styles.articleBody}>
          <p className={styles.excerpt}>{t(`posts.${postId}.excerpt`)}</p>

          <div className={styles.body}>
            {BLOG_POST_PARAGRAPH_KEYS[postId].map((key) => (
              <p key={key}>{t(`posts.${postId}.${key}` as `posts.${typeof postId}.p1`)}</p>
            ))}
          </div>

          <div className={styles.ctaBand}>
            <p className={styles.ctaHint}>{t("ctaHint")}</p>
            <div className={styles.ctaActions}>
              <a
                className={styles.cta}
                href={HERO_COPY.ctaHref}
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("cta")}
              </a>
              <Link className={styles.ctaSecondary} href="/blog">
                {t("backToBlog")}
              </Link>
            </div>
          </div>
        </div>
      </article>

      <BlogRelatedPosts currentId={postId} />
      <SiteFooter />
    </div>
  );
}
