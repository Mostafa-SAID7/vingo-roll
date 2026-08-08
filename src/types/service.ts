/**
 * Service types - design consultation, measurement, installation services
 */

export type Service = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  details: string[];
  price: string;
};

export interface ConsultationBooking {
  id: string;
  userId: string;
  mode: "in-home" | "virtual" | "showroom";
  date: string;
  time?: string;
  room: string;
  productInterest: string;
  projectDescription?: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
}

export interface FAQ {
  question: string;
  answer: string;
  topic: string;
}

export const SERVICE_TOPICS = [
  "measuring",
  "installation",
  "care",
  "shipping",
  "returns",
  "warranty",
  "customization",
  "motorization",
] as const;
