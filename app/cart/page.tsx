"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data/products";
import {
  useCartStore,
  useCartCount,
  useCartTotal,
  type CartItem,
} from "@/lib/store/cart-store";
import { OrderSuccess } from "@/components/cart/order-success";
import { useCallback, useState } from "react";

/* ========================================================================== */
/* CART ITEM ROW — one product line with qty controls + remove                 */
/* ========================================================================== */

type CartItemRowProps = {
  item: CartItem;
};

function CartItemRow({ item }: CartItemRowProps) {
  // Pull the three actions this row needs from the shared store.
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const removeItem = useCartStore((s) => s.removeItem);

  const { product, qty } = item;

  return (
    <li className="cart-item" key={product.id}>
      {/* Thumbnail — currently links back to the collection. */}
      <Link href="/collection" className="cart-item__media">
        <Image src={product.image} alt={product.name} width={120} height={160} />
      </Link>

      {/* Name + unit price. */}
      <div className="cart-item__body">
        <h3 className="cart-item__name">{product.name}</h3>
        <p className="cart-item__price">{formatPrice(product.price)}</p>
      </div>

      {/* Quantity stepper (− qty +). */}
      <div className="cart-item__qty">
        <button
          aria-label="Decrease quantity"
          onClick={() => decrement(product.id)}
        >
          <Minus size={14} strokeWidth={1.5} />
        </button>
        <span>{qty}</span>
        <button
          aria-label="Increase quantity"
          onClick={() => increment(product.id)}
        >
          <Plus size={14} strokeWidth={1.5} />
        </button>
      </div>

      {/* Line total = qty × unit price. */}
      <div className="cart-item__subtotal">
        {formatPrice(qty * product.price)}
      </div>

      {/* Remove the whole line. */}
      <button
        className="cart-item__remove"
        aria-label={`Remove ${product.name}`}
        onClick={() => removeItem(product.id)}
      >
        <Trash2 size={17} strokeWidth={1.5} />
      </button>
    </li>
  );
}

/* ========================================================================== */
/* PAGE — the shopping bag                                                     */
/* ========================================================================== */

export default function CartPage() {
  // ---------- store state ----------
  const items = useCartStore((s) => s.items);
  const clear = useCartStore((s) => s.clear);
  const count = useCartCount();
  const total = useCartTotal();

  // ---------- order confirmation dialog state ----------
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  // ---------- handlers ----------

  /** Confirm the order: remember the total, show the dialog, empty the cart. */
  const onOrder = useCallback(() => {
    setOrderTotal(total);
    setOrderOpen(true);
    clear();
  }, [total, clear]);

  const onCloseOrder = useCallback(() => setOrderOpen(false), []);

  // ---------- render ----------
  return (
    <>
      <main className="cart-page">
        <div className="container-1280">
          {/* ---------- header ---------- */}
          <header className="cart-hero">
            <Link href="/collection" className="cart-hero__back">
              <ArrowLeft size={16} strokeWidth={1.5} /> Back to Collection
            </Link>
            <span className="eyebrow">Aarya Saree Atelier</span>
            <h1 className="cart-hero__title">
              Your <em>Saree</em> Bag
            </h1>
            <p className="cart-hero__sub">
              {/* Friendly copy that changes with the item count. */}
              {count > 0
                ? `${count} item${count > 1 ? "s" : ""} awaiting their story.`
                : "Your bag is resting quietly."}
            </p>
          </header>

          {/* ---------- empty state OR the cart itself ---------- */}
          {items.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty__icon">
                <ShoppingBag size={34} strokeWidth={1} />
              </span>
              <h3>Your bag is empty</h3>
              <p>Fill it with hand-woven treasures from our collection.</p>
              <Link href="/collection" className="btn-primary">
                Explore Collection
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Left — the list of line items. */}
              <ul className="cart-list">
                {items.map((item) => (
                  <CartItemRow key={item.product.id} item={item} />
                ))}
              </ul>

              {/* Right — the order summary sidebar. */}
              <aside className="cart-summary">
                <h3 className="cart-summary__title">Order Summary</h3>

                {/* Item subtotal, using the same `total` value throughout. */}
                <div className="cart-summary__row">
                  <span>Items ({count})</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Handloom Care</span>
                  <span>Included</span>
                </div>
                <div className="cart-summary__row">
                  <span>Delivery</span>
                  <span>Complimentary</span>
                </div>

                {/* Final payable amount. */}
                <div className="cart-summary__total">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>

                <button
                  className="btn-primary cart-summary__order"
                  onClick={onOrder}
                >
                  Order Now
                </button>
                <p className="cart-summary__note">
                  Every piece is woven by hand — please allow 7–10 days for
                  delivery.
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      {/* Success modal, mounted once and shown when `orderOpen` is true. */}
      <OrderSuccess open={orderOpen} total={orderTotal} onClose={onCloseOrder} />
    </>
  );
}
