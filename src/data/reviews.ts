import type { Review } from "@/types";

export const reviews: Review[] = [
  {
    id: "r1",
    productSlug: "aurelle-belgian-linen-curtain",
    author: "Marion T.",
    rating: 5,
    title: "The hem hangs perfectly",
    body: "Ordered custom drops for a 10ft ceiling. They arrived pressed and the weighted hem hangs dead straight.",
    date: "2026-05-14",
    verified: true,
  },
  {
    id: "r2",
    productSlug: "aurelle-belgian-linen-curtain",
    author: "Devin K.",
    rating: 4,
    title: "Beautiful, order samples first",
    body: "The oat reads warmer in person than on screen — glad I got the swatches before committing.",
    date: "2026-04-02",
    verified: true,
  },
  {
    id: "r3",
    productSlug: "nocturne-blackout-drape",
    author: "Priya S.",
    rating: 5,
    title: "Actually dark",
    body: "Our toddler finally naps past 6am. No plastic smell, no shine.",
    date: "2026-06-11",
    verified: true,
  },
  {
    id: "r4",
    productSlug: "meridian-motorized-roller-shade",
    author: "Alex R.",
    rating: 5,
    title: "Quiet motor",
    body: "Scheduling sunrise and sunset scenes took five minutes. Genuinely quiet.",
    date: "2026-03-27",
    verified: true,
  },
  {
    id: "r5",
    productSlug: "grove-woven-grass-shade",
    author: "Hannah B.",
    rating: 4,
    title: "Lovely texture",
    body: "Natural variation is real — no two slats identical, which is the point.",
    date: "2026-02-19",
    verified: false,
  },
];

export const getReviews = (slug: string) => reviews.filter((r) => r.productSlug === slug);
