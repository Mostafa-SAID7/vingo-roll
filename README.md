# Vingo Roll Studio

frontend as a
production-grade Next.js App Router ecommerce experience for premium
curtains, blinds, shades, drapery, and custom window treatments.

This is a frontend-only project: - No backend. - No database. - No
real API. - All commerce, catalog, reviews, inspiration, services, and
account data remain static/mock data. - Client-side state may use
localStorage. - Preserve every existing feature and route concept from
the original project while improving information architecture, UX,
accessibility, responsiveness, SEO, performance, and visual quality.

The result should feel like a premium interior-design brand rather than
a generic ecommerce template.

The original specification is the starting point, but its Vite/React
Router architecture must not be copied literally. Next.js App Router
conventions replace the old pages/, App.tsx, and router.tsx
structure.

1. Product & Brand Direction

Brand

Vingo Roll is a premium window-treatment ecommerce and
design-service brand.

Core product families: - Curtains - Blackout curtains - Sheer curtains -
Thermal curtains - Drapery - Roller shades - Roman shades - Blinds -
Wood / woven treatments - Designer collections - Smart / motorized
window treatments - Sale / seasonal collections

The site must support two complementary customer journeys:

Journey A --- Shop directly

Home → category → product → configure → cart → checkout-style frontend
flow

Journey B --- Get help designing

Home → inspiration / shop by room → discover treatment → swatches →
measuring guide → consultation → custom quote

The second journey is important. Premium window-treatment businesses
commonly reduce purchase friction with: - free/ordered material
swatches - professional measuring - installation services - design
consultation - room-based discovery - photo galleries / inspiration -
quick quote workflows - customization guidance

These concepts should become first-class UX, not hidden footer links.

2. Research-Informed Feature Expansion

Use these as product requirements, not as claims that Vingo Roll
currently offers every service.

A. Swatch Experience

Create a dedicated /swatches experience.

Requirements: - Browse fabric/material swatches. - Filter by material,
color family, light filtering, room, style. - Add swatches to a
temporary swatch tray. - Swatch tray persists in localStorage. -
Limit/validate selection count in mock UX. - Request-swatch form with
success state. - Explain why physical samples help. - Show close-up
material photography. - Include "Compare selected swatches" interaction
where useful.

The experience should feel tactile and editorial.

B. Measuring Center

Create /guides/measuring.

Include: - Curtain measurement guide. - Blind/shade measurement guide. -
Inside mount vs outside mount. - Width and height instructions. -
Measurement checklist. - Printable-style worksheet UI. - Visual
diagrams. - Common mistakes. - "Not sure? Book professional measuring"
CTA.

Do not present measurements as real engineering advice unless the UI
clearly labels them as general guidance.

C. Design Consultation

Create /services/design-consultation.

Support: - In-home consultation - Virtual/video consultation - Showroom
consultation - Project description - Preferred date/time - Room type -
Product interest - Contact information - Confirmation state

No backend submission is required. Simulate the frontend flow.

D. Measurement & Installation

Create /services/measuring-installation.

Explain: 1. Choose your treatment. 2. Measure or request professional
measurement. 3. Confirm design. 4. Place order / request quote. 5.
Installation.

Provide: - service cards - process timeline - FAQ - CTA to consultation

E. Quick Quote

Create /quote.

Frontend-only quote builder: - treatment type - room - approximate
dimensions - mounting style - fabric/material tier -
lining/light-control preference - quantity - optional motorization -
summary - indicative/mock price range - request quote CTA

Clearly label estimates as indicative/mock because there is no backend
pricing engine.

F. Shop by Room

Create /inspiration/rooms.

Room categories: - Living Room - Bedroom - Dining Room - Home Office -
Kids Room - Kitchen - Bathroom - Patio / Outdoor

Each room should connect inspiration → treatment type → products.

G. Shop by Need

Create /shop/needs.

Needs: - Blackout - Privacy - Heat control - Light filtering - Noise
reduction - Easy installation - Smart/motorized - Small windows - Large
windows

H. Style Finder

Create /style-finder.

A short multi-step frontend quiz: - room - desired mood - light
preference - privacy - color direction - material preference - style

Return recommended product categories and curated products.

Persist quiz answers only if useful.

I. Inspiration Gallery

