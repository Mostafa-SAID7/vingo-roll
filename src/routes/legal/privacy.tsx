import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal/privacy")({
  head: () =>
    pageHead({
      title: "Privacy Policy | Vingo Roll",
      description: "Privacy Policy for the Vingo Roll demonstration storefront.",
      path: "/legal/privacy",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Legal" }]} />
      <PageHeader
        eyebrow={"Legal"}
        title={"Privacy Policy"}
        description={"Privacy Policy for the Vingo Roll demonstration storefront."}
      />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">
            This demonstration site stores your cart, wishlist, swatch tray and theme preference in
            your browser's local storage only.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            No account data, payment data or personal information is transmitted to a server,
            because this project has no backend.
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
