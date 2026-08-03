"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cart-store";

/* ========================================================================== */
/* PROPS                                                                       */
/* ========================================================================== */

type ProductCardProps = {
  product: Product;
  onQuickView: (p: Product) => void;
  priority?: boolean;
};

/* ========================================================================== */
/* COMPONENT — one product tile in the collection grid                         */
/* ========================================================================== */

export function ProductCard({
  product,
  onQuickView,
  priority = false,
}: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // ---------- local UI state ----------
  // 3D tilt angle while the mouse hovers over the card.
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  // Whether the heart (wishlist) is toggled on.
  const [wished, setWished] = useState(false);
  // Feedback flag: briefly shows "Added to Bag" after clicking the bag button.
  const [added, setAdded] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  // ---------- handlers ----------

  /** Add the product to the cart + show a temporary confirmation. */
  const onAddToBag = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  /** Recompute the 3D tilt from the cursor position within the card. */
  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    // Convert the cursor position to a value between -0.5 and +0.5.
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 12 });
  };

  // ---------- render ----------
  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      className="product-card"
    >
      <div className="product-card__media">
        <Image
          src={product.image}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />

        {/* Wishlist toggle — purely local for now. */}
        <button
          aria-label="Wishlist"
          onClick={() => setWished((w) => !w)}
          className={
            wished
              ? "product-card__wish product-card__wish--active"
              : "product-card__wish"
          }
        >
          <Heart
            size={16}
            strokeWidth={1.5}
            fill={wished ? "currentColor" : "none"}
          />
        </button>

        {/* Optional badge, e.g. "New" / "Bestseller". */}
        {product.badge && (
          <span className="product-card__badge">{product.badge}</span>
        )}

        {/* Quick view opens the detail dialog (revealed on hover). */}
        <div className="product-card__overlay">
          <button
            aria-label="Quick view"
            onClick={() => onQuickView(product)}
            className="product-card__quick"
          >
            <Eye size={14} strokeWidth={1.5} /> Quick View
          </button>
        </div>

        {/* Add to bag — label flips to "Added to Bag" briefly as feedback. */}
        <button
          aria-label={`Add ${product.name} to bag`}
          onClick={onAddToBag}
          className={
            added
              ? "product-card__bag product-card__bag--added"
              : "product-card__bag"
          }
        >
          <ShoppingBag size={15} strokeWidth={1.5} />
          {added ? "Added to Bag" : "Add to Bag"}
        </button>
      </div>

      <div className="product-card__info">
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__meta">
          {product.fabric} · {product.color}
        </p>
        <p className="product-card__price">{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
