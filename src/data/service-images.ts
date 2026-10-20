export interface ServiceImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

// Portrait images for the home page service cards.
export const serviceImages = {
  hair: {
    src: "/images/optimized/Our services Hair Care.jpg",
    alt: "Woman with long, glossy brunette waves",
    width: 896,
    height: 1200,
  },
  mens: {
    src: "/images/optimized/Our services Men's Grooming.jpg",
    alt: "Man with a styled textured haircut, fade and neatly trimmed beard",
    width: 896,
    height: 1200,
  },
  nails: {
    src: "/images/optimized/Our services Nail Care.jpg",
    alt: "Hands with glossy nude pink manicured nails and delicate gold rings",
    width: 896,
    height: 1200,
  },
  beauty: {
    src: "/images/optimized/Our services Beauty Care.jpg",
    alt: "Woman in a white towel applying moisturiser to her cheeks",
    width: 896,
    height: 1200,
  },
  bridal: {
    src: "/images/optimized/Our services Bridal Session.jpg",
    alt: "Bride wearing luminous makeup, pearl and gold jewellery, and an embroidered veil",
    width: 896,
    height: 1200,
  },
  spa: {
    src: "/images/optimized/Our services Spa & Wellness.jpg",
    alt: "Client relaxing during a gentle temple massage",
    width: 896,
    height: 1200,
  },
} satisfies Record<string, ServiceImage>;
