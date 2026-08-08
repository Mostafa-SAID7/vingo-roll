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
}

interface MegaMenuProps {
  label: string;
  columns: readonly MegaMenuColumn[];
  image?: string;
  imageAlt?: string;
  isOpen: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

export function MegaMenu({
  label,
  columns,
  image,
  imageAlt,
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
            "lg:w-max lg:min-w-[1300px]",
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
          {/* Desktop: Links on left (3-col grid), Image on right */}
          <div className="hidden lg:flex gap-12 items-stretch">
            {/* Left Side: All Links in Grid */}
            <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-6">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="eyebrow mb-4 text-xs uppercase tracking-wider font-semibold">
                    {column.title}
                  </h3>
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
              ))}
            </div>

            {/* Right Side: Large Image */}
            {image && (
              <div className="flex-shrink-0 w-80 h-auto">
                <div className="relative group w-full overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={image}
                    alt={imageAlt || label}
                    className={cn(
                      "w-full h-96 object-cover",
                      "transition-transform duration-300 ease-out",
                      "group-hover:scale-105",
                    )}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            )}
          </div>

          {/* Tablet: Links in 2-col grid */}
          <div className="hidden md:grid lg:hidden grid-cols-2 gap-x-8 gap-y-6">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="eyebrow mb-4 text-xs uppercase tracking-wider font-semibold">
                  {column.title}
                </h3>
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
            ))}

            {/* Image below links on tablet */}
            {image && (
              <div className="col-span-2 mt-4">
                <div className="relative group w-full overflow-hidden rounded-xl shadow-lg">
                  <img
                    src={image}
                    alt={imageAlt || label}
                    className={cn(
                      "w-full h-64 object-cover",
                      "transition-transform duration-300 ease-out",
                      "group-hover:scale-105",
                    )}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                </div>
              </div>
            )}
          </div>

          {/* Mobile: Image on top, Links below in 2-col grid */}
          <div className="md:hidden space-y-6">
            {image && (
              <div className="relative group w-full overflow-hidden rounded-xl shadow-md">
                <img
                  src={image}
                  alt={imageAlt || label}
                  className={cn(
                    "w-full h-60 object-cover",
                    "transition-transform duration-300 ease-out",
                    "group-hover:scale-105",
                  )}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300" />
              </div>
            )}

            {/* Links below image in 2-col grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-6">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="eyebrow mb-3 text-xs uppercase tracking-wider font-semibold">
                    {column.title}
                  </h3>
                  <ul className="space-y-2">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        {"slug" in link && link.slug ? (
                          <Link
                            to="/shop/$category"
                            params={{ category: link.slug }}
                            className={cn(
                              "text-muted-foreground hover:text-foreground",
                              "transition-colors duration-200 text-xs",
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
                              "transition-colors duration-200 text-xs",
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
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
