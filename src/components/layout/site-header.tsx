import { useEffect, useState } from "react";
import { Link, useRouter } from "@tanstack/react-router";
import { Heart, Menu, Moon, Search, Sun, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MegaMenu } from "@/components/layout/mega-menu";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { nav } from "@/data/navigation";
import { useWishlistStore } from "@/store/wishlist-store";
import { useHydrated } from "@/hooks/use-hydrated";
import { useTheme } from "@/providers/theme-provider";
import { cn } from "@/lib/utils";

const menus = [nav.shop, nav.inspiration, nav.services, nav.guides];

function ThemeToggle() {
  const { resolved, setTheme } = useTheme();
  const hydrated = useHydrated();
  return (
    <button
      type="button"
      onClick={() => setTheme(resolved === "dark" ? "light" : "dark")}
      aria-label={`Switch to ${resolved === "dark" ? "light" : "dark"} theme`}
      className="hover:text-accent grid h-10 w-10 place-items-center transition-colors"
    >
      {hydrated && resolved === "dark" ? (
        <Sun className="h-[18px] w-[18px]" aria-hidden="true" />
      ) : (
        <Moon className="h-[18px] w-[18px]" aria-hidden="true" />
      )}
    </button>
  );
}

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="bg-accent text-accent-foreground absolute -top-0.5 -right-0.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] leading-none">
      {count}
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [bannerVisible, setBannerVisible] = useState(true);
  const wishlist = useWishlistStore((s) => s.slugs);
  const hydrated = useHydrated();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    return router.subscribe("onResolved", () => {
      setOpen(false);
      setOpenMenu(null);
    });
  }, [router]);

  return (
    <>
      {bannerVisible && (
        <div className="bg-primary text-primary-foreground relative px-4 py-2 text-center text-[11px] tracking-[0.16em] uppercase">
          <span>Free swatches on every order · Complimentary design consultation</span>
          <button
            onClick={() => setBannerVisible(false)}
            className="hover:opacity-70 absolute right-4 top-1/2 -translate-y-1/2 transition-opacity"
            aria-label="Close announcement"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}
      <header
        className={cn(
          "bg-background/90 sticky top-0 z-50 border-b backdrop-blur transition-colors",
          scrolled ? "border-border" : "border-transparent",
        )}
        onMouseLeave={() => setOpenMenu(null)}
      >
        <div className="container-page flex h-16 items-center justify-between gap-4 md:h-20">
          <div className="flex items-center gap-2 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto p-0">
                <SheetHeader className="border-b p-5">
                  <SheetTitle className="font-display text-xl">Vingo Roll</SheetTitle>
                </SheetHeader>
                <div className="p-5">
                  <Link
                    to="/search"
                    className="border-border text-muted-foreground mb-6 flex items-center gap-2 rounded-sm border px-3 py-2.5 text-sm"
                  >
                    <Search className="h-4 w-4" aria-hidden="true" /> Search curtains, shades, rooms
                  </Link>
                  <Accordion type="single" collapsible className="w-full">
                    {menus.map((menu) => (
                      <AccordionItem key={menu.label} value={menu.label}>
                        <AccordionTrigger className="font-display text-lg">
                          {menu.label}
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="space-y-5">
                            {menu.columns.map((col) => (
                              <div key={col.title}>
                                <p className="eyebrow mb-2">{col.title}</p>
                                <ul className="space-y-2">
                                  {col.links.map((link) => (
                                    <li key={link.label}>
                                      {"slug" in link && link.slug ? (
                                        <Link
                                          to="/shop/$category"
                                          params={{ category: link.slug }}
                                          className="text-muted-foreground hover:text-foreground text-sm"
                                        >
                                          {link.label}
                                        </Link>
                                      ) : (
                                        <Link
                                          to={link.to}
                                          className="text-muted-foreground hover:text-foreground text-sm"
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
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                    <AccordionItem value="about">
                      <AccordionTrigger className="font-display text-lg">About</AccordionTrigger>
                      <AccordionContent>
                        <ul className="space-y-2">
                          <li>
                            <Link to="/about" className="text-muted-foreground text-sm">
                              About Vingo Roll
                            </Link>
                          </li>
                          <li>
                            <Link to="/about/our-story" className="text-muted-foreground text-sm">
                              Our Story
                            </Link>
                          </li>
                          <li>
                            <Link to="/trade" className="text-muted-foreground text-sm">
                              Trade Program
                            </Link>
                          </li>
                          <li>
                            <Link to="/contact" className="text-muted-foreground text-sm">
                              Contact
                            </Link>
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <Button asChild className="mt-6 w-full">
                    <Link to="/quote">Get a quick quote</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <Link to="/" className="font-display text-xl tracking-[0.2em] uppercase md:text-2xl">
            Vingo<span className="text-accent">.</span>Roll
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
            {menus.map((menu) => (
              <MegaMenu
                key={menu.label}
                label={menu.label}
                columns={menu.columns}
                image={menu.image}
                imageAlt={menu.imageAlt}
                isOpen={openMenu === menu.label}
                onMouseEnter={() => setOpenMenu(menu.label)}
                onMouseLeave={() => setOpenMenu(null)}
                onClick={() => setOpenMenu(openMenu === menu.label ? null : menu.label)}
              />
            ))}
            <Link
              to="/about"
              className="hover:text-accent px-3 py-2 text-[13px] tracking-[0.12em] uppercase transition-colors"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-0.5">
            <Link
              to="/search"
              aria-label="Search"
              className="hover:text-accent grid h-10 w-10 place-items-center transition-colors"
            >
              <Search className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <ThemeToggle />
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="hover:text-accent relative hidden h-10 w-10 place-items-center transition-colors sm:grid"
            >
              <Heart className="h-[18px] w-[18px]" aria-hidden="true" />
              <CountBadge count={hydrated ? wishlist.length : 0} />
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hover:text-accent hidden h-10 w-10 place-items-center transition-colors sm:grid"
            >
              <User className="h-[18px] w-[18px]" aria-hidden="true" />
            </Link>
            <CartDrawer />
          </div>
        </div>
      </header>
    </>
  );
}
