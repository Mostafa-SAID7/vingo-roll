import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, EmptyState } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-card";
import { needs } from "@/data/needs";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop/needs/")({
  validateSearch: (search: Record<string, unknown>) => ({
    need: typeof search["need"] === "string" ? search["need"] : undefined,
  }),
  head: () =>
    pageHead({
      title: "Shop by Need — Blackout, Privacy, Heat Control | Vingo Roll",
      description:
        "Find window treatments by what you need them to do: blackout, privacy, heat control, light filtering, noise reduction, smart operation and more.",
      path: "/shop/needs",
    }),
  component: Page,
});

function Page() {
  const initial = Route.useSearch().need ?? null;
  const [active, setActive] = useState<string | null>(initial);
  const filtered = active
    ? products.filter((p) =>
        p.needs?.some(
          (n: string | { id: string; name: string; slug: string }) =>
            n === active || (typeof n === "object" && n.id === active),
        ),
      )
    : products;

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: "Shop by Need" },
        ]}
      />
      <PageHeader
        eyebrow="Discovery"
        title="Shop by need"
        description="Tell us what the window has to do, and we'll narrow the catalog to treatments that do it well."
      />
      <Section>
        <ul className="mb-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {needs.map((n) => (
            <li key={n.id}>
              <button
                type="button"
                onClick={() => setActive(active === n.slug ? null : n.slug)}
                aria-pressed={active === n.slug}
                className={`w-full rounded-sm border p-5 text-left transition-colors ${active === n.slug ? "border-accent bg-card" : "border-border hover:border-accent"}`}
              >
                <h2 className="text-lg">{n.name}</h2>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {n.description}
                </p>
              </button>
            </li>
          ))}
        </ul>
        {filtered.length ? (
          <ProductGrid products={filtered} density="dense" />
        ) : (
          <EmptyState
            title="Nothing here yet"
            description="No treatments match that need right now."
            action={<Button onClick={() => setActive(null)}>Show everything</Button>}
          />
        )}
      </Section>
    </>
  );
}
