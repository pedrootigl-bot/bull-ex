export const BLOG_POST_IDS = [
  "whyBullex",
  "chooseBroker",
  "binaryOptions",
  "demoAccount",
  "riskBasics",
] as const;

export type BlogPostId = (typeof BLOG_POST_IDS)[number];

export const BLOG_POST_SLUGS: Record<BlogPostId, string> = {
  whyBullex: "por-que-a-bullex-e-confiavel",
  chooseBroker: "como-escolher-uma-corretora",
  binaryOptions: "opcoes-binarias-guia-iniciantes",
  demoAccount: "conta-demo-primeiros-passos",
  riskBasics: "gestao-de-risco-com-tranquilidade",
};

export const BLOG_POST_IMAGES: Record<BlogPostId, string> = {
  whyBullex: "/images/blog/why-bullex.webp",
  chooseBroker: "/images/blog/choose-broker.webp",
  binaryOptions: "/images/blog/binary-options.webp",
  demoAccount: "/images/blog/demo-account.webp",
  riskBasics: "/images/blog/risk-basics.webp",
};

export const BLOG_POST_PARAGRAPH_KEYS: Record<BlogPostId, readonly string[]> = {
  whyBullex: ["p1", "p2", "p3", "p4", "p5"],
  chooseBroker: ["p1", "p2", "p3", "p4", "p5"],
  binaryOptions: ["p1", "p2", "p3", "p4", "p5"],
  demoAccount: ["p1", "p2", "p3", "p4", "p5"],
  riskBasics: ["p1", "p2", "p3", "p4", "p5"],
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

export function getRelatedPostIds(currentId: BlogPostId, limit = 3): BlogPostId[] {
  return BLOG_POST_IDS.filter((id) => id !== currentId).slice(0, limit);
}
