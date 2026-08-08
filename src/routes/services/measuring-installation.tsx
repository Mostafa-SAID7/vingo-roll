import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";

export const Route = createFileRoute("/services/measuring-installation")({
  head: () =>
    pageHead({
      title: "Measuring & Installation Services | Vingo Roll",
      description:
        "Professional measuring and installation for curtains, shades and blinds — from first measurement to a levelled, tested install.",
      path: "/services/measuring-installation",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Services" }]} />
      <PageHeader
        eyebrow={"Services"}
        title={"Measuring & Installation"}
        description={
          "Professional measuring and installation for curtains, shades and blinds — from first measurement to a levelled, tested install."
        }
      />
      <Section className="bg-card">
        <SectionHeading eyebrow="Process" title="How it works" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 1</p>
            <h3 className="text-xl">Choose your treatment</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Browse the shop or take the style finder. Order swatches to confirm colour.
            </p>
          </li>
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 2</p>
            <h3 className="text-xl">Measure</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Follow the measuring center, or book a technician to measure and confirm mounting.
            </p>
          </li>
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 3</p>
            <h3 className="text-xl">Confirm the design</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              We review fabric, heading, mount and operation with you in writing.
            </p>
          </li>
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 4</p>
            <h3 className="text-xl">Place order or request a quote</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Made-to-order production begins once you approve the specification.
            </p>
          </li>
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 5</p>
            <h3 className="text-xl">Installation</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Brackets fitted to the correct substrate, motors paired, everything levelled and
              tested.
            </p>
          </li>
          <li className="border-border rounded-sm border p-6">
            <p className="eyebrow mb-2">Step 6</p>
            <h3 className="text-xl">Aftercare</h3>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Care card, warranty details and a contact for adjustments.
            </p>
          </li>
        </ol>
      </Section>
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Frequently asked</h2>
          <p className="text-muted-foreground leading-relaxed">
            Do I have to use your installers? No — every product can be fitted DIY, and most ship
            with brackets and a template.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            What if a measurement is wrong? Measurements taken by our technician are guaranteed.
            Self-measured orders are cut to the numbers you supply.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Can you remove old treatments? Yes, ask when booking; it is quoted per window.
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
