import { Link } from "@tanstack/react-router";
import { Heart, Star, ShoppingBag } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice } from "@/lib/formatters";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCartStore } from "@/store/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { QuickViewButton } from "@/components/product/product-quick-view";
import { toast } from "sonner";

export function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const wishlist = useWishlistStore((s) => s.slugs);
  const toggle = useWishlistStore((s) => s.toggle);
  const addToCart = useCartStore((s) => s.add);
  const hydrated = useHydrated();
  const saved = hydrated && wishlist.includes(product.slug);
  const main = product.images[0];
  const hover = product.images[1] ?? main;

  const handleAddToCart = () => {
    addToCart({
      slug: product.slug,
      name: product.name,
      image: product.images[0]?.src || "",
      unitPrice: product.price,
      quantity: 1,
      options: {
        Material: product.materials[0]?.name || "",
        Color: product.colors[0]?.name || "",
        Size: product.sizes[0]?.label || "",
      },
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <article className="group relative">
      <div className="bg-muted relative aspect-[4/5] overflow-hidden rounded-sm">
        <Link to="/product/$slug" params={{ slug: product.slug }} className="absolute inset-0 z-0">
          <img
            src={main?.src ?? ""}
            alt={main?.alt ?? product.name}
            width={1200}
            height={1500}
            loading={priority ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-0"
          />
          <img
            src={hover?.src ?? ""}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-[1.04] object-cover opacity-0 transition-opacity duration-700 group-hover:opacity-100"
          />
        </Link>
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-20">
          {product.sale ? <Badge variant="destructive">Sale</Badge> : null}
          {product.newArrival ? <Badge>New</Badge> : null}
          {product.bestseller ? <Badge variant="secondary">Bestseller</Badge> : null}
        </div>

        {/* Right Side Icons Stack - Heart & Eye */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5 z-30">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggle(product.slug);
            }}
            aria-pressed={saved}
            aria-label={
              saved ? `Remove ${product.name} from wishlist` : `Save ${product.name} to wishlist`
            }
            className="bg-background/85 text-foreground hover:bg-background grid h-9 w-9 place-items-center rounded-full backdrop-blur transition-colors"
          >
            <Heart className={cn("h-4 w-4", saved && "fill-current")} aria-hidden="true" />
          </button>
          <QuickViewButton product={product} />
        </div>

        {/* Add to Cart Button - Visible on Hover, Bottom Left */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleAddToCart();
          }}
          className="absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-3 py-2 rounded-sm font-medium text-sm transition-all opacity-0 group-hover:opacity-100 z-30"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4" />
          Add to Cart
        </button>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-sans text-sm font-medium tracking-tight">{product.name}</h3>
          <p className="text-muted-foreground mt-1 line-clamp-2 max-w-xs text-xs leading-relaxed">
            {product.shortDescription}
          </p>
          <p className="text-muted-foreground mt-2 flex items-center gap-1 text-xs">
            <Star className="fill-accent text-accent h-3 w-3" aria-hidden="true" />
            <span>
              {product.rating.toFixed(1)} ({product.reviewCount})
            </span>
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium">{formatPrice(product.price)}</p>
          {product.compareAtPrice ? (
            <p className="text-muted-foreground text-xs line-through">
              {formatPrice(product.compareAtPrice)}
            </p>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function ProductGrid({
  products,
  density = "comfortable",
}: {
  products: Product[];
  density?: "comfortable" | "dense";
}) {
  return (
    <div
      className={cn(
        "grid gap-x-6 gap-y-12 sm:grid-cols-2",
        density === "dense" ? "lg:grid-cols-4" : "lg:grid-cols-3",
      )}
    >
      {products.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 3} />
      ))}
    </div>
  );
}
