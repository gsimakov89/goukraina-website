# GO UKRAINA — Full Website Rebuild Prompt for Replit
## Paste this entire prompt into Replit AI Agent or a new Replit project

---

## OBJECTIVE

Build a complete, SEO-optimized nonprofit website for **Go Ukraina** (goukraina.org) — a California-based 501(c)(3) humanitarian nonprofit focused on Ukraine reconstruction, clean water, power infrastructure, and diaspora advocacy. The site must outperform competitors like United Help Ukraine (unitedhelpukraine.org) on Google search results for keywords like "Ukraine nonprofit donation", "Ukraine humanitarian aid California", "Ukraine clean water project", and "Ukraine reconstruction nonprofit US".

Build this as a **Next.js 14 app** (App Router) with TypeScript, Tailwind CSS, and full on-page SEO baked in from day one.

---

## TECH STACK

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **SEO**: next/metadata API, JSON-LD schema, sitemap.xml, robots.txt
- **Fonts**: Google Fonts — `Playfair Display` (headings) + `Source Sans 3` (body)
- **Icons**: lucide-react
- **Deployment target**: Vercel (but must run in Replit for development)
- **Image handling**: next/image with proper alt text on every image

---

## DESIGN DIRECTION

**Aesthetic**: Editorial/magazine — think The Atlantic meets a serious European NGO. Clean, authoritative, trustworthy. Ukrainian blue (#005BBB) and gold (#FFD700) as brand colors. White background. Heavy use of white space. Strong typographic hierarchy.

**Color palette (CSS variables)**:
```css
--brand-blue: #005BBB;
--brand-gold: #FFD700;
--brand-dark: #0D1B2A;
--brand-gray: #6B7280;
--brand-light: #F8F9FA;
--white: #FFFFFF;
```

**Fonts**:
- Headings: Playfair Display (serif, authoritative)
- Body: Source Sans 3 (clean, readable)

**Key UX rules**:
- Donate CTA button visible in navbar at all times (sticky header)
- Impact numbers (bold stats) visible above the fold on homepage
- Mobile-first responsive design
- Page load target: under 2 seconds
- No base64 placeholder images — use colored placeholder divs with proper aspect ratios and alt text if real images aren't available

---

## SITE STRUCTURE & PAGES

Build ALL of these pages:

### 1. `/` — Homepage
### 2. `/about` — About Us
### 3. `/initiatives/reh2o` — ReH2O Clean Water Project
### 4. `/initiatives/power-generators` — Power Generators
### 5. `/initiatives/modular-homes` — Modular Homes
### 6. `/initiatives/ukraine-dreamzzz` — Ukraine Dreamzzz Youth Program
### 7. `/summit` — Ukraine Reconstruction Summit
### 8. `/blog` — Blog index
### 9. `/blog/[slug]` — Individual blog post (dynamic route)
### 10. `/donate` — Donate page
### 11. `/impact` — Impact & Transparency
### 12. `/events` — Events
### 13. `/contact` — Contact Us
### 14. `/sitemap.xml` — Auto-generated sitemap
### 15. `/robots.txt` — Robots file

---

## SEO REQUIREMENTS (CRITICAL — implement all)

### A. Metadata for every page
Every page must export a `generateMetadata()` function or a `metadata` object. Example pattern:

```typescript
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Go Ukraina | Ukraine Humanitarian Aid Nonprofit | Los Angeles',
  description: 'Go Ukraina is a Los Angeles-based 501(c)(3) nonprofit delivering clean water, power generators, and reconstruction support to war-affected communities in Ukraine. Donate today.',
  keywords: ['Ukraine nonprofit', 'donate to Ukraine', 'Ukraine humanitarian aid', 'Ukraine clean water', 'Ukraine reconstruction', 'California Ukraine charity', '501c3 Ukraine'],
  openGraph: {
    title: 'Go Ukraina | Ukraine Humanitarian Aid Nonprofit',
    description: 'Delivering clean water, power, and reconstruction support to Ukraine.',
    url: 'https://www.goukraina.org',
    siteName: 'Go Ukraina',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Go Ukraina | Ukraine Humanitarian Aid',
    description: 'Delivering clean water, power, and reconstruction support to Ukraine.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://www.goukraina.org' },
}
```

**Page-specific titles and descriptions**:

| Page | Title | Description |
|------|-------|-------------|
| Home | Go Ukraina \| Ukraine Humanitarian Aid Nonprofit \| Los Angeles | Go Ukraina is a California-based 501(c)(3) delivering clean water, generators, and reconstruction aid to war-affected Ukraine. |
| About | About Go Ukraina \| Our Mission, Team & 501(c)(3) Status | Founded by Ukrainian-Americans, Go Ukraina channels donations into real projects: clean water, power, housing, and youth programs in Ukraine. |
| ReH2O | ReH2O Project \| Solar Clean Water Stations for Ukraine \| Go Ukraina | GoUkraina's ReH2O initiative deploys solar-powered reverse osmosis water purification stations across war-damaged Ukrainian communities. |
| Power Generators | Power Generator Aid for Ukraine \| Go Ukraina | Go Ukraina ships industrial power generators to Ukrainian hospitals, schools, and communities facing infrastructure attacks. |
| Modular Homes | Modular Homes for Ukraine \| Rebuilding Displaced Families \| Go Ukraina | Go Ukraina's modular housing program provides fast-deploy shelters for Ukrainians displaced by war. |
| Ukraine Dreamzzz | Ukraine Dreamzzz \| Youth Boxing & Opportunity Program \| Go Ukraina | Ukraine Dreamzzz brings war-affected Ukrainian youth — including foster-care graduates — to the US for training and opportunity. |
| Summit | Ukraine Reconstruction Summit \| Annual Conference \| Go Ukraina | The Ukraine Reconstruction Summit convenes 260+ investors, policymakers, and NGO leaders to accelerate Ukraine's recovery. |
| Blog | Ukraine Aid News & Updates \| Go Ukraina Blog | Follow Go Ukraina's field reports, project updates, and analysis on Ukraine reconstruction, clean water, and humanitarian aid. |
| Donate | Donate to Ukraine \| Support Go Ukraina's 501(c)(3) Nonprofit | Your tax-deductible donation funds solar water stations, power generators, and housing for war-affected Ukrainians. |
| Impact | Our Impact \| Go Ukraina Transparency & Financial Reports | Track Go Ukraina's measurable impact: water stations deployed, generators distributed, families served, and funds accountability. |
| Events | Events \| Go Ukraina | Upcoming Go Ukraina fundraisers, community events, and advocacy gatherings in Los Angeles and beyond. |
| Contact | Contact Go Ukraina \| Los Angeles, California | Reach Go Ukraina's team for partnerships, media inquiries, donations, and volunteer opportunities. |

### B. JSON-LD Structured Data
Create a `components/SchemaOrg.tsx` component. Include on every page:

```typescript
// components/SchemaOrg.tsx
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["NGO", "NonprofitOrganization"],
    "name": "Go Ukraina Inc.",
    "alternateName": "GoUkraina",
    "url": "https://www.goukraina.org",
    "logo": "https://www.goukraina.org/logo.png",
    "description": "Go Ukraina is a Los Angeles-based 501(c)(3) humanitarian nonprofit delivering clean water, power generators, and reconstruction support to war-affected Ukraine.",
    "foundingDate": "2022",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Los Angeles",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "telephone": "+13235326855",
    "email": "info@goukraina.com",
    "sameAs": [
      "https://www.instagram.com/goukraina/",
      "https://www.facebook.com/go.ukraina.inc/",
      "https://www.linkedin.com/company/go-ukraine-inc",
      "https://www.youtube.com/@goukrainafund"
    ],
    "knowsAbout": ["Ukraine humanitarian aid", "Ukraine reconstruction", "Clean water Ukraine", "Power generators Ukraine"],
    "areaServed": "Ukraine",
    "nonprofit501Status": "501(c)(3)"
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function EventSchema({ event }: { event: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": event.name,
    "startDate": event.startDate,
    "endDate": event.endDate,
    "location": {
      "@type": "Place",
      "name": event.venueName,
      "address": event.address
    },
    "organizer": {
      "@type": "Organization",
      "name": "Go Ukraina Inc.",
      "url": "https://www.goukraina.org"
    },
    "description": event.description
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export function ArticleSchema({ post }: { post: any }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "Go Ukraina Inc.",
      "logo": "https://www.goukraina.org/logo.png"
    },
    "description": post.excerpt
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
```

### C. Sitemap
Create `app/sitemap.ts`:
```typescript
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.goukraina.org'
  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/initiatives/reh2o`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/initiatives/power-generators`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/initiatives/modular-homes`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/initiatives/ukraine-dreamzzz`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/summit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/donate`, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${baseUrl}/impact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
```

### D. Robots.txt
Create `app/robots.ts`:
```typescript
import { MetadataRoute } from 'next'
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.goukraina.org/sitemap.xml',
  }
}
```

---

## COMPONENT ARCHITECTURE

Build these reusable components in `/components`:

```
components/
  layout/
    Header.tsx         ← Sticky nav with Donate button always visible
    Footer.tsx         ← Full footer with links, contact, social, 501c3 badge
    Layout.tsx         ← Wraps all pages
  seo/
    SchemaOrg.tsx      ← All JSON-LD schemas (above)
  ui/
    Button.tsx         ← Primary/secondary/ghost variants
    DonateButton.tsx   ← Always blue, prominent
    ImpactStat.tsx     ← Large number + label (e.g., "12 Water Stations Deployed")
    InitiativeCard.tsx ← Card for each program/initiative
    BlogCard.tsx       ← Blog post preview card
    EventCard.tsx      ← Event with date, location, CTA
    TestimonialCard.tsx
    HeroSection.tsx    ← Full-width hero with headline + CTA
    SectionHeader.tsx  ← Reusable h2 + subtitle
    TrustBar.tsx       ← 501(c)(3) badge + Charity Navigator + partner logos
