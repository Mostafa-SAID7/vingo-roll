/**
 * useSearch - Search hook for filtering items by query
 * Generic search utility for products, rooms, collections, etc.
 */

import { useMemo } from "react";

export interface SearchableItem {
  id: string;
  name: string;
  description?: string;
  slug?: string;
}

export function useSearch<T extends SearchableItem>(
  items: T[],
  query: string,
  options?: {
    fields?: (keyof T)[];
    caseSensitive?: boolean;
    minChars?: number;
  }
): T[] {
  const { fields = ["name" as keyof T, "description" as keyof T], caseSensitive = false, minChars = 2 } = options || {};

  return useMemo(() => {
    if (query.length < minChars) {
      return items;
    }

    const searchQuery = caseSensitive ? query : query.toLowerCase();

    return items.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        if (!value || typeof value !== "string") return false;
        const fieldValue = caseSensitive ? value : value.toLowerCase();
        return fieldValue.includes(searchQuery);
      })
    );
  }, [items, query, fields, caseSensitive, minChars]);
}

/**
 * useProductSearch - Convenience wrapper for searching products
 */
export function useProductSearch(
  products: Array<{ id: string; name: string; description?: string }>,
  query: string
) {
  return useSearch(products, query, {
    fields: ["name", "description"] as any,
    caseSensitive: false,
    minChars: 2,
  });
}

/**
 * useRoomSearch - Convenience wrapper for searching rooms
 */
export function useRoomSearch(
  rooms: Array<{ id: string; name: string; description?: string }>,
  query: string
) {
  return useSearch(rooms, query, {
    fields: ["name", "description"] as any,
    caseSensitive: false,
    minChars: 1,
  });
}
