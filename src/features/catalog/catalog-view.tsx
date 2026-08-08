import { useMemo, useState } from "react";
import { SlidersHorizontal, LayoutGrid, Rows3 } from "lucide-react";
import type { Product } from "@/types";
import { ProductGrid } from "@/components/product/product-card";
import { EmptyState } from "@/components/common/section";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "@/data/categories";
import { needs as allNeeds, rooms as allRooms } from "@/data/collections";
import { productColors, productMaterials, priceBounds } from "@/data/products";
import { formatPrice } from "@/lib/formatters";

type Filters = {
  categories: string[];
  materials: string[];
  colors: string[];
  light: string[];
  rooms: string[];
  needs: string[];
  motorized: boolean;
  inStock: boolean;
  price: [number, number];
};

const emptyFilters: Filters = {
  categories: [],
  materials: [],
  colors: [],
  light: [],
  rooms: [],
  needs: [],
  motorized: false,
  inStock: false,
  price: [priceBounds.min, priceBounds.max],
};

const lightOptions = [
  { id: "sheer", label: "Sheer" },
  { id: "light-filtering", label: "Light filtering" },
  { id: "blackout", label: "Blackout" },
];

function CheckGroup({
  title,
  options,
  selected,
  onToggle,
}: {
  title: string;
  options: { id: string; label: string }[];
  selected: string[];
  onToggle: (id: string) => void;
}) {
  return (
    <fieldset className="border-border border-b py-5">
      <legend className="eyebrow mb-3">{title}</legend>
      <div className="space-y-2.5">
        {options.map((opt) => {
          const id = `${title}-${opt.id}`;
          return (
            <div key={opt.id} className="flex items-center gap-2.5">
              <Checkbox
                id={id}
                checked={selected.includes(opt.id)}
                onCheckedChange={() => onToggle(opt.id)}
              />
              <Label htmlFor={id} className="cursor-pointer text-sm font-normal">
                {opt.label}
              </Label>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}

export function CatalogView({
  products,
  lockedCategory,
  showCategoryFilter = true,
}: {
  products: Product[];
  lockedCategory?: string;
  showCategoryFilter?: boolean;
}) {
  const [filters, setFilters] = useState<Filters>(emptyFilters);
  const [sort, setSort] = useState("featured");
  const [dense, setDense] = useState(false);
  const [visible, setVisible] = useState(9);

  const toggle = (key: keyof Filters, value: string) =>
    setFilters((f) => {
      const list = f[key] as string[];
      return {
        ...f,
        [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
      };
    });

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      if (lockedCategory && p.categoryId !== lockedCategory) return false;
      if (filters.categories.length && !filters.categories.includes(p.categoryId)) return false;
      if (filters.light.length && !filters.light.includes(p.lightControl ?? "")) return false;
      if (filters.rooms.length && !filters.rooms.some((r) => p.roomTypes?.includes(r)))
        return false;
      if (filters.needs.length && !filters.needs.some((n) => p.needs?.includes(n))) return false;
      if (filters.colors.length && !filters.colors.some((c) => p.colors.some((pc) => pc.id === c)))
        return false;
      if (
        filters.materials.length &&
        !filters.materials.some((m) => p.materials.some((pm) => pm.id === m))
      )
        return false;
      if (filters.motorized && !p.motorized) return false;
      if (filters.inStock && p.stockStatus !== "in-stock") return false;
      if (p.price < filters.price[0] || p.price > filters.price[1]) return false;
      return true;
    });

    const sorted = [...result];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "rating") sorted.sort((a, b) => b.rating - a.rating);
    if (sort === "new") sorted.sort((a, b) => Number(!!b.newArrival) - Number(!!a.newArrival));
    if (sort === "featured") sorted.sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
    return sorted;
  }, [products, filters, sort, lockedCategory]);

  const panel = (
    <div>
      {showCategoryFilter ? (
        <CheckGroup
          title="Category"
          options={categories.map((c) => ({ id: c.id, label: c.name }))}
          selected={filters.categories}
          onToggle={(id) => toggle("categories", id)}
        />
      ) : null}
      <CheckGroup
        title="Light control"
        options={lightOptions}
        selected={filters.light}
        onToggle={(id) => toggle("light", id)}
      />
      <CheckGroup
        title="Material"
        options={productMaterials.map((m) => ({ id: m.id, label: m.name }))}
        selected={filters.materials}
        onToggle={(id) => toggle("materials", id)}
      />
      <CheckGroup
        title="Colour"
        options={productColors.map((c) => ({ id: c.id, label: c.name }))}
        selected={filters.colors}
        onToggle={(id) => toggle("colors", id)}
      />
      <CheckGroup
        title="Room"
        options={allRooms.map((r) => ({ id: r.slug, label: r.name }))}
        selected={filters.rooms}
        onToggle={(id) => toggle("rooms", id)}
      />
      <CheckGroup
        title="Need"
        options={allNeeds.map((n) => ({ id: n.slug, label: n.name }))}
        selected={filters.needs}
        onToggle={(id) => toggle("needs", id)}
      />
      <fieldset className="border-border border-b py-5">
        <legend className="eyebrow mb-4">Price</legend>
        <Slider
          value={filters.price}
          min={priceBounds.min}
          max={priceBounds.max}
          step={10}
          onValueChange={(v) => setFilters((f) => ({ ...f, price: [v[0]!, v[1]!] }))}
          aria-label="Price range"
        />
        <p className="text-muted-foreground mt-3 text-xs">
          {formatPrice(filters.price[0])} – {formatPrice(filters.price[1])}
        </p>
      </fieldset>
      <fieldset className="py-5">
        <legend className="eyebrow mb-3">Other</legend>
        <div className="space-y-2.5">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="f-motorized"
              checked={filters.motorized}
              onCheckedChange={(v) => setFilters((f) => ({ ...f, motorized: Boolean(v) }))}
            />
            <Label htmlFor="f-motorized" className="cursor-pointer text-sm font-normal">
              Motorized only
            </Label>
          </div>
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="f-stock"
              checked={filters.inStock}
              onCheckedChange={(v) => setFilters((f) => ({ ...f, inStock: Boolean(v) }))}
            />
            <Label htmlFor="f-stock" className="cursor-pointer text-sm font-normal">
              In stock now
            </Label>
          </div>
        </div>
      </fieldset>
      <Button variant="ghost" className="w-full" onClick={() => setFilters(emptyFilters)}>
        Reset filters
      </Button>
    </div>
  );

  return (
    <div className="container-page grid gap-10 py-12 lg:grid-cols-[17rem_1fr]">
      <aside className="hidden lg:block">
        <div className="sticky top-28 max-h-[calc(100vh-9rem)] overflow-y-auto pr-2">{panel}</div>
      </aside>

      <div>
        <div className="border-border bg-background/90 sticky top-16 z-30 mb-8 flex items-center justify-between gap-3 border-b py-3 backdrop-blur md:top-20">
          <p className="text-muted-foreground text-xs">
            {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
          </p>
          <div className="flex items-center gap-2">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="sm" className="lg:hidden">
                  <SlidersHorizontal className="mr-2 h-4 w-4" aria-hidden="true" /> Filters
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[88vw] max-w-sm overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="px-4 pb-8">{panel}</div>
              </SheetContent>
            </Sheet>
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:inline-flex"
              aria-label={dense ? "Switch to comfortable grid" : "Switch to dense grid"}
              onClick={() => setDense((d) => !d)}
            >
              {dense ? (
                <Rows3 className="h-4 w-4" aria-hidden="true" />
              ) : (
                <LayoutGrid className="h-4 w-4" aria-hidden="true" />
              )}
            </Button>
            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[10.5rem]" aria-label="Sort products">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="new">Newest</SelectItem>
                <SelectItem value="price-asc">Price: low to high</SelectItem>
                <SelectItem value="price-desc">Price: high to low</SelectItem>
                <SelectItem value="rating">Top rated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            title="Nothing matches those filters"
            description="Try widening the price range or clearing a filter — or let us recommend something with the Style Finder."
            action={<Button onClick={() => setFilters(emptyFilters)}>Reset filters</Button>}
          />
        ) : (
          <>
            <ProductGrid
              products={filtered.slice(0, visible)}
              density={dense ? "dense" : "comfortable"}
            />
            {visible < filtered.length ? (
              <div className="mt-14 text-center">
                <Button variant="outline" onClick={() => setVisible((v) => v + 9)}>
                  Load more
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}
