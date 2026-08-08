/**
 * Global constants used across the application
 * Consolidates all magic strings and configuration values
 */

// ============================================================================
// AUTH CONSTANTS
// ============================================================================

export const AUTH_STORAGE_KEY = "vingo_auth_user";
export const AUTH_TOKEN_KEY = "vingo_auth_token";

// ============================================================================
// SWATCH CONSTANTS
// ============================================================================

export const SWATCH_LIMIT = 8; // Maximum swatches per request

// ============================================================================
// CART & CHECKOUT CONSTANTS
// ============================================================================

export const FREE_SHIPPING_THRESHOLD = 150; // Free shipping over this amount
export const DEFAULT_SHIPPING_COST = 14.99;
export const DEFAULT_TAX_RATE = 0.075; // 7.5%

// ============================================================================
// PAGINATION & DISPLAY CONSTANTS
// ============================================================================

export const ITEMS_PER_PAGE = 12;
export const SEARCH_HISTORY_LIMIT = 50;
export const BROWSING_HISTORY_LIMIT = 100;

// ============================================================================
// ANIMATION & MOTION TIMING (ms)
// ============================================================================

export const MOTION_DURATION = {
  FAST: 200,      // Quick interactions (200ms)
  NORMAL: 300,    // Standard transitions (300ms)
  SLOW: 500,      // Emphasis animations (500ms)
  VERY_SLOW: 1000, // Long-form transitions (1000ms)
} as const;

export const MOTION_EASING = {
  LINEAR: "linear",
  IN: "cubic-bezier(0.4, 0, 1, 1)",
  OUT: "cubic-bezier(0, 0, 0.2, 1)",
  IN_OUT: "cubic-bezier(0.4, 0, 0.2, 1)",
  EASE_OUT_EXPO: "cubic-bezier(0.16, 1, 0.3, 1)",
  EASE_OUT_BACK: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

// ============================================================================
// BREAKPOINTS & SCREEN SIZES (px)
// ============================================================================

export const BREAKPOINTS = {
  XS: 320,
  SM: 640,
  MD: 768,
  LG: 1024,
  XL: 1280,
  "2XL": 1536,
} as const;

// ============================================================================
// VALIDATION PATTERNS
// ============================================================================

export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ZIP_CODE: /^\d{5}(-\d{4})?$/,
  PHONE: /^[0-9\s+()\-]+$/,
  CREDIT_CARD: /^\d{16}$/,
  CVC: /^\d{3}$/,
  EXPIRY: /^\d{2}\/\d{2}$/,
  URL_SLUG: /^[a-z0-9-]+$/,
} as const;

// ============================================================================
// NUMERIC RANGES & LIMITS
// ============================================================================

export const LIMITS = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_NAME_LENGTH: 100,
  MAX_EMAIL_LENGTH: 255,
  MAX_DESCRIPTION_LENGTH: 1000,
  MAX_SEARCH_QUERY_LENGTH: 100,
  MIN_PRICE: 0,
  MAX_PRICE: 5000,
} as const;

// ============================================================================
// API TIMEOUTS
// ============================================================================

export const TIMEOUTS = {
  SHORT: 3000,      // 3 seconds
  MEDIUM: 5000,     // 5 seconds
  LONG: 10000,      // 10 seconds
  VERY_LONG: 30000, // 30 seconds
} as const;

// ============================================================================
// CACHE DURATIONS (seconds)
// ============================================================================

export const CACHE_DURATION = {
  STALE_TIME: 5 * 60,        // 5 minutes
  CACHE_TIME: 10 * 60,       // 10 minutes
  LONG_CACHE: 60 * 60,       // 1 hour
} as const;

// ============================================================================
// ERROR MESSAGES
// ============================================================================

export const ERROR_MESSAGES = {
  AUTH: {
    INVALID_CREDENTIALS: "Invalid email or password",
    EMAIL_EXISTS: "Email already registered",
    PASSWORDS_DONT_MATCH: "Passwords do not match",
    PASSWORD_TOO_SHORT: "Password must be at least 8 characters",
    MISSING_FIELDS: "Missing required fields",
  },
  VALIDATION: {
    INVALID_EMAIL: "Valid email required",
    INVALID_PHONE: "Valid phone number required",
    INVALID_ZIP: "Valid ZIP code required",
    INVALID_CARD: "Invalid card number",
    INVALID_CVC: "Invalid CVC",
    INVALID_EXPIRY: "Use MM/YY format",
  },
  CHECKOUT: {
    NO_ITEMS: "Your cart is empty",
    NOT_LOGGED_IN: "Please log in to continue",
  },
} as const;

// ============================================================================
// SUCCESS MESSAGES
// ============================================================================

export const SUCCESS_MESSAGES = {
  AUTH: {
    LOGGED_IN: "Successfully logged in",
    LOGGED_OUT: "Successfully logged out",
    SIGNED_UP: "Account created successfully",
    PROFILE_UPDATED: "Profile updated",
  },
  CHECKOUT: {
    ORDER_PLACED: "Order placed successfully",
  },
  CART: {
    ITEM_ADDED: "Added to cart",
    ITEM_REMOVED: "Removed from cart",
  },
} as const;

// ============================================================================
// ROOM TYPES & CATEGORIES
// ============================================================================

export const ROOM_NAMES = [
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Home Office",
  "Kids Room",
  "Kitchen",
  "Bathroom",
  "Patio/Outdoor",
] as const;

export const MATERIAL_TIERS = ["essential", "signature", "couture"] as const;

export const LIGHT_CONTROLS = ["sheer", "light-filtering", "blackout"] as const;

// ============================================================================
// DATE & TIME FORMATS
// ============================================================================

export const DATE_FORMAT = {
  LONG: { weekday: "long", month: "short", day: "numeric", year: "numeric" } as const,
  SHORT: { month: "short", day: "numeric", year: "numeric" } as const,
  TIME: { hour: "2-digit", minute: "2-digit" } as const,
} as const;
