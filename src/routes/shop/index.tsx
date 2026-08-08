import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader } from "@/components/common/section";
import { CatalogView } from "@/features/catalog/catalog-view";
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
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Shop" }]} />
      <PageHeader
        eyebrow="Catalog"
        title="Every treatment, made to measure"
        description="Filter by how you want the light to behave — then narrow by material, colour and room."
      />
      <CatalogView products={products} />
    </>
  );
}
