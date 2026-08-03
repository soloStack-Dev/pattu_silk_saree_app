import rawProducts from "./products.json";

/* ========================================================================== */
/* 1. TYPES — the shape of one saree product in the catalogue                  */
/* ========================================================================== */

export type Product = {
  id: string;
  name: string;
  category: "Bridal" | "Festive" | "Casual" | "Contemporary";
  fabric: string;
  occasion: string;
  color: string;
  price: number;
  badge: string;
  image: string;
};

/* The full catalogue, read from the bundled JSON file and typed at runtime. */
export const ALL_PRODUCTS = rawProducts as Product[];

/* ========================================================================== */
/* 2. FILTER OPTIONS — the values the UI lets a user pick from                 */
/* ========================================================================== */

export const FILTERS = {
  color: ["Red", "Pink", "Peacock Green"],
  fabric: [
    "Mulberry Silk",
    "Chiffon Silk",
    "Tissue Silk",
    "Banarasi Silk",
    "Georgette",
    "Tussar Silk",
    "Korvai Silk",
  ],
  occasion: ["Bridal", "Festive", "Casual"],
} as const;

/* ========================================================================== */
/* 3. FILTER STATE — what the user has currently selected                      */
/* ========================================================================== */

export type ProductFilter = {
  color: string | null;
  fabric: string | null;
  occasion: string | null;
  sort: "featured" | "price-asc" | "price-desc" | "name";
};

/* Starting state: nothing selected, original (featured) ordering. */
export const DEFAULT_FILTER: ProductFilter = {
  color: null,
  fabric: null,
  occasion: null,
  sort: "featured",
};

/* ========================================================================== */
/* 4. FILTERING + SORTING — the core collection logic                          */
/* ========================================================================== */

/**
 * Return a narrowed + sorted copy of the catalogue based on the user's
 * selection. A null filter value means "no filter applied".
 */
export function applyFilters(
  products: Product[],
  filter: ProductFilter,
): Product[] {
  // Step 1 — copy the array first so the source list is never mutated.
  let list = [...products];

  // Step 2 — narrow the list down for every active filter.
  if (filter.color) list = list.filter((p) => p.color === filter.color);
  if (filter.fabric) list = list.filter((p) => p.fabric === filter.fabric);
  if (filter.occasion) list = list.filter((p) => p.occasion === filter.occasion);

  // Step 3 — apply the chosen sort order ("featured" keeps the source order).
  switch (filter.sort) {
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "name":
      list.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  return list;
}

/* ========================================================================== */
/* 5. DATA ACCESS — simulated async fetch over the bundled catalogue           */
/* ========================================================================== */

/**
 * Simulated API call that resolves with the full catalogue after a short
 * delay. Consumed through TanStack Query so it can later be swapped for a
 * real network request without touching the UI.
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_PRODUCTS), 350);
  });
}

/* ========================================================================== */
/* 6. FORMATTING — present prices in Indian Rupee style                       */
/* ========================================================================== */

/** Format a number as a whole-INR price, e.g. `₹48,000`. */
export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
