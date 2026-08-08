import { Ruler, Truck, Shield, Palette } from "lucide-react";
import { Link } from "@tanstack/react-router";

const items = [
  {
    icon: Palette,
    title: "Free swatches",
    body: "Judge colour in your own light before you commit.",
    to: "/swatches" as const,
    cta: "Order samples",
  },
  {
    icon: Ruler,
    title: "Measuring help",
    body: "Step-by-step guides, or a technician who does it for you.",
    to: "/guides/measuring" as const,
    cta: "Measuring center",
  },
  {
    icon: Truck,
    title: "Shipping & lead times",
    body: "Made-to-order in 3–4 weeks, tracked to your door.",
    to: "/guides/shipping" as const,
    cta: "Shipping info",
  },
  {
    icon: Shield,
    title: "Custom-order policy",
    body: "5-year hardware warranty and a clear returns policy.",
    to: "/guides/returns" as const,
    cta: "Returns & warranty",
  },
];

export function TrustLayer({ compact = false }: { compact?: boolean }) {
  return (
    <ul
      className={compact ? "grid gap-4 sm:grid-cols-2" : "grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}
    >
      {items.map(({ icon: Icon, ...item }) => (
        <li key={item.title} className="border-border bg-card/60 rounded-sm border p-5">
          <Icon className="text-accent h-5 w-5" aria-hidden="true" />
          <h3 className="font-sans mt-3 text-sm font-medium">{item.title}</h3>
          <p className="text-muted-foreground mt-1.5 text-xs leading-relaxed">{item.body}</p>
          <Link
            to={item.to}
            className="text-accent mt-3 inline-block text-xs underline underline-offset-4"
          >
            {item.cta}
          </Link>
        </li>
      ))}
    </ul>
  );
}
