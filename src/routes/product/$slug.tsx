import { useState } from "react";
import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Heart, Star } from "lucide-react";
import { toast } from "sonner";
import { pageHead, jsonLd } from "@/lib/seo";
import { Crumbs, Section, SectionHeading } from "@/components/common/section";
import { TrustLayer } from "@/components/common/trust-layer";
import { ProductGrid } from "@/components/product/product-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getProduct, products } from "@/data/products";
import { getReviews, faqs } from "@/data/content";
import { formatPrice } from "@/lib/formatters";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = getProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const p = loaderData.product;
    return {
      ...pageHead({ title: `${p.name} | Vingo Roll`, description: p.shortDescription, path: `/product/${p.slug}`, type: "product", image: p.images[0]?.src }),
      scripts: [jsonLd({ "@context": "https://schema.org", "@type": "Product", name: p.name, description: p.shortDescription, offers: { "@type": "Offer", price: p.price, priceCurrency: p.currency } })],
    };
  },
  component: Page,
});

function Page() {
  const { product } = Route.useLoaderData();
  const [image, setImage] = useState(0);
  const [material, setMaterial] = useState(product.materials[0]!.id);
  const [color, setColor] = useState(product.colors[0]!.id);
  const [size, setSize] = useState(product.sizes[0]!.id);
  const [mount, setMount] = useState("inside");
  const [qty, setQty] = useState(1);
  const add = useCartStore((s) => s.add);
  const toggleWish = useWishlistStore((s) => s.toggle);
  const saved = useWishlistStore((s) => s.slugs).includes(product.slug);
  const hydrated = useHydrated();

  const mat = product.materials.find((m) => m.id === material)!;
  const sz = product.sizes.find((s) => s.id === size)!;
  const unitPrice = product.price + mat.priceDelta + sz.priceDelta;
  const reviews = getReviews(product.slug);
  const related = products.filter((p) => p.categoryId === product.categoryId && p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Shop", to: "/shop" }, { label: product.name }]} />
      <div className="container-page grid gap-12 py-10 lg:grid-cols-2">
        <div>
          <div className="bg-muted aspect-[4/5] overflow-hidden rounded-sm">
            <img src={product.images[image]?.src} alt={product.images[image]?.alt ?? product.name} width={1200} height={1500} className="h-full w-full object-cover" />
          </div>
          <ul className="mt-4 grid grid-cols-4 gap-3">
            {product.images.map((img, i) => (
              <li key={img.kind}>
                <button type="button" onClick={() => setImage(i)} aria-label={`View ${img.kind} image`} aria-current={i === image} className={cn("bg-muted aspect-square w-full overflow-hidden rounded-sm border", i === image ? "border-accent" : "border-transparent")}>
                  <img src={img.src} alt="" aria-hidden="true" loading="lazy" className="h-full w-full object-cover" />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="flex flex-wrap gap-2">
            {product.sale ? <Badge variant="destructive">Sale</Badge> : null}
            {product.newArrival ? <Badge>New</Badge> : null}
            <Badge variant="secondary">{product.stockStatus.replace(/-/g, " ")}</Badge>
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl">{product.name}</h1>
          <p className="text-muted-foreground mt-3 flex items-center gap-2 text-sm">
            <Star className="fill-accent text-accent h-4 w-4" aria-hidden="true" />
            {product.rating.toFixed(1)} · {product.reviewCount} reviews
          </p>
          <p className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl">{formatPrice(unitPrice)}</span>
            {product.compareAtPrice ? <span className="text-muted-foreground text-sm line-through">{formatPrice(product.compareAtPrice)}</span> : null}
          </p>
          <p className="text-muted-foreground mt-4 leading-relaxed">{product.shortDescription}</p>

          <div className="mt-8 space-y-7">
            <fieldset>
              <legend className="eyebrow mb-3">1. Fabric</legend>
              <div className="flex flex-wrap gap-2">
                {product.materials.map((m) => (
                  <button key={m.id} type="button" onClick={() => setMaterial(m.id)} aria-pressed={material === m.id} className={cn("rounded-sm border px-4 py-2 text-sm transition-colors", material === m.id ? "border-accent bg-card" : "border-border hover:border-accent")}>
                    {m.name}{m.priceDelta ? ` +${formatPrice(m.priceDelta)}` : ""}
                  </button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-3">2. Colour</legend>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button key={c.id} type="button" onClick={() => setColor(c.id)} aria-pressed={color === c.id} aria-label={c.name} title={c.name} className={cn("h-9 w-9 rounded-full border-2 transition-transform", color === c.id ? "border-accent scale-110" : "border-border")} style={{ backgroundColor: c.hex }} />
                ))}
              </div>
              <p className="text-muted-foreground mt-2 text-xs">{product.colors.find((c) => c.id === color)?.name}</p>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-3">3. Size</legend>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button key={s.id} type="button" onClick={() => setSize(s.id)} aria-pressed={size === s.id} className={cn("rounded-sm border px-4 py-2 text-sm transition-colors", size === s.id ? "border-accent bg-card" : "border-border hover:border-accent")}>{s.label}</button>
                ))}
              </div>
            </fieldset>
            <fieldset>
              <legend className="eyebrow mb-3">4. Mount</legend>
              <div className="flex gap-2">
                {["inside", "outside"].map((m) => (
                  <button key={m} type="button" onClick={() => setMount(m)} aria-pressed={mount === m} className={cn("rounded-sm border px-4 py-2 text-sm capitalize transition-colors", mount === m ? "border-accent bg-card" : "border-border hover:border-accent")}>{m} mount</button>
                ))}
              </div>
            </fieldset>
            <div className="flex flex-wrap items-center gap-3">
              <div className="border-border flex items-center rounded-sm border">
                <button type="button" aria-label="Decrease quantity" className="px-3 py-2" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span className="w-10 text-center text-sm" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" className="px-3 py-2" onClick={() => setQty((q) => Math.min(20, q + 1))}>+</button>
              </div>
              <Button size="lg" onClick={() => { add({ slug: product.slug, name: product.name, image: product.images[0]?.src ?? "", unitPrice, quantity: qty, options: { material: mat.name, color, size: sz.label, mount } }); toast.success(`${product.name} added to your cart`); }}>
                Add to cart — {formatPrice(unitPrice * qty)}
              </Button>
              <Button size="lg" variant="outline" onClick={() => toggleWish(product.slug)} aria-pressed={hydrated && saved}>
                <Heart className={cn("mr-2 h-4 w-4", hydrated && saved && "fill-current")} aria-hidden="true" /> {hydrated && saved ? "Saved" : "Save"}
              </Button>
            </div>
            <p className="text-muted-foreground text-xs">
              Not sure about colour? <Link to="/swatches" className="text-accent underline underline-offset-4">Order free swatches</Link> · Not sure about size? <Link to="/guides/measuring" className="text-accent underline underline-offset-4">Measuring guide</Link>
            </p>
          </div>

          <div className="mt-10"><TrustLayer compact /></div>
        </div>
      </div>

      <Section>
        <Tabs defaultValue="description">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="max-w-3xl pt-8">
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            <ul className="text-muted-foreground mt-5 space-y-2 text-sm">{product.features.map((f) => <li key={f}>— {f}</li>)}</ul>
          </TabsContent>
          <TabsContent value="specs" className="pt-8">
            <dl className="max-w-2xl">
              {Object.entries(product.specifications).map(([k, v]) => (
                <div key={k} className="border-border flex justify-between border-b py-3 text-sm"><dt className="text-muted-foreground">{k}</dt><dd>{v}</dd></div>
              ))}
            </dl>
          </TabsContent>
          <TabsContent value="reviews" className="pt-8">
            {reviews.length ? (
              <ul className="grid max-w-3xl gap-6">
                {reviews.map((r) => (
                  <li key={r.id} className="border-border rounded-sm border p-5">
                    <p className="text-accent text-xs" aria-label={`${r.rating} out of 5`}>{"★".repeat(r.rating)}</p>
                    <h3 className="mt-2 text-lg">{r.title}</h3>
                    <p className="text-muted-foreground mt-1 text-sm leading-relaxed">{r.body}</p>
                    <p className="text-muted-foreground mt-3 text-xs">{r.author} · {r.date}{r.verified ? " · Verified" : ""}</p>
                  </li>
                ))}
              </ul>
            ) : <p className="text-muted-foreground text-sm">No reviews for this piece yet.</p>}
          </TabsContent>
          <TabsContent value="faq" className="pt-8">
            <Accordion type="single" collapsible className="max-w-3xl">
              {faqs.slice(0, 5).map((f) => (
                <AccordionItem key={f.question} value={f.question}>
                  <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">{f.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </TabsContent>
        </Tabs>
      </Section>

      <Section className="bg-card">
        <SectionHeading eyebrow="Related" title="Goes well with" />
        <ProductGrid products={related} density="dense" />
      </Section>
    </>
  );
}
