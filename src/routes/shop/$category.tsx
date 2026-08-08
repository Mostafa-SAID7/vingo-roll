import { createFileRoute, notFound } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader } from "@/components/common/section";
import { CatalogView } from "@/features/catalog/catalog-view";
import { products } from "@/data/products";
import { getCategory } from "@/data/categories";

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    const category = getCategory(params.category);
    if (!category) throw notFound();
    return { category };
  },
  head: ({ loaderData }) => {
    const category = loaderData?.category;
    if (!category) return {};
    return pageHead({
      title: `${category.name} — Made to Measure | Vingo Roll`,
      description: category.description,
      path: `/shop/${category.slug}`,
      image: category.image,
    });
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const scoped =
    category.slug === "sale"
      ? products.filter((p) => p.sale)
      : category.slug === "smart-motorized"
        ? products.filter((p) => p.motorized)
        : products;

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Shop", to: "/shop" },
          { label: category.name },
        ]}
      />
      <PageHeader
        eyebrow={category.tagline}
        title={category.name}
        description={category.description}
      />
      <CatalogView
        products={scoped}
        {...(category.slug === "sale" || category.slug === "smart-motorized"
          ? {}
          : { lockedCategory: category.id })}
        showCategoryFilter={category.slug === "sale" || category.slug === "smart-motorized"}
      />
    </>
  );
}
