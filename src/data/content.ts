import { IMG } from "./categories";
import type { Faq, InspirationPost, Review, Service, Swatch } from "@/types";

const materialsList = [
  { material: "Belgian Linen", family: "Ivory", hex: "#EFE6D6", light: "light-filtering" },
  { material: "Belgian Linen", family: "Neutral", hex: "#DCCDB4", light: "light-filtering" },
  { material: "Brushed Cotton", family: "Warm", hex: "#C7A280", light: "light-filtering" },
  { material: "Brushed Cotton", family: "Brown", hex: "#8A6244", light: "blackout" },
  { material: "Wool Blend", family: "Brown", hex: "#5C4130", light: "blackout" },
  { material: "Wool Blend", family: "Grey", hex: "#8B857C", light: "light-filtering" },
  { material: "Silk Velvet", family: "Brown", hex: "#3A2A20", light: "blackout" },
  { material: "Silk Velvet", family: "Green", hex: "#4A5342", light: "blackout" },
  { material: "Sheer Voile", family: "Ivory", hex: "#F5EFE3", light: "sheer" },
  { material: "Sheer Voile", family: "Neutral", hex: "#E4DAC8", light: "sheer" },
  { material: "Woven Reed", family: "Warm", hex: "#B4884F", light: "light-filtering" },
  { material: "Woven Reed", family: "Brown", hex: "#7A5A34", light: "light-filtering" },
  { material: "Solar Screen", family: "Grey", hex: "#6F6A63", light: "light-filtering" },
  { material: "Solar Screen", family: "Ivory", hex: "#D9D2C4", light: "light-filtering" },
  { material: "Blackout Twill", family: "Brown", hex: "#2E211A", light: "blackout" },
  { material: "Blackout Twill", family: "Neutral", hex: "#A9998A", light: "blackout" },
] as const;

const names = [
  "Chalk",
  "Oat",
  "Clay",
  "Cocoa",
  "Walnut",
  "Fog",
  "Espresso",
  "Cypress",
  "Mist",
  "Sand",
  "Reed",
  "Bark",
  "Slate",
  "Bone",
  "Onyx",
  "Taupe",
];

const styles = ["Minimal", "Natural", "Classic", "Contemporary"];
const roomPool = ["living-room", "bedroom", "dining-room", "home-office", "kitchen"];

export const swatches: Swatch[] = materialsList.map((m, i) => ({
  id: `swatch-${i + 1}`,
  name: `${names[i] ?? "Natural"} ${m.material}`,
  material: m.material,
  colorFamily: m.family,
  hex: m.hex,
  lightControl: m.light,
  rooms: [roomPool[i % roomPool.length]!, roomPool[(i + 2) % roomPool.length]!],
  style: styles[i % styles.length]!,
  image: IMG.linen,
}));

export const SWATCH_LIMIT = 8;

