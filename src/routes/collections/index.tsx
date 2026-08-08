import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { collections } from "@/data/collections";

export const Route = createFileRoute("/collections/")({
  head: () =>
    pageHead({
      title: "Designer Collections | Vingo Roll",
      description:
        "Curated collections of made-to-measure window treatments: designer, natural textures, minimal, classic, contemporary and seasonal.",
      path: "/collections",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Collections" }]} />
      <PageHeader
        eyebrow="Curation"
        title="Collections"
        description="Six points of view on the same question: how should this room hold light?"
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {collections.map((c, i) => (
            <Reveal key={c.id} delay={i * 70}>
              <Link to="/collections/$slug" params={{ slug: c.slug }} className="group block">
                <div className="bg-muted aspect-[16/10] overflow-hidden rounded-sm">
                  <img
                    src={c.image}
                    alt={`${c.name} collection`}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-4">{c.mood}</p>
                <h2 className="mt-1 text-2xl">{c.name}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {c.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
