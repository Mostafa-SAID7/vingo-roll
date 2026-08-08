import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { Crumbs, PageHeader, Section } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/contact")({
  head: () => pageHead({ title: "Contact Vingo Roll", description: "Questions about measuring, fabrics, lead times or an existing order — talk to a window treatment specialist.", path: "/contact" }),
  component: Page,
});

function Page() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email) || form.message.trim().length < 10) {
      setError("Please add your name, a valid email and a message of at least 10 characters.");
      return;
    }
    setError("");
    setSent(true);
  }

  return (
    <>
      <Crumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <PageHeader eyebrow="Contact" title="Talk to a specialist" description="Measuring questions, fabric advice or an existing order — we answer within one business day." />
      <Section>
        {sent ? (
          <div className="border-border max-w-xl rounded-sm border p-8" role="status">
            <h2 className="text-2xl">Message received</h2>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">Thank you, {form.name}. This is a demonstration form, so nothing was actually sent.</p>
            <Button className="mt-6" variant="outline" onClick={() => setSent(false)}>Send another</Button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate className="max-w-xl space-y-5">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2" />
            </div>
            <div>
              <Label htmlFor="message">How can we help?</Label>
              <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="mt-2" />
            </div>
            {error ? <p role="alert" className="text-destructive text-sm">{error}</p> : null}
            <Button type="submit">Send message</Button>
          </form>
        )}
      </Section>
    </>
  );
}