```

---

## PAGE CONTENT SPECIFICATIONS

### Homepage (`/`)

**Hero Section**:
- H1: "Clean Water. Power. Shelter. Hope for Ukraine."
- Subheading: "Go Ukraina is a Los Angeles-based 501(c)(3) nonprofit delivering essential aid and rebuilding infrastructure in war-affected Ukraine."
- Two CTAs: [Donate Now] [See Our Impact]
- Background: Ukrainian wheat field or reconstruction photo (use a blue gradient placeholder if no image)

**Trust Bar** (immediately below hero):
- "501(c)(3) Certified Nonprofit" | "Founded 2022" | "Active in Ukraine" | "US-Ukraine Diaspora Led"

**Impact Numbers Section** (H2: "Our Impact in Numbers"):
- 12 Water Purification Stations Deployed
- 150+ Generators Distributed  
- 260+ Leaders at 2025 Reconstruction Summit
- $500K+ in Aid Delivered

**Initiatives Section** (H2: "What We Do"):
- Cards for: ReH2O Clean Water | Power Generators | Modular Housing | Ukraine Dreamzzz | Reconstruction Summit

**Featured Blog Posts** (H2: "From the Field"):
- 3 most recent posts

**Donate CTA Banner**: Full-width blue section — "Your Donation Saves Lives. 100% goes to Ukraine programs."

**Events Section**: Show next 2 upcoming events

**Newsletter Signup**

---

### ReH2O Page (`/initiatives/reh2o`)

This is your most SEO-valuable page. It needs to be LONG and detailed.

**H1**: "ReH2O: Solar-Powered Clean Water for War-Damaged Ukraine"

**Target keywords to use naturally throughout**: "Ukraine clean water project", "solar water purification Ukraine", "reverse osmosis Ukraine", "Ukraine water crisis nonprofit", "Borodianka water project"

**Sections**:
1. **The Crisis** — Ukraine's water infrastructure under attack; stats from WASH Cluster
2. **Our Solution** — Solar-powered reverse osmosis stations; how they work
3. **Pilot: Borodianka Hromada** — Specific location, results, photos/placeholders
4. **Scale Plan** — 150 stations nationwide; funding strategy
5. **Partners** — WASH Cluster collaboration, Ukrainian State Agency of Reconstruction
6. **Impact Data** — Units deployed, people served, liters purified
7. **Fund the Next Station** — Embedded donate CTA with specific ask: "$15,000 funds one water station"

Include `ArticleSchema` JSON-LD on this page treating it as a long-form informational article.

---

### Summit Page (`/summit`)

**H1**: "Ukraine Reconstruction Summit — From War to Renaissance"

**Target keywords**: "Ukraine reconstruction conference", "Ukraine investment summit", "Ukraine rebuild nonprofit event"

**Content**:
- 2025 Summit recap: MGM National Harbor, Washington DC, September 13–14, 260+ attendees
- Theme: "From War to Renaissance"
- Who attends: investors, policymakers, NGO leaders, diaspora community
- Co-Chairman: German Simakovski | Olena Simakovski
- 2026 Summit: announce/tease with email capture form
- Photo gallery section (placeholders)
- Press/media mentions section

Include `EventSchema` JSON-LD.

---

### Impact Page (`/impact`)

**H1**: "Transparency & Impact — Where Your Donation Goes"

This page is critical for Google's E-E-A-T (Experience, Expertise, Authoritativeness, Trustworthiness) algorithm.

**Sections**:
1. **Impact Dashboard** — Visual stats (water stations, generators, people served)
2. **Financial Transparency** — Link to 990 filings, expense breakdown
3. **501(c)(3) Status** — EIN number, verification link
4. **Program Breakdown** — % of donations to each initiative
5. **Field Reports** — Links to detailed blog reports
6. **Partners & Validators** — WASH Cluster, Ukrainian State Agency, Lives Amplified

---

## HEADER COMPONENT (DETAILED)

```typescript
// components/layout/Header.tsx
// Sticky header, transparent on hero, white on scroll
// Mobile hamburger menu
// Nav items: About | Our Work (dropdown) | Summit | Blog | Impact | Events
// Right side: [Contact] [Donate Now →] (blue button, always visible)
// Dropdown under "Our Work": ReH2O | Generators | Modular Homes | Ukraine Dreamzzz
```

The header must use `position: sticky; top: 0; z-index: 50` and add a white background + shadow on scroll using a scroll event listener.

---

## FOOTER COMPONENT (DETAILED)

Four columns:
1. **Logo + Mission** — Short mission statement + social icons
2. **Programs** — Links to all initiative pages
3. **Organization** — About, Impact, Summit, Blog, Contact
4. **Contact & Legal** — Address (Los Angeles, CA), phone, email, 501(c)(3) badge, EIN

Bottom bar: "© 2026 Go Ukraina Inc. All Rights Reserved | 501(c)(3) Tax-Exempt Organization | EIN: [number] | [Privacy Policy] [Terms]"

---

## BLOG SYSTEM

Create a simple MDX or JSON-based blog system:

```typescript
// lib/posts.ts
export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  excerpt: string
  content: string
  tags: string[]
  coverImage: string
  readTime: string
}

