export type TestimonialStars = 5;

export type VideoTestimonialId = "feedbacks" | "felipe" | "arraia";
export type TextTestimonialId = "ana" | "marcos" | "joao";
export type PhotoTestimonialId = "brandPlatform" | "brandCommunity" | "activeTraders";
export type TestimonialId = VideoTestimonialId | TextTestimonialId | PhotoTestimonialId;

type TestimonialBase<TId extends TestimonialId> = {
  id: TId;
};

export type VideoTestimonial = TestimonialBase<VideoTestimonialId> & {
  kind: "video";
  poster: string;
  videoSrc?: string | null;
};

export type TextTestimonial = TestimonialBase<TextTestimonialId> & {
  kind: "text";
  photo: string;
  stars: TestimonialStars;
};

export type PhotoTestimonial = TestimonialBase<PhotoTestimonialId> & {
  kind: "photo";
  image: string;
};

export type TestimonialItem = VideoTestimonial | TextTestimonial | PhotoTestimonial;

export const TESTIMONIALS_COPY = {
  id: "depoimentos",
} as const;

/**
 * Ordem: vídeo, texto, vídeo, texto, vídeo, imagem — resto com o que sobrar.
 */
export const TESTIMONIAL_ITEMS: readonly TestimonialItem[] = [
  {
    id: "feedbacks",
    kind: "video",
    poster: "/images/testimonials/video-3-poster.webp",
    videoSrc: "/videos/testimonials/video-3.mp4",
  },
  {
    id: "ana",
    kind: "text",
    photo: "/images/testimonials/camila.webp",
    stars: 5,
  },
  {
    id: "felipe",
    kind: "video",
    poster: "/images/testimonials/video-1-poster.webp",
    videoSrc: "/videos/testimonials/video-1.mp4",
  },
  {
    id: "marcos",
    kind: "text",
    photo: "/images/testimonials/rogerio.webp",
    stars: 5,
  },
  {
    id: "arraia",
    kind: "video",
    poster: "/images/testimonials/video-4-poster.webp",
    videoSrc: "/videos/testimonials/video-4.mp4",
  },
  {
    id: "brandPlatform",
    kind: "photo",
    image: "/images/testimonials/proof-car.webp",
  },
  {
    id: "joao",
    kind: "text",
    photo: "/images/testimonials/juliana.webp",
    stars: 5,
  },
  {
    id: "brandCommunity",
    kind: "photo",
    image: "/images/testimonials/proof-phone-1.webp",
  },
  {
    id: "activeTraders",
    kind: "photo",
    image: "/images/testimonials/proof-setup.webp",
  },
];

export function chunkTestimonials<T>(items: readonly T[], size: number): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += size) {
    rows.push(items.slice(i, i + size) as T[]);
  }
  return rows;
}