Create: - /inspiration - /inspiration/[slug]

Features: - editorial masonry/grid gallery - room filters - style
filters - treatment filters - inspiration detail - products used /
related products - save to wishlist - CTA to shop the look

J. Designer Collections

Create /collections.

Support curated collections: - Designer - Natural textures - Minimal -
Classic - Contemporary - Seasonal

Each collection has: - hero - story - editorial image - product grid -
related inspiration

K. Smart Home

Create /smart-home.

Explain: - motorized shades - remote control - schedules - room scenes -
child-safe positioning - mock compatibility badges

Do not claim actual device compatibility unless it exists in the data.

L. Trade / Designer Portal Landing

Create /trade.

Frontend-only marketing page for: - interior designers - architects -
hospitality - developers

Include: - benefits - material access - project assistance -
consultation CTA - application form UI

M. Sample / Service Trust Layer

Surface trust information near conversion points: - material/sample
guidance - measuring guidance - installation help - care instructions -
shipping information - returns/custom-order policy - warranty
information where mock data supports it - contact/help CTA

3. Next.js Architecture

Use Next.js App Router, not React Router.

Use current Next.js conventions: - app/ routing - nested
layout.tsx - route groups - dynamic routes [slug] - loading.tsx -
error.tsx - not-found.tsx - generateMetadata - sitemap.ts -
robots.ts - next/image - next/font - Server Components by
default - Client Components only where interaction/state requires them -
Link for navigation - useRouter, useSearchParams, etc. only in
client components where necessary - Suspense boundaries for
interactive/heavy sections - static rendering wherever possible

Do not create: - src/pages - React Router - App.tsx - router.tsx -
unnecessary API routes - backend services

4. Target Folder Structure

src/
├── app/
│   ├── layout.tsx
│   ├── globals.css
│   ├── not-found.tsx
│   ├── error.tsx
│   ├── loading.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   │
│   ├── (storefront)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx
│   │   │   ├── [category]/
│   │   │   │   └── page.tsx
│   │   │   └── needs/
│   │   │       └── page.tsx
│   │   ├── product/
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       ├── loading.tsx
│   │   │       └── not-found.tsx
│   │   ├── collections/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── inspiration/
│   │   │   ├── page.tsx
│   │   │   ├── rooms/
│   │   │   │   └── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── style-finder/
│   │   │   └── page.tsx
│   │   ├── swatches/
│   │   │   └── page.tsx
│   │   ├── quote/
│   │   │   └── page.tsx
│   │   ├── cart/
│   │   │   └── page.tsx
│   │   ├── wishlist/
│   │   │   └── page.tsx
│   │   ├── search/
│   │   │   └── page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx
│   │   │   ├── design-consultation/
│   │   │   └── measuring-installation/
│   │   ├── guides/
│   │   │   ├── page.tsx
│   │   │   ├── measuring/
│   │   │   ├── care/
│   │   │   ├── shipping/
│   │   │   └── returns/
│   │   ├── smart-home/
│   │   │   └── page.tsx
│   │   ├── trade/
│   │   │   └── page.tsx
│   │   ├── about/
│   │   │   ├── page.tsx
│   │   │   └── our-story/
│   │   └── contact/
│   │       └── page.tsx
│   │
│   ├── (account)/
│   │   └── account/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── orders/
│   │       ├── saved-designs/
│   │       └── profile/
│   │
│   └── legal/
│       ├── privacy/
│       ├── terms/
│       ├── cookies/
│       └── accessibility/
│
├── components/
│   ├── ui/
│   │   └── shadcn components
│   ├── layout/
│   ├── navigation/
│   ├── product/
│   ├── cart/
│   ├── wishlist/
│   ├── swatches/
│   ├── inspiration/
│   ├── services/
│   ├── quote/
│   ├── forms/
│   └── common/
│
├── features/
│   ├── catalog/
│   ├── product-detail/
│   ├── cart/
│   ├── wishlist/
│   ├── search/
│   ├── swatches/
│   ├── style-finder/
│   ├── inspiration/
│   ├── consultation/
│   ├── quote/
│   └── account/
│
├── data/
│   ├── products.ts
│   ├── categories.ts
│   ├── collections.ts
│   ├── rooms.ts
│   ├── needs.ts
│   ├── swatches.ts
│   ├── inspiration.ts
│   ├── reviews.ts
│   ├── testimonials.ts
│   ├── faqs.ts
│   ├── services.ts
│   ├── navigation.ts
│   └── index.ts
│
├── store/
│   ├── cart-store.ts
│   ├── wishlist-store.ts
│   ├── swatch-store.ts
│   ├── ui-store.ts
│   └── index.ts
│
├── hooks/
│   ├── use-product-filters.ts
│   ├── use-search.ts
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   └── index.ts
│
├── lib/
│   ├── utils.ts
│   ├── constants.ts
│   ├── motion.ts
│   ├── formatters.ts
│   ├── validators.ts
│   └── seo.ts
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── cart.ts
│   ├── swatch.ts
│   ├── inspiration.ts
│   ├── service.ts
│   └── common.ts
│
└── providers/
    ├── theme-provider.tsx
    └── client-providers.tsx

