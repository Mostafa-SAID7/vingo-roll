import { IMG } from "./categories";
import type { Room } from "@/types";

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
