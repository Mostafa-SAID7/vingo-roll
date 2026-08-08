import { useState } from "react";
import type { FilterState } from "@/types/common";
import {
  FILTER_DEFAULTS,
  SORT_OPTIONS,
  MATERIAL_TIERS,
  LIGHT_CONTROLS,
  STYLES,
  ROOM_TYPES,
  COLLECTIONS_LIST,
} from "@/types/common";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/formatters";

interface FilterSidebarProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  resultsCount: number;
}

export function FilterSidebar({ filters, onFiltersChange, resultsCount }: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    sort: true,
    price: true,
    materials: false,
    light: false,
    rooms: false,
    collections: false,
    styles: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const hasActiveFilters =
    JSON.stringify(filters) !== JSON.stringify({ ...FILTER_DEFAULTS, sortBy: filters.sortBy });

  const handleClearFilters = () => {
    onFiltersChange(FILTER_DEFAULTS);
  };

  const handlePriceChange = (value: number[]) => {
    onFiltersChange({
      ...filters,
      priceRange: [value[0], value[1]],
    });
  };

  const handleCheckboxChange = (
    filterKey: keyof Omit<FilterState, "priceRange" | "sortBy">,
    value: string,
    checked: boolean
  ) => {
    const current = filters[filterKey] as string[];
    const updated = checked ? [...current, value] : current.filter((v) => v !== value);
    onFiltersChange({
      ...filters,
      [filterKey]: updated,
    });
  };

  const FilterSection = ({
    title,
    section,
    children,
  }: {
    title: string;
    section: string;
    children: React.ReactNode;
  }) => (
    <div className="border-b border-border/50 py-4">
      <button
        onClick={() => toggleSection(section)}
        className="flex w-full items-center justify-between text-sm font-semibold"
      >
        {title}
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", expandedSections[section] && "rotate-180")}
        />
      </button>
      {expandedSections[section] && <div className="mt-4 space-y-3">{children}</div>}
    </div>
  );

  const CheckboxGroup = ({
    options,
    selected,
    onChange,
  }: {
    options: Array<{ value: string; label: string }>;
    selected: string[];
    onChange: (value: string, checked: boolean) => void;
  }) => (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <Checkbox
            id={option.value}
            checked={selected.includes(option.value)}
            onCheckedChange={(checked) => onChange(option.value, checked as boolean)}
          />
          <Label htmlFor={option.value} className="cursor-pointer text-sm font-normal">
            {option.label}
          </Label>
        </div>
      ))}
    </div>
  );

  return (
    <div className="w-full max-w-xs bg-card rounded-lg border border-border p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold">Filters</h3>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={handleClearFilters} className="text-xs">
            Clear
          </Button>
        )}
      </div>

      {/* Sort */}
      <FilterSection title="Sort by" section="sort">
        <Select
          value={filters.sortBy}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              sortBy: value as FilterState["sortBy"],
            })
          }
        >
          <SelectTrigger className="h-8">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FilterSection>

      {/* Price Range */}
      <FilterSection title="Price Range" section="price">
        <div className="space-y-4">
          <Slider
            value={[filters.priceRange[0] ?? 0, filters.priceRange[1] ?? 5000]}
            onValueChange={handlePriceChange}
            min={0}
            max={5000}
            step={50}
            className="w-full"
          />
          <div className="flex justify-between text-sm">
            <span>{formatPrice(filters.priceRange[0] ?? 0)}</span>
            <span>—</span>
            <span>{formatPrice(filters.priceRange[1] ?? 5000)}</span>
          </div>
        </div>
      </FilterSection>

      {/* Material Tiers */}
      <FilterSection title="Material Tier" section="materials">
        <CheckboxGroup
          options={MATERIAL_TIERS}
          selected={filters.materialTiers}
          onChange={(value, checked) => handleCheckboxChange("materialTiers", value, checked)}
        />
      </FilterSection>

      {/* Light Control */}
      <FilterSection title="Light Control" section="light">
        <CheckboxGroup
          options={LIGHT_CONTROLS}
          selected={filters.lightControl}
          onChange={(value, checked) => handleCheckboxChange("lightControl", value, checked)}
        />
      </FilterSection>

      {/* Rooms */}
      <FilterSection title="Room Type" section="rooms">
        <CheckboxGroup
          options={ROOM_TYPES}
          selected={filters.rooms}
          onChange={(value, checked) => handleCheckboxChange("rooms", value, checked)}
        />
      </FilterSection>

      {/* Collections */}
      <FilterSection title="Collection" section="collections">
        <CheckboxGroup
          options={COLLECTIONS_LIST}
          selected={filters.collections}
          onChange={(value, checked) => handleCheckboxChange("collections", value, checked)}
        />
      </FilterSection>

      {/* Styles */}
      <FilterSection title="Style" section="styles">
        <CheckboxGroup
          options={STYLES}
          selected={filters.styles}
          onChange={(value, checked) => handleCheckboxChange("styles", value, checked)}
        />
      </FilterSection>

      {/* Results Count */}
      <div className="mt-6 pt-4 border-t border-border/50 text-xs text-muted-foreground">
        <p>
          Showing <strong>{resultsCount}</strong> product{resultsCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
