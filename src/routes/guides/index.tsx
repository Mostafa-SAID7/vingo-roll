import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";

export const Route = createFileRoute("/guides/")({
  head: () =>
    pageHead({
      title: "Guides — Measuring, Care, Shipping & Returns | Vingo Roll",
      description:
        "Everything you need before and after ordering: measuring guidance, fabric care, shipping lead times and our returns policy.",
      path: "/guides",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Guides" }]} />
      <PageHeader
        eyebrow={"Guides"}
        title={"Guides & know-how"}
        description={
          "Everything you need before and after ordering: measuring guidance, fabric care, shipping lead times and our returns policy."
        }
      />
      <Section>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              to: "/guides/measuring" as const,
              title: "Measuring Center",
              body: "Inside vs outside mount, width, height and a printable worksheet.",
            },
            {
              to: "/guides/care" as const,
              title: "Fabric Care",
              body: "Washing, dry cleaning and keeping natural fibres honest.",
            },
            {
              to: "/guides/shipping" as const,
              title: "Shipping",
              body: "Lead times for made-to-order and stocked items.",
            },
            {
              to: "/guides/returns" as const,
              title: "Returns & Warranty",
              body: "Custom-order policy, returns window and warranty.",
            },
          ].map((g) => (
            <Link
              key={g.title}
              to={g.to}
              className="border-border hover:border-accent rounded-sm border p-6 transition-colors"
            >
              <h2 className="text-xl">{g.title}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{g.body}</p>
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Support" title="Every order includes help" align="center" />
        <TrustLayer />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild>
            <Link to="/services/design-consultation">Book a consultation</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/quote">Get a quick quote</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