export const inspiration: InspirationPost[] = [
  {
    id: "insp-1",
    slug: "a-quiet-living-room-in-linen",
    title: "A Quiet Living Room in Linen",
    excerpt: "Wall-to-wall sheers that make a west-facing room usable at 5pm.",
    body: [
      "The brief was simple: keep the view, lose the glare. We ran a single unbroken ripplefold track the full width of the glazing so the fabric reads as a wall rather than as a set of panels.",
      "Everything else in the room stays low and quiet — a stone table, a jute rug, one cane chair — so the light does the work.",
    ],
    room: "living-room",
    style: "Minimal",
    treatment: "sheers",
    image: IMG.hero,
    productSlugs: ["veil-sheer-voile-panel", "aurelle-belgian-linen-curtain"],
  },
  {
    id: "insp-2",
    slug: "true-dark-a-bedroom-study",
    title: "True Dark: A Bedroom Study",
    excerpt: "Layered blackout drapery over a motorised roller for genuine nighttime dark.",
    body: [
      "Blackout fabric alone rarely gives you a dark room; light comes around the edges. Here a side-channel roller handles the seal and the drape handles the feeling.",
      "The result is a room that reads warm brown at dusk and disappears entirely at night.",
    ],
    room: "bedroom",
    style: "Contemporary",
    treatment: "blackout-curtains",
    image: IMG.bedroom,
    productSlugs: ["nocturne-blackout-drape", "meridian-motorized-roller-shade"],
  },
  {
    id: "insp-3",
    slug: "woven-shades-and-morning-kitchens",
    title: "Woven Shades and Morning Kitchens",
    excerpt: "Reed shades cut short to clear the counter and catch early sun.",
    body: [
      "Kitchens punish long fabric. Woven reed at sill height gives texture without collecting cooking residue.",
      "We mounted outside the recess to gain three inches of visual height.",
    ],
    room: "kitchen",
    style: "Natural",
    treatment: "wood-woven",
    image: IMG.woven,
    productSlugs: ["grove-woven-grass-shade", "canton-flat-fold-roman-shade"],
  },
  {
    id: "insp-4",
    slug: "an-office-without-glare",
    title: "An Office Without Glare",
    excerpt: "A 5% solar screen that keeps the skyline and kills the screen reflection.",
    body: [
      "Solar screens are measured by openness factor. At 5% you keep a legible view out while cutting most of the direct glare.",
      "Pair with a hardwood blind on the side window for afternoon control.",
    ],
    room: "home-office",
    style: "Minimal",
    treatment: "roller-shades",
    image: IMG.woven,
    productSlugs: ["solstice-solar-roller-shade", "linden-hardwood-blind"],
  },
  {
    id: "insp-5",
    slug: "dining-in-velvet",
    title: "Dining in Velvet",
    excerpt: "Silk velvet drapery that shifts colour as the evening goes on.",
    body: [
      "Velvet is a lighting material as much as a textile — the pile catches low light and deepens.",
      "We kept the heading simple so the fabric stays the subject.",
    ],
    room: "dining-room",
    style: "Classic",
    treatment: "drapery",
    image: IMG.bedroom,
    productSlugs: ["marsh-velvet-drape", "atelier-pinch-pleat-drapery"],
  },
  {
    id: "insp-6",
    slug: "a-porch-that-stays-cool",
    title: "A Porch That Stays Cool",
    excerpt: "Outdoor weaves that drop the temperature under a west-facing pergola.",
    body: [
      "Shade fabric outside the glass stops heat before it enters — far more effective than any interior treatment.",
      "UV-stable yarns keep the colour honest through a full season.",
    ],
    room: "patio-outdoor",
    style: "Natural",
    treatment: "wood-woven",
    image: IMG.woven,
    productSlugs: ["harbor-outdoor-shade", "grove-woven-grass-shade"],
  },
];

export const getInspiration = (slug: string) => inspiration.find((i) => i.slug === slug);

export const reviews: Review[] = [
  {
    id: "r1",
    productSlug: "aurelle-belgian-linen-curtain",
    author: "Marion T.",
    rating: 5,
    title: "The hem hangs perfectly",
    body: "Ordered custom drops for a 10ft ceiling. They arrived pressed and the weighted hem hangs dead straight.",
    date: "2026-05-14",
    verified: true,
  },
  {
    id: "r2",
    productSlug: "aurelle-belgian-linen-curtain",
    author: "Devin K.",
    rating: 4,
    title: "Beautiful, order samples first",
    body: "The oat reads warmer in person than on screen — glad I got the swatches before committing.",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "r3",
    productSlug: "nocturne-blackout-drape",
    author: "Priya S.",
    rating: 5,
    title: "Actually dark",
    body: "Our toddler finally naps past 6am. No plastic smell, no shine.",
    date: "2026-06-11",
    verified: true,
  },
  {
    id: "r4",
    productSlug: "meridian-motorized-roller-shade",
    author: "Alex R.",
    rating: 5,
    title: "Quiet motor",
    body: "Scheduling sunrise and sunset scenes took five minutes. Genuinely quiet.",
    date: "2026-03-27",
    verified: true,
  },
  {
    id: "r5",
    productSlug: "grove-woven-grass-shade",
    author: "Hannah B.",
    rating: 4,
    title: "Lovely texture",
    body: "Natural variation is real — no two slats identical, which is the point.",
    date: "2026-02-19",
    verified: false,
  },
];

