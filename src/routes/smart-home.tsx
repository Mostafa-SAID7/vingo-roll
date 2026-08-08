import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/smart-home")({
  head: () => pageHead({ title: 'Smart & Motorized Window Treatments | Vingo Roll', description: 'Motorized shades with app control, schedules, room scenes and cordless child-safe operation.', path: '/smart-home' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Smart home' }]} />
      <PageHeader eyebrow={'Smart home'} title={'Light on a schedule'} description={'Motorized shades with app control, schedules, room scenes and cordless child-safe operation.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">Our motorised shades run on rechargeable lithium motors, so no rewiring is needed. A single charge typically lasts a full season of daily use.</p>
          <p className="text-muted-foreground leading-relaxed">Set schedules by clock time or by sunrise and sunset, and group shades into room scenes — Morning, Focus, Evening.</p>
          <p className="text-muted-foreground leading-relaxed">Cordless operation removes the loop cord entirely, which is the safest choice in rooms used by children.</p>
          <p className="text-muted-foreground leading-relaxed">Compatibility badges shown on product pages reflect our own mock demonstration data and are not a claim of certification.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/shop">Browse the shop</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
