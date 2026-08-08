import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { rooms } from "@/data/rooms";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/inspiration/rooms/")({
  head: () =>
    pageHead({
      title: "Shop by Room | Vingo Roll",
      description:
        "Discover window treatments by room type. Find the perfect solution for living rooms, bedrooms, kitchens, and more.",
      path: "/inspiration/rooms",
    }),
  component: Page,
});

function Page() {
  return (
    <>
      <Crumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Inspiration", to: "/inspiration" },
          { label: "Rooms" },
        ]}
      />

      <PageHeader
        eyebrow="Room-Based Discovery"
        title="Shop by room"
        description="Every room deserves the right light. Explore treatments tailored to where you need them."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <Link key={room.slug} to={`/inspiration/rooms/${room.slug}`}>
              <div className="group overflow-hidden rounded-lg border border-border transition-all hover:border-accent hover:shadow-md">
                {/* Image */}
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative -mt-20 px-4 pb-6 pt-20">
                  <h3 className="text-xl font-bold text-white">{room.name}</h3>
                  <p className="text-sm text-gray-200 mt-2 line-clamp-2">{room.description}</p>
                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-accent">
                    Explore
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      {/* Recommendations Section */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Getting Started"
          title="How to choose for each room"
          description="Consider light control, privacy needs, and your room's aesthetic."
        />

        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
              <span className="text-lg font-bold text-accent">1</span>
            </div>
            <h4 className="font-semibold mb-2">Pick Your Room</h4>
            <p className="text-sm text-muted-foreground">
              Select from 8 room types to see treatments tailored to that space's unique needs.
            </p>
          </div>

          <div>
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
              <span className="text-lg font-bold text-accent">2</span>
            </div>
            <h4 className="font-semibold mb-2">Explore Treatments</h4>
            <p className="text-sm text-muted-foreground">
              Browse curated products that work beautifully in that room, from sheer curtains to motorized blinds.
            </p>
          </div>

          <div>
            <div className="mb-3 inline-flex items-center justify-center w-10 h-10 rounded-full bg-accent/10">
              <span className="text-lg font-bold text-accent">3</span>
            </div>
            <h4 className="font-semibold mb-2">Get Design Help</h4>
            <p className="text-sm text-muted-foreground">
              Not sure? Book a free consultation or take our style finder quiz for personalized recommendations.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section>
        <div className="rounded-lg border border-border/50 bg-gradient-to-r from-accent/10 to-transparent p-8">
          <div className="max-w-lg">
            <h3 className="text-2xl font-bold mb-3">Need expert guidance?</h3>
            <p className="text-muted-foreground mb-6">
              Our design specialists can help you choose the perfect treatments for each room. Schedule a free consultation.
            </p>
            <Button asChild>
              <Link to="/services/design-consultation">Book a Consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
