import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about/")({
  head: () => pageHead({ title: 'About Vingo Roll | Made-to-Measure Window Treatments', description: 'A workroom-led window treatment brand: made-to-measure curtains, shades and blinds, plus measuring, design and installation.', path: '/about' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'About' }]} />
      <PageHeader eyebrow={'About'} title={'A workroom, not a warehouse'} description={'A workroom-led window treatment brand: made-to-measure curtains, shades and blinds, plus measuring, design and installation.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">We cut, sew and finish in our own workroom, which is why our lead times are measured in weeks rather than months and why a hem can be changed the day before it ships.</p>
          <p className="text-muted-foreground leading-relaxed">Every project starts the same way: swatches in your own light, honest measurements, and a written specification you approve before anything is cut.</p>
          <p className="text-muted-foreground leading-relaxed">All pricing, reviews and availability shown on this site are demonstration data.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/shop">Browse the shop</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
