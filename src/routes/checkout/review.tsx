import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { cartSubtotal, useCartStore } from "@/store/cart-store";
import { useAuth } from "@/providers/auth-provider";
import { useOrderStore } from "@/store/order-store";
import { toast } from "sonner";
import { calculateShipping, calculateTax, type Address } from "@/types/common";
import { formatPrice } from "@/lib/formatters";

export const Route = createFileRoute("/checkout/review")({
  head: () =>
    pageHead({
      title: "Review Order | Vingo Roll",
      description: "Review and confirm your order before checkout.",
      path: "/checkout/review",
    }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useCartStore((s) => s.items);
  const cartTotal = cartSubtotal(items);
  const clearCart = useCartStore((s) => s.clear);
  const createOrder = useOrderStore((s) => s.createOrder);

  const [isProcessing, setIsProcessing] = useState(false);

  // Retrieve checkout data from session
  const addressData = JSON.parse(sessionStorage.getItem("checkout_address") || "{}") as Address;
  const paymentData = JSON.parse(sessionStorage.getItem("checkout_payment") || "{}");

  if (!addressData.firstName || !paymentData.paymentMethod) {
    return (
      <Section>
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Checkout data not found.</p>
          <Button onClick={() => navigate({ to: "/checkout" })}>Start Checkout</Button>
        </div>
      </Section>
    );
  }

  const subtotal = cartTotal;
  const shipping = calculateShipping(subtotal, paymentData.shippingMethod || "standard");
  const tax = calculateTax(subtotal, addressData.state);
  const total = subtotal + shipping + tax;

  const handlePlaceOrder = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (!user) throw new Error("User not authenticated");

      // Create order
      const order = createOrder(
        user.id,
        items,
        addressData as Address,
        paymentData.paymentMethod,
        paymentData.shippingMethod || "standard"
      );

      // Clear cart
      clearCart();
      sessionStorage.removeItem("checkout_address");
      sessionStorage.removeItem("checkout_payment");

      toast.success("Order placed successfully!");

      // Redirect to confirmation
      navigate({ to: `/order-confirmation?orderId=${order.id}` });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to place order";
      toast.error(message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Checkout", to: "/checkout" },
          { label: "Review" },
        ]}
      />

      <PageHeader
        eyebrow="Step 3 of 3"
        title="Review your order"
        description="Please verify everything looks correct before confirming."
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Review Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Address */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Shipping Address</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/checkout" })}
                >
                  Edit
                </Button>
              </div>
              <div className="text-sm space-y-1 text-muted-foreground">
                <p>
                  {addressData.firstName} {addressData.lastName}
                </p>
                <p>{addressData.street1}</p>
                {addressData.street2 && <p>{addressData.street2}</p>}
                <p>
                  {addressData.city}, {addressData.state} {addressData.postalCode}
                </p>
                <p>{addressData.phone}</p>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Payment Method</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/checkout/payment" })}
                >
                  Edit
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="capitalize mb-1">{paymentData.paymentMethod.replace("-", " ")}</p>
                {paymentData.last4 && <p>•••• {paymentData.last4}</p>}
              </div>
            </div>

            {/* Shipping Method */}
            <div className="bg-card rounded-lg border border-border p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Shipping Method</h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate({ to: "/checkout/payment" })}
                >
                  Edit
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p className="capitalize">{paymentData.shippingMethod || "standard"}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-sm font-semibold mb-4">Order Items</h3>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.slug} className="flex gap-4 pb-4 border-b border-border/50 last:pb-0 last:border-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded bg-muted"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {Object.entries(item.options).map(([key, value]) => `${key}: ${value}`).join(" • ")}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Qty: {item.quantity} @ {formatPrice(item.unitPrice)} each
                      </p>
                    </div>
                    <p className="font-medium text-sm">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary & Submit */}
          <div className="sticky top-24 h-fit">
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="bg-card rounded-lg border border-border p-6">
                <h3 className="text-sm font-semibold mb-4">Order Total</h3>
                <div className="space-y-2 text-sm mb-6 pb-6 border-b border-border/50">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                </div>

                <div className="flex justify-between font-bold text-base mb-6">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>

                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full"
                  size="lg"
                >
                  {isProcessing ? "Processing..." : "Place Order"}
                </Button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                This is a demo. No payment will be processed.
              </p>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => navigate({ to: "/checkout/payment" })}
                disabled={isProcessing}
              >
                Back
              </Button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
