import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cartSubtotal, useCartStore } from "@/store/cart-store";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { SHIPPING_METHODS, calculateShipping, calculateTax } from "@/types/common";
import { formatPrice } from "@/lib/formatters";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout/payment")({
  head: () =>
    pageHead({
      title: "Payment | Vingo Roll",
      description: "Choose your payment method and review your order.",
      path: "/checkout/payment",
    }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useCartStore((s) => s.items);
  const cartTotal = cartSubtotal(items);

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [cardData, setCardData] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvc: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = cartTotal;
  const shipping = calculateShipping(subtotal, shippingMethod);
  const tax = calculateTax(subtotal, "CA"); // Mock: use CA tax rate

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (paymentMethod === "credit-card") {
      if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ""))) {
        newErrors["cardNumber"] = "Invalid card number";
      }
      if (!cardData.cardName.trim()) newErrors["cardName"] = "Cardholder name required";
      if (!/^\d{2}\/\d{2}$/.test(cardData.expiry)) newErrors["expiry"] = "Use MM/YY format";
      if (!/^\d{3}$/.test(cardData.cvc)) newErrors["cvc"] = "Invalid CVC";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCardNumberChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 16);
    const formatted = clean.replace(/(\d{4})/g, "$1 ").trim();
    setCardData((p) => ({ ...p, cardNumber: formatted }));
  };

  const handleExpiryChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 4);
    const formatted = clean.length >= 2 ? `${clean.slice(0, 2)}/${clean.slice(2)}` : clean;
    setCardData((p) => ({ ...p, expiry: formatted }));
  };

  const handleCvcChange = (value: string) => {
    const clean = value.replace(/\D/g, "").slice(0, 3);
    setCardData((p) => ({ ...p, cvc: clean }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    // Store payment method for review
    sessionStorage.setItem(
      "checkout_payment",
      JSON.stringify({
        paymentMethod,
        shippingMethod,
        last4: cardData.cardNumber.slice(-4),
      }),
    );

    navigate({ to: "/checkout/review" });
  };

  const total = subtotal + shipping + tax;

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Checkout", to: "/checkout" },
          { label: "Payment" },
        ]}
      />

      <PageHeader
        eyebrow="Step 2 of 3"
        title="Payment Method"
        description="How would you like to pay?"
      />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 max-w-2xl space-y-8">
            {/* Shipping Method */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Shipping Method</h3>
              <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                <div className="space-y-3">
                  {SHIPPING_METHODS.map((method) => (
                    <div
                      key={method.id}
                      className={cn(
                        "border-border flex items-start gap-4 rounded-lg border p-4 cursor-pointer transition-colors hover:bg-muted",
                        shippingMethod === method.id && "border-accent bg-accent/5",
                      )}
                    >
                      <RadioGroupItem value={method.id} id={`ship-${method.id}`} className="mt-1" />
                      <label htmlFor={`ship-${method.id}`} className="flex-1 cursor-pointer">
                        <div className="font-medium text-sm">{method.name}</div>
                        <div className="text-muted-foreground text-xs mt-1">
                          {method.description}
                        </div>
                      </label>
                      <div className="font-medium text-sm whitespace-nowrap">
                        {method.cost === 0 ? "FREE" : formatPrice(method.cost)}
                      </div>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-sm font-semibold mb-4">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  {[
                    { id: "credit-card", label: "Credit or Debit Card" },
                    { id: "paypal", label: "PayPal" },
                    { id: "apple-pay", label: "Apple Pay" },
                  ].map((method) => (
                    <div key={method.id} className="flex items-center gap-3">
                      <RadioGroupItem value={method.id} id={`pay-${method.id}`} />
                      <label
                        htmlFor={`pay-${method.id}`}
                        className="cursor-pointer text-sm font-medium"
                      >
                        {method.label}
                      </label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Card Details (if credit card selected) */}
            {paymentMethod === "credit-card" && (
              <div className="space-y-4 border-t border-border pt-8">
                <h3 className="text-sm font-semibold">Card Details</h3>

                <div>
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input
                    id="cardNumber"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => handleCardNumberChange(e.target.value)}
                    className={errors["cardNumber"] ? "border-destructive" : ""}
                  />
                  {errors["cardNumber"] && (
                    <p className="text-destructive text-xs mt-1">{errors["cardNumber"]}</p>
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    Demo: Use any 16-digit number
                  </p>
                </div>

                <div>
                  <Label htmlFor="cardName">Cardholder Name</Label>
                  <Input
                    id="cardName"
                    placeholder="Jane Doe"
                    value={cardData.cardName}
                    onChange={(e) => setCardData((p) => ({ ...p, cardName: e.target.value }))}
                    className={errors["cardName"] ? "border-destructive" : ""}
                  />
                  {errors["cardName"] && (
                    <p className="text-destructive text-xs mt-1">{errors["cardName"]}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input
                      id="expiry"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) => handleExpiryChange(e.target.value)}
                      className={errors["expiry"] ? "border-destructive" : ""}
                    />
                    {errors["expiry"] && (
                      <p className="text-destructive text-xs mt-1">{errors["expiry"]}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cvc">CVC</Label>
                    <Input
                      id="cvc"
                      placeholder="123"
                      value={cardData.cvc}
                      onChange={(e) => handleCvcChange(e.target.value)}
                      maxLength={3}
                      className={errors["cvc"] ? "border-destructive" : ""}
                    />
                    {errors["cvc"] && (
                      <p className="text-destructive text-xs mt-1">{errors["cvc"]}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-border">
              <Button type="submit" className="flex-1">
                Review Order
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate({ to: "/checkout" })}>
                Back
              </Button>
            </div>
          </form>

          {/* Order Summary */}
          <div className="sticky top-24 h-fit bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-border/50 max-h-48 overflow-y-auto">
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between text-sm">
                  <span className="text-muted-foreground line-clamp-1">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-medium">{formatPrice(item.unitPrice * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm mb-6">
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

            <div className="flex justify-between font-bold text-base pt-4 border-t border-border">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
