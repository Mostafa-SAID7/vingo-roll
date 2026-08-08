import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal/cookies")({
  head: () =>
    pageHead({
      title: "Cookie Policy | Vingo Roll",
      description: "Cookie Policy for the Vingo Roll demonstration storefront.",
      path: "/legal/cookies",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Legal" }]} />
      <PageHeader
        eyebrow={"Legal"}
        title={"Cookie Policy"}
        description={"Cookie Policy for the Vingo Roll demonstration storefront."}
      />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            This site sets no tracking or advertising cookies.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Local storage is used to remember your cart, wishlist, swatch tray and light/dark theme
            preference.
          </p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/shop">Browse the shop</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
