import { useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { footerColumns } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function SiteFooter() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "done">("idle");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("done");
  }

  return (
    <footer className="border-border bg-card mt-24 border-t">
      <div className="container-page py-16">
        <div className="border-border grid gap-10 border-b pb-14 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="font-display text-2xl tracking-[0.2em] uppercase">
              Vingo<span className="text-accent">.</span>Roll
            </Link>
            <p className="text-muted-foreground mt-4 max-w-sm text-sm leading-relaxed">
              Made-to-measure curtains, shades and blinds — with the measuring, design and
              installation help that makes them fit.
            </p>
            <form onSubmit={onSubmit} className="mt-8 max-w-sm" noValidate>
              <label htmlFor="newsletter" className="eyebrow mb-2 block">
                Journal & new arrivals
              </label>
              <div className="flex gap-2">
                <Input
                  id="newsletter"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setStatus("idle");
                  }}
                  placeholder="you@example.com"
                  aria-invalid={status === "error"}
                  aria-describedby="newsletter-status"
                />
                <Button type="submit" variant="secondary">
                  Join
                </Button>
              </div>
              <p
                id="newsletter-status"
                role="status"
                className="text-muted-foreground mt-2 min-h-5 text-xs"
              >
                {status === "error" ? "Enter a valid email address." : null}
                {status === "done" ? "Thank you — you're on the list." : null}
              </p>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {footerColumns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {"slug" in link && link.slug ? (
                        <Link
                          to="/shop/$category"
                          params={{ category: link.slug }}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        <div className="text-muted-foreground flex flex-col gap-4 pt-8 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Vingo Roll. All prices indicative and for demonstration.
          </p>
          <ul className="flex gap-5">
            <li>Instagram</li>
            <li>Pinterest</li>
            <li>Journal</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