5. Routing Rules

Prefer semantic URLs:

/
/shop
/shop/blackout-curtains
/shop/sheers
/shop/thermal-curtains
/shop/roller-shades
/shop/roman-shades
/shop/needs/blackout
/product/[slug]
/collections/[slug]
/inspiration
/inspiration/rooms
/inspiration/[slug]
/style-finder
/swatches
/quote
/services
/services/design-consultation
/services/measuring-installation
/guides/measuring
/guides/care
/smart-home
/trade
/cart
/wishlist
/search
/account

Do not create multiple URLs for the same conceptual page.

Use query parameters for filtering/sorting/search when appropriate:

/shop?color=beige&material=linen&light=blackout&sort=featured
/search?q=linen

Filters must be shareable/bookmarkable where practical.

6. Rendering Strategy

Default to Server Components.

Use Client Components only for: - Zustand subscriptions - filters with
interactive state - product configurators - quantity selectors -
wishlist buttons - cart actions - dialogs/sheets - theme toggle - mobile
navigation - forms requiring client validation - style-finder steps -
swatch tray - image galleries requiring interactive controls

Do not add "use client" at the page level unless necessary.

Keep page files primarily composition.

7. UI System --- shadcn/ui

Use shadcn/ui as the base component system.

Prefer: - Button - Card - Badge - Dialog - Drawer / Sheet - Tabs -
Accordion - Breadcrumb - Dropdown Menu - Navigation Menu - Select -
Checkbox - Radio Group - Slider - Input - Textarea - Form - Tooltip -
Skeleton - Separator - Scroll Area - Command - Carousel where useful

Do not blindly use every shadcn component.

Create domain components on top of shadcn primitives.

8. Brand Theme

The old purple/pink theme is intentionally replaced with a premium
warm brown / espresso / sand visual system.

Light theme direction

Warm ivory background

Cream surfaces

Espresso text

Walnut / cocoa primary

Bronze accent

Muted taupe borders

Soft sand secondary surfaces

Suggested design tokens:

background: warm ivory
foreground: deep espresso
primary: dark walnut
primary-foreground: warm ivory
secondary: sand
accent: muted bronze
muted: warm taupe
border: beige/taupe

Dark theme direction

Near-black espresso background

Dark cocoa surfaces

Warm ivory text

Bronze highlights

Muted caramel secondary surfaces

Do not make dark mode a simple inversion of light mode.

Both themes must be deliberately designed.

Use CSS variables compatible with shadcn theming.

Use next-themes for light/dark/system preference.

Persist theme choice.

Avoid pure #000 and pure #fff unless required for accessibility or
image content.

9. Typography

Use next/font.

Preferred direction: - elegant editorial serif for display headings -
clean modern sans-serif for UI/body

Example direction: - Display: Cormorant Garamond / DM Serif Display
style - UI: Inter / Geist style

Do not overuse the serif font.

Typography hierarchy should create a luxury editorial feeling while
remaining highly readable.

10. Cinematic Visual Language

The site should feel cinematic, calm, tactile, and expensive.

Use: - large editorial photography - full-bleed hero imagery - soft
image overlays - layered content - generous whitespace - slow reveal
animations - subtle parallax only where useful - image scale
transitions - hover image swaps - elegant section transitions -
restrained gradients - thin borders - warm shadows - large typography -
asymmetrical editorial grids where appropriate

