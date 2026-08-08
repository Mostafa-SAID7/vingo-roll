import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal/terms")({
  head: () =>
    pageHead({
      title: "Terms of Service | Vingo Roll",
      description: "Terms of Service for the Vingo Roll demonstration storefront.",
      path: "/legal/terms",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Legal" }]} />
      <PageHeader
        eyebrow={"Legal"}
        title={"Terms of Service"}
        description={"Terms of Service for the Vingo Roll demonstration storefront."}
      />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            All product names, prices, ratings, reviews and availability on this site are
            illustrative demonstration data.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Nothing on this site constitutes a binding offer of sale.
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
