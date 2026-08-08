import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section, SectionHeading } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { rooms } from "@/data/collections";
import { categories } from "@/data/categories";

export const Route = createFileRoute("/services/design-consultation")({
  head: () => pageHead({ title: "Book a Design Consultation | Vingo Roll", description: "In-home, virtual or showroom consultation with a window treatment design specialist. Complimentary and no obligation.", path: "/services/design-consultation" }),
  component: Page,
});

function Page() {
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  const [mode, setMode] = useState("in-home");
  const [form, setForm] = useState({ name: "", email: "", date: "", room: "living-room", product: "cat-curtains", project: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || !form.date) {
      setError("Add your name, a valid email and a preferred date.");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Services", to: "/services" }, { label: "Design Consultation" }]} />
      <PageHeader eyebrow="Complimentary" title="Design consultation" description="Sit with a specialist in your home, over video, or in a showroom. We bring fabric, talk light and leave you a written recommendation." />
      <Section>
        <SectionHeading eyebrow="Booking" title="Choose how you'd like to meet" />
        {done ? (
          <div className="border-border max-w-xl rounded-sm border p-8" role="status">
            <h3 className="text-2xl">Consultation requested</h3>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">Thank you, {form.name}. A specialist would normally confirm your {mode.replace("-", " ")} consultation for {form.date}. This is a demonstration flow — nothing was submitted.</p>
            <Button className="mt-6" variant="outline" onClick={() => setDone(false)}>Book another</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="grid max-w-3xl gap-6 md:grid-cols-2">
            <fieldset className="md:col-span-2">
              <legend className="eyebrow mb-3">Consultation type</legend>
              <RadioGroup value={mode} onValueChange={setMode} className="grid gap-3 sm:grid-cols-3">
                {[["in-home", "In-home"], ["virtual", "Virtual / video"], ["showroom", "Showroom"]].map(([v, label]) => (
                  <div key={v} className="border-border flex items-center gap-3 rounded-sm border p-4">
                    <RadioGroupItem value={v!} id={`mode-${v}`} />
                    <Label htmlFor={`mode-${v}`} className="cursor-pointer font-normal">{label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
            <div><Label htmlFor="c-name">Name</Label><Input id="c-name" className="mt-2" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label htmlFor="c-email">Email</Label><Input id="c-email" type="email" className="mt-2" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div><Label htmlFor="c-date">Preferred date & time</Label><Input id="c-date" type="datetime-local" className="mt-2" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div>
              <Label htmlFor="c-room">Room type</Label>
              <Select value={form.room} onValueChange={(v) => setForm({ ...form, room: v })}>
                <SelectTrigger id="c-room" className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>{rooms.map((r) => <SelectItem key={r.id} value={r.slug}>{r.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="c-product">Product interest</Label>
              <Select value={form.product} onValueChange={(v) => setForm({ ...form, product: v })}>
                <SelectTrigger id="c-product" className="mt-2"><SelectValue /></SelectTrigger>
                <SelectContent>{categories.map((c) => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2"><Label htmlFor="c-project">Tell us about the project</Label><Textarea id="c-project" rows={4} className="mt-2" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} /></div>
            {error ? <p role="alert" className="text-destructive md:col-span-2 text-sm">{error}</p> : null}
            <div className="md:col-span-2"><Button type="submit" size="lg">Request consultation</Button></div>
          </form>
        )}
      </Section>
    </>
  );
}