Avoid: - excessive glassmorphism - neon gradients - excessive rounded
cards - dashboard-like UI - animation everywhere - aggressive bounce
effects - generic SaaS aesthetics - giant text that destroys usability

Motion must support the brand story.

11. Motion System

Create reusable motion definitions in lib/motion.ts.

Examples:

fadeIn
fadeUp
fadeDown
scaleIn
imageReveal
staggerChildren
softHover
pageTransition

Rules: - subtle - fast enough for ecommerce - respect
prefers-reduced-motion - no blocking animation - avoid layout shift -
avoid animating expensive properties unnecessarily

Use CSS transitions where Framer Motion is unnecessary.

12. Image Strategy

Images are a major part of the product.

Use next/image.

Prefer: - local optimized images in /public/images - meaningful image
filenames - correct aspect ratios - explicit sizes - responsive
sizes - lazy loading below the fold - priority only for true LCP
images

Create image slots rather than random images.

Required image categories

/public/images/
├── brand/
├── hero/
├── products/
├── products/detail/
├── fabrics/
├── swatches/
├── rooms/
├── inspiration/
├── collections/
├── services/
├── guides/
└── editorial/

Every important image needs: - intentional crop - meaningful alt text -
mobile-safe composition - light/dark overlay consideration

Do not use unrelated stock imagery merely to fill empty space.

If an image is unavailable, use a clearly marked placeholder rather than
silently using a random image.

13. Image Shot List

The implementation should request/source/create imagery for these slots:

Homepage

Cinematic living room with floor-to-ceiling curtains.

Close-up linen fabric texture.

Elegant bedroom blackout treatment.

Natural woven shade in daylight.

Designer detail / hardware close-up.

Editorial room collage.

Product detail

Main installed product.

Alternate room view.

Close fabric texture.

Hardware/detail.

Light-filtering comparison.

Dimension/detail diagram if applicable.

Swatches

Individual material macro shots.

Grouped palette shots.

Hand-held swatch editorial shot.

Inspiration

Living room

Bedroom

Dining room

Office

Minimal interior

Warm natural interior

Luxury contemporary interior

Services

Designer consultation.

Measuring process.

Installation detail.

Material selection.

14. Product Data Model

Use a normalized, typed model.

type Product = {
  id: string
  slug: string
  name: string
  shortDescription: string
  description: string
  categoryId: string
  collectionId?: string
  price: number
  compareAtPrice?: number
  currency: string
  rating: number
  reviewCount: number
  images: ProductImage[]
  materials: MaterialOption[]
  colors: ColorOption[]
  sizes: SizeOption[]
  features: string[]
  specifications: Record<string, string>
  lightControl?: "sheer" | "light-filtering" | "blackout"
  roomTypes?: string[]
  needs?: string[]
  styleTags?: string[]
  installation?: "diy" | "professional" | "both"
  motorized?: boolean
  stockStatus: StockStatus
  featured?: boolean
  bestseller?: boolean
  newArrival?: boolean
  sale?: boolean
}

Never hardcode product arrays inside pages.

15. Product Detail Requirements

A product page should include:

Breadcrumb

Product gallery

Product title

Rating/reviews

Price

Compare-at price if applicable

Availability

Material/fabric selection

Color selection

Size/dimensions

Mounting options where relevant

Lining/light-control options

Quantity

Add to cart

Wishlist

Request sample / swatch CTA

Measuring guidance

Shipping/returns/trust information

Product description

Specifications

Reviews

FAQ

Related products

Shop-the-room / inspiration

Consultation CTA

For customizable products, use a step-based configuration UI rather than
one giant form.

16. Catalog UX

Shop/category pages must support:

search

category filters

material

color

price range

light control

room

style

needs

motorization

availability

sort

grid density

pagination or progressive loading

empty state

skeleton state

Mobile: - filters open in Sheet/Drawer - sticky sort/filter controls -
no horizontal overflow - cards remain readable

Desktop: - sidebar or sophisticated filter rail - product grid - sticky
controls only where useful

17. Search

Create a polished /search experience.

Features: - query input - instant suggestions - recent searches -
category suggestions - product suggestions - inspiration suggestions -
empty state - typo-tolerant mock matching - URL query synchronization

