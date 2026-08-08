import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-card";
import { getRoom, rooms } from "@/data/rooms";
import { products } from "@/data/products";
import { notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/inspiration/rooms/$slug")({
  beforeLoad: ({ params }) => {
    const room = getRoom(params.slug);
    if (!room) {
      throw notFound();
    }
    return { room };
  },
  head: () => {
    return pageHead({
      title: `Room Window Treatments | Vingo Roll`,
      description: "Find the perfect window treatments for any room",
      path: `/inspiration/rooms`,
    });
  },
  component: Page,
});

function Page() {
  const { room } = Route.useRouteContext();

  // Get products for this room
  const roomProducts = products
    .filter((p) => p.rooms?.some((r) => {
      const roomSlug = typeof r === 'string' ? r : r.slug;
      return roomSlug === room.slug;
    }))
    .slice(0, 12);

  // Get inspiration posts for this room
  const relatedPosts = products
    .filter((p) => p.rooms?.some((r) => {
      const roomSlug = typeof r === 'string' ? r : r.slug;
      return roomSlug === room.slug;
    }))
    .slice(0, 3);

  const categories = Array.from(
    new Set(roomProducts.map((p) => p.category?.name).filter(Boolean)),
  ) as string[];

  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Inspiration", to: "/inspiration" },
          { label: "Rooms", to: "/inspiration/rooms" },
          { label: room.name },
        ]}
      />

      {/* Hero Section */}
      <div className="relative aspect-video w-full overflow-hidden bg-muted md:rounded-lg md:mx-0">
        <img src={room.image} alt={room.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-start justify-end p-6 md:p-10">
          <h1 className="text-4xl font-bold text-white md:text-5xl">{room.name}</h1>
          <p className="text-gray-200 mt-3 max-w-xl text-sm md:text-base">{room.description}</p>
        </div>
      </div>

      {/* Treatment Categories */}
      <Section>
        <SectionHeading
          title="Shop by treatment type"
          description={`Find the perfect ${room.name.toLowerCase()} solution`}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category}
              to={`/shop`}
              search={{
                rooms: [room.slug],
                category: category.toLowerCase(),
              }}
            >
              <Button variant="outline" className="w-full justify-start">
                {category}
              </Button>
            </Link>
          ))}
        </div>
      </Section>

      {/* Featured Products */}
      <Section>
        <SectionHeading
          title="Recommended for this room"
          description="Best-selling treatments that work beautifully in this space"
        />
        {roomProducts.length > 0 ? (
          <ProductGrid products={roomProducts} density="comfortable" />
        ) : (
          <div className="rounded-lg border border-border p-12 text-center">
            <p className="text-muted-foreground">No products available for this room yet.</p>
          </div>
        )}
      </Section>

      {/* Room Tips */}
      <Section className="bg-card">
        <SectionHeading
          title={`${room.name} tips`}
          description="How to choose the right treatment"
        />

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Light Control</h4>
              <p className="text-sm text-muted-foreground">
                Consider how much natural light you want during different times of day. Blackout
                treatments work well for bedrooms and media rooms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Privacy</h4>
              <p className="text-sm text-muted-foreground">
                Think about sightlines from the street or neighboring properties. Most rooms benefit
                from light-filtering materials that offer privacy while letting in light.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2">Style & Aesthetic</h4>
              <p className="text-sm text-muted-foreground">
                Match your window treatments to your room's overall design. Our style finder can
                help you narrow down options that fit your taste.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Installation</h4>
              <p className="text-sm text-muted-foreground">
                We offer free professional measuring and installation guidance. Most treatments are
                easy to install, but we're here to help.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="rounded-lg border border-border/50 bg-gradient-to-r from-accent/10 to-transparent p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-3">Still not sure?</h3>
              <p className="text-muted-foreground mb-4">
                Take our quick style finder quiz or book a free design consultation with our
                specialists.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link to="/style-finder">Take the Quiz</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/services/design-consultation">Book Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>✓ Free design consultation</p>
              <p>✓ Free material swatches</p>
              <p>✓ Professional measuring</p>
              <p>✓ Expert installation guidance</p>
            </div>
          </div>
        </div>
      </Section>

      {/* Browse Other Rooms */}
      <Section>
        <SectionHeading title="Explore other rooms" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rooms
            .filter((r) => r.slug !== room.slug)
            .slice(0, 4)
            .map((otherRoom) => (
              <Link key={otherRoom.slug} to={`/inspiration/rooms/${otherRoom.slug}`}>
                <div className="group overflow-hidden rounded-lg border border-border transition-all hover:border-accent">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <img
                      src={otherRoom.image}
                      alt={otherRoom.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-sm">{otherRoom.name}</h4>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </Section>
    </>
  );
}
