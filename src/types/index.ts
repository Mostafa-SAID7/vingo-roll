export type StockStatus = "in-stock" | "made-to-order" | "low-stock" | "sold-out";
export type LightControl = "sheer" | "light-filtering" | "blackout";
export type Installation = "diy" | "professional" | "both";

export type ProductImage = {
  src: string;
  alt: string;
  kind: "main" | "room" | "texture" | "detail";
};

export type MaterialOption = {
  id: string;
  name: string;
  priceDelta: number;
  tier: "essential" | "signature" | "couture";
};

export type ColorOption = {
  id: string;
  name: string;
  hex: string;
  family: string;
};

export type SizeOption = {
  id: string;
  label: string;
  widthIn: number;
  heightIn: number;
  priceDelta: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  categoryId: string;
  collectionId?: string;
  price: number;
  compareAtPrice?: number;
  currency: string;
  rating: number;
  reviewCount: number;
  images: ProductImage[];
  materials: MaterialOption[];
  colors: ColorOption[];
  sizes: SizeOption[];
  features: string[];
  specifications: Record<string, string>;
  lightControl?: LightControl;
  roomTypes?: string[];
  needs?: string[];
  styleTags?: string[];
  installation?: Installation;
  motorized?: boolean;
  stockStatus: StockStatus;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  sale?: boolean;
};

export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  group: "curtains" | "shades" | "blinds" | "specialty";
};

export type Collection = {
  id: string;
  slug: string;
  name: string;
  story: string;
  description: string;
  image: string;
  mood: string;
};

export type Room = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  recommended: string[];
};

export type Need = {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
};

export type Swatch = {
  id: string;
  name: string;
  material: string;
  colorFamily: string;
  hex: string;
  lightControl: LightControl;
  rooms: string[];
  style: string;
  image?: string;
};

export type InspirationPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  room: string;
  style: string;
  treatment: string;
  image: string;
  productSlugs: string[];
};

export type Review = {
  id: string;
  productSlug: string;
  author: string;
  rating: number;
  title: string;
  body: string;
  date: string;
  verified: boolean;
};

export type Faq = { question: string; answer: string; topic: string };

export type Service = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  details: string[];
  price: string;
};
