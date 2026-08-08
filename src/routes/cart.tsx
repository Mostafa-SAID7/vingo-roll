import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, EmptyState } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-card";
import { useCartStore, cartSubtotal } from "@/store/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/formatters";
import { products } from "@/data/products";

export const Route = createFileRoute("/cart")({
  head: () =>
    pageHead({
      title: "Your Cart | Vingo Roll",
      description:
        "Review your made-to-measure window treatment selections before requesting a quote.",
      path: "/cart",
    }),
  component: Page,
});

function Page() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const hydrated = useHydrated();
  const subtotal = cartSubtotal(items);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Cart" }]} />
      <PageHeader
        eyebrow="Cart"
        title="Your selections"
        description="Prices are indicative demonstration data — no payment is taken anywhere on this site."
      />
      <Section>
        {!hydrated ? (
          <div className="bg-muted h-48 animate-pulse rounded-sm" />
        ) : items.length === 0 ? (
          <EmptyState
            title="Your cart is empty"
            description="Start with a category, or let the style finder narrow things down."
            action={
              <Button asChild>
                <Link to="/shop">Browse treatments</Link>
              </Button>
            }
          />
        ) : (
          <div className="grid gap-12 lg:grid-cols-[1.6fr_1fr]">
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.key} className="border-border flex gap-5 border-b pb-6">
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    width={160}
                    height={200}
                    loading="lazy"
                    className="bg-muted h-32 w-24 rounded-sm object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-lg">{item.name}</h2>
                    <p className="text-muted-foreground mt-1 text-xs">
                      {Object.entries(item.options)
                        .map(([k, v]) => `${k}: ${v}`)
                        .join(" · ")}
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <div className="border-border flex items-center rounded-sm border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="px-3 py-1.5"
                          onClick={() => setQuantity(item.key, item.quantity - 1)}
                        >
                          −
                        </button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="px-3 py-1.5"
                          onClick={() => setQuantity(item.key, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive text-xs underline underline-offset-4"
                        onClick={() => remove(item.key)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                  <p className="text-sm">{formatPrice(item.unitPrice * item.quantity)}</p>
                </li>
              ))}
              <li>
                <Button variant="ghost" onClick={clear}>
                  Clear cart
                </Button>
              </li>
            </ul>
            <aside className="border-border h-fit rounded-sm border p-6">
              <h2 className="text-xl">Summary</h2>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Subtotal</dt>
                  <dd>{formatPrice(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Estimated shipping</dt>
                  <dd>{shipping === 0 ? "Free" : formatPrice(shipping)}</dd>
                </div>
                <div className="border-border flex justify-between border-t pt-3 text-base">
                  <dt>Total</dt>
                  <dd>{formatPrice(subtotal + shipping)}</dd>
                </div>
              </dl>
              <p className="text-muted-foreground mt-4 text-xs">
                Free shipping on orders over {formatPrice(500)}.
              </p>
              <Button asChild className="mt-6 w-full" size="lg">
                <Link to="/quote">Request a quote</Link>
              </Button>
              <Button asChild className="mt-3 w-full" variant="outline">
                <Link to="/swatches">Add free swatches</Link>
              </Button>
            </aside>
          </div>
        )}
      </Section>
      <Section className="bg-card">
        <h2 className="mb-8 text-3xl">You may also like</h2>
        <ProductGrid products={products.filter((p) => p.bestseller).slice(0, 3)} density="dense" />
      </Section>
    </>
  );
}
