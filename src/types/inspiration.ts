/**
 * Inspiration types - editorial content and room-based discovery
 */

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

export interface WishlistItem {
  slug: string;
  name: string;
  image: string;
  price: number;
  addedAt: string;
}

export interface WishlistState {
  ids: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => void;
  clear: () => void;
  has: (id: string) => boolean;
}
