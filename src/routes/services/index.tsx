import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";
import { services } from "@/data/content";

export const Route = createFileRoute("/services/")({
  head: () => pageHead({ title: 'Services — Consultation, Measuring & Installation | Vingo Roll', description: 'Design consultation, professional measuring, installation and free material swatches.', path: '/services' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Services' }]} />
      <PageHeader eyebrow={'Services'} title={'Service, start to finish'} description={'Design consultation, professional measuring, installation and free material swatches.'} />
      <Section>
        <ul className="grid gap-5 md:grid-cols-2">
          {services.map((s) => (
            <li key={s.id} className="border-border rounded-sm border p-7">
              <p className="eyebrow mb-2">{s.price}</p>
              <h2 className="text-2xl">{s.name}</h2>
              <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{s.summary}</p>
              <ul className="text-muted-foreground mt-4 space-y-1.5 text-sm">
                {s.details.map((d) => <li key={d}>— {d}</li>)}
              </ul>
            </li>
          ))}
        </ul>
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
