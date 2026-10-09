export interface BridalPackage {
  id: string;
  name: string;
  price: string;
  priceNum: number;
  badge?: string;
  tagline: string;
  isPopular?: boolean;
  features: {
    label: string;
    value: string;
    included: boolean;
  }[];
}

export interface BridalTimelineStep {
  timeline: string;
  title: string;
  description: string;
}

export const bridalPackagesData: BridalPackage[] = [
  {
    id: "silver-bride",
    name: "Silver Bride",
    price: "₹25,999",
    priceNum: 25999,
    tagline: "Essential elegance for the radiant minimalist bride",
    isPopular: false,
    features: [
      { label: "Pre-Bridal Consultation", value: "Included", included: true },
      { label: "Facial / Skin Care", value: "1 Session", included: true },
      { label: "Full-Body Detan", value: "1 Session", included: true },
      { label: "Body Polishing", value: "1 Session", included: true },
      { label: "Hair Spa / Treatment", value: "1 Session", included: true },
      { label: "Manicure + Pedicure", value: "Express", included: true },
      { label: "Complete Grooming", value: "Basic", included: true },
      { label: "Bridal Makeup", value: "1 Look", included: true },
      { label: "Bridal Hairstyle", value: "Included", included: true },
      { label: "Saree Draping", value: "1 Saree", included: true },
      { label: "Hair Accessories / Veil", value: "Basic", included: true },
      { label: "Touch-Up Support", value: "—", included: false },
      { label: "Post-Event Recovery", value: "—", included: false },
    ],
  },
  {
    id: "gold-bride",
    name: "Gold Bride",
    price: "₹45,999",
    priceNum: 45999,
    badge: "Most Popular",
    tagline: "Comprehensive couture perfection with HD makeup & dual sessions",
    isPopular: true,
    features: [
      { label: "Pre-Bridal Consultation", value: "Included", included: true },
      { label: "Facial / Skin Care", value: "2 Sessions", included: true },
      { label: "Full-Body Detan", value: "2 Sessions", included: true },
      { label: "Body Polishing", value: "2 Sessions", included: true },
      { label: "Hair Spa / Treatment", value: "2 Sessions", included: true },
      { label: "Manicure + Pedicure", value: "Advanced", included: true },
      { label: "Complete Grooming", value: "Full", included: true },
      { label: "Bridal Makeup", value: "HD Makeup", included: true },
      { label: "Bridal Hairstyle", value: "Included", included: true },
      { label: "Saree Draping", value: "1 Saree", included: true },
      { label: "Hair Accessories / Veil", value: "Included", included: true },
      { label: "Touch-Up Support", value: "Included", included: true },
      { label: "Post-Event Recovery", value: "—", included: false },
    ],
  },
  {
    id: "platinum-bride",
    name: "Platinum Bride",
    price: "₹65,999",
    priceNum: 65999,
    badge: "Royal Luxury",
    tagline: "The ultimate royal bridal luxury with Airbrush & post-event recovery",
    isPopular: false,
    features: [
      { label: "Pre-Bridal Consultation", value: "Included", included: true },
      { label: "Facial / Skin Care", value: "3 Sessions", included: true },
      { label: "Full-Body Detan", value: "3 Sessions", included: true },
      { label: "Body Polishing", value: "2 Sessions", included: true },
      { label: "Hair Spa / Treatment", value: "3 Sessions", included: true },
      { label: "Manicure + Pedicure", value: "Signature", included: true },
      { label: "Complete Grooming", value: "Complete", included: true },
      { label: "Bridal Makeup", value: "HD / Airbrush", included: true },
      { label: "Bridal Hairstyle", value: "Premium", included: true },
      { label: "Saree Draping", value: "Premium", included: true },
      { label: "Hair Accessories / Veil", value: "Premium", included: true },
      { label: "Touch-Up Support", value: "Included", included: true },
      { label: "Post-Event Recovery", value: "Included", included: true },
    ],
  },
];

export const bridalTimeline: BridalTimelineStep[] = [
  {
    timeline: "4–6 Weeks Before",
    title: "The Foundation",
    description: "Begin skin & hair care, detan, hair spa and grooming plan.",
  },
  {
    timeline: "2–3 Weeks Before",
    title: "Deep Nourishment",
    description: "Continue facial/skin treatments, body polishing and nail care.",
  },
  {
    timeline: "1 Week Before",
    title: "Refinement",
    description: "Final grooming, hair treatment and manicure/pedicure.",
  },
  {
    timeline: "1–2 Days Before",
    title: "Glow & Prep",
    description: "Final skin preparation and any agreed pre-makeup care.",
  },
  {
    timeline: "Wedding Day",
    title: "The Masterpiece",
    description: "Bridal makeup, hairstyling, saree draping, and veil or accessory setting.",
  },
];
