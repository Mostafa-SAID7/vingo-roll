import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useCartStore, cartSubtotal, cartCount } from "@/store/cart-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

/**
 * Cart Drawer Component
 * Slide-in drawer accessible from any page
 * Shows cart items, allows quantity adjustment, and provides quick actions
 */
export function CartDrawer() {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const remove = useCartStore((s) => s.remove);
  const clear = useCartStore((s) => s.clear);
  const hydrated = useHydrated();
  const [open, setOpen] = useState(false);

  const subtotal = cartSubtotal(items);
  const shipping = subtotal > 500 || subtotal === 0 ? 0 : 45;
  const total = subtotal + shipping;
  const count = cartCount(items);

  const handleClose = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          aria-label="Open cart"
          className="hover:text-accent relative grid h-10 w-10 place-items-center transition-colors"
        >
          <ShoppingBag className="h-[18px] w-[18px]" aria-hidden="true" />
          {hydrated && count > 0 && (
            <span className="bg-accent text-accent-foreground absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] leading-none">
              {count}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent side="right" className="w-full max-w-md overflow-y-auto p-0 flex flex-col">
        <SheetHeader className="border-b border-border/30 px-6 py-4">
          <SheetTitle className="text-xl">Your Cart</SheetTitle>
        </SheetHeader>

        {!hydrated ? (
          <div className="flex-1 space-y-4 p-6">
            <div className="bg-muted h-24 animate-pulse rounded" />
            <div className="bg-muted h-24 animate-pulse rounded" />
          </div>
        ) : items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 text-center">
            <ShoppingBag className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
            <h3 className="font-display text-lg font-semibold mb-2">Cart is empty</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Add items to get started with your perfect window treatment.
            </p>
            <Button asChild onClick={handleClose} className="w-full">
              <Link to="/shop">Browse collection</Link>
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto">
              <ul className="space-y-4 p-6 border-b border-border/30">
                {items.map((item) => (
                  <li key={item.key} className="flex gap-4">
                    {/* Item Image */}
                    <img
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      width={80}
                      height={100}
                      loading="lazy"
                      className="bg-muted h-24 w-20 rounded-sm object-cover flex-shrink-0"
                    />

                    {/* Item Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-sm line-clamp-2">{item.name}</h3>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {Object.entries(item.options)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(" · ")}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <div className="border border-border/50 rounded flex items-center">
                          <button
                            type="button"
                            aria-label="Decrease quantity"
                            className="px-2 py-1 hover:bg-muted transition-colors"
                            onClick={() => setQuantity(item.key, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-xs">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label="Increase quantity"
                            className="px-2 py-1 hover:bg-muted transition-colors"
                            onClick={() => setQuantity(item.key, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <span className="text-sm font-semibold ml-auto">
                          {formatPrice(item.unitPrice * item.quantity)}
                        </span>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        aria-label="Remove item"
                        className="text-muted-foreground hover:text-destructive text-xs mt-2 flex items-center gap-1 transition-colors"
                        onClick={() => remove(item.key)}
                      >
                        <Trash2 className="h-3 w-3" />
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Clear Cart Button */}
              <div className="p-6 border-b border-border/30">
                <Button
                  variant="ghost"
                  className="w-full text-muted-foreground hover:text-destructive"
                  onClick={clear}
                >
                  Clear all items
                </Button>
              </div>
            </div>

            {/* Cart Summary */}
            <div className="border-t border-border/30 p-6 space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : formatPrice(shipping)}
                  </span>
                </div>
                <div className="border-t border-border/30 pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
              </div>

              <p className="text-muted-foreground text-xs">
                Free shipping on orders over {formatPrice(500)}.
              </p>

              {/* Action Buttons */}
              <div className="space-y-2 pt-4">
                <Button asChild className="w-full" onClick={handleClose}>
                  <Link to="/quote">Request a quote</Link>
                </Button>
                <Button asChild variant="outline" className="w-full" onClick={handleClose}>
                  <Link to="/swatches">Add free swatches</Link>
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
