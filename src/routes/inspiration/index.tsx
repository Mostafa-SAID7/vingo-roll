import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, EmptyState } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { inspiration } from "@/data/content";
import { rooms } from "@/data/collections";

export const Route = createFileRoute("/inspiration/")({
  head: () =>
    pageHead({
      title: "Inspiration Gallery | Vingo Roll",
      description:
        "Editorial photography of real rooms dressed with made-to-measure curtains, shades and blinds. Filter by room, style and treatment.",
      path: "/inspiration",
    }),
  component: Page,
});

const styles = ["Minimal", "Natural", "Classic", "Contemporary"];

function Page() {
  const [room, setRoom] = useState<string | null>(null);
  const [style, setStyle] = useState<string | null>(null);
  const filtered = inspiration.filter(
    (p) => (!room || p.room === room) && (!style || p.style === style),
  );

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Inspiration" }]} />
      <PageHeader
        eyebrow="Gallery"
        title="Rooms, and what we hung in them"
        description="Each project lists the exact treatments used, so you can shop the look."
      />
      <Section>
        <div className="mb-10 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={room || style ? "outline" : "default"}
            onClick={() => {
              setRoom(null);
              setStyle(null);
            }}
          >
            All
          </Button>
          {rooms.slice(0, 6).map((r) => (
            <Button
              key={r.id}
              size="sm"
              variant={room === r.slug ? "default" : "outline"}
              onClick={() => setRoom(room === r.slug ? null : r.slug)}
            >
              {r.name}
            </Button>
          ))}
          {styles.map((s) => (
            <Button
              key={s}
              size="sm"
              variant={style === s ? "default" : "ghost"}
              onClick={() => setStyle(style === s ? null : s)}
            >
              {s}
            </Button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <EmptyState
            title="No rooms match yet"
            description="Try clearing a filter — the gallery grows every season."
            action={
              <Button
                onClick={() => {
                  setRoom(null);
                  setStyle(null);
                }}
              >
                Clear filters
              </Button>
            }
          />
        ) : (
          <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {filtered.map((post, i) => (
              <Link
                key={post.id}
                to="/inspiration/$slug"
                params={{ slug: post.slug }}
                className="group mb-6 block break-inside-avoid"
              >
                <div
                  className="bg-muted overflow-hidden rounded-sm"
                  style={{ aspectRatio: i % 3 === 0 ? "3 / 4" : i % 3 === 1 ? "4 / 3" : "1 / 1" }}
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={1200}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="eyebrow mt-3">{post.style}</p>
                <h2 className="mt-1 text-xl">{post.title}</h2>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}