export const getReviews = (slug: string) => reviews.filter((r) => r.productSlug === slug);

export const testimonials = [
  {
    id: "t1",
    quote:
      "They measured, they made, they installed, and they left the room cleaner than they found it.",
    author: "Elena Marchetti",
    role: "Homeowner, Boston",
  },
  {
    id: "t2",
    quote: "The only supplier I trust for a full-height ripplefold run over 20 feet.",
    author: "Jonah Reyes",
    role: "Interior Designer",
  },
  {
    id: "t3",
    quote: "Swatches arrived in three days and settled a two-week argument about beige.",
    author: "Claire Osei",
    role: "Homeowner, Austin",
  },
];

export const services: Service[] = [
  {
    id: "svc-consultation",
    slug: "design-consultation",
    name: "Design Consultation",
    summary: "Sit with a design specialist in your home, over video, or in a showroom.",
    details: [
      "Fabric and hardware direction for the whole home",
      "Light, privacy and insulation planning per room",
      "Written recommendation with indicative pricing",
    ],
    price: "Complimentary",
  },
  {
    id: "svc-measuring",
    slug: "professional-measuring",
    name: "Professional Measuring",
    summary: "A technician measures every window and confirms mounting before anything is cut.",
    details: [
      "Inside and outside mount assessment",
      "Bracket, clearance and obstruction checks",
      "Measurements guaranteed against fit errors",
    ],
    price: "From $89, credited to your order",
  },
  {
    id: "svc-installation",
    slug: "installation",
    name: "Installation",
    summary: "Tracks, brackets and motors fitted, levelled, tested and cleaned up.",
    details: [
      "Hardware mounted to the correct substrate",
      "Motorised shades paired and scenes configured",
      "Packaging removed and recycled",
    ],
    price: "From $129 per window",
  },
  {
    id: "svc-swatches",
    slug: "swatches",
    name: "Material Swatches",
    summary: "Up to eight generous samples delivered so you can judge colour in your own light.",
    details: [
      "Large-format cuttings, not postage stamps",
      "See colour under morning and evening light",
      "Compare drape, weight and opacity side by side",
    ],
    price: "Free",
  },
];

export const faqs: Faq[] = [
  {
    topic: "Measuring",
    question: "Should I choose an inside or an outside mount?",
    answer:
      "Inside mount suits deep, square recesses and gives the cleanest look. Outside mount is more forgiving of out-of-square openings and blocks more light. Our guides walk through both — and if you would rather not decide, book professional measuring.",
  },
  {
    topic: "Measuring",
    question: "How much width should curtains add beyond the window?",
    answer:
      "As general guidance, extend the rod 8–12 inches past each side of the opening so panels stack off the glass. Treat this as guidance rather than engineering advice for your specific window.",
  },
  {
    topic: "Ordering",
    question: "Are custom orders returnable?",
    answer:
      "Made-to-measure pieces are cut for your window, so they are not returnable unless the item is faulty or does not match the confirmed specification.",
  },
  {
    topic: "Ordering",
    question: "How long does an order take?",
    answer: "Most made-to-order treatments ship in 3–4 weeks. Stocked hardware ships in 2–3 days.",
  },
  {
    topic: "Swatches",
    question: "How many swatches can I order?",
    answer: `You can hold up to ${SWATCH_LIMIT} swatches in your tray at a time. Clear a few to add more.`,
  },
  {
    topic: "Care",
    question: "Can I wash my curtains?",
    answer:
      "Linen and cotton can usually take a cool gentle wash; velvet, interlined and blackout constructions should be dry cleaned. Always check the care card that ships with your order.",
  },
  {
    topic: "Smart",
    question: "Do motorised shades need wiring?",
    answer:
      "Our rechargeable lithium motors do not require hardwiring. Hardwired options exist for new construction.",
  },
];
