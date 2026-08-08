/**
 * Vingo Roll Type Exports
 * Central export point for all types (re-exports from organized files)
 */

// Product types
export type {
  StockStatus,
  LightControl,
  Installation,
  ProductImage,
  MaterialOption,
  ColorOption,
  SizeOption,
  Product,
  Review,
} from "./product";

// Category & Collection types
export type { Category, Collection, Room, Need } from "./category";

// Cart types
export type { CartItem, CartState } from "./cart";

// Swatch types
export type { Swatch, SwatchState } from "./swatch";

// Inspiration & Wishlist types
export type { InspirationPost, WishlistItem, WishlistState } from "./inspiration";

// Service types
export type { Service, ConsultationBooking, FAQ } from "./service";

// Common types (Auth, Order, Filters)
export type {
  User,
  UserPreferences,
  SignupData,
  LoginData,
  AuthContextValue,
  Address,
  Order,
  OrderStatus,
  ShippingMethod,
  FilterState,
} from "./common";

export {
  MOCK_USERS,
  SHIPPING_METHODS,
  US_STATES,
  STATE_TAX_RATES,
  calculateShipping,
  calculateTax,
  generateOrderId,
  getEstimatedDelivery,
  FILTER_DEFAULTS,
  SORT_OPTIONS,
  MATERIAL_TIERS,
  LIGHT_CONTROLS,
  STYLES,
  ROOM_TYPES,
  COLLECTIONS_LIST,
} from "./common";

export { SERVICE_TOPICS } from "./service";

