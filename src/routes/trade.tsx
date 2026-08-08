import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/trade")({
  head: () => pageHead({ title: 'Trade Program for Designers & Architects | Vingo Roll', description: 'Trade pricing, material access and project support for interior designers, architects, hospitality and developers.', path: '/trade' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Trade' }]} />
      <PageHeader eyebrow={'Trade'} title={'The Vingo Roll trade program'} description={'Trade pricing, material access and project support for interior designers, architects, hospitality and developers.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">Built for interior designers, architects, hospitality groups and residential developers working on multi-window projects.</p>
          <p className="text-muted-foreground leading-relaxed">Members receive extended material access, larger sample sets, priority workroom scheduling and a named project contact.</p>
          <p className="text-muted-foreground leading-relaxed">Apply with your business details and a note about your current project; applications are reviewed within two business days.</p>
          <p className="text-muted-foreground leading-relaxed">This is a demonstration application form — no data is submitted anywhere.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/shop">Browse the shop</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
