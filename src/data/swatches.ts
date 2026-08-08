import { IMG } from "./categories";
import type { Swatch } from "@/types";

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
