import rawProducts from "./products.json";

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

export const ALL_PRODUCTS = rawProducts as Product[];

export const FILTERS = {
  color: ["Red", "Pink", "Peacock Green"],
  fabric: ["Mulberry Silk", "Chiffon Silk", "Tissue Silk", "Banarasi Silk", "Georgette", "Tussar Silk", "Korvai Silk"],
  occasion: ["Bridal", "Festive", "Casual"],
} as const;

export type ProductFilter = {
  color: string | null;
  fabric: string | null;
  occasion: string | null;
  sort: "featured" | "price-asc" | "price-desc" | "name";
};

export const DEFAULT_FILTER: ProductFilter = {
  color: null,
  fabric: null,
  occasion: null,
  sort: "featured",
};

export function applyFilters(products: Product[], filter: ProductFilter) {
  let list = [...products];
  if (filter.color) list = list.filter((p) => p.color === filter.color);
  if (filter.fabric) list = list.filter((p) => p.fabric === filter.fabric);
  if (filter.occasion) list = list.filter((p) => p.occasion === filter.occasion);
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
    default:
      break;
  }
  return list;
}

/**
 * Simulated async fetch over the bundled JSON catalogue. Brought in through
 * TanStack Query so the catalogue can later be swapped for a live API.
 */
export function fetchProducts(): Promise<Product[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(ALL_PRODUCTS), 350);
  });
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}
