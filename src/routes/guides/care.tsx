import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";


export const Route = createFileRoute("/guides/care")({
  head: () => pageHead({ title: 'Fabric Care Guide | Vingo Roll', description: 'How to clean, refresh and care for linen, cotton, velvet, woven and blackout window treatments.', path: '/guides/care' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Guides' }]} />
      <PageHeader eyebrow={'Guides'} title={'Fabric Care'} description={'How to clean, refresh and care for linen, cotton, velvet, woven and blackout window treatments.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Fabric Care</h2>
          <p className="text-muted-foreground leading-relaxed">Linen and cotton panels can usually take a cool gentle wash and a warm iron on the reverse. Rehang slightly damp so the weight of the fabric pulls the creases out.</p>
          <p className="text-muted-foreground leading-relaxed">Velvet, interlined and blackout constructions should be dry cleaned. Never machine-wash a blackout coating.</p>
          <p className="text-muted-foreground leading-relaxed">Woven grass and hardwood should be dusted with a soft brush attachment; avoid soaking. Every order ships with a care card matched to your exact fabric.</p>
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
