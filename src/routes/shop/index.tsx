import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SlidersHorizontal } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { ProductGrid } from "@/components/product/product-card";
import { FilterSidebar } from "@/components/shop/filter-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useProductFilters } from "@/hooks";
import type { FilterState } from "@/types/common";
import { FILTER_DEFAULTS } from "@/types/common";
import { products } from "@/data/products";

export const Route = createFileRoute("/shop/")({
  head: () =>
    pageHead({
      title: "Shop All Window Treatments | Vingo Roll",
      description:
        "Browse every made-to-measure curtain, shade and blind. Filter by material, colour, light control, room and need.",
      path: "/shop",
    }),
  component: ShopPage,
});

function ShopPage() {
  const [filters, setFilters] = useState<FilterState>(FILTER_DEFAULTS);
  const filtered = useProductFilters(products, filters);

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
      <PageHeader
        eyebrow="Catalog"
        title="Every treatment, made to measure"
        description="Filter by how you want the light to behave — then narrow by material, colour and room."
      />
      <Section>
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filter Sidebar */}
          <aside className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onFiltersChange={setFilters}
              resultsCount={filtered.length}
            />
          </aside>

          {/* Products Grid */}
          <div>
            <ProductGrid products={filtered} />
          </div>
        </div>
      </Section>
    </>
  );
}