// Pre-populate with these 3 existing posts as data:
const posts: BlogPost[] = [
  {
    slug: 'ukraine-water-crisis-wash-cluster',
    title: 'Addressing the Water Crisis in Ukraine: Go Ukraina and the WASH Cluster',
    date: '2024-12-05',
    author: 'German Simakovski',
    excerpt: 'The ongoing conflict has severely disrupted clean water access across Ukraine. Go Ukraina is partnering with the WASH Cluster to deploy solar-powered purification stations.',
    tags: ['water', 'ReH2O', 'WASH Cluster', 'Ukraine crisis'],
    readTime: '3 min read',
    // ... full content
  },
  {
    slug: 'ukrainian-pows-humanitarian-crisis',
    title: 'The Humanitarian Crisis: Treatment of Ukrainian POWs and Civilians in Russian Detention',
    date: '2024-11-18',
    author: 'German Simakovski',
    excerpt: 'UN reports document systematic violations against Ukrainian prisoners and civilians in Russian detention.',
    tags: ['humanitarian', 'human rights', 'POW', 'advocacy'],
    readTime: '3 min read',
  },
  {
    slug: 'clean-water-war-affected-regions',
    title: 'Go Ukraina & ReH2O Provide Clean Water to War-Affected Regions',
    date: '2024-10-03',
    author: 'German Simakovski',
    excerpt: 'As a partner of the Ukraine Trade Mission, Go Ukraina and ReH2O have deployed water purification solutions to communities in Borodianka and surrounding areas.',
    tags: ['ReH2O', 'clean water', 'reconstruction', 'Borodianka'],
    readTime: '4 min read',
  }
]
```

Blog index (`/blog`): Show all posts as cards with tag filtering.

Blog post (`/blog/[slug]`): Full article with:
- H1 = post title
- Author + date + read time
- Social share buttons
- Related posts
- Donate CTA sidebar
- `ArticleSchema` JSON-LD

---

## DONATE PAGE (`/donate`)

This page must convert. Build it as a focused landing page:

**H1**: "Fund Ukraine's Recovery — Tax-Deductible Donations"

**Sections**:
1. Giving tiers with impact descriptions:
   - $25 — Supplies clean water to a family for one month
   - $100 — Powers a generator for one week at a hospital
   - $500 — Partially funds a modular home component
   - $1,000 — Co-funds a full water purification unit
   - $15,000 — Deploys one complete ReH2O water station
2. External donation link button → GoFundMe or direct payment processor
3. Other ways to give: wire transfer, stock donations, corporate matching
4. 501(c)(3) reminder: "Your donation is tax-deductible. EIN: [number]"

---

## IMAGE HANDLING RULES

Since real images may not be available in Replit:

1. Never use base64 SVG placeholders
2. Use `next/image` with `width`, `height`, and descriptive `alt` text on every image
3. For missing images, use a styled div placeholder:
```tsx
<div 
  className="w-full aspect-video bg-gradient-to-br from-blue-900 to-blue-700 rounded-lg flex items-center justify-center"
  role="img"
  aria-label="Go Ukraina volunteers distributing generators in Kharkiv, Ukraine"
