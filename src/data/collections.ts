import { IMG } from "./categories";
import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "col-designer",
    slug: "designer",
    name: "The Designer Edit",
    mood: "Considered, tailored, quietly grand",
    story:
      "Pieces we developed with interior designers who kept asking for the same three things: a truer black-out, a softer hand, and a hem that hangs straight after year five.",
    description: "Our most tailored made-to-order drapery and shades.",
    image: IMG.drapery,
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
    image: IMG.velvet,
  },
  {
    id: "col-contemporary",
    slug: "contemporary",
    name: "Contemporary",
    mood: "Sharp and quiet",
    story: "Matte finishes, deep tones and motorised operation for modern rooms.",
    description: "Modern silhouettes and smart operation.",
    image: IMG.blackout,
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
