import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { rooms } from "@/data/rooms";

export const Route = createFileRoute("/inspiration/rooms")({
  validateSearch: (search: Record<string, unknown>) => ({
    room: typeof search["room"] === "string" ? search["room"] : undefined,
  }),
  head: () =>
    pageHead({
      title: "Shop by Room | Vingo Roll",
      description:
        "Window treatment ideas for living rooms, bedrooms, kitchens, offices, kids rooms, bathrooms and outdoor spaces.",
      path: "/inspiration/rooms",
    }),
  component: Page,
});

function Page() {
  const { room } = Route.useSearch();
  const ordered = room
    ? [...rooms].sort((a, b) => Number(b.slug === room) - Number(a.slug === room))
    : rooms;

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Inspiration", to: "/inspiration" },
          { label: "Shop by Room" },
        ]}
      />
      <PageHeader
        eyebrow="Discovery"
        title="Shop by room"
        description="Start from the room you're dressing and we'll suggest the treatments that suit its light, privacy and traffic."
      />
      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          {ordered.map((r, i) => (
            <Reveal key={r.id} delay={i * 60}>
              <article className="border-border rounded-sm border p-5">
                <div className="bg-muted aspect-[16/10] overflow-hidden rounded-sm">
                  <img
                    src={r.image}
                    alt={`${r.name} window treatments`}
                    width={1200}
                    height={750}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h2 className="mt-4 text-2xl">{r.name}</h2>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  {r.description}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {r.recommended.map((slug) => (
                    <li key={slug}>
                      <Link
                        to="/shop/$category"
                        params={{ category: slug }}
                        className="border-border hover:border-accent rounded-full border px-3 py-1 text-xs transition-colors"
                      >
                        {slug.replace(/-/g, " ")}
                      </Link>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  );
}
