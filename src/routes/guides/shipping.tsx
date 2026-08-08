import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";


export const Route = createFileRoute("/guides/shipping")({
  head: () => pageHead({ title: 'Shipping & Lead Times | Vingo Roll', description: 'Lead times, delivery and tracking for made-to-order curtains, shades and blinds.', path: '/guides/shipping' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Guides' }]} />
      <PageHeader eyebrow={'Guides'} title={'Shipping'} description={'Lead times, delivery and tracking for made-to-order curtains, shades and blinds.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Shipping</h2>
          <p className="text-muted-foreground leading-relaxed">Made-to-order treatments are cut, sewn and inspected in 3–4 weeks. Stocked hardware and swatches ship in 2–3 business days.</p>
          <p className="text-muted-foreground leading-relaxed">Everything ships tracked. Long drapery ships rolled rather than folded to avoid set creases.</p>
          <p className="text-muted-foreground leading-relaxed">Delivery dates shown anywhere on this site are indicative and for demonstration purposes.</p>
        </div>
      </Section>
      <Section>
        <SectionHeading eyebrow="Support" title="Every order includes help" align="center" />
        <TrustLayer />
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Button asChild><Link to="/services/design-consultation">Book a consultation</Link></Button>
          <Button asChild variant="outline"><Link to="/quote">Get a quick quote</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
