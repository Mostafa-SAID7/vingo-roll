/**
 * useMediaQuery - Media query hook for responsive design
 * Replaces use-mobile.tsx with more flexible API
 */

import * as React from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState<boolean | undefined>(undefined);

  React.useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => {
      setMatches(mql.matches);
    };
    mql.addEventListener("change", onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return !!matches;
}

/**
 * useIsMobile - Convenience wrapper for checking mobile viewport
 * Uses BREAKPOINTS.SM from constants for consistency
 */
export function useIsMobile(): boolean {
  // Using 768px as the mobile breakpoint (matches Tailwind's md: breakpoint)
  return useMediaQuery("(max-width: 767px)");
}

/**
 * useIsTablet - Convenience wrapper for checking tablet viewport
 */
export function useIsTablet(): boolean {
  // Tablet: 768px to 1024px
  return useMediaQuery("(min-width: 768px) and (max-width: 1023px)");
}

/**
 * useIsDesktop - Convenience wrapper for checking desktop viewport
 */
export function useIsDesktop(): boolean {
  // Desktop: 1024px and up
  return useMediaQuery("(min-width: 1024px)");
}
