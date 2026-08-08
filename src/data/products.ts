import { IMG } from "./categories";
import type { ColorOption, MaterialOption, Product, SizeOption } from "@/types";

const materials: MaterialOption[] = [
  { id: "belgian-linen", name: "Belgian Linen", priceDelta: 0, tier: "essential" },
  { id: "brushed-cotton", name: "Brushed Cotton", priceDelta: 20, tier: "essential" },
  { id: "wool-blend", name: "Wool Blend", priceDelta: 65, tier: "signature" },
  { id: "silk-velvet", name: "Silk Velvet", priceDelta: 140, tier: "couture" },
];

const colors: ColorOption[] = [
  { id: "ivory", name: "Raw Ivory", hex: "#EFE6D6", family: "Ivory" },
  { id: "oat", name: "Oat", hex: "#DCCDB4", family: "Neutral" },
  { id: "clay", name: "Clay", hex: "#B08A6B", family: "Warm" },
  { id: "walnut", name: "Walnut", hex: "#6B4B34", family: "Brown" },
  { id: "espresso", name: "Espresso", hex: "#3A2A20", family: "Brown" },
  { id: "sage", name: "Dry Sage", hex: "#9AA189", family: "Green" },
];

const sizes: SizeOption[] = [
  { id: "s", label: '50" × 84"', widthIn: 50, heightIn: 84, priceDelta: 0 },
  { id: "m", label: '50" × 96"', widthIn: 50, heightIn: 96, priceDelta: 35 },
  { id: "l", label: '50" × 108"', widthIn: 50, heightIn: 108, priceDelta: 70 },
  { id: "custom", label: "Custom size", widthIn: 0, heightIn: 0, priceDelta: 110 },
];

type Seed = {
  slug: string;
  name: string;
  categoryId: string;
  price: number;
  compareAtPrice?: number;
  short: string;
  light: Product["lightControl"];
  rooms: string[];
  needs: string[];
  style: string[];
  image: string;
  collectionId?: string;
  motorized?: boolean;
  flags?: Partial<Pick<Product, "featured" | "bestseller" | "newArrival" | "sale">>;
  rating: number;
  reviews: number;
};

