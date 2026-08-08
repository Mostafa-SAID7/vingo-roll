/**
 * Swatch types - material samples for ordering
 */

import type { LightControl } from "./product";

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

export interface SwatchState {
  ids: string[];
  compareIds: string[];
  toggle: (id: string) => void;
  toggleCompare: (id: string) => void;
  clear: () => void;
}