Search should feel like a premium command/search experience, not a plain
form.

Use shadcn Command where appropriate.

18. Cart & Wishlist

Use Zustand with persistence.

Cart: - add - remove - update quantity - clear - subtotal - estimated
shipping - promotional mock message - recommendations - empty state

Wishlist: - add/remove - persisted - empty state - move to cart -
product grid

Do not prop-drill global cart/wishlist state.

19. Swatch Store

Create a separate persisted Zustand store.

Capabilities: - add swatch - remove swatch - clear - selected count -
compare - request

Keep product cart state and swatch state separate.

20. Forms

Use: - React Hook Form - Zod - shadcn Form components

Apply consistently to: - contact - consultation - quote - swatch
request - trade application - newsletter - style finder where useful

Frontend-only forms should have: - validation - disabled/loading state -
success state - error state - accessible labels - keyboard support

No real API call.

21. SEO

Use Next.js metadata APIs.

Every important route should have: - title - description - canonical
strategy - Open Graph metadata - Twitter/X metadata where useful

Generate product/category metadata dynamically.

Add: - sitemap.ts - robots.ts

Use structured data where appropriate for: - Product - BreadcrumbList -
Organization - FAQ - Article / inspiration content

Do not fabricate reviews, ratings, prices, or business claims.

22. Accessibility

Target WCAG-conscious implementation.

Requirements: - keyboard navigation - visible focus - semantic
headings - form labels - aria labels only where needed - accessible
dialogs - accessible carousels - sufficient contrast - reduced-motion
support - touch-friendly targets - no color-only meaning - meaningful
alt text

Test mobile navigation, filters, product configuration, dialogs, and
theme toggle with keyboard.

23. Responsive Design

Design mobile-first.

Required breakpoints should support: - small phones - large phones -
tablets - laptops - wide desktop

Do not simply stack desktop components on mobile.

Mobile should have deliberate layouts: - compact navigation -
bottom/sticky actions where useful - filter sheet - horizontal
product/media rails where appropriate - readable typography - optimized
image crops - no accidental overflow

24. Navigation

Desktop navigation should be editorial and structured.

Primary areas:

Shop
  Curtains
  Shades
  Blinds
  Blackout
  Sheer
  Thermal
  Designer Collections
  Sale

Inspiration
  Shop by Room
  Gallery
  Styles
  Shop the Look

Services
  Design Consultation
  Measuring
  Installation
  Swatches
  Quick Quote

Guides
  Measuring
  Care
  Shipping
  Returns
  FAQs

About

Global actions: - Search - Theme - Wishlist - Cart - Account

Mobile navigation: - full-screen or large Sheet - nested categories -
clear back navigation - prominent search - primary CTA

25. Home Page Composition

Homepage should be cinematic and conversion-oriented.

Recommended sequence:

Announcement bar

Premium navigation

Hero

Featured treatment categories

Shop by room

Featured products

Editorial split section

Material / swatch story

Why Vingo Roll

Inspiration gallery

Services / consultation

Designer collection

Testimonials

Newsletter

Final CTA

Footer

Do not make every section a card grid.

Alternate between: - full-bleed imagery - editorial split layouts -
product grids - horizontal rails - typography-led sections

26. Footer

Organize into:

Shop - Curtains - Shades - Blinds - Collections - Sale

Help - Measuring - Shipping - Returns - Care - FAQ - Contact

Services - Consultation - Measuring - Installation - Swatches - Quote

About - Our Story - Inspiration - Trade

Legal - Privacy - Terms - Cookies - Accessibility

Include: - newsletter - social links - theme-safe logo - copyright

27. Performance

Prioritize: - Server Components - static rendering - image
optimization - proper sizes - minimal client JavaScript - lazy
loading - Suspense where beneficial - no unnecessary global state - no
giant dependency for trivial interactions - no duplicated data - no
repeated expensive calculations

Avoid: - making the entire app client-side - importing animation
libraries into every component unnecessarily - loading all product
images immediately - unnecessary useEffect

28. Data & State Boundaries

Static content: src/data

Pure utilities: src/lib

UI primitives: src/components/ui

Domain UI: src/components/<domain>

Business/domain composition: src/features/<feature>

Global client state: src/store

