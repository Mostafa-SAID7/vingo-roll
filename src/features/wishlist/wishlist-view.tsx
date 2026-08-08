import { Link } from "@tanstack/react-router";
import { Crumbs, PageHeader, Section, EmptyState } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-card";
import { useWishlistStore } from "@/store";
import { useHydrated } from "@/hooks";
import { products } from "@/data/products";

export function WishlistView() {
  const slugs = useWishlistStore((s) => s.slugs);
  const clear = useWishlistStore((s) => s.clear);
  const hydrated = useHydrated();
  const saved = products.filter((p) => slugs.includes(p.slug));

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Wishlist" }]} />
      <PageHeader
        eyebrow="Saved"
        title="Your wishlist"
        description="Saved to this browser so you can come back to it."
      />
      <Section>
        {!hydrated ? (
          <div className="bg-muted h-64 animate-pulse rounded-sm" />
        ) : saved.length === 0 ? (
          <EmptyState
            title="Nothing saved yet"
            description="Tap the heart on any piece to keep it here."
            action={
              <Button asChild>
                <Link to="/shop">Browse treatments</Link>
              </Button>
            }
          />
        ) : (
          <>
            <ProductGrid products={saved} density="dense" />
            <Button variant="ghost" className="mt-10" onClick={clear}>
              Clear wishlist
            </Button>
          </>
        )}
      </Section>
    </>
  );
}
