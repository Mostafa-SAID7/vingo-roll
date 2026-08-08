import { useState, type FormEvent } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cartSubtotal, useCartStore } from "@/store/cart-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/providers/auth-provider";
import { toast } from "sonner";
import { US_STATES } from "@/types/common";
import { formatPrice } from "@/lib/formatters";

export const Route = createFileRoute("/checkout")({
  head: () =>
    pageHead({
      title: "Checkout | Vingo Roll",
      description: "Enter your shipping information to complete your order.",
      path: "/checkout",
    }),
  component: Page,
});

function Page() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const items = useCartStore((s) => s.items);
  const cartTotal = cartSubtotal(items);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(" ")[0] || "",
    lastName: user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
    street1: "",
    street2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
    sameAsBilling: true,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors['firstName'] = "First name required";
    if (!formData.lastName.trim()) newErrors['lastName'] = "Last name required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors['email'] = "Valid email required";
    if (!formData.phone.trim()) newErrors['phone'] = "Phone number required";
    if (!formData.street1.trim()) newErrors['street1'] = "Address required";
    if (!formData.city.trim()) newErrors['city'] = "City required";
    if (!formData.state) newErrors['state'] = "State required";
    if (!/^\d{5}(-\d{4})?$/.test(formData.postalCode)) newErrors['postalCode'] = "Valid ZIP code required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    if (!user) {
      toast.error("Please log in to continue");
      navigate({ to: "/account/login" });
      return;
    }

    // Store in session for next step
    sessionStorage.setItem("checkout_address", JSON.stringify(formData));

    navigate({ to: "/checkout/payment" });
  };

  const subtotal = cartTotal;
  const shipping = subtotal > 150 ? 0 : 14.99;
  const tax = Math.round(subtotal * 0.075 * 100) / 100;
  const total = subtotal + shipping + tax;

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Cart", to: "/cart" }, { label: "Checkout" }]} />

      <PageHeader eyebrow="Step 1 of 3" title="Shipping address" description="Where should we send your order?" />

      <Section>
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form */}
          <form onSubmit={handleSubmit} className="lg:col-span-2 max-w-2xl">
            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Contact Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-destructive text-xs mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                      className={errors.phone ? "border-destructive" : ""}
                    />
                    {errors.phone && <p className="text-destructive text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h3 className="text-sm font-semibold mb-4">Shipping Address</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData((p) => ({ ...p, firstName: e.target.value }))}
                        className={errors.firstName ? "border-destructive" : ""}
                      />
                      {errors.firstName && <p className="text-destructive text-xs mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData((p) => ({ ...p, lastName: e.target.value }))}
                        className={errors.lastName ? "border-destructive" : ""}
                      />
                      {errors.lastName && <p className="text-destructive text-xs mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="street1">Address</Label>
                    <Input
                      id="street1"
                      value={formData.street1}
                      onChange={(e) => setFormData((p) => ({ ...p, street1: e.target.value }))}
                      placeholder="123 Main St"
                      className={errors.street1 ? "border-destructive" : ""}
                    />
                    {errors.street1 && <p className="text-destructive text-xs mt-1">{errors.street1}</p>}
                  </div>

                  <div>
                    <Label htmlFor="street2">Apartment, suite, etc. (optional)</Label>
                    <Input
                      id="street2"
                      value={formData.street2}
                      onChange={(e) => setFormData((p) => ({ ...p, street2: e.target.value }))}
                      placeholder="Apt 2B"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => setFormData((p) => ({ ...p, city: e.target.value }))}
                        className={errors.city ? "border-destructive" : ""}
                      />
                      {errors.city && <p className="text-destructive text-xs mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select
                        value={formData.state}
                        onValueChange={(value) => setFormData((p) => ({ ...p, state: value }))}
                      >
                        <SelectTrigger id="state" className={errors.state ? "border-destructive" : ""}>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {US_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-destructive text-xs mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="postalCode">ZIP Code</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => setFormData((p) => ({ ...p, postalCode: e.target.value }))}
                      placeholder="12345"
                      className={errors.postalCode ? "border-destructive" : ""}
                    />
                    {errors.postalCode && <p className="text-destructive text-xs mt-1">{errors.postalCode}</p>}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1">
                  Continue to Payment
                </Button>
                <Button type="button" variant="outline" onClick={() => navigate({ to: "/cart" })}>
                  Back
                </Button>
              </div>
            </div>
          </form>

          {/* Order Summary */}
          <div className="sticky top-24 h-fit bg-card rounded-lg border border-border p-6">
            <h3 className="text-sm font-semibold mb-4">Order Summary</h3>
            <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
              {items.map((item) => (
                <div key={item.slug} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
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

            {subtotal > 150 && (
              <p className="text-xs text-green-600 mt-4">✓ Free shipping on your order</p>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
