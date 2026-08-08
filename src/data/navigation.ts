import type { Category, Collection, Room } from "@/types";

export const nav = {
  shop: {
    label: "Shop",
    image: "/images/products/woven-shade.jpg",
    imageAlt: "Premium window treatments collection",
    columns: [
      {
        title: "Curtains",
        links: [
          { label: "All Curtains", to: "/shop/$category", slug: "curtains" },
          { label: "Blackout", to: "/shop/$category", slug: "blackout-curtains" },
          { label: "Sheer", to: "/shop/$category", slug: "sheers" },
          { label: "Thermal", to: "/shop/$category", slug: "thermal-curtains" },
          { label: "Drapery", to: "/shop/$category", slug: "drapery" },
        ],
      },
      {
        title: "Shades & Blinds",
        links: [
          { label: "Roller Shades", to: "/shop/$category", slug: "roller-shades" },
          { label: "Roman Shades", to: "/shop/$category", slug: "roman-shades" },
          { label: "Blinds", to: "/shop/$category", slug: "blinds" },
          { label: "Wood & Woven", to: "/shop/$category", slug: "wood-woven" },
          { label: "Smart & Motorized", to: "/shop/$category", slug: "smart-motorized" },
        ],
      },
      {
        title: "Discover",
        links: [
          { label: "All Products", to: "/shop" },
          { label: "Shop by Need", to: "/shop/needs" },
          { label: "Designer Collections", to: "/collections" },
          { label: "Style Finder", to: "/style-finder" },
          { label: "Sale", to: "/shop/$category", slug: "sale" },
        ],
      },
    ],
  },
  inspiration: {
    label: "Inspiration",
    image: "/images/hero/hero-living-room.jpg",
    imageAlt: "Inspiration gallery showcase",
    columns: [
      {
        title: "Explore",
        links: [
          { label: "Gallery", to: "/inspiration" },
          { label: "Shop by Room", to: "/inspiration/rooms" },
          { label: "Collections", to: "/collections" },
          { label: "Smart Home", to: "/smart-home" },
        ],
      },
    ],
  },
  services: {
    label: "Services",
    image: "/images/hero/hero-living-room.jpg",
    imageAlt: "Professional design and measurement services",
    columns: [
      {
        title: "Help me decide",
        links: [
          { label: "All Services", to: "/services" },
          { label: "Design Consultation", to: "/services/design-consultation" },
          { label: "Measuring & Installation", to: "/services/measuring-installation" },
          { label: "Order Swatches", to: "/swatches" },
          { label: "Quick Quote", to: "/quote" },
        ],
      },
    ],
  },
  guides: {
    label: "Guides",
    image: "/images/rooms/bedroom-blackout.jpg",
    imageAlt: "Helpful guides and resources",
    columns: [
      {
        title: "Know-how",
        links: [
          { label: "All Guides", to: "/guides" },
          { label: "Measuring Center", to: "/guides/measuring" },
          { label: "Fabric Care", to: "/guides/care" },
          { label: "Shipping", to: "/guides/shipping" },
          { label: "Returns", to: "/guides/returns" },
        ],
      },
    ],
  },
} as const;

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "Curtains", to: "/shop/$category", slug: "curtains" },
      { label: "Shades", to: "/shop/$category", slug: "roller-shades" },
      { label: "Blinds", to: "/shop/$category", slug: "blinds" },
      { label: "Collections", to: "/collections" },
      { label: "Sale", to: "/shop/$category", slug: "sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Measuring", to: "/guides/measuring" },
      { label: "Shipping", to: "/guides/shipping" },
      { label: "Returns", to: "/guides/returns" },
      { label: "Care", to: "/guides/care" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Consultation", to: "/services/design-consultation" },
      { label: "Measuring & Installation", to: "/services/measuring-installation" },
      { label: "Swatches", to: "/swatches" },
      { label: "Quick Quote", to: "/quote" },
      { label: "Style Finder", to: "/style-finder" },
    ],
  },
  {
    title: "About",
    links: [
      { label: "Our Story", to: "/about/our-story" },
      { label: "About Vingo Roll", to: "/about" },
      { label: "Inspiration", to: "/inspiration" },
      { label: "Trade Program", to: "/trade" },
      { label: "Account", to: "/account" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", to: "/legal/privacy" },
      { label: "Terms", to: "/legal/terms" },
      { label: "Cookies", to: "/legal/cookies" },
      { label: "Accessibility", to: "/legal/accessibility" },
    ],
  },
] as const;

export type NavCategory = Category;
export type NavCollection = Collection;
export type NavRoom = Room;
