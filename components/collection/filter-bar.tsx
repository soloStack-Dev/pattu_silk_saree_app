"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { FILTERS, type ProductFilter } from "@/lib/data/products";

/* ========================================================================== */
/* SORT OPTIONS — the display label + the internal value it maps to.          */
/* Keeping both together means we never have to hand-write label→value maps.  */
/* ========================================================================== */

const SORT_OPTIONS = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name", value: "name" },
] as const;

/** Turn an internal sort value into the label shown in the dropdown. */
function sortValueToLabel(value: ProductFilter["sort"]): string {
  return SORT_OPTIONS.find((o) => o.value === value)?.label ?? "Featured";
}

/* ========================================================================== */
/* DROPDOWN — a small accessible select-style control                          */
/* ========================================================================== */

type DropdownProps = {
  label: string;
  options: readonly string[];
  value: string | null;
  onSelect: (v: string | null) => void;
};

function Dropdown({ label, options, value, onSelect }: DropdownProps) {
  // Whether the menu is currently open.
  const [open, setOpen] = useState(false);
  // Root node, used to close the menu when the user clicks outside.
  const ref = useRef<HTMLDivElement>(null);

  // ---------- close on outside click ----------
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  // ---------- helpers ----------

  /** Pick an option; clicking the active one again resets it to null. */
  const choose = (opt: string) => {
    onSelect(opt === value ? null : opt);
    setOpen(false);
  };

  // Highlight the button only when its menu is open OR it has a value chosen.
  const triggerClass = open
    ? "dropdown__trigger dropdown__trigger--open"
    : value
      ? "dropdown__trigger dropdown__trigger--active"
      : "dropdown__trigger";

  return (
    <div className="dropdown" ref={ref}>
      <button onClick={() => setOpen((o) => !o)} className={triggerClass}>
        {label}
        <ChevronDown size={14} strokeWidth={1.5} />
      </button>

      {/* The menu is always in the DOM so the open/close animation can run. */}
      <div
        className={open ? "dropdown__menu dropdown__menu--open" : "dropdown__menu dropdown__menu--closed"}
      >
        {/* "All" resets this filter back to null. */}
        <button
          onClick={() => {
            onSelect(null);
            setOpen(false);
          }}
          className={
            !value
              ? "dropdown__option dropdown__option--small dropdown__option--active"
              : "dropdown__option dropdown__option--small"
          }
        >
          All {label}
          {!value && <CheckMark />}
        </button>

        {/* One option per value in FILTERS. */}
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => choose(opt)}
            className={
              opt === value
                ? "dropdown__option dropdown__option--active"
                : "dropdown__option"
            }
          >
            {opt}
            {opt === value && <CheckMark />}
          </button>
        ))}
      </div>
    </div>
  );
}

/** Small check icon shown next to the currently selected option. */
function CheckMark() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

/* ========================================================================== */
/* FILTER BAR — the full control strip above the product grid                  */
/* ========================================================================== */

type FilterBarProps = {
  filter: ProductFilter;
  onChange: (f: ProductFilter) => void;
  count: number;
};

export function FilterBar({ filter, onChange, count }: FilterBarProps) {
  // True when the user has picked at least one filter (shows the "clear" button).
  const hasActive = Boolean(filter.color || filter.fabric || filter.occasion);

  // ---------- handlers ----------

  /** Update one dropdown while keeping the other selections intact. */
  const update = (patch: Partial<ProductFilter>) => onChange({ ...filter, ...patch });

  /** Reset all three filters back to their defaults (sort is kept). */
  const clearAll = () =>
    update({ color: null, fabric: null, occasion: null });

  return (
    <div className="filter-bar">
      <div className="filter-bar__inner">
        <div className="filter-bar__left">
          <Dropdown
            label="Color"
            options={FILTERS.color}
            value={filter.color}
            onSelect={(color) => update({ color })}
          />
          <Dropdown
            label="Material"
            options={FILTERS.fabric}
            value={filter.fabric}
            onSelect={(fabric) => update({ fabric })}
          />
          <Dropdown
            label="Occasion"
            options={FILTERS.occasion}
            value={filter.occasion}
            onSelect={(occasion) => update({ occasion })}
          />
          <Dropdown
            label="Sort By"
            options={SORT_OPTIONS.map((o) => o.label)}
            value={sortValueToLabel(filter.sort)}
            onSelect={(label) =>
              update({
                sort:
                  SORT_OPTIONS.find((o) => o.label === label)?.value ?? "featured",
              })
            }
          />
        </div>

        <div className="filter-bar__right">
          {/* Live count of products matching the current filters. */}
          <span className="filter-bar__count">
            {count} {count === 1 ? "Item" : "Items"} Found
          </span>

          {/* "Clear all" only appears once something is actually selected. */}
          {hasActive && (
            <button onClick={clearAll} className="filter-bar__clear">
              <Filter size={14} strokeWidth={1.5} />
              All Filters
              <X size={13} strokeWidth={1.5} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