Page composition: src/app/**/page.tsx

Never mix these responsibilities casually.

29. Zero-Duplication Rules

Never copy: - product cards - filters - page headers - breadcrumbs -
CTAs - section wrappers - empty states - skeletons - review cards -
service cards - form fields

Extract reusable components.

Do not create generic abstractions that hide obvious product behavior.
Favor readable composition.

30. Error, Empty, Loading States

Every dynamic-looking UX must have intentional states.

Examples: - no products found - no search results - empty cart - empty
wishlist - empty swatch tray - invalid product - invalid category - form
submission success - form validation errors - loading product gallery -
loading product grid

Use shadcn Skeleton and consistent empty/error components.

31. Migration Rules From Existing React/Vite App

Map concepts as follows:

React Router route
→ Next.js app directory route

App.tsx
→ app/layout.tsx + route-group layouts

pages/*
→ app/**/page.tsx

React Router Link
→ next/link

React Router params
→ Next.js dynamic route params

Vite asset imports
→ public/ or imported static assets

React Helmet / SEO component
→ generateMetadata / Metadata

lazy/Suspense routes
→ Next.js route rendering + Suspense

global providers
→ app/layout.tsx or provider boundary

browser-only state
→ client component + Zustand

Do not mechanically translate files. Re-architect them around Next.js.

32. shadcn + Brown Theme Rules

Use CSS variables as the source of truth.

The theme must work in: - light - dark - system

Component variants should use semantic tokens rather than hardcoded
brown hex values everywhere.

Examples of semantic intent: - primary = walnut - accent = bronze -
surface = ivory/cocoa - muted = taupe - border = warm neutral

Use one coherent palette across the entire app.

33. Quality Gate

Before considering the rebuild complete:

No React Router

No Vite-specific architecture

No pages/ route directory

App Router used consistently

TypeScript strict

No any

ESLint clean

No duplicated product/category data

Zustand persistence works

Light theme works

Dark theme works

System theme works

Mobile navigation works

Search works

Filters work

Product configuration works

Cart persists

Wishlist persists

Swatch tray persists

Empty states exist

Loading states exist

Error states exist

Product metadata exists

Sitemap exists

Robots exists

Images use next/image

Images have useful alt text

No horizontal overflow

Keyboard navigation works

Reduced motion is respected

No console errors

No hydration warnings

No unnecessary client components

No backend/API code

34. Implementation Order

Phase 1 --- Foundation

Create Next.js App Router project.

Configure TypeScript strict mode.

Configure aliases.

Install/configure shadcn/ui.

Install next-themes.

Create theme tokens.

Add fonts.

Add global layout.

Add navigation/footer shell.

Phase 2 --- Data

Migrate product data.

Normalize categories.

Add rooms.

Add needs.

Add collections.

Add swatches.

Add inspiration.

Add services.

Add FAQs/reviews.

Phase 3 --- Core commerce

Shop

Category

Product detail

Search

Cart

Wishlist

Phase 4 --- Premium service layer

Swatches

Measuring guide

Consultation

Installation

Quote

Style finder

Phase 5 --- Editorial layer

Inspiration

Shop by room

Collections

Shop the look

Smart home

Trade

Phase 6 --- SEO/accessibility/performance

metadata

structured data

sitemap

robots

image optimization

loading/error/not-found

accessibility audit

responsive QA

Phase 7 --- Visual polish

cinematic transitions

micro-interactions

hover states

image reveals

editorial layouts

dark theme refinement

mobile polish

35. Definition of Done

The final Vingo Roll application must:

Feel like a premium interior-design ecommerce brand.

Use Next.js App Router correctly.

Use shadcn/ui as the component foundation.

Have a sophisticated brown/ivory light theme and espresso dark
theme.

Have cinematic but restrained motion.

Use intentional, optimized imagery.

Support shopping and service-led customer journeys.

Have clear room, style, need, collection, and product discovery.

Make swatches, measuring, consultation, quote, and installation
discoverable.

Preserve all original functionality while improving information
architecture.

Be responsive from mobile to wide desktop.

Be accessible.

Be SEO-ready.

Keep client-side JavaScript to the minimum necessary.

Remain completely frontend-only with mock/static data.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/22e4ad17-27b3-465e-9967-a47a558b5915).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
