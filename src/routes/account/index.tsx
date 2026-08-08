import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useWishlistStore } from "@/store/wishlist-store";
import { useSwatchStore } from "@/store/swatch-store";
import { useHydrated } from "@/hooks/use-hydrated";

export const Route = createFileRoute("/account/")({
  head: () =>
    pageHead({
      title: "Your Account | Vingo Roll",
      description:
        "Demonstration account area: orders, saved designs and profile details stored locally in your browser.",
      path: "/account",
    }),
  component: Page,
});

const mockOrders = [
  {
    id: "VR-10482",
    date: "2026-06-02",
    status: "In production",
    total: "$1,148",
    items: "Nocturne Blackout Drape ×2",
  },
  {
    id: "VR-10331",
    date: "2026-04-18",
    status: "Delivered",
    total: "$389",
    items: "Grove Woven Grass Shade ×1",
  },
];

function Page() {
  const wishlist = useWishlistStore((s) => s.slugs);
  const tray = useSwatchStore((s) => s.ids);
  const hydrated = useHydrated();

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Account" }]} />
      <PageHeader
        eyebrow="Account"
        title="Your account"
        description="This is a demonstration account area. Nothing is stored on a server — saved items live in this browser only."
      />
      <Section>
        <Tabs defaultValue="orders">
          <TabsList>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="designs">Saved designs</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>
          <TabsContent value="orders" className="pt-8">
            <ul className="space-y-4">
              {mockOrders.map((o) => (
                <li
                  key={o.id}
                  className="border-border flex flex-wrap items-center justify-between gap-4 rounded-sm border p-5"
                >
                  <div>
                    <p className="text-sm">{o.id}</p>
                    <p className="text-muted-foreground text-xs">
                      {o.date} · {o.items}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm">{o.total}</p>
                    <p className="text-muted-foreground text-xs">{o.status}</p>
                  </div>
                </li>
              ))}
            </ul>
          </TabsContent>
          <TabsContent value="designs" className="pt-8">
            <p className="text-muted-foreground text-sm">
              {hydrated
                ? `${wishlist.length} saved pieces · ${tray.length} swatches in your tray.`
                : "Loading your saved items…"}
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button asChild variant="outline">
                <Link to="/wishlist">View wishlist</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/swatches">View swatch tray</Link>
              </Button>
            </div>
          </TabsContent>
          <TabsContent value="profile" className="pt-8">
            <dl className="max-w-md space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Name</dt>
                <dd>Demo Customer</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Email</dt>
                <dd>demo@vingoroll.example</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Trade member</dt>
                <dd>No</dd>
              </div>
            </dl>
          </TabsContent>
        </Tabs>
      </Section>
    </>
  );
}