const seeds: Seed[] = [
  {
    slug: "aurelle-belgian-linen-curtain",
    name: "Aurelle Belgian Linen Curtain",
    categoryId: "cat-curtains",
    price: 289,
    short: "Stonewashed Belgian linen with a weighted hem and a soft, architectural fall.",
    light: "light-filtering",
    rooms: ["living-room", "bedroom", "dining-room"],
    needs: ["light-filtering", "privacy", "large-windows"],
    style: ["Minimal", "Natural"],
    image: "/images/Material/BelgianLinen/Aurelle/Aurelle1.jpg",
    collectionId: "col-natural",
    flags: { featured: true, bestseller: true },
    rating: 4.8,
    reviews: 214,
  },
  {
    slug: "nocturne-blackout-drape",
    name: "Nocturne Blackout Drape",
    categoryId: "cat-blackout",
    price: 349,
    compareAtPrice: 419,
    short: "Triple-weave blackout with a matte cotton face — no rubber backing, no shine.",
    light: "blackout",
    rooms: ["bedroom", "kids-room"],
    needs: ["blackout", "noise-reduction", "heat-control"],
    style: ["Contemporary", "Classic"],
    image: "/images/Material/BrushedCotton/Nocturne/Nocturne1.webp",
    collectionId: "col-designer",
    flags: { featured: true, sale: true, bestseller: true },
    rating: 4.9,
    reviews: 388,
  },
  {
    slug: "veil-sheer-voile-panel",
    name: "Veil Sheer Voile Panel",
    categoryId: "cat-sheers",
    price: 169,
    short: "An open-weave voile that turns hard afternoon light into a warm haze.",
    light: "sheer",
    rooms: ["living-room", "dining-room", "home-office"],
    needs: ["light-filtering", "large-windows"],
    style: ["Minimal", "Contemporary"],
    image: IMG.hero,
    collectionId: "col-minimal",
    flags: { featured: true },
    rating: 4.6,
    reviews: 121,
  },
  {
    slug: "hearth-thermal-interlined-curtain",
    name: "Hearth Thermal Interlined Curtain",
    categoryId: "cat-thermal",
    price: 399,
    short: "Three-layer interlining that steadies room temperature and hushes street noise.",
    light: "blackout",
    rooms: ["living-room", "bedroom"],
    needs: ["heat-control", "noise-reduction", "blackout"],
    style: ["Classic"],
    image: IMG.linen,
    collectionId: "col-classic",
    flags: { bestseller: true },
    rating: 4.7,
    reviews: 96,
  },
  {
    slug: "atelier-pinch-pleat-drapery",
    name: "Atelier Pinch Pleat Drapery",
    categoryId: "cat-drapery",
    price: 529,
    short: "Hand-finished French pleats for ceilings that deserve the full gesture.",
    light: "light-filtering",
    rooms: ["living-room", "dining-room"],
    needs: ["large-windows", "privacy"],
    style: ["Classic", "Designer"],
    image: IMG.hero,
    collectionId: "col-designer",
    flags: { featured: true },
    rating: 4.9,
    reviews: 64,
  },
  {
    slug: "solstice-solar-roller-shade",
    name: "Solstice Solar Roller Shade",
    categoryId: "cat-roller",
    price: 199,
    short: "5% openness solar screen that cuts glare while keeping the view.",
    light: "light-filtering",
    rooms: ["home-office", "living-room", "kitchen"],
    needs: ["heat-control", "easy-installation", "light-filtering"],
    style: ["Minimal"],
    image: IMG.woven,
    collectionId: "col-minimal",
    rating: 4.5,
    reviews: 152,
  },
  {
    slug: "meridian-motorized-roller-shade",
    name: "Meridian Motorized Roller Shade",
    categoryId: "cat-smart",
    price: 649,
    short: "Rechargeable lithium motor, app scenes and a cordless, child-safe front.",
    light: "blackout",
    rooms: ["bedroom", "living-room", "home-office"],
    needs: ["smart-motorized", "blackout", "large-windows"],
    style: ["Contemporary"],
    image: IMG.bedroom,
    collectionId: "col-contemporary",
    motorized: true,
    flags: { newArrival: true, featured: true },
    rating: 4.8,
    reviews: 73,
  },
  {
    slug: "canton-flat-fold-roman-shade",
    name: "Canton Flat-Fold Roman Shade",
    categoryId: "cat-roman",
    price: 289,
    short: "Crisp flat folds in upholstery-weight cloth, mounted inside or out.",
    light: "light-filtering",
    rooms: ["kitchen", "bathroom", "bedroom"],
    needs: ["privacy", "small-windows"],
    style: ["Classic", "Natural"],
    image: IMG.woven,
    collectionId: "col-classic",
    rating: 4.6,
    reviews: 88,
  },
  {
    slug: "grove-woven-grass-shade",
    name: "Grove Woven Grass Shade",
    categoryId: "cat-woven",
    price: 239,
    short: "Hand-woven reed and jute with the natural variation of a real material.",
    light: "light-filtering",
    rooms: ["living-room", "patio-outdoor", "dining-room"],
    needs: ["light-filtering", "easy-installation"],
    style: ["Natural"],
    image: IMG.woven,
    collectionId: "col-natural",
    flags: { bestseller: true },
    rating: 4.7,
    reviews: 176,
  },
  {
    slug: "linden-hardwood-blind",
    name: "Linden Hardwood Blind",
    categoryId: "cat-blinds",
    price: 219,
    short: '2.5" basswood slats with cloth tapes and a matte hand-rubbed finish.',
    light: "light-filtering",
    rooms: ["home-office", "living-room", "kitchen"],
    needs: ["privacy", "easy-installation", "small-windows"],
    style: ["Classic"],
    image: IMG.woven,
    rating: 4.5,
    reviews: 133,
  },
  {
    slug: "dune-sheer-linen-blend",
    name: "Dune Sheer Linen Blend",
    categoryId: "cat-sheers",
    price: 149,
    compareAtPrice: 189,
    short: "A sand-toned sheer with just enough body to hang straight.",
    light: "sheer",
    rooms: ["bedroom", "kids-room", "home-office"],
    needs: ["light-filtering", "small-windows"],
    style: ["Natural", "Minimal"],
    image: IMG.linen,
    collectionId: "col-seasonal",
    flags: { sale: true },
    rating: 4.4,
    reviews: 59,
  },
  {
    slug: "obsidian-blackout-roller",
    name: "Obsidian Blackout Roller",
    categoryId: "cat-roller",
    price: 259,
    short: "Side channels and a light-sealing cassette for a genuinely dark room.",
    light: "blackout",
    rooms: ["bedroom", "kids-room", "home-office"],
    needs: ["blackout", "smart-motorized", "heat-control"],
    style: ["Contemporary"],
    image: IMG.bedroom,
    collectionId: "col-contemporary",
    flags: { newArrival: true },
    rating: 4.7,
    reviews: 102,
  },
  {
    slug: "marsh-velvet-drape",
    name: "Marsh Silk Velvet Drape",
    categoryId: "cat-drapery",
    price: 689,
    short: "Deep pile silk velvet that reads espresso by day and near-black at night.",
    light: "blackout",
    rooms: ["living-room", "dining-room", "bedroom"],
    needs: ["blackout", "noise-reduction"],
    style: ["Designer", "Classic"],
    image: "/images/Material/SilkVelvet/VelvetDrape1.jpg",
    collectionId: "col-designer",
    flags: { featured: true },
    rating: 4.9,
    reviews: 41,
  },
  {
    slug: "harbor-outdoor-shade",
    name: "Harbor Outdoor Shade",
    categoryId: "cat-woven",
    price: 279,
    short: "UV-stable weave built for porches, patios and coastal light.",
    light: "light-filtering",
    rooms: ["patio-outdoor", "kitchen"],
    needs: ["heat-control", "easy-installation", "large-windows"],
    style: ["Natural", "Contemporary"],
    image: IMG.woven,
    collectionId: "col-seasonal",
    rating: 4.3,
    reviews: 37,
  },
];

