export const BLOG_POST_IDS = ["community", "education", "sustainability"] as const;

export type BlogPostId = (typeof BLOG_POST_IDS)[number];

export const BLOG_POST_SLUGS: Record<BlogPostId, string> = {
  community: "apoio-comunidade",
  education: "educacao-financeira",
  sustainability: "iniciativas-sustentaveis",
};

export const BLOG_POST_IMAGES: Record<BlogPostId, string> = {
  community: "/images/kindness/community.jpg",
  education: "/images/kindness/education.jpg",
  sustainability: "/images/kindness/sustainability.jpg",
};

export const BLOG_POST_PARAGRAPH_KEYS: Record<BlogPostId, readonly string[]> = {
  community: ["p1", "p2", "p3"],
  education: ["p1", "p2", "p3"],
  sustainability: ["p1", "p2", "p3"],
};

const SLUG_TO_ID = Object.fromEntries(
  BLOG_POST_IDS.map((id) => [BLOG_POST_SLUGS[id], id]),
) as Record<string, BlogPostId>;

export function blogHref(id: BlogPostId): string {
  return `/blog/${BLOG_POST_SLUGS[id]}`;
}

export function blogIdFromSlug(slug: string): BlogPostId | undefined {
  return SLUG_TO_ID[slug];
}

export function isBlogPostId(value: string): value is BlogPostId {
  return (BLOG_POST_IDS as readonly string[]).includes(value);
}
