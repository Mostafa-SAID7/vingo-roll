/**
 * Common types used across multiple features
 * Auth, Order, and Filter state management
 */

// ============================================================================
// AUTH TYPES
// ============================================================================

export interface User {
  id: string;
  email: string;
  name: string;
  role: "user" | "admin" | "trade";
  avatar?: string;
  preferences?: UserPreferences;
  createdAt: string;
  phone?: string;
}

export interface UserPreferences {
  favoriteStyles?: string[];
  favoriteColors?: string[];
  favoriteMaterials?: string[];
  defaultRoom?: string;
  notificationPreferences?: {
    priceDrops: boolean;
    newArrivals: boolean;
    recommendations: boolean;
  };
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface LoginData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  signup: (data: SignupData) => Promise<void>;
  clearError: () => void;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const MOCK_USERS: Record<string, { password: string; user: User }> = {
  "demo@example.com": {
    password: "password123",
    user: {
      id: "user-001",
      email: "demo@example.com",
      name: "Demo User",
      role: "user",
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      preferences: {
        favoriteStyles: ["contemporary", "minimal"],
        favoriteColors: ["ivory", "neutral"],
        favoriteMaterials: ["belgian-linen"],
      },
    },
  },
  "designer@example.com": {
    password: "password123",
    user: {
      id: "user-002",
      email: "designer@example.com",
      name: "Interior Designer",
      role: "trade",
      createdAt: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
      preferences: {
        favoriteStyles: ["classic", "contemporary"],
        favoriteMaterials: ["silk-velvet", "wool-blend"],
      },
    },
  },
};

// ============================================================================
// ORDER & CHECKOUT TYPES
// ============================================================================

import type { CartItem } from "./cart";

export interface Address {
  firstName: string;
  lastName: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: OrderStatus;
  shippingAddress: Address;
  billingAddress?: Address;
  paymentMethod: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description: string;
  cost: number;
  days: number;
}

export const SHIPPING_METHODS: ShippingMethod[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    cost: 14.99,
    days: 6,
  },
  {
    id: "express",
    name: "Express Shipping",
    description: "2-3 business days",
    cost: 34.99,
    days: 2,
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    cost: 64.99,
    days: 1,
  },
];

export const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY",
  "DC",
];

export const STATE_TAX_RATES: Record<string, number> = {
  "CA": 0.0725,
  "NY": 0.0400,
  "TX": 0.0625,
  "FL": 0.0600,
  "IL": 0.0625,
  "PA": 0.0600,
  "OH": 0.0575,
  "GA": 0.0400,
  "NC": 0.0475,
  "MI": 0.0600,
};

export function calculateShipping(subtotal: number, method: string = "standard"): number {
  const shippingMethod = SHIPPING_METHODS.find((m) => m.id === method);
  if (!shippingMethod) return 14.99;
  if (subtotal > 150) return 0;
  return shippingMethod.cost;
}

export function calculateTax(subtotal: number, state: string): number {
  const rate = STATE_TAX_RATES[state] ?? 0.075;
  return Math.round(subtotal * rate * 100) / 100;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `ORD-${timestamp}-${random}`;
}

export function getEstimatedDelivery(shippingDays: number): string {
  const delivery = new Date();
  delivery.setDate(delivery.getDate() + shippingDays);
  return delivery.toLocaleDateString("en-US", { weekday: "long", month: "short", day: "numeric" });
}

// ============================================================================
// FILTER STATE TYPES
// ============================================================================

export interface FilterState {
  priceRange: [number, number];
  materialTiers: string[];
  lightControl: string[];
  rooms: string[];
  collections: string[];
  styles: string[];
  sortBy: "relevance" | "price-asc" | "price-desc" | "newest" | "bestseller";
}

export const FILTER_DEFAULTS: FilterState = {
  priceRange: [0, 5000],
  materialTiers: [],
  lightControl: [],
  rooms: [],
  collections: [],
  styles: [],
  sortBy: "relevance",
};

export const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest" },
  { value: "bestseller", label: "Bestsellers" },
];

export const MATERIAL_TIERS = [
  { value: "essential", label: "Essential" },
  { value: "signature", label: "Signature" },
  { value: "couture", label: "Couture" },
];

export const LIGHT_CONTROLS = [
  { value: "sheer", label: "Sheer" },
  { value: "light-filtering", label: "Light Filtering" },
  { value: "blackout", label: "Blackout" },
];

export const STYLES = [
  { value: "minimal", label: "Minimal" },
  { value: "classic", label: "Classic" },
  { value: "contemporary", label: "Contemporary" },
  { value: "natural", label: "Natural Textures" },
];

export const ROOM_TYPES = [
  { value: "living-room", label: "Living Room" },
  { value: "bedroom", label: "Bedroom" },
  { value: "dining-room", label: "Dining Room" },
  { value: "home-office", label: "Home Office" },
  { value: "kids-room", label: "Kids Room" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "patio", label: "Patio/Outdoor" },
];

export const COLLECTIONS_LIST = [
  { value: "designer", label: "Designer" },
  { value: "natural-textures", label: "Natural Textures" },
  { value: "minimal", label: "Minimal" },
  { value: "classic", label: "Classic" },
  { value: "contemporary", label: "Contemporary" },
  { value: "seasonal", label: "Seasonal" },
];
