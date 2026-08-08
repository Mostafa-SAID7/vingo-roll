import type { Category } from "@/types";

export const IMG = {
  hero: "/images/hero/hero-living-room.jpg",
  linen: "/images/fabrics/linen-texture.jpg",
  bedroom: "/images/rooms/bedroom-blackout.jpg",
  woven: "/images/products/woven-shade.jpg",
} as const;

export const categories: Category[] = [
  {
    id: "cat-curtains",
    slug: "curtains",
    name: "Curtains",
    tagline: "Softness, in full length",
    description:
      "Made-to-measure curtains in linen, cotton and velvet — hemmed to the millimetre and finished by hand.",
    image: IMG.hero,
    group: "curtains",
  },
  {
    id: "cat-blackout",
    slug: "blackout-curtains",
    name: "Blackout Curtains",
    tagline: "True darkness, warm hand",
    description:
      "Triple-weave and lined blackout panels that quiet a room's light without the plastic look.",
    image: IMG.bedroom,
    group: "curtains",
  },
  {
    id: "cat-sheers",
    slug: "sheers",
    name: "Sheer Curtains",
    tagline: "Light, filtered gently",
    description: "Airy voiles and open-weave linens that turn daylight into something softer.",
    image: IMG.hero,
    group: "curtains",
  },
  {
    id: "cat-thermal",
    slug: "thermal-curtains",
    name: "Thermal Curtains",
    tagline: "Comfort you can feel",
    description: "Insulating interlined panels that hold warmth in winter and heat out in summer.",
    image: IMG.linen,
    group: "curtains",
  },
  {
    id: "cat-drapery",
    slug: "drapery",
    name: "Drapery",
    tagline: "Architectural fall",
    description: "Pinch pleat, ripplefold and goblet headings for rooms with ceiling to spare.",
    image: IMG.hero,
    group: "curtains",
  },
  {
    id: "cat-roller",
    slug: "roller-shades",
    name: "Roller Shades",
    tagline: "Quiet minimalism",
    description: "Clean cassette rollers in solar, light-filtering and blackout fabrics.",
    image: IMG.woven,
    group: "shades",
  },
  {
    id: "cat-roman",
    slug: "roman-shades",
    name: "Roman Shades",
    tagline: "Tailored folds",
    description: "Flat-fold and relaxed roman shades cut from upholstery-grade cloth.",
    image: IMG.woven,
    group: "shades",
  },
  {
    id: "cat-blinds",
    slug: "blinds",
    name: "Blinds",
    tagline: "Precise light control",
    description: "Aluminium and composite slat blinds engineered for daily use.",
    image: IMG.woven,
    group: "blinds",
  },
  {
    id: "cat-woven",
    slug: "wood-woven",
    name: "Wood & Woven",
    tagline: "Grain and texture",
    description: "Real hardwood blinds and woven grass shades with natural variation.",
    image: IMG.woven,
    group: "blinds",
  },
  {
    id: "cat-smart",
    slug: "smart-motorized",
    name: "Smart & Motorized",
    tagline: "Light on schedule",
    description: "Whisper-quiet motors, scenes and cordless child-safe operation.",
    image: IMG.bedroom,
    group: "specialty",
  },
  {
    id: "cat-sale",
    slug: "sale",
    name: "Sale",
    tagline: "Seasonal archive",
    description: "Discontinued colourways and end-of-bolt fabrics, while they last.",
    image: IMG.linen,
    group: "specialty",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
