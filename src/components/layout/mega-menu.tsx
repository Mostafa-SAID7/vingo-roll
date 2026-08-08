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
            "animate-fade-in",
            "absolute top-full left-1/2 z-50 -translate-x-1/2",
            "w-[98vw] max-w-7xl",
            "md:w-[96vw] md:max-w-[1200px]",
            "lg:w-max lg:min-w-[1100px]",
            /* Background with better visibility in both modes */
            "bg-card border border-border/50",
            "dark:bg-card/90 dark:border-border",
            /* Rounded corners and shadow */
            "rounded-2xl p-8 shadow-lg",
            /* Backdrop blur for depth */
            "backdrop-blur-md",
            /* Better transition */
            "transition-all duration-200 ease-out",
          )}
        >
          {/* Desktop Grid Layout (Multiple columns with images) */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-6">
                {/* Image: Positioned at top */}
                {column.image && (
                  <div className="relative group overflow-hidden rounded-xl shadow-md">
                    <img
                      src={column.image}
                      alt={column.imageAlt || column.title}
                      className={cn(
                        "h-56 w-full object-cover",
                        "transition-transform duration-300 ease-out",
                        "group-hover:scale-110",
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                )}

                {/* Links: Below image */}
                <div>
                  <h3 className="eyebrow mb-4 text-xs uppercase tracking-wider">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {"slug" in link && link.slug ? (
                          <Link
                            to="/shop/$category"
                            params={{ category: link.slug }}
                            className={cn(
                              "text-muted-foreground hover:text-foreground",
                              "transition-colors duration-200 text-sm",
                              "hover:translate-x-1 transform ease-out",
                            )}
                          >
                            {link.label}
                          </Link>
                        ) : (
                          <Link
                            to={link.to}
                            className={cn(
                              "text-muted-foreground hover:text-foreground",
                              "transition-colors duration-200 text-sm",
                              "hover:translate-x-1 transform ease-out",
                            )}
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet Layout (Stacked) */}
          <div className="md:hidden space-y-8">
            {columns.map((column, index) => (
              <div key={column.title}>
                {/* Image first on mobile */}
                {column.image && (
                  <div className="relative group overflow-hidden rounded-xl mb-4 shadow-md">
                    <img
                      src={column.image}
                      alt={column.imageAlt || column.title}
                      className={cn(
                        "h-48 w-full object-cover",
                        "transition-transform duration-300 ease-out",
                        "group-hover:scale-105",
                      )}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
                  </div>
                )}

                {/* Title */}
                <h3 className="eyebrow mb-4 text-xs uppercase tracking-wider">{column.title}</h3>

                {/* Links below image - Two columns on mobile */}
                <ul className="grid grid-cols-2 gap-4 gap-y-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      {"slug" in link && link.slug ? (
                        <Link
                          to="/shop/$category"
                          params={{ category: link.slug }}
                          className={cn(
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors duration-200 text-sm",
                          )}
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <Link
                          to={link.to}
                          className={cn(
                            "text-muted-foreground hover:text-foreground",
                            "transition-colors duration-200 text-sm",
                          )}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Divider between sections on mobile */}
                {index !== columns.length - 1 && <div className="border-b border-border/30 mt-8" />}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
