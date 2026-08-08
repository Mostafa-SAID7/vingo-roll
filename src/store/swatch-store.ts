import { create } from "zustand";
import { persist } from "zustand/middleware";
import { SWATCH_LIMIT } from "@/data/content";

type SwatchState = {
  ids: string[];
  compareIds: string[];
  add: (id: string) => boolean;
  toggle: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleCompare: (id: string) => void;
};

export const useSwatchStore = create<SwatchState>()(
  persist(
    (set, get) => ({
      ids: [],
      compareIds: [],
      add: (id) => {
        const { ids } = get();
        if (ids.includes(id)) return true;
        if (ids.length >= SWATCH_LIMIT) return false;
        set({ ids: [...ids, id] });
        return true;
      },
      toggle: (id) =>
        set((state) => {
          if (state.ids.includes(id)) {
            return {
              ids: state.ids.filter((s) => s !== id),
              compareIds: state.compareIds.filter((s) => s !== id),
            };
          }
          if (state.ids.length >= SWATCH_LIMIT) return state;
          return { ids: [...state.ids, id] };
        }),
      remove: (id) =>
        set((state) => ({
          ids: state.ids.filter((s) => s !== id),
          compareIds: state.compareIds.filter((s) => s !== id),
        })),
      clear: () => set({ ids: [], compareIds: [] }),
      toggleCompare: (id) =>
        set((state) => ({
          compareIds: state.compareIds.includes(id)
            ? state.compareIds.filter((s) => s !== id)
            : [...state.compareIds, id],
        })),
    }),
    { name: "vingo-swatches" },
  ),
);
