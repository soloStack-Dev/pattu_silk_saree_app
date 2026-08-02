"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/data/products";

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

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i,
              ),
            };
          }
          return { items: [...state.items, { product, qty: 1 }] };
        }),
      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.product.id !== id) })),
      increment: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id ? { ...i, qty: i.qty + 1 } : i,
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.product.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i,
          ),
        })),
      clear: () => set({ items: [] }),
    }),
    { name: "aarya-cart" },
  ),
);

export function useCartCount() {
  return useCartStore((s) => s.items.reduce((n, i) => n + i.qty, 0));
}

export function useCartTotal() {
  return useCartStore((s) =>
    s.items.reduce((n, i) => n + i.qty * i.product.price, 0),
  );
}
