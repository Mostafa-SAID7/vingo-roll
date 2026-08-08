/**
 * Hooks index - Central export point for all custom hooks
 * Organized by category for easy importing
 */

// ============================================================================
// FILTERING HOOKS
// ============================================================================
export { useProductFilters } from "./use-product-filters";
export { useSearch, useProductSearch, useRoomSearch } from "./use-search";
export type { SearchableItem } from "./use-search";

// ============================================================================
// UTILITY HOOKS
// ============================================================================
export { useDebounce } from "./use-debounce";
export { useMediaQuery, useIsMobile, useIsTablet, useIsDesktop } from "./use-media-query";
export { useHydrated } from "./use-hydrated";
