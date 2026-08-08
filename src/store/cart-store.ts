import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  key: string;
  slug: string;
  name: string;
  image: string;
  unitPrice: number;
  quantity: number;
  options: Record<string, string>;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "key">) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  clear: () => void;
};

const keyFor = (slug: string, options: Record<string, string>) =>
  `${slug}::${Object.entries(options)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `${k}=${v}`)
    .join("|")}`;

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (item) =>
        set((state) => {
          const key = keyFor(item.slug, item.options);
          const existing = state.items.find((i) => i.key === key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === key ? { ...i, quantity: i.quantity + item.quantity } : i,
              ),
            };
          }
          return { items: [...state.items, { ...item, key }] };
        }),
      remove: (key) => set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      setQuantity: (key, quantity) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: Math.max(1, Math.min(20, quantity)) } : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "vingo-cart" },
  ),
);

export const cartSubtotal = (items: CartItem[]) =>
  items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);

export const cartCount = (items: CartItem[]) => items.reduce((sum, i) => sum + i.quantity, 0);
