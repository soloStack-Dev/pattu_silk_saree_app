"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

/* ========================================================================== */
/* 1. TYPES                                                                    */
/* ========================================================================== */

/* One line item in the cart: the product + how many of it the user wants. */
export type CartItem = {
  product: Product;
  qty: number;
};

type CartState = {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
};

/* ========================================================================== */
/* 2. PURE HELPERS — the actual cart maths, kept store-free so each           */
/*    function is small, obvious and easy to test on its own.                  */
/* ========================================================================== */

/**
 * Add a product to the cart. If it already exists, bump its quantity by 1;
 * otherwise append it as a brand new line with qty 1.
 */
function upsertItem(items: CartItem[], product: Product): CartItem[] {
  const existing = items.find((i) => i.product.id === product.id);
  if (!existing) return [...items, { product, qty: 1 }];
  return items.map((i) =>
    i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
  );
}

/**
 * Move a single line item's quantity by `delta` (+1 or -1).
 * The quantity can never drop below 1, so a 1-item line cannot go negative.
 */
function changeQty(items: CartItem[], id: string, delta: number): CartItem[] {
  return items.map((i) =>
    i.product.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
  );
}

/** Remove a line item from the cart entirely. */
function removeLine(items: CartItem[], id: string): CartItem[] {
  return items.filter((i) => i.product.id !== id);
}

/** Total number of pieces across every line item (e.g. "3 items"). */
function sumQuantity(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty, 0);
}

/** Total price across every line item (qty × unit price). */
function sumPrice(items: CartItem[]): number {
  return items.reduce((n, i) => n + i.qty * i.product.price, 0);
}

/* ========================================================================== */
/* 3. ZUSTAND STORE — wires the helpers to state updates + localStorage.      */
/*    `persist` saves the cart under "aarya-cart" so it survives reloads.      */
/* ========================================================================== */

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      // Add a product, merging quantities if it already exists.
      addItem: (product) =>
        set((s) => ({ items: upsertItem(s.items, product) })),

      // Remove an entire line item by product id.
      removeItem: (id) => set((s) => ({ items: removeLine(s.items, id) })),

      // +1 on the chosen line item.
      increment: (id) => set((s) => ({ items: changeQty(s.items, id, 1) })),

      // -1 on the chosen line item (never below 1).
      decrement: (id) => set((s) => ({ items: changeQty(s.items, id, -1) })),

      // Empty the cart, called right after an order is confirmed.
      clear: () => set({ items: [] }),
    }),
    { name: "aarya-cart" },
  ),
);

/* ========================================================================== */
/* 4. SELECTORS — derived values the UI reads reactively.                     */
/* ========================================================================== */

/** Number of pieces in the bag (used in the nav badge + cart hero). */
export function useCartCount() {
  return useCartStore((s) => sumQuantity(s.items));
}

/** Total order value (used in the cart summary). */
export function useCartTotal() {
  return useCartStore((s) => sumPrice(s.items));
}
