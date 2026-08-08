import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { TrustLayer } from "@/components/common/trust-layer";


export const Route = createFileRoute("/guides/measuring")({
  head: () => pageHead({ title: 'Measuring Center — Curtains, Blinds & Shades | Vingo Roll', description: 'General guidance for measuring curtains, blinds and shades: inside vs outside mount, width, height, a checklist and common mistakes.', path: '/guides/measuring' }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: 'Guides' }]} />
      <PageHeader eyebrow={'Guides'} title={'Measuring Center'} description={'General guidance for measuring curtains, blinds and shades: inside vs outside mount, width, height, a checklist and common mistakes.'} />
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Before you start</h2>
          <p className="text-muted-foreground leading-relaxed">This is general guidance, not engineering advice for your specific window. If anything is unclear — or the opening is out of square — book professional measuring and we will guarantee the fit.</p>
          <p className="text-muted-foreground leading-relaxed">Measure in inches with a steel tape. Never reuse a measurement from another window, even if the windows look identical.</p>
        </div>
      </Section>
      <Section className="bg-card">
        <SectionHeading eyebrow="Process" title="Inside mount vs outside mount" />
        <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 1</p><h3 className="text-xl">Inside mount</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Sits inside the recess for the cleanest look. Needs a square opening with enough depth for the bracket.</p></li>
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 2</p><h3 className="text-xl">Outside mount</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Mounts on the wall or frame above the opening. Blocks more light and hides an out-of-square recess.</p></li>
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 3</p><h3 className="text-xl">Width</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Inside mount: measure the recess width at top, middle and bottom, and use the narrowest. Outside mount: add 3–4 inches each side.</p></li>
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 4</p><h3 className="text-xl">Height</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Inside mount: measure left, centre and right, use the longest. Outside mount: measure from the mounting point to where you want the hem.</p></li>
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 5</p><h3 className="text-xl">Curtain fullness</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">For gathered curtains, allow roughly two to two-and-a-half times the track width in total panel width.</p></li>
            <li className="border-border rounded-sm border p-6"><p className="eyebrow mb-2">Step 6</p><h3 className="text-xl">Rod placement</h3><p className="text-muted-foreground mt-2 text-sm leading-relaxed">Extend the rod 8–12 inches past each side and mount 4–6 inches above the frame to make the window read taller.</p></li>
        </ol>
      </Section>
      <Section>
        <div className="max-w-3xl space-y-5">
          <h2 className="text-3xl md:text-4xl">Measurement checklist</h2>
          <p className="text-muted-foreground leading-relaxed">1. Steel tape, pencil and this checklist printed or on screen. 2. Note each window with a room name and a position. 3. Record width and height three times each. 4. Note the recess depth. 5. Note any obstruction — handles, tiles, radiators, alarm sensors. 6. Photograph each window.</p>
          <p className="text-muted-foreground leading-relaxed">Common mistakes: measuring the old curtain instead of the window, rounding up, forgetting handle clearance, and assuming a recess is square.</p>
        </div>
      </Section>
      <Section>
        <div className="border-border rounded-sm border border-dashed p-8 print:border-0">
          <p className="eyebrow mb-3">Printable worksheet</p>
          <h2 className="text-2xl">Window worksheet</h2>
          <table className="mt-6 w-full text-left text-sm">
            <thead className="text-muted-foreground text-xs uppercase">
              <tr><th className="py-2 pr-4">Room</th><th className="py-2 pr-4">Window</th><th className="py-2 pr-4">Width</th><th className="py-2 pr-4">Height</th><th className="py-2">Mount</th></tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((row) => (
                <tr key={row} className="border-border border-t"><td className="py-4 pr-4">&nbsp;</td><td className="py-4 pr-4" /><td className="py-4 pr-4" /><td className="py-4 pr-4" /><td className="py-4" /></tr>
              ))}
            </tbody>
          </table>
          <Button className="mt-6" variant="outline" onClick={() => window.print()}>Print worksheet</Button>
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
