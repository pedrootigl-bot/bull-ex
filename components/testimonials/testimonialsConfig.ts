export type TestimonialStars = 3 | 4 | 5;

export type Testimonial = {
  id: "camila" | "rogerio" | "thiago" | "juliana" | "eduardo" | "fernanda";
  name: string;
  stars: TestimonialStars;
  photo: string;
};

export const TESTIMONIALS_COPY = {
  id: "depoimentos",
} as const;

export const TESTIMONIALS: readonly Testimonial[] = [
  { id: "camila", name: "Camila R.", stars: 4, photo: "/images/testimonials/camila.webp" },
  { id: "rogerio", name: "Rogério Mendes", stars: 4, photo: "/images/testimonials/rogerio.webp" },
  { id: "thiago", name: "Thiago Alves", stars: 5, photo: "/images/testimonials/thiago.webp" },
  { id: "juliana", name: "Juliana Pires", stars: 4, photo: "/images/testimonials/juliana.webp" },
  { id: "eduardo", name: "Eduardo Nogueira", stars: 5, photo: "/images/testimonials/eduardo.webp" },
  { id: "fernanda", name: "Fernanda Costa", stars: 4, photo: "/images/testimonials/fernanda.webp" },
];
