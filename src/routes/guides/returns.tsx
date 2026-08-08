import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";

export const Route = createFileRoute("/guides/returns")({
  head: () =>
    pageHead({
      title: "Returns, Warranty & Custom-Order Policy | Vingo Roll",
      description:
        "Our returns policy for stocked items, custom-order policy for made-to-measure pieces, and hardware warranty.",
      path: "/guides/returns",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Guides" }]} />
      <PageHeader
        eyebrow={"Guides"}
        title={"Returns & Warranty"}
        description={
          "Our returns policy for stocked items, custom-order policy for made-to-measure pieces, and hardware warranty."
        }
      />
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Returns & Warranty</h2>
          <p className="text-muted-foreground leading-relaxed">
            Stocked hardware and accessories can be returned within 30 days, unused and in original
            packaging.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Made-to-measure pieces are cut for your window and are not returnable unless faulty or
            not matching the confirmed specification. This is why we send free swatches and offer
            professional measuring.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Hardware carries a 5-year warranty; motors carry a 3-year warranty on the drive unit.
          </p>
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
