export type TestimonialStars = 5;

export type VideoTestimonialId = "felipe" | "rafael" | "carlosVideo" | "joaoVideo";
export type TextTestimonialId = "ana" | "marcos" | "carlos" | "joao";
export type PhotoTestimonialId = "brandPlatform" | "brandCommunity" | "tradingCommunity" | "activeTraders";
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

export type TestimonialTriplet = {
  id: string;
  video: VideoTestimonial;
  text: TextTestimonial;
  photo: PhotoTestimonial;
};

export const TESTIMONIALS_COPY = {
  id: "depoimentos",
} as const;

export const TESTIMONIAL_TRIPLETS: readonly TestimonialTriplet[] = [
  {
    id: "triplet-1",
    video: {
      id: "felipe",
      kind: "video",
      poster: "/images/bullex-team-trading.jpg",
      videoSrc: null,
    },
    text: {
      id: "ana",
      kind: "text",
      photo: "/images/testimonials/camila.webp",
      stars: 5,
    },
    photo: {
      id: "brandPlatform",
      kind: "photo",
      image: "/images/bullex-team-trading.jpg",
    },
  },
  {
    id: "triplet-2",
    video: {
      id: "rafael",
      kind: "video",
      poster: "/images/testimonials/thiago.webp",
      videoSrc: null,
    },
    text: {
      id: "marcos",
      kind: "text",
      photo: "/images/testimonials/rogerio.webp",
      stars: 5,
    },
    photo: {
      id: "brandCommunity",
      kind: "photo",
      image: "/images/testimonials/fernanda.webp",
    },
  },
  {
    id: "triplet-3",
    video: {
      id: "carlosVideo",
      kind: "video",
      poster: "/images/testimonials/eduardo.webp",
      videoSrc: null,
    },
    text: {
      id: "carlos",
      kind: "text",
      photo: "/images/testimonials/eduardo.webp",
      stars: 5,
    },
    photo: {
      id: "tradingCommunity",
      kind: "photo",
      image: "/images/bullex-team-trading.jpg",
    },
  },
  {
    id: "triplet-4",
    video: {
      id: "joaoVideo",
      kind: "video",
      poster: "/images/testimonials/juliana.webp",
      videoSrc: null,
    },
    text: {
      id: "joao",
      kind: "text",
      photo: "/images/testimonials/juliana.webp",
      stars: 5,
    },
    photo: {
      id: "activeTraders",
      kind: "photo",
      image: "/images/testimonials/thiago.webp",
    },
  },
];