function buildProduct(seed: Seed): Product {
  return {
    id: seed.slug,
    slug: seed.slug,
    name: seed.name,
    shortDescription: seed.short,
    description: `${seed.short} Every ${seed.name} is cut to order in our workroom, pressed, and inspected before it ships. Choose your fabric, colour and drop — or send us your measurements and we will confirm them with you before cutting.`,
    categoryId: seed.categoryId,
    collectionId: seed.collectionId,
    price: seed.price,
    compareAtPrice: seed.compareAtPrice,
    currency: "USD",
    rating: seed.rating,
    reviewCount: seed.reviews,
    images: [
      { src: seed.image, alt: `${seed.name} installed in a styled room`, kind: "main" },
      { src: IMG.hero, alt: `${seed.name} seen across a full window wall`, kind: "room" },
      { src: IMG.linen, alt: `Close-up of the ${seed.name} fabric weave`, kind: "texture" },
      { src: IMG.woven, alt: `Heading and hardware detail of the ${seed.name}`, kind: "detail" },
    ],
    materials,
    colors,
    sizes,
    features: [
      "Made to order in our own workroom",
      "Weighted, hand-finished hem",
      "Child-safe cordless operation available",
      "Free fabric samples before you commit",
    ],
    specifications: {
      Composition: "Natural fibre blend",
      Heading: "Ripplefold / pinch pleat / rod pocket",
      Mounting: "Inside or outside mount",
      Care: "Dry clean or cool gentle wash",
      "Lead time": "3–4 weeks",
      Warranty: "5 years on hardware",
    },
    lightControl: seed.light,
    roomTypes: seed.rooms,
    needs: seed.needs,
    styleTags: seed.style,
    installation: "both",
    motorized: seed.motorized ?? seed.needs.includes("smart-motorized"),
    stockStatus: seed.flags?.newArrival ? "made-to-order" : "in-stock",
    ...seed.flags,
  };
}

export const products: Product[] = seeds.map(buildProduct);

export const productMaterials = materials;
export const productColors = colors;
export const productSizes = sizes;

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const getProductsByCategory = (categoryId: string) =>
  products.filter((p) => p.categoryId === categoryId);
export const priceBounds = {
  min: Math.min(...products.map((p) => p.price)),
  max: Math.max(...products.map((p) => p.price)),
};
