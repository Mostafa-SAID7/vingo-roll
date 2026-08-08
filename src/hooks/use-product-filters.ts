/**
 * useProductFilters - Hook for filtering and sorting products
 * Refactored from use-filtered-products.ts
 */

import { useMemo } from "react";
import type { Product } from "@/types";
import type { FilterState } from "@/types/common";

export function useProductFilters(products: Product[], filters: FilterState): Product[] {
  return useMemo(() => {
    let filtered = [...products];

    // Price filter
    filtered = filtered.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1],
    );

    // Material tier filter
    if (filters.materialTiers.length > 0) {
      filtered = filtered.filter((p) =>
        p.materials?.some((m) => filters.materialTiers.includes(m.tier || "")),
      );
    }

    // Light control filter
    if (filters.lightControl.length > 0) {
      filtered = filtered.filter((p) =>
        p.materials?.some((m) => filters.lightControl.includes(m.lightControl || "")),
      );
    }

    // Room filter
    if (filters.rooms.length > 0) {
      filtered = filtered.filter((p) => p.rooms?.some((r) => {
        const roomSlug = typeof r === 'string' ? r : r.slug;
        return filters.rooms.includes(roomSlug);
      }));
    }

    // Collection filter
    if (filters.collections.length > 0) {
      filtered = filtered.filter((p) =>
        p.collections?.some((c) => filters.collections.includes(c.slug)),
      );
    }

    // Style filter
    if (filters.styles.length > 0) {
      filtered = filtered.filter((p) => p.styles?.some((s) => filters.styles.includes(s)));
    }

    // Sorting
    return applySorting(filtered, filters.sortBy);
  }, [products, filters]);
}

/**
 * applySorting - Internal helper to apply sort logic
 * Extracted for reusability and testability
 */
function applySorting(products: Product[], sortBy: FilterState["sortBy"]): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      sorted.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sorted.sort((a, b) => b.price - a.price);
      break;
    case "newest":
      sorted.sort((a, b) => {
        const dateA = new Date(a.createdAt || 0).getTime();
        const dateB = new Date(b.createdAt || 0).getTime();
        return dateB - dateA;
      });
      break;
    case "bestseller":
      sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      break;
    case "relevance":
    default:
      // Keep original order
      break;
  }

  return sorted;
}
