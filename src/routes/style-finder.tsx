import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ProductGrid } from "@/components/product/product-card";
import { products } from "@/data/products";
import { rooms } from "@/data/collections";

export const Route = createFileRoute("/style-finder")({
  head: () => pageHead({ title: "Style Finder Quiz | Vingo Roll", description: "Answer six quick questions and we'll recommend window treatments matched to your room, light and style.", path: "/style-finder" }),
  component: Page,
});

const steps = [
  { key: "room", question: "Which room are we dressing?", options: rooms.slice(0, 6).map((r) => ({ value: r.slug, label: r.name })) },
  { key: "mood", question: "What mood are you after?", options: [{ value: "Minimal", label: "Calm and minimal" }, { value: "Natural", label: "Warm and natural" }, { value: "Classic", label: "Classic and tailored" }, { value: "Contemporary", label: "Sharp and contemporary" }] },
  { key: "light", question: "How much light should get in?", options: [{ value: "sheer", label: "Keep it bright" }, { value: "light-filtering", label: "Soften the glare" }, { value: "blackout", label: "Make it dark" }] },
  { key: "privacy", question: "How important is privacy?", options: [{ value: "privacy", label: "Very — overlooked window" }, { value: "", label: "Not especially" }] },
  { key: "colour", question: "Which direction for colour?", options: [{ value: "Ivory", label: "Ivory and chalk" }, { value: "Neutral", label: "Oat and sand" }, { value: "Brown", label: "Walnut and espresso" }] },
  { key: "material", question: "Preferred material?", options: [{ value: "belgian-linen", label: "Linen" }, { value: "brushed-cotton", label: "Cotton" }, { value: "wool-blend", label: "Wool" }, { value: "silk-velvet", label: "Velvet" }] },
] as const;

function Page() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const done = step >= steps.length;

  const recommended = products
    .filter((p) => (!answers["light"] || p.lightControl === answers["light"]) )
    .filter((p) => (!answers["room"] || p.roomTypes?.includes(answers["room"]!)))
    .filter((p) => (!answers["mood"] || p.styleTags?.includes(answers["mood"]!)));
  const results = (recommended.length ? recommended : products.filter((p) => p.featured)).slice(0, 6);

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Style Finder" }]} />
      <PageHeader eyebrow="One minute" title="Style finder" description="Six questions. No email required. We'll point you at the right families and a few specific pieces." />
      <Section>
        {!done ? (
          <div className="max-w-2xl">
            <Progress value={(step / steps.length) * 100} className="mb-8" aria-label={`Step ${step + 1} of ${steps.length}`} />
            <p className="eyebrow mb-3">Question {step + 1} of {steps.length}</p>
            <h2 className="text-3xl md:text-4xl">{steps[step]!.question}</h2>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {steps[step]!.options.map((opt) => (
                <li key={opt.label}>
                  <button
                    type="button"
                    className="border-border hover:border-accent w-full rounded-sm border p-5 text-left transition-colors"
                    onClick={() => { setAnswers({ ...answers, [steps[step]!.key]: opt.value }); setStep(step + 1); }}
                  >
                    {opt.label}
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 ? <Button variant="ghost" className="mt-8" onClick={() => setStep(step - 1)}>Back</Button> : null}
          </div>
        ) : (
          <>
            <h2 className="text-3xl md:text-4xl">Based on your answers</h2>
            <p className="text-muted-foreground mt-3 max-w-xl leading-relaxed">These pieces match the room, mood and light level you chose. Order swatches before you commit — colour on screen is never the colour on your wall.</p>
            <div className="mt-10"><ProductGrid products={results} density="dense" /></div>
            <div className="mt-10 flex flex-wrap gap-3">
              <Button asChild><Link to="/swatches">Order matching swatches</Link></Button>
              <Button variant="outline" onClick={() => { setStep(0); setAnswers({}); }}>Start over</Button>
            </div>
          </>
        )}
      </Section>
    </>
  );
}
