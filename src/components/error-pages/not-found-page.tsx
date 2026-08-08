import { Link } from "@tanstack/react-router";
import { Search, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Kinetic 404 Numerals
 * Each digit enters from alternating directions with staggered delays
 * Outline stroke style (transparent fill, bronze border)
 * Live bronze underline expands in after them
 */
function AnimatedNumbers() {
  return (
    <div className="relative inline-flex items-center justify-center">
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px) rotateY(90deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0);
          }
        }
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(60px) rotateY(-90deg);
          }
          to {
            opacity: 1;
            transform: translateX(0) rotateY(0);
          }
        }
        @keyframes expandUnderline {
          from {
            width: 0;
            opacity: 0;
          }
          to {
            width: 240px;
            opacity: 1;
          }
        }
        .digit {
          font-size: 6rem;
          font-weight: 900;
          font-family: "Cairo", system-ui, sans-serif;
          letter-spacing: -4px;
          line-height: 1;
          display: inline-block;
          background: transparent;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 2px oklch(0.585 0.068 62);
          text-stroke: 2px oklch(0.585 0.068 62);
          perspective: 1000px;
        }
        .digit-4 {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.1s both;
        }
        .digit-0 {
          animation: slideInRight 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.25s both;
        }
        .digit-4-last {
          animation: slideInLeft 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.4s both;
        }
        .underline {
          position: absolute;
          bottom: -12px;
          left: 50%;
          transform: translateX(-50%);
          height: 2px;
          background: oklch(0.585 0.068 62);
          animation: expandUnderline 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) 0.55s both;
        }
      `}</style>

      <div className="relative">
        <div className="flex gap-0">
          <span className="digit digit-4">4</span>
          <span className="digit digit-0">0</span>
          <span className="digit digit-4-last">4</span>
        </div>
        <div className="underline" />
      </div>
    </div>
  );
}

/**
 * Main 404 Page Component
 * Self-contained, full-screen experience
 * No layout dependencies - header/footer removed, clean minimal background
 */
export function NotFoundPage() {
  return (
    <div className="relative w-full min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      {/* Main Content - Centered Full Screen */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-2xl space-y-8 text-center">
          {/* Layer 1: Eyebrow (300ms) */}
          <div
            className="text-xs tracking-[0.16em] uppercase text-muted-foreground"
            style={{ animation: "fadeUpStagger 0.7s ease-out 300ms both" }}
          >
            Page Not Found
          </div>

          {/* Layer 2: Animated 404 Numerals (included in animation) */}
          <div style={{ animation: "fadeUpStagger 0.7s ease-out 350ms both" }}>
            <AnimatedNumbers />
          </div>

          {/* Layer 3: Headline (400ms) */}
          <div
            className="space-y-3"
            style={{ animation: "fadeUpStagger 0.7s ease-out 400ms both" }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-bold leading-tight">
              This page has wandered off.
            </h1>
          </div>

          {/* Layer 4: Description (450ms) */}
          <p
            className="text-base text-muted-foreground max-w-md mx-auto leading-relaxed"
            style={{ animation: "fadeUpStagger 0.7s ease-out 450ms both" }}
          >
            The page you're looking for may have moved or doesn't exist. Let's get you back to
            something beautiful.
          </p>

          {/* Layer 5: Search Bar (500ms) */}
          <div
            className="flex items-center gap-2 max-w-md mx-auto"
            style={{ animation: "fadeUpStagger 0.7s ease-out 500ms both" }}
          >
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search treatments, styles, rooms..."
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-full",
                  "bg-card border border-border/50",
                  "text-foreground placeholder:text-muted-foreground",
                  "focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent",
                  "transition-all",
                )}
                onClick={() => {
                  // Navigate to search on click
                  window.location.href = "/search";
                }}
              />
            </div>
          </div>

          {/* Layer 6: CTAs (550ms) */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            style={{ animation: "fadeUpStagger 0.7s ease-out 550ms both" }}
          >
            <Button asChild className="px-8 py-3 text-base font-semibold">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild variant="outline" className="px-8 py-3 text-base font-semibold">
              <Link to="/contact">
                <MessageCircle className="h-4 w-4 mr-2" />
                Get Help
              </Link>
            </Button>
          </div>

          {/* Layer 7: Quick Links (600ms) */}
          <div
            className="pt-8 border-t border-border/30"
            style={{ animation: "fadeUpStagger 0.7s ease-out 600ms both" }}
          >
            <p className="text-xs tracking-[0.12em] uppercase text-muted-foreground mb-4">
              Quick Links
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              {[
                { label: "Shop All", to: "/shop" },
                { label: "Collections", to: "/collections" },
                { label: "Inspiration", to: "/inspiration" },
                { label: "Swatches", to: "/swatches" },
                { label: "Design Help", to: "/services/design-consultation" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "text-sm text-muted-foreground hover:text-accent",
                    "transition-colors duration-200",
                    "hover:underline underline-offset-4",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
