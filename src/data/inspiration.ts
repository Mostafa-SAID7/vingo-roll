import { IMG } from "./categories";
import type { InspirationPost } from "@/types";

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
