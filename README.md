# S For Swag — The Salon by Seematti

> **Your Beauty. Your Style. Your Swag.**  
> A premium, fully responsive, SEO-optimized static website for **S For Swag**, a luxury unisex salon and bridal beauty destination located opposite Seematti on Mahatma Gandhi Road, Kochi, Kerala, India.

---

## 1. Tech Stack Overview

- **Framework**: [Astro 5+](https://astro.build/) with TypeScript for static site generation (zero runtime JavaScript overhead for content pages).
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with a custom luxury beauty editorial palette (`#F7F0E4` cream, `#EFE2CE` beige, `#A77A3F` gold, `#4A321C` deep brown).
- **Typography**: Google Fonts — *Cormorant Garamond* (editorial serif headings) and *Plus Jakarta Sans* (clean modern body sans).
- **Interactions**: Semantic HTML5 and vanilla JavaScript (mobile menu drawer, accessible gallery lightbox, appointment validation).
- **SEO & Structured Data**: Built-in `@astrojs/sitemap`, Open Graph metadata, canonical URLs, and Schema.org `BeautySalon` / `LocalBusiness` + `BreadcrumbList` JSON-LD schemas.
- **Appointment Enquiries**: Configured for [Formspree](https://formspree.io) with client-side validation, spam honeypot (`_gotcha`), accessible error/loading states, and graceful development fallback.

---

## 2. Implemented Routes & Site Architecture

All 23 required routes are statically pre-rendered with descriptive, lowercase URLs:

| Route | Page Title / Description |
| :--- | :--- |
| `/` | Homepage (Editorial Hero, About Us, 5 Service Arches, Experience Workflow, Bridal Banner, Contact) |
| `/about/` | Brand story, philosophy, interior ambiance, Seematti heritage, and core pillars |
| `/services/` | Master salon directory with category cards and brochure pricing policy |
| `/beauty-lounge/` | Skincare, facials, waxing, grooming, and manicure/pedicure overview |
| `/beauty-lounge/manicure/` | Express, Classic Spa, Advanced, and Signature Manicure pricing |
| `/beauty-lounge/pedicure/` | Express, Classic Spa, Advanced, and Signature Pedicure pricing |
| `/beauty-lounge/waxing/` | Stripless hard wax (face & underarms) and strip wax (limbs & body) |
| `/beauty-lounge/facials/` | Clean ups (from ₹800) and luxury facials (up to Natural Facial ₹5,000) |
| `/beauty-lounge/grooming/` | Precision threading (brows ₹100, full face ₹450) and face/body detan |
| `/nail-studio/` | Nail extensions, overlays, and bespoke couture nail artistry |
| `/nail-studio/nail-services/` | Gel extensions (₹3,500), French tips, gel polish, and refills |
| `/nail-studio/nail-addons/` | Chrome (₹1,500++), Cat Eye (₹500++), Ombré, Glitter, and 3D art |
| `/hair-artistry-spa/` | Complete hair care for men & women, treatments, colour, and texture |
| `/hair-artistry-spa/hair-treatment/` | Hot oil, L'Oréal spa, bond strengthening, filler therapy for men & women |
| `/hair-artistry-spa/hair-colouring/` | Root touch-ups, Global colour, hand-painted Balayage (₹6,000++), Ombré |
| `/hair-artistry-spa/hair-transformation/` | Botox (₹8,500), Cysteine, Nanoplasty, smoothing, and Fusio Dose rituals |
| `/body-wellness-spa/` | Body wellness spa overview and therapeutic massage menu |
| `/body-wellness-spa/body-massage/` | Aroma Bliss, Swedish, Deep Tissue (60/90 mins), Foot reflexology, Head massage |
| `/bridal/` | Master bridal studio destination by Seematti |
| `/bridal/packages/` | Silver Bride (₹25,999), Gold Bride (₹45,999), Platinum Bride (₹65,999) matrix |
| `/bridal/makeup-and-hair/` | Traditional/HD makeup (₹15,000++), Airbrush (₹25,000++), bridal hairstyles |
| `/bridal/draping/` | Regular & bridal saree draping, Kerala Set Saree draping, veil setting |
| `/gallery/` | Categorized editorial masonry gallery with accessible vanilla lightbox |
| `/contact/` | Official contact information, directions link, and appointment booking form |
| `/privacy-policy/` | Guest data privacy, appointment communication, and data retention policy |
| `/404/` | Custom luxury 404 page with navigation fallbacks |

---

## 3. Getting Started & Development

### Prerequisites
- Node.js `v20+` or `v22+`
- npm `v10+`

### Installation
```bash
# Clone the repository
git clone https://github.com/your-org/sforswag.git
cd sforswag

# Install dependencies
npm install
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Set your `FORMSPREE_ENDPOINT` URL (e.g. `https://formspree.io/f/mwpkxyz`).

### Running the Dev Server
In accordance with project development rules, launch the server in background mode:
```bash
npx astro dev --background
```
To check logs or manage the dev server:
```bash
npx astro dev status
npx astro dev logs
npx astro dev stop
```

---

## 4. Production Build & Static Output

Generate static HTML and production assets:
```bash
npm run build
```
Static artifacts will be generated in `dist/`.

To preview the production build locally:
```bash
npm run preview
```

---

## 5. Deployment Guide

### Deploying to Vercel
1. Push the code to a GitHub repository.
2. In the [Vercel Dashboard](https://vercel.com/), click **Add New Project** and import the repository.
3. Vercel automatically detects Astro. Confirm the build command `astro build` and output directory `dist`.
4. Add environment variables under **Project Settings > Environment Variables**:
   - `FORMSPREE_ENDPOINT`: `https://formspree.io/f/<your-id>`
   - `PUBLIC_SITE_URL`: `https://sforswag.com`
5. Click **Deploy**.

### Deploying to Cloudflare Pages
1. In Cloudflare Pages, select **Connect to Git**.
2. Set Build configuration:
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
3. Add environment variable `FORMSPREE_ENDPOINT` in **Settings > Environment Variables**.
4. Save and Deploy.

---

## 6. Official Salon Information (Source of Truth)

- **Brand**: S For Swag — The Salon by Seematti
- **Tagline**: Your Beauty. Your Style. Your Swag.
- **Telephone**: `+91 90610 77722`
- **Email**: `sforswagsalon@gmail.com`
- **Instagram**: `@sforswag_thesalon` ([instagram.com/sforswag_thesalon](https://instagram.com/sforswag_thesalon))
- **Address**: First Floor, 66/4990, Narayan Center, Mahatma Gandhi Road, Opp. Seematti, Kacheripady, Kochi, Ernakulam, Kerala – 682018