>
  <span className="text-white/40 text-sm">Photo: [description]</span>
</div>
```
4. Every `<img>` or `<Image>` must have a descriptive alt tag — never empty, never "image"

---

## PERFORMANCE & TECHNICAL SEO

1. Use `next/font` for Google Fonts (not CDN link) — avoids render-blocking
2. All images must use `next/image` with `priority` on above-the-fold images
3. Use React Server Components by default; only use `'use client'` where needed
4. Lazy load below-fold content
5. Minimize client-side JavaScript
6. Add `<link rel="preconnect">` for external domains in root layout

---

## ROOT LAYOUT

```typescript
// app/layout.tsx
import { Playfair_Display, Source_Sans_3 } from 'next/font/google'
import { OrganizationSchema } from '@/components/seo/SchemaOrg'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const playfair = Playfair_Display({ 
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap'
})

const sourceSans = Source_Sans_3({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sourceSans.variable}`}>
      <body>
        <OrganizationSchema />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

---

## PACKAGE.JSON DEPENDENCIES

```json
{
  "dependencies": {
    "next": "^14.2.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "lucide-react": "^0.400.0",
    "clsx": "^2.1.0",
    "tailwind-merge": "^2.3.0"
  },
  "devDependencies": {
    "typescript": "^5.4.0",
    "@types/node": "^20.0.0",
    "@types/react": "^18.3.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

---

## REPLIT-SPECIFIC SETUP NOTES

1. Create a `.replit` file:
```
run = "npm run dev"
[nix]
channel = "stable-23_11"
```

2. Use port 3000 for Next.js dev server

3. Set environment variable in Replit Secrets:
```
NEXT_PUBLIC_SITE_URL=https://www.goukraina.org
```

4. The site should run with `npm install && npm run dev`

---

## WHAT TO BUILD FIRST (PRIORITY ORDER)

1. Root layout + Header + Footer
2. Homepage (most traffic, most important)
3. ReH2O page (highest SEO keyword value)
4. Summit page (unique content, high authority)
5. Donate page (conversion goal)
6. About page
7. Impact/Transparency page
8. Blog system
9. All remaining initiative pages
10. Sitemap + robots.txt

---

## QUALITY CHECKLIST (verify before done)

- [ ] Every page has unique `<title>` tag (50-60 chars)
- [ ] Every page has unique meta description (150-160 chars)
- [ ] `OrganizationSchema` JSON-LD on every page
- [ ] `ArticleSchema` on all blog posts
- [ ] `EventSchema` on summit and events pages
- [ ] All images have descriptive `alt` text
- [ ] No broken internal links
- [ ] sitemap.xml accessible at /sitemap.xml
- [ ] robots.txt accessible at /robots.txt
- [ ] Open Graph tags on all pages
- [ ] Donate CTA visible without scrolling on mobile
- [ ] Header is sticky and always shows Donate button
- [ ] Footer includes 501(c)(3) status and EIN
- [ ] No base64 SVG placeholders
- [ ] Canonical URLs set on all pages
- [ ] Blog posts have author + date (E-E-A-T signals)
- [ ] Impact page shows financial transparency
