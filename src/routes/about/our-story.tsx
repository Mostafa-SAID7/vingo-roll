import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about/our-story")({
  head: () => pageHead({ title: 'Our Story | Vingo Roll', description: 'How Vingo Roll grew from a two-machine workroom into a made-to-measure window treatment brand.', path: '/about/our-story' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Our story' }]} />
      <PageHeader eyebrow={'Our story'} title={'From two machines to a full workroom'} description={'How Vingo Roll grew from a two-machine workroom into a made-to-measure window treatment brand.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">Vingo Roll began with two industrial machines, a roll of Belgian linen and a stubborn belief that a curtain hem should hang straight for a decade.</p>
          <p className="text-muted-foreground leading-relaxed">We added measuring, then installation, then a design service — because the fabric was never the part customers found hardest.</p>
          <p className="text-muted-foreground leading-relaxed">Today the same rule applies to every order: if it will not hang properly, we will say so before we cut it.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/shop">Browse the shop</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
