import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface MegaMenuLink {
  readonly label: string;
  readonly to: string;
  readonly slug?: string;
}

interface MegaMenuColumn {
  readonly title: string;
  readonly links: readonly MegaMenuLink[];
  readonly image?: string;
  readonly imageAlt?: string;
}

interface MegaMenuProps {
  label: string;
  columns: readonly MegaMenuColumn[];
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function MegaMenu({
  label,
  columns,
  isOpen,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: MegaMenuProps) {
  return (
    <div className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={onClick}
        className={cn(
          "flex items-center gap-1 px-3 py-2 text-[13px] tracking-[0.12em] uppercase transition-colors",
          "hover:text-accent",
          isOpen && "text-accent",
        )}
      >
        {label}
        <ChevronDown
          className={cn("h-3 w-3 transition-transform duration-200", isOpen && "rotate-180")}
          aria-hidden="true"
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "bg-background/95 border-border animate-fade-in shadow-lg",
            "absolute top-full left-1/2 z-50 -translate-x-1/2 border",
            "rounded-2xl p-6 backdrop-blur-sm",
            "w-[95vw] max-w-6xl",
            "md:w-max",
          )}
        >
          {/* Desktop Grid Layout (3+ columns with images) */}
          <div className="hidden md:grid grid-cols-1 gap-8">
            {columns.map((column) => (
              <div key={column.title} className="flex gap-8">
                {/* Left: Links */}
                <div className="flex-shrink-0">
                  <h3 className="eyebrow mb-4 text-xs uppercase tracking-wider">{column.title}</h3>
                  <ul className="space-y-2.5">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {"slug" in link && link.slug ? (
                          <Link
                            to="/shop/$category"
                            params={{ category: link.slug }}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <Link
                            to={link.to}
                            className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Right: Image */}
                {column.image && (
                  <div className="flex-shrink-0 w-48 h-48">
                    <img
                      src={column.image}
                      alt={column.imageAlt || column.title}
                      className="h-full w-full object-cover rounded-xl shadow-md transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout (Stacked) */}
          <div className="md:hidden space-y-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow mb-3 text-xs uppercase tracking-wider">{column.title}</h3>

                {/* Image first on mobile */}
                {column.image && (
                  <img
                    src={column.image}
                    alt={column.imageAlt || column.title}
                    className="h-40 w-full object-cover rounded-lg mb-4 shadow-md"
                    loading="lazy"
                  />
                )}

                {/* Links below image */}
                <ul className="grid grid-cols-2 gap-3 gap-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"slug" in link && link.slug ? (
                        <Link
                          to="/shop/$category"
                          params={{ category: link.slug }}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {column !== columns[columns.length - 1] && (
                  <div className="border-b border-border mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
