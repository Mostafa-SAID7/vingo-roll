/**
 * Cart types - shopping cart item and state
 */

export interface CartItem {
  slug: string;
  name: string;
  image: string;
  quantity: number;
  unitPrice: number;
  options: Record<string, string>;
  key?: string; // Unique key for cart operations
}

export interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getItemCount: () => number;
}
