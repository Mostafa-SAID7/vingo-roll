/**
 * Product types - all product-related data structures
 */

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
  lightControl?: LightControl;
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
  category?: { id: string; name: string; slug: string };
  collectionId?: string;
  collections?: Array<{ id: string; name: string; slug: string }>;
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
  rooms?: Array<{ id: string; name: string; slug: string }>;
  needs?: Array<{ id: string; name: string; slug: string }>;
  styles?: string[];
  installation?: Installation;
  motorized?: boolean;
  stockStatus: StockStatus;
  featured?: boolean;
  bestseller?: boolean;
  newArrival?: boolean;
  sale?: boolean;
  createdAt?: string;
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
