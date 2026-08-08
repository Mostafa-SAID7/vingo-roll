import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { pageHead, jsonLd } from "@/lib/seo";
import { Crumbs, Section, SectionHeading } from "@/components/common/section";
import { ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { getInspiration } from "@/data/content";
import { products } from "@/data/products";

export const Route = createFileRoute("/inspiration/$slug")({
  loader: ({ params }) => {
    const post = getInspiration(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    return {
      ...pageHead({ title: `${post.title} | Vingo Roll Inspiration`, description: post.excerpt, path: `/inspiration/${post.slug}`, type: "article", image: post.image }),
      scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Article", headline: post.title, description: post.excerpt })],
    };
  },
  component: Page,
});

function Page() {
  const { post } = Route.useLoaderData();
  const used = products.filter((p) => post.productSlugs.includes(p.slug));

  return (
    <>
      <div className="relative h-[62vh] min-h-[400px] overflow-hidden">
        <img src={post.image} alt={post.title} width={1920} height={1088} className="animate-image-reveal h-full w-full object-cover" />
        <div className="veil absolute inset-0" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="container-page pb-12">
            <p className="eyebrow text-white/70">{post.style} · {post.room.replace(/-/g, " ")}</p>
            <h1 className="mt-3 max-w-3xl text-4xl text-white md:text-6xl">{post.title}</h1>
          </div>
        </div>
      </div>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Inspiration", to: "/inspiration" }, { label: post.title }]} />
      <Section>
        <div className="max-w-2xl space-y-5">
          {post.body.map((p) => <p key={p} className="text-muted-foreground text-lg leading-relaxed">{p}</p>)}
        </div>
      </Section>
      <Section className="bg-card">
        <SectionHeading eyebrow="Shop the look" title="Treatments used in this room" />
        <ProductGrid products={used} density="dense" />
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/swatches">Order these swatches</Link></Button>
          <Button asChild variant="outline"><Link to="/inspiration">Back to gallery</Link></Button>
        </div>
      </Section>
    </>
  );
}
