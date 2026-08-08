/**
 * Store index - Central export point for all Zustand stores
 * Organized by domain
 */

// ============================================================================
// CART & CHECKOUT STORES
// ============================================================================
export { useCartStore, cartSubtotal, cartCount } from "./cart-store";
export type { CartItem } from "./cart-store";

export { useOrderStore } from "./order-store";

// ============================================================================
// PRODUCT & CONTENT STORES
// ============================================================================
export { useSwatchStore } from "./swatch-store";
export { useWishlistStore } from "./wishlist-store";

// ============================================================================
// UI STATE STORE
// ============================================================================
export { useUIStore } from "./ui-store";
