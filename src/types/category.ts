/**
 * Category and collection types - organize products by grouping
 */

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
