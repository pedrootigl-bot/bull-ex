import {
  blogHref,
  BLOG_POST_IMAGES,
} from "@/components/blog/blogConfig";

export const KINDNESS_COPY = {
  id: "gentileza",
} as const;

/** Cards da home: guias educativos do blog. */
export const KINDNESS_CARDS = ["whyBullex", "chooseBroker", "binaryOptions"] as const;

export type KindnessCardId = (typeof KINDNESS_CARDS)[number];

/** Rotas do blog. */
export const KINDNESS_BLOG_HREFS: Record<KindnessCardId, string> = {
  whyBullex: blogHref("whyBullex"),
  chooseBroker: blogHref("chooseBroker"),
  binaryOptions: blogHref("binaryOptions"),
};

export const KINDNESS_CARD_IMAGES: Record<KindnessCardId, string> = {
  whyBullex: BLOG_POST_IMAGES.whyBullex,
  chooseBroker: BLOG_POST_IMAGES.chooseBroker,
  binaryOptions: BLOG_POST_IMAGES.binaryOptions,
};
