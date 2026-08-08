import type { FAQ } from "@/types";
import { SWATCH_LIMIT } from "./swatches";

export const faqs: FAQ[] = [
  {
    topic: "Measuring",
    question: "Should I choose an inside or an outside mount?",
    answer:
      "Inside mount suits deep, square recesses and gives the cleanest look. Outside mount is more forgiving of out-of-square openings and blocks more light. Our guides walk through both — and if you would rather not decide, book professional measuring.",
  },
  {
    topic: "Measuring",
    question: "How much width should curtains add beyond the window?",
    answer:
      "As general guidance, extend the rod 8–12 inches past each side of the opening so panels stack off the glass. Treat this as guidance rather than engineering advice for your specific window.",
  },
  {
    topic: "Ordering",
    question: "Are custom orders returnable?",
    answer:
      "Made-to-measure pieces are cut for your window, so they are not returnable unless the item is faulty or does not match the confirmed specification.",
  },
  {
    topic: "Ordering",
    question: "How long does an order take?",
    answer: "Most made-to-order treatments ship in 3–4 weeks. Stocked hardware ships in 2–3 days.",
  },
  {
    topic: "Swatches",
    question: "How many swatches can I order?",
    answer: `You can hold up to ${SWATCH_LIMIT} swatches in your tray at a time. Clear a few to add more.`,
  },
  {
    topic: "Care",
    question: "Can I wash my curtains?",
    answer:
      "Linen and cotton can usually take a cool gentle wash; velvet, interlined and blackout constructions should be dry cleaned. Always check the care card that ships with your order.",
  },
  {
    topic: "Smart",
    question: "Do motorised shades need wiring?",
    answer:
      "Our rechargeable lithium motors do not require hardwiring. Hardwired options exist for new construction.",
  },
];
