import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "@/data/categories";
import { rooms } from "@/data/collections";
import { formatRange } from "@/lib/formatters";

export const Route = createFileRoute("/quote")({
  head: () => pageHead({ title: "Quick Quote Builder | Vingo Roll", description: "Build an indicative quote for made-to-measure curtains, shades and blinds in under a minute.", path: "/quote" }),
  component: Page,
});

const tiers = [["essential", "Essential", 1], ["signature", "Signature", 1.45], ["couture", "Couture", 2.1]] as const;

function Page() {
  const [treatment, setTreatment] = useState("cat-curtains");
  const [room, setRoom] = useState("living-room");
  const [width, setWidth] = useState(60);
  const [height, setHeight] = useState(84);
  const [mount, setMount] = useState("inside");
  const [tier, setTier] = useState<string>("essential");
  const [lining, setLining] = useState("light-filtering");
  const [qty, setQty] = useState(2);
  const [motorized, setMotorized] = useState(false);
  const [sent, setSent] = useState(false);

  const area = (width * height) / 144;
  const tierMult = tiers.find((t) => t[0] === tier)?.[2] ?? 1;
  const liningMult = lining === "blackout" ? 1.3 : lining === "sheer" ? 0.85 : 1;
  const base = area * 42 * tierMult * liningMult + (motorized ? 320 : 0);
  const total = base * qty;

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Quick Quote" }]} />
      <PageHeader eyebrow="One minute" title="Quick quote builder" description="An indicative range to help you plan. Final pricing always follows a confirmed measurement — this figure is a mock estimate, not an offer." />
      <Section>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <Label htmlFor="q-treatment">Treatment type</Label>
                <Select value={treatment} onValueChange={setTreatment}><SelectTrigger id="q-treatment" className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent></Select>
              </div>
              <div>
                <Label htmlFor="q-room">Room</Label>
                <Select value={room} onValueChange={setRoom}><SelectTrigger id="q-room" className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>{rooms.map((r) => <SelectItem key={r.id} value={r.slug}>{r.name}</SelectItem>)}</SelectContent></Select>
              </div>
              <div><Label htmlFor="q-width">Approx. width (in)</Label><Input id="q-width" type="number" min={12} max={240} className="mt-2" value={width} onChange={(e) => setWidth(Number(e.target.value))} /></div>
              <div><Label htmlFor="q-height">Approx. height (in)</Label><Input id="q-height" type="number" min={12} max={240} className="mt-2" value={height} onChange={(e) => setHeight(Number(e.target.value))} /></div>
              <div>
                <Label htmlFor="q-mount">Mounting style</Label>
                <Select value={mount} onValueChange={setMount}><SelectTrigger id="q-mount" className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="inside">Inside mount</SelectItem><SelectItem value="outside">Outside mount</SelectItem><SelectItem value="ceiling">Ceiling track</SelectItem></SelectContent></Select>
              </div>
              <div>
                <Label htmlFor="q-tier">Fabric tier</Label>
                <Select value={tier} onValueChange={setTier}><SelectTrigger id="q-tier" className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent>{tiers.map(([id, label]) => <SelectItem key={id} value={id}>{label}</SelectItem>)}</SelectContent></Select>
              </div>
              <div>
                <Label htmlFor="q-lining">Light control</Label>
                <Select value={lining} onValueChange={setLining}><SelectTrigger id="q-lining" className="mt-2"><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="sheer">Sheer</SelectItem><SelectItem value="light-filtering">Light filtering</SelectItem><SelectItem value="blackout">Blackout lining</SelectItem></SelectContent></Select>
              </div>
              <div><Label htmlFor="q-qty">Number of windows</Label><Input id="q-qty" type="number" min={1} max={30} className="mt-2" value={qty} onChange={(e) => setQty(Number(e.target.value))} /></div>
            </div>
            <div className="flex items-center gap-3">
              <Checkbox id="q-motor" checked={motorized} onCheckedChange={(v) => setMotorized(Boolean(v))} />
              <Label htmlFor="q-motor" className="font-normal">Add motorisation</Label>
            </div>
            <Button type="submit" size="lg">Request this quote</Button>
            {sent ? <p role="status" className="text-muted-foreground text-sm">Thank you — a specialist would follow up within one business day. This is a demonstration flow.</p> : null}
          </form>

          <aside className="border-border h-fit rounded-sm border p-6 lg:sticky lg:top-28">
            <p className="eyebrow mb-3">Indicative estimate</p>
            <p className="text-3xl">{formatRange(Math.round(total * 0.85), Math.round(total * 1.15))}</p>
            <p className="text-muted-foreground mt-3 text-xs leading-relaxed">Mock estimate for {qty} window{qty === 1 ? "" : "s"} at roughly {width}″ × {height}″, {mount} mount{motorized ? ", motorised" : ""}. There is no pricing engine behind this site — treat it as illustrative only.</p>
            <dl className="mt-5 space-y-2 text-xs">
              <div className="flex justify-between"><dt className="text-muted-foreground">Area per window</dt><dd>{area.toFixed(1)} sq ft</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Fabric tier</dt><dd className="capitalize">{tier}</dd></div>
              <div className="flex justify-between"><dt className="text-muted-foreground">Light control</dt><dd className="capitalize">{lining.replace("-", " ")}</dd></div>
            </dl>
          </aside>
        </div>
      </Section>
    </>
  );
}
