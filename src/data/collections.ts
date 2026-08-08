import { IMG } from "./categories";
import type { Collection, Need, Room } from "@/types";

export const collections: Collection[] = [
  {
    id: "col-designer",
    slug: "designer",
    name: "The Designer Edit",
    mood: "Considered, tailored, quietly grand",
    story:
      "Pieces we developed with interior designers who kept asking for the same three things: a truer black-out, a softer hand, and a hem that hangs straight after year five.",
    description: "Our most tailored made-to-order drapery and shades.",
    image: IMG.hero,
  },
  {
    id: "col-natural",
    slug: "natural-textures",
    name: "Natural Textures",
    mood: "Raw fibre, honest weave",
    story:
      "Linen, jute, reed and cotton left close to their original state — slubs, variation and all.",
    description: "Undyed and low-process materials with visible weave.",
    image: IMG.linen,
  },
  {
    id: "col-minimal",
    slug: "minimal",
    name: "Minimal",
    mood: "Nothing extra",
    story: "Recessed cassettes, invisible hardware and a single unbroken plane of fabric.",
    description: "Clean lines for architectural interiors.",
    image: IMG.woven,
  },
  {
    id: "col-classic",
    slug: "classic",
    name: "Classic",
    mood: "Traditional proportions",
    story: "Pinch pleats, cloth tapes and interlining — the details that made drapery an art.",
    description: "Time-tested headings and finishes.",
    image: IMG.linen,
  },
  {
    id: "col-contemporary",
    slug: "contemporary",
    name: "Contemporary",
    mood: "Sharp and quiet",
    story: "Matte finishes, deep tones and motorised operation for modern rooms.",
    description: "Modern silhouettes and smart operation.",
    image: IMG.bedroom,
  },
  {
    id: "col-seasonal",
    slug: "seasonal",
    name: "Seasonal Archive",
    mood: "Last of the bolt",
    story: "Colourways we are retiring, offered until the fabric runs out.",
    description: "End-of-run fabrics at reduced pricing.",
    image: IMG.woven,
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);

export const rooms: Room[] = [
  {
    id: "living-room",
    slug: "living-room",
    name: "Living Room",
    description: "Full-height drapery and sheers that soften a big window wall.",
    image: IMG.hero,
    recommended: ["drapery", "sheers", "wood-woven"],
  },
  {
    id: "bedroom",
    slug: "bedroom",
    name: "Bedroom",
    description: "Blackout layers for real darkness, with a sheer underneath for daytime.",
    image: IMG.bedroom,
    recommended: ["blackout-curtains", "roller-shades", "smart-motorized"],
  },
  {
    id: "dining-room",
    slug: "dining-room",
    name: "Dining Room",
    description: "Textured drapery that flatters evening light and candlelight.",
    image: IMG.hero,
    recommended: ["drapery", "curtains"],
  },
  {
    id: "home-office",
    slug: "home-office",
    name: "Home Office",
    description: "Glare control for screens without turning the room into a cave.",
    image: IMG.woven,
    recommended: ["roller-shades", "blinds"],
  },
  {
    id: "kids-room",
    slug: "kids-room",
    name: "Kids Room",
    description: "Cordless, child-safe treatments and reliable nap-time darkness.",
    image: IMG.bedroom,
    recommended: ["blackout-curtains", "roller-shades"],
  },
  {
    id: "kitchen",
    slug: "kitchen",
    name: "Kitchen",
    description: "Wipeable, short-drop shades that clear the counter.",
    image: IMG.woven,
    recommended: ["roman-shades", "blinds"],
  },
  {
    id: "bathroom",
    slug: "bathroom",
    name: "Bathroom",
    description: "Privacy-first materials that tolerate humidity.",
    image: IMG.woven,
    recommended: ["roller-shades", "roman-shades"],
  },
  {
    id: "patio-outdoor",
    slug: "patio-outdoor",
    name: "Patio & Outdoor",
    description: "UV-stable weaves for porches, pergolas and coastal glare.",
    image: IMG.woven,
    recommended: ["wood-woven", "roller-shades"],
  },
];

export const getRoom = (slug: string) => rooms.find((r) => r.slug === slug);

export const needs: Need[] = [
  {
    id: "blackout",
    slug: "blackout",
    name: "Blackout",
    description: "Block light for sleep, nurseries and media rooms.",
    icon: "moon",
  },
  {
    id: "privacy",
    slug: "privacy",
    name: "Privacy",
    description: "Stay unseen without losing all daylight.",
    icon: "eye-off",
  },
  {
    id: "heat-control",
    slug: "heat-control",
    name: "Heat Control",
    description: "Insulate against summer heat and winter draughts.",
    icon: "thermometer",
  },
  {
    id: "light-filtering",
    slug: "light-filtering",
    name: "Light Filtering",
    description: "Soften glare while keeping the room bright.",
    icon: "sun",
  },
  {
    id: "noise-reduction",
    slug: "noise-reduction",
    name: "Noise Reduction",
    description: "Heavier interlined fabrics that absorb street sound.",
    icon: "volume-x",
  },
  {
    id: "easy-installation",
    slug: "easy-installation",
    name: "Easy Installation",
    description: "Bracket-and-click systems you can fit in an afternoon.",
    icon: "wrench",
  },
  {
    id: "smart-motorized",
    slug: "smart-motorized",
    name: "Smart & Motorized",
    description: "Scheduled, app-controlled and cordless operation.",
    icon: "zap",
  },
  {
    id: "small-windows",
    slug: "small-windows",
    name: "Small Windows",
    description: "Short drops and tidy inside mounts.",
    icon: "minimize-2",
  },
  {
    id: "large-windows",
    slug: "large-windows",
    name: "Large Windows",
    description: "Wide spans, tall drops and multi-panel tracks.",
    icon: "maximize-2",
  },
];

export const getNeed = (slug: string) => needs.find((n) => n.slug === slug);
