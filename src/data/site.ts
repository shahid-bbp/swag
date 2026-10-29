export interface SiteConfig {
  name: string;
  legalName: string;
  tagline: string;
  subtitle: string;
  byLine: string;
  description: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  instagram: string;
  instagramUrl: string;
  facebookUrl?: string;
  address: {
    floor: string;
    building: string;
    street: string;
    landmark: string;
    area: string;
    city: string;
    district: string;
    state: string;
    pincode: string;
    full: string;
  };
  mapsUrl: string;
  whatsappNumber: string;
  whatsappMessage: string;
  whatsappUrl: string;
  openingHoursNote: string;
  pricingDisclaimer: string;
  siteUrl: string;
  brochureUrl: string;
  whatsappBrochureUrl: string;
}

export const siteConfig: SiteConfig = {
  name: "S For Swag",
  legalName: "S For Swag — The Premium Unisex Salon",
  tagline: "Your Beauty. Your Style. Your Swag.",
  subtitle: "More Than Just a Salon — It's a Beautiful Experience",
  byLine: "BY SEEMATTI",
  description:
    "S For Swag is a luxury unisex salon and bridal beauty destination on MG Road, Kochi, Kerala. Offering bespoke hair artistry, couture bridal styling, skin care, nail art, and therapeutic body wellness.",
  phone: "+919061077722",
  phoneFormatted: "+91 90610 77722",
  email: "sforswagsalon@gmail.com",
  instagram: "@sforswag_thesalon",
  instagramUrl: "https://instagram.com/sforswag_thesalon",
  facebookUrl: "https://facebook.com/sforswagsalon",
  address: {
    floor: "First Floor",
    building: "Urban Junction (66/4990)",
    street: "Mahatma Gandhi Road",
    landmark: "Opp. Seematti, Kacheripady",
    area: "Kacheripady",
    city: "Kochi",
    district: "Ernakulam",
    state: "Kerala",
    pincode: "682018",
    full: "First Floor, 66/4990, Urban Junction, Mahatma Gandhi Road, Opp. Seematti, Kacheripady, Kochi, Ernakulam, Kerala – 682018",
  },
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Narayan+Center+Opp+Seematti+Mahatma+Gandhi+Road+Kacheripady+Kochi+Kerala+682018",
  whatsappNumber: "919061077722",
  whatsappMessage: "Hello S For Swag, I would like to enquire about an appointment.",
  get whatsappUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      this.whatsappMessage
    )}`;
  },
  brochureUrl: "/brochure/s-for-swag-salon-brochure.pdf",
  get whatsappBrochureUrl() {
    return `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(
      "Hello S For Swag, I would like to request the full salon brochure and service details."
    )}`;
  },
  openingHoursNote:
    "Operating hours to be confirmed with appointment booking. Early morning bridal appointments available on request.",
  pricingDisclaimer:
    "Services and treatments are customised based on individual requirements, hair length, texture, and service complexity. Details and care plans are confirmed with our specialists during consultation prior to your service. GST, if applicable, may be charged separately.",
  siteUrl: "https://sforswag.com",
};

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
];

export const serviceCategoryLinks = [
  { label: "Beauty Lounge", href: "/beauty-lounge/" },
  { label: "Nail Studio", href: "/nail-studio/" },
  { label: "Hair Artistry & Spa", href: "/hair-artistry-spa/" },
  { label: "Men's Grooming", href: "/hair-artistry-spa/mens-hair-care/" },
  { label: "Body Wellness Spa", href: "/body-wellness-spa/" },
  { label: "Bridal Studio & Packages", href: "/bridal/" },
];
