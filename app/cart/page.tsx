"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/data/products";
import { useCartStore, useCartCount, useCartTotal } from "@/lib/store/cart-store";
import { OrderSuccess } from "@/components/cart/order-success";
import { useCallback, useState } from "react";

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const increment = useCartStore((s) => s.increment);
  const decrement = useCartStore((s) => s.decrement);
  const clear = useCartStore((s) => s.clear);
  const count = useCartCount();
  const total = useCartTotal();
  const [orderOpen, setOrderOpen] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);

  const onOrder = useCallback(() => {
    setOrderTotal(total);
    setOrderOpen(true);
    clear();
  }, [total, clear]);

  const onCloseOrder = useCallback(() => setOrderOpen(false), []);

  return (
    <>
      <main className="cart-page">
        <div className="container-1280">
          <header className="cart-hero">
            <Link href="/collection" className="cart-hero__back">
              <ArrowLeft size={16} strokeWidth={1.5} /> Back to Collection
            </Link>
            <span className="eyebrow">Aarya Saree Atelier</span>
            <h1 className="cart-hero__title">
              Your <em>Saree</em> Bag
            </h1>
            <p className="cart-hero__sub">
              {count > 0
                ? `${count} item${count > 1 ? "s" : ""} awaiting their story.`
                : "Your bag is resting quietly."}
            </p>
          </header>

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
              <ul className="cart-list">
                {items.map((item) => (
                  <li className="cart-item" key={item.product.id}>
                    <Link href="/collection" className="cart-item__media">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={120}
                        height={160}
                      />
                    </Link>
                    <div className="cart-item__body">
                      <h3 className="cart-item__name">{item.product.name}</h3>
                      <p className="cart-item__price">
                        {formatPrice(item.product.price)}
                      </p>
                    </div>
                    <div className="cart-item__qty">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => decrement(item.product.id)}
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span>{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => increment(item.product.id)}
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                    <div className="cart-item__subtotal">
                      {formatPrice(item.qty * item.product.price)}
                    </div>
                    <button
                      className="cart-item__remove"
                      aria-label={`Remove ${item.product.name}`}
                      onClick={() => removeItem(item.product.id)}
                    >
                      <Trash2 size={17} strokeWidth={1.5} />
                    </button>
                  </li>
                ))}
              </ul>

              <aside className="cart-summary">
                <h3 className="cart-summary__title">Order Summary</h3>
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
                <div className="cart-summary__total">
                  <span>Total</span>
                  <strong>{formatPrice(total)}</strong>
                </div>
                <button className="btn-primary cart-summary__order" onClick={onOrder}>
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

      <OrderSuccess open={orderOpen} total={orderTotal} onClose={onCloseOrder} />
    </>
  );
}
