import { blogHref, BLOG_POST_IMAGES, type BlogPostId } from "@/components/blog/blogConfig";

export const KINDNESS_COPY = {
  id: "gentileza",
} as const;

export const KINDNESS_CARDS = ["community", "education", "sustainability"] as const;

export type KindnessCardId = BlogPostId;

/** Rotas do blog. */
export const KINDNESS_BLOG_HREFS: Record<KindnessCardId, string> = {
  community: blogHref("community"),
  education: blogHref("education"),
  sustainability: blogHref("sustainability"),
};

export const KINDNESS_CARD_IMAGES: Record<KindnessCardId, string> = BLOG_POST_IMAGES;
