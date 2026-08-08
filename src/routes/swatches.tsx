import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { pageHead } from "@/lib/seo";
import {
  Crumbs,
  PageHeader,
  Section,
  SectionHeading,
  EmptyState,
} from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { swatches, SWATCH_LIMIT } from "@/data/content";
import { useSwatchStore } from "@/store/swatch-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/swatches")({
  head: () =>
    pageHead({
      title: "Free Fabric Swatches | Vingo Roll",
      description:
        "Order up to eight free large-format fabric and material swatches. Filter by material, colour family, light filtering, room and style.",
      path: "/swatches",
    }),
  component: Page,
});

function Page() {
  const [material, setMaterial] = useState<string | null>(null);
  const [family, setFamily] = useState<string | null>(null);
  const [light, setLight] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const tray = useSwatchStore((s) => s.ids);
  const compare = useSwatchStore((s) => s.compareIds);
  const toggle = useSwatchStore((s) => s.toggle);
  const toggleCompare = useSwatchStore((s) => s.toggleCompare);
  const clear = useSwatchStore((s) => s.clear);
  const hydrated = useHydrated();

  const materials = [...new Set(swatches.map((s) => s.material))];
  const families = [...new Set(swatches.map((s) => s.colorFamily))];

  const filtered = useMemo(
    () =>
      swatches.filter(
        (s) =>
          (!material || s.material === material) &&
          (!family || s.colorFamily === family) &&
          (!light || s.lightControl === light),
      ),
    [material, family, light],
  );

  const trayItems = swatches.filter((s) => tray.includes(s.id));
  const compareItems = swatches.filter((s) => compare.includes(s.id));

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Swatches" }]} />
      <PageHeader
        eyebrow="Free, no obligation"
        title="Order material swatches"
        description={`Screens lie about colour. Hold up to ${SWATCH_LIMIT} large-format cuttings against your own wall, in your own light, before you commit to anything.`}
      />

      <Section>
        <div className="mb-8 flex flex-wrap gap-2">
          <Button
            size="sm"
            variant={material || family || light ? "outline" : "default"}
            onClick={() => {
              setMaterial(null);
              setFamily(null);
              setLight(null);
            }}
          >
            All materials
          </Button>
          {materials.map((m) => (
            <Button
              key={m}
              size="sm"
              variant={material === m ? "default" : "outline"}
              onClick={() => setMaterial(material === m ? null : m)}
            >
              {m}
            </Button>
          ))}
          {families.map((f) => (
            <Button
              key={f}
              size="sm"
              variant={family === f ? "default" : "ghost"}
              onClick={() => setFamily(family === f ? null : f)}
            >
              {f}
            </Button>
          ))}
          {["sheer", "light-filtering", "blackout"].map((l) => (
            <Button
              key={l}
              size="sm"
              variant={light === l ? "default" : "ghost"}
              onClick={() => setLight(light === l ? null : l)}
            >
              {l.replace("-", " ")}
            </Button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="No swatches match"
            description="Clear a filter to see the full material library."
          />
        ) : (
          <ul className="grid gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {filtered.map((s) => {
              const inTray = hydrated && tray.includes(s.id);
              return (
                <li key={s.id} className="group">
                  <div
                    className="relative aspect-square overflow-hidden rounded-sm"
                    style={{ backgroundColor: s.hex }}
                  >
                    <img
                      src={s.image}
                      alt={`${s.name} material close-up`}
                      width={600}
                      height={600}
                      loading="lazy"
                      className="h-full w-full object-cover opacity-60 mix-blend-multiply transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <h2 className="font-sans mt-3 text-sm font-medium">{s.name}</h2>
                  <p className="text-muted-foreground text-xs">
                    {s.material} · {s.lightControl.replace("-", " ")}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <Button
                      size="sm"
                      variant={inTray ? "secondary" : "outline"}
                      onClick={() => {
                        if (!inTray && tray.length >= SWATCH_LIMIT) {
                          toast.error(`You can hold ${SWATCH_LIMIT} swatches at a time.`);
                          return;
                        }
                        toggle(s.id);
                      }}
                    >
                      {inTray ? "In tray" : "Add"}
                    </Button>
                    {inTray ? (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => toggleCompare(s.id)}
                        aria-pressed={compare.includes(s.id)}
                      >
                        {compare.includes(s.id) ? "Comparing" : "Compare"}
                      </Button>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      <Section className="bg-card">
        <SectionHeading
          eyebrow="Your tray"
          title={
            hydrated ? `${trayItems.length} of ${SWATCH_LIMIT} swatches selected` : "Swatch tray"
          }
        />
        {hydrated && trayItems.length === 0 ? (
          <EmptyState
            title="Your tray is empty"
            description="Add a few materials above — we recommend three to five per room."
          />
        ) : (
          <>
            <ul className="flex flex-wrap gap-3">
              {trayItems.map((s) => (
                <li
                  key={s.id}
                  className="border-border flex items-center gap-3 rounded-sm border p-2 pr-3"
                >
                  <span
                    className="h-8 w-8 rounded-sm"
                    style={{ backgroundColor: s.hex }}
                    aria-hidden="true"
                  />
                  <span className="text-xs">{s.name}</span>
                  <button
                    type="button"
                    className="text-muted-foreground hover:text-destructive text-xs"
                    onClick={() => toggle(s.id)}
                    aria-label={`Remove ${s.name}`}
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
            {compareItems.length > 1 ? (
              <div className="mt-8">
                <p className="eyebrow mb-3">Comparing {compareItems.length}</p>
                <div
                  className={cn(
                    "grid gap-2",
                    compareItems.length > 3 ? "grid-cols-4" : "grid-cols-3",
                  )}
                >
                  {compareItems.map((s) => (
                    <div key={s.id}>
                      <div
                        className="aspect-square rounded-sm"
                        style={{ backgroundColor: s.hex }}
                      />
                      <p className="mt-1 text-xs">{s.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {sent ? (
              <div className="border-border mt-10 max-w-xl rounded-sm border p-6" role="status">
                <h3 className="text-xl">Swatches on the way</h3>
                <p className="text-muted-foreground mt-2 text-sm">
                  Thank you, {name}. This is a demonstration flow — nothing was actually shipped.
                </p>
              </div>
            ) : (
              <form
                className="mt-10 grid max-w-xl gap-4 sm:grid-cols-2"
                noValidate
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
                    setError("Add your name and a valid email.");
                    return;
                  }
                  if (trayItems.length === 0) {
                    setError("Add at least one swatch.");
                    return;
                  }
                  setError("");
                  setSent(true);
                }}
              >
                <div>
                  <Label htmlFor="s-name">Name</Label>
                  <Input
                    id="s-name"
                    className="mt-2"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="s-email">Email</Label>
                  <Input
                    id="s-email"
                    type="email"
                    className="mt-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                {error ? (
                  <p role="alert" className="text-destructive sm:col-span-2 text-sm">
                    {error}
                  </p>
                ) : null}
                <div className="flex gap-3 sm:col-span-2">
                  <Button type="submit">Request these swatches</Button>
                  <Button type="button" variant="ghost" onClick={clear}>
                    Clear tray
                  </Button>
                </div>
              </form>
            )}
          </>
        )}
      </Section>
    </>
  );
}
