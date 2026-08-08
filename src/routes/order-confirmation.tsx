import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { useOrderStore } from "@/store/order-store";
import { useAuth } from "@/providers/auth-provider";
import { CheckCircle2 } from "lucide-react";
import { formatPrice } from "@/lib/formatters";

export const Route = createFileRoute("/order-confirmation")({
  head: () =>
    pageHead({
      title: "Order Confirmed | Vingo Roll",
      description: "Your order has been placed successfully.",
      path: "/order-confirmation",
    }),
  validateSearch: (search: Record<string, unknown>) => ({
    orderId: (search['orderId'] as string) || "",
  }),
  component: Page,
});

function Page() {
  const search = useSearch({ from: Route.id });
  const orderId = search["orderId"] ?? "";
  const { user } = useAuth();
  const getOrderById = useOrderStore((s) => s.getOrderById);

  const order = orderId ? getOrderById(orderId) : null;

  if (!order || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center py-12">
          <p className="text-muted-foreground mb-4">Order not found.</p>
          <Link to="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30">
              <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Order Confirmed</h1>
          <p className="text-muted-foreground">Thank you for your purchase!</p>
        </div>

        {/* Order Details */}
        <div className="bg-card rounded-lg border border-border p-8 mb-8">
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">ORDER NUMBER</p>
              <p className="text-lg font-bold">{order.id}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">ORDER DATE</p>
              <p className="text-lg font-bold">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">ESTIMATED DELIVERY</p>
              <p className="text-lg font-bold">{order.estimatedDelivery}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1">ORDER STATUS</p>
              <p className="text-lg font-bold capitalize">{order.status}</p>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-border">
            <div>
              <p className="text-sm font-semibold mb-3">Shipping Address</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                </p>
                <p>{order.shippingAddress.street1}</p>
                {order.shippingAddress.street2 && <p>{order.shippingAddress.street2}</p>}
                <p>
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p>{order.shippingAddress.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Contact Information</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>{user.email}</p>
                <p className="mt-4 text-xs font-semibold text-foreground">Payment Method</p>
                <p>{order.paymentMethod}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-8">
            <p className="text-sm font-semibold mb-4">Items Ordered</p>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.slug} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded bg-muted"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Object.entries(item.options)
                        .map(([key, value]) => `${key}: ${value}`)
                        .join(" • ")}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Qty: {item.quantity} @ {formatPrice(item.unitPrice)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Total */}
          <div className="bg-muted/50 rounded p-4 mb-8">
            <div className="space-y-2 text-sm mb-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{order.shipping === 0 ? "FREE" : formatPrice(order.shipping)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax</span>
                <span>{formatPrice(order.tax)}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-base pt-4 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(order.total)}</span>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-900 dark:text-blue-200 rounded p-4 text-sm">
            <p className="font-semibold mb-2">What's Next?</p>
            <p>
              A confirmation email has been sent to <strong>{user.email}</strong>. You can track
              your order from your account dashboard. We'll notify you when your order ships.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/account/orders" className="flex-1">
            <Button className="w-full">View Order History</Button>
          </Link>
          <Link to="/shop" className="flex-1">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>
        </div>

        {/* Info Text */}
        <p className="text-xs text-muted-foreground text-center mt-8">
          This is a demonstration. No actual order was placed and no payment was processed.
        </p>
      </div>
    </div>
  );
}
