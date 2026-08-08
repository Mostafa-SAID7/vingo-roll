import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/common/section";
import { Reveal } from "@/components/common/reveal";
import { ProductGrid } from "@/components/product/product-card";
import { TrustLayer } from "@/components/common/trust-layer";
import { categories, IMG } from "@/data/categories";
import { products } from "@/data/products";
import { collections, rooms } from "@/data/collections";
import { inspiration, testimonials } from "@/data/content";

export const Route = createFileRoute("/")({
  head: () =>
    pageHead({
      title: "Vingo Roll — Made-to-Measure Curtains, Shades & Blinds",
      description:
        "Premium curtains, blackout drapery, roller and roman shades made to measure. Free swatches, professional measuring, design consultation and installation.",
      path: "/",
    }),
  component: Home,
});

function Home() {
  const featured = products.filter((p) => p.featured).slice(0, 6);
  const heroCategories = categories.slice(0, 4);
  const designer = collections[0]!;

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[520px] w-full overflow-hidden">
          <img
            src={IMG.hero}
            alt="Sunlit living room with floor-to-ceiling ivory linen curtains"
            width={1920}
            height={1088}
            className="animate-image-reveal h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-page pb-16 md:pb-24">
              <p className="eyebrow animate-fade-up text-white/70">Made to measure since 1998</p>
              <h1 className="animate-fade-up mt-4 max-w-3xl text-4xl leading-[1.03] text-white sm:text-6xl lg:text-7xl">
                Light, tailored to the room it falls in.
              </h1>
              <p className="animate-fade-up mt-6 max-w-xl text-sm leading-relaxed text-white/85 md:text-base">
                Curtains, shades and blinds cut for your windows — with swatches, measuring and
                installation handled by people who do this every day.
              </p>
              <div className="animate-fade-up mt-9 flex flex-wrap gap-3">
                <Button asChild size="lg">
                  <Link to="/shop">Shop treatments</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/services/design-consultation">Book a consultation</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <Section>
        <SectionHeading
          eyebrow="Treatments"
          title="Start with the shape of the light"
          description="Four families cover most rooms. If you're unsure, the style finder narrows it down in a minute."
          action={
            <Button asChild variant="ghost">
              <Link to="/shop">
                All treatments <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {heroCategories.map((cat, i) => (
            <Reveal key={cat.id} delay={i * 80}>
              <Link to="/shop/$category" params={{ category: cat.slug }} className="group block">
                <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-sm">
                  <img
                    src={cat.image}
                    alt={`${cat.name} — ${cat.tagline}`}
                    width={1200}
                    height={1600}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[900ms] group-hover:scale-105"
                  />
                  <div className="veil absolute inset-0" aria-hidden="true" />
                  <div className="absolute right-5 bottom-5 left-5">
                    <h3 className="text-2xl text-white">{cat.name}</h3>
                    <p className="mt-1 text-xs text-white/75">{cat.tagline}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Editorial split — swatch story */}
      <Section className="bg-card">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="overflow-hidden rounded-sm">
              <img
                src={IMG.linen}
                alt="Macro detail of natural oatmeal linen weave"
                width={1200}
                height={900}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow mb-4">Materials</p>
            <h2 className="text-3xl md:text-5xl">Beige is not one colour.</h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">
              Screens flatten fabric. Order up to eight generous swatches, hold them against your
              wall at 8am and again at 6pm, and the decision usually makes itself.
            </p>
            <ul className="text-muted-foreground mt-6 space-y-2 text-sm">
              <li>— Large-format cuttings, not postage stamps</li>
              <li>— Compare weight, drape and opacity side by side</li>
              <li>— Free, with no obligation to order</li>
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/swatches">Order free swatches</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link to="/style-finder">Take the style finder</Link>
              </Button>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Shop by room */}
      <Section>
        <SectionHeading
          eyebrow="Shop by room"
          title="Every room asks for something different"
          action={
            <Button asChild variant="ghost">
              <Link to="/inspiration/rooms">
                All rooms <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.slice(0, 4).map((room, i) => (
            <Reveal as="li" key={room.id} delay={i * 70}>
              <Link to="/inspiration/rooms" search={{ room: room.slug }} className="group block">
                <div className="bg-muted aspect-[4/3] overflow-hidden rounded-sm">
                  <img
                    src={room.image}
                    alt={`${room.name} with window treatments`}
                    width={1200}
                    height={900}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-sans mt-3 text-sm font-medium">{room.name}</h3>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {room.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Featured products */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Pieces our workroom makes most"
          action={
            <Button asChild variant="ghost">
              <Link to="/shop">
                Shop all <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <ProductGrid products={featured} density="dense" />
      </Section>

      {/* Designer collection editorial */}
      <Section>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <p className="eyebrow mb-4">{designer.mood}</p>
            <h2 className="text-3xl md:text-5xl">{designer.name}</h2>
            <p className="text-muted-foreground mt-5 leading-relaxed">{designer.story}</p>
            <Button asChild className="mt-8" variant="outline">
              <Link to="/collections/$slug" params={{ slug: designer.slug }}>
                Explore the collection
              </Link>
            </Button>
          </Reveal>
          <Reveal delay={120}>
            <div className="overflow-hidden rounded-sm">
              <img
                src={designer.image}
                alt={`${designer.name} styled interior`}
                width={1920}
                height={1088}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Inspiration rail */}
      <Section className="bg-card">
        <SectionHeading
          eyebrow="Inspiration"
          title="Rooms we've dressed"
          action={
            <Button asChild variant="ghost">
              <Link to="/inspiration">
                Full gallery <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          }
        />
        <ul className="-mx-5 flex snap-x gap-5 overflow-x-auto px-5 pb-4 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {inspiration.slice(0, 3).map((post, i) => (
            <Reveal
              as="li"
              key={post.id}
              delay={i * 80}
              className="w-[78vw] shrink-0 snap-start sm:w-[46vw] lg:w-auto"
            >
              <Link to="/inspiration/$slug" params={{ slug: post.slug }} className="group block">
                <div className="bg-muted aspect-[5/6] overflow-hidden rounded-sm">
                  <img
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={1440}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <h3 className="mt-4 text-xl">{post.title}</h3>
                <p className="text-muted-foreground mt-1.5 text-sm leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Services */}
      <Section>
        <SectionHeading
          eyebrow="Service"
          title="We can do the difficult parts"
          description="Measuring, design direction and installation — the three things that decide whether a window treatment looks bespoke or homemade."
          align="center"
        />
        <TrustLayer />
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/services/design-consultation">Book a design consultation</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link to="/quote">Build a quick quote</Link>
          </Button>
        </div>
      </Section>

      {/* Testimonials */}
      <Section className="bg-card">
        <ul className="grid gap-10 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal as="li" key={t.id} delay={i * 90}>
              <blockquote className="font-display text-xl leading-snug">"{t.quote}"</blockquote>
              <p className="text-muted-foreground mt-4 text-xs tracking-[0.12em] uppercase">
                {t.author} · {t.role}
              </p>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Final CTA */}
      <section className="relative">
        <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
          <img
            src={IMG.bedroom}
            alt="Bedroom with espresso blackout curtains catching morning light"
            width={1200}
            height={900}
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="veil absolute inset-0" aria-hidden="true" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-page text-center">
              <h2 className="mx-auto max-w-2xl text-3xl text-white md:text-5xl">
                Start with eight swatches and a conversation.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Button asChild size="lg">
                  <Link to="/swatches">Order free swatches</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-white/50 bg-transparent text-white hover:bg-white/10 hover:text-white"
                >
                  <Link to="/contact">Talk to us</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
