import type { Service } from "@/types";

export const services: Service[] = [
  {
    id: "svc-consultation",
    slug: "design-consultation",
    name: "Design Consultation",
    summary: "Sit with a design specialist in your home, over video, or in a showroom.",
    details: [
      "Fabric and hardware direction for the whole home",
      "Light, privacy and insulation planning per room",
      "Written recommendation with indicative pricing",
    ],
    price: "Complimentary",
  },
  {
    id: "svc-measuring",
    slug: "professional-measuring",
    name: "Professional Measuring",
    summary: "A technician measures every window and confirms mounting before anything is cut.",
    details: [
      "Inside and outside mount assessment",
      "Bracket, clearance and obstruction checks",
      "Measurements guaranteed against fit errors",
    ],
    price: "From $89, credited to your order",
  },
  {
    id: "svc-installation",
    slug: "installation",
    name: "Installation",
    summary: "Tracks, brackets and motors fitted, levelled, tested and cleaned up.",
    details: [
      "Hardware mounted to the correct substrate",
      "Motorised shades paired and scenes configured",
      "Packaging removed and recycled",
    ],
    price: "From $129 per window",
  },
  {
    id: "svc-swatches",
    slug: "swatches",
    name: "Material Swatches",
    summary: "Up to eight generous samples delivered so you can judge colour in your own light.",
    details: [
      "Large-format cuttings, not postage stamps",
      "See colour under morning and evening light",
      "Compare drape, weight and opacity side by side",
    ],
    price: "Free",
  },
];
