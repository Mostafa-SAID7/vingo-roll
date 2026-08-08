import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, Section, SectionHeading } from "@/components/common/section";
import { ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { getCollection } from "@/data/collections";
import { products } from "@/data/products";
import { inspiration } from "@/data/content";

export const Route = createFileRoute("/collections/$slug")({
  loader: ({ params }) => {
    const collection = getCollection(params.slug);
    if (!collection) throw notFound();
    return { collection };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageHead({ title: `${loaderData.collection.name} Collection | Vingo Roll`, description: loaderData.collection.description, path: `/collections/${loaderData.collection.slug}`, image: loaderData.collection.image })
      : {},
  component: Page,
});

function Page() {
  const { collection } = Route.useLoaderData();
  const items = products.filter((p) => p.collectionId === collection.id);
  const related = inspiration.slice(0, 2);

  return (
    <>
      <div className="relative h-[52vh] min-h-[360px] overflow-hidden">
        <img src={collection.image} alt={`${collection.name} collection`} width={1920} height={1088} className="animate-image-reveal h-full w-full object-cover" />
        <div className="veil absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page pb-12">
            <p className="eyebrow text-white/70">{collection.mood}</p>
            <h1 className="mt-3 text-4xl text-white md:text-6xl">{collection.name}</h1>
          </div>
        </div>
      </div>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Collections", to: "/collections" }, { label: collection.name }]} />
      <Section>
        <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed">{collection.story}</p>
      </Section>
      <Section className="bg-card">
        <SectionHeading eyebrow="Pieces" title={`${items.length} in this collection`} />
        {items.length ? <ProductGrid products={items} density="dense" /> : <p className="text-muted-foreground">More pieces are joining this collection soon.</p>}
      </Section>
      <Section>
        <SectionHeading eyebrow="Related" title="Rooms in this spirit" />
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((post) => (
            <Link key={post.id} to="/inspiration/$slug" params={{ slug: post.slug }} className="group block">
              <div className="bg-muted aspect-[16/10] overflow-hidden rounded-sm">
                <img src={post.image} alt={post.title} width={1200} height={750} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <h3 className="mt-3 text-xl">{post.title}</h3>
            </Link>
          ))}
        </div>
        <Button asChild className="mt-8" variant="outline"><Link to="/collections">All collections</Link></Button>
      </Section>
    </>
  );
}
