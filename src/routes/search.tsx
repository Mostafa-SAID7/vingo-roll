import { useMemo, useState } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search as SearchIcon } from "lucide-react";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, EmptyState } from "@/components/common/section";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/product/product-card";
import { useSearch } from "@/hooks";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { inspiration } from "@/data/content";

export const Route = createFileRoute("/search")({
  validateSearch: (search: Record<string, unknown>) => ({
    q: typeof search["q"] === "string" ? search["q"] : "",
  }),
  head: () =>
    pageHead({
      title: "Search | Vingo Roll",
      description: "Search curtains, shades, blinds, rooms and inspiration.",
      path: "/search",
    }),
  component: Page,
});

function Page() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [value, setValue] = useState(q);

  const results = useMemo(() => {
    if (!q.trim()) return { products: [], categories: [], posts: [] };
    return {
      products: useSearch(
        products.map((p) => ({
          id: p.id,
          name: p.name,
          description: `${p.shortDescription} ${p.styleTags?.join(" ")} ${p.needs?.join(" ")}`,
        })),
        q,
        { minChars: 1 }
      ).map((item) => products.find((p) => p.id === item.id)!),
      categories: useSearch(
        categories.map((c) => ({
          id: c.id,
          name: c.name,
          description: c.description,
        })),
        q,
        { minChars: 1 }
      ).map((item) => categories.find((c) => c.id === item.id)!),
      posts: useSearch(
        inspiration.map((i) => ({
          id: i.id,
          name: i.title,
          description: `${i.excerpt} ${i.room}`,
        })),
        q,
        { minChars: 1 }
      ).map((item) => inspiration.find((i) => i.id === item.id)!),
    };
  }, [q]);

  const empty =
    q.trim() && !results.products.length && !results.categories.length && !results.posts.length;

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Search" }]} />
      <PageHeader eyebrow="Search" title="Find your treatment">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void navigate({ to: "/search", search: { q: value } });
          }}
          className="flex max-w-xl gap-2"
          role="search"
        >
          <label htmlFor="q" className="sr-only">
            Search
          </label>
          <Input
            id="q"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="linen, blackout, bedroom…"
          />
          <Button type="submit">
            <SearchIcon className="mr-2 h-4 w-4" aria-hidden="true" />
            Search
          </Button>
        </form>
        <div className="mt-4 flex flex-wrap gap-2">
          {["linen", "blackout", "bedroom", "motorized"].map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => {
                setValue(t);
                void navigate({ to: "/search", search: { q: t } });
              }}
              className="border-border hover:border-accent rounded-full border px-3 py-1 text-xs transition-colors"
            >
              {t}
            </button>
          ))}
        </div>
      </PageHeader>
      <Section>
        {!q.trim() ? (
          <EmptyState
            title="Search the whole catalog"
            description="Try a material, a room, or how you want the light to behave."
          />
        ) : empty ? (
          <EmptyState
            title={`No matches for "${q}"`}
            description="Try a broader term, or take the style finder for a recommendation."
            action={
              <Button asChild>
                <Link to="/style-finder">Style finder</Link>
              </Button>
            }
          />
        ) : (
          <div className="space-y-16">
            {results.categories.length ? (
              <div>
                <h2 className="mb-5 text-2xl">Categories</h2>
                <ul className="flex flex-wrap gap-2">
                  {results.categories.map((c) => (
                    <li key={c.id}>
                      <Link
                        to="/shop/$category"
                        params={{ category: c.slug }}
                        className="border-border hover:border-accent rounded-full border px-4 py-2 text-sm transition-colors"
                      >
                        {c.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {results.products.length ? (
              <div>
                <h2 className="mb-6 text-2xl">Products</h2>
                <ProductGrid products={results.products} density="dense" />
              </div>
            ) : null}
            {results.posts.length ? (
              <div>
                <h2 className="mb-5 text-2xl">Inspiration</h2>
                <ul className="space-y-3">
                  {results.posts.map((p) => (
                    <li key={p.id}>
                      <Link
                        to="/inspiration/$slug"
                        params={{ slug: p.slug }}
                        className="hover:text-accent text-sm underline underline-offset-4"
                      >
                        {p.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </Section>
    </>
  );
}
