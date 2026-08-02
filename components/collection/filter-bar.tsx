"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Filter, X } from "lucide-react";
import { FILTERS, type ProductFilter } from "@/lib/data/products";

type DropdownProps = {
  label: string;
  options: readonly string[];
  value: string | null;
  onSelect: (v: string | null) => void;
};

function Dropdown({ label, options, value, onSelect }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div className="dropdown" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className={
          open
            ? "dropdown__trigger dropdown__trigger--open"
            : value
              ? "dropdown__trigger dropdown__trigger--active"
              : "dropdown__trigger"
        }
      >
        {label}
        <ChevronDown size={14} strokeWidth={1.5} />
      </button>
      <div
        className={open ? "dropdown__menu dropdown__menu--open" : "dropdown__menu dropdown__menu--closed"}
      >
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
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => {
              onSelect(opt === value ? null : opt);
              setOpen(false);
            }}
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

function CheckMark() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

type FilterBarProps = {
  filter: ProductFilter;
  onChange: (f: ProductFilter) => void;
  count: number;
};

export function FilterBar({ filter, onChange, count }: FilterBarProps) {
  const hasActive = filter.color || filter.fabric || filter.occasion;

  return (
    <div className="filter-bar">
      <div className="filter-bar__inner">
        <div className="filter-bar__left">
          <Dropdown label="Color" options={FILTERS.color} value={filter.color} onSelect={(color) => onChange({ ...filter, color })} />
          <Dropdown label="Material" options={FILTERS.fabric} value={filter.fabric} onSelect={(fabric) => onChange({ ...filter, fabric })} />
          <Dropdown label="Occasion" options={FILTERS.occasion} value={filter.occasion} onSelect={(occasion) => onChange({ ...filter, occasion })} />
          <Dropdown
            label="Sort By"
            options={["Featured", "Price: Low to High", "Price: High to Low", "Name"] as const}
            value={filter.sort === "featured" ? "Featured" : filter.sort === "price-asc" ? "Price: Low to High" : filter.sort === "price-desc" ? "Price: High to Low" : "Name"}
            onSelect={(v) => {
              const sort =
                v === "Price: Low to High"
                  ? "price-asc"
                  : v === "Price: High to Low"
                    ? "price-desc"
                    : v === "Name"
                      ? "name"
                      : "featured";
              onChange({ ...filter, sort });
            }}
          />
        </div>
        <div className="filter-bar__right">
          <span className="filter-bar__count">
            {count} {count === 1 ? "Item" : "Items"} Found
          </span>
          {hasActive && (
            <button
              onClick={() => onChange({ ...filter, color: null, fabric: null, occasion: null })}
              className="filter-bar__clear"
            >
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
