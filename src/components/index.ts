/**
 * Components Index - Central export point for all components
 * Organized by category for easy importing
 */

// ============================================================================
// UI COMPONENTS (shadcn/ui)
// ============================================================================
export * from "./ui";

// ============================================================================
// LAYOUT COMPONENTS
// ============================================================================
export { SiteHeader, SiteFooter, MegaMenu } from "./layout";

// ============================================================================
// COMMON COMPONENTS
// ============================================================================
export { Crumbs, PageHeader, Section, SectionHeading, EmptyState, TrustLayer, Reveal } from "./common";

// ============================================================================
// PRODUCT COMPONENTS
// ============================================================================
export { ProductGrid, ProductCard, ProductQuickView } from "./product";

// ============================================================================
// SHOP COMPONENTS
// ============================================================================
export { FilterSidebar } from "./shop";

// ============================================================================
// CART COMPONENTS
// ============================================================================
export { CartDrawer } from "./cart";

// ============================================================================
// ERROR COMPONENTS
// ============================================================================
export { ErrorBoundary, RouteErrorBoundary, ErrorPage, NotFoundPage, ErrorAnimations } from "./error-pages";
