import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/legal/accessibility")({
  head: () => pageHead({ title: 'Accessibility Statement | Vingo Roll', description: 'Accessibility Statement for the Vingo Roll demonstration storefront.', path: '/legal/accessibility' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Legal' }]} />
      <PageHeader eyebrow={'Legal'} title={'Accessibility Statement'} description={'Accessibility Statement for the Vingo Roll demonstration storefront.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <p className="text-muted-foreground leading-relaxed">We aim for a WCAG-conscious implementation: semantic headings, keyboard-operable navigation, visible focus, labelled form fields and reduced-motion support.</p>
          <p className="text-muted-foreground leading-relaxed">If you encounter a barrier, contact us and we will address it.</p>
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild><Link to="/shop">Browse the shop</Link></Button>
          <Button asChild variant="outline"><Link to="/contact">Contact us</Link></Button>
        </div>
      </Section>
      
    </>
  );
}
