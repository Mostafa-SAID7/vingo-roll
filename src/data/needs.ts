import type { Need } from "@/types";

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
