"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Eye, Heart, ShoppingBag } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cart-store";

type ProductCardProps = {
  product: Product;
  onQuickView: (p: Product) => void;
  priority?: boolean;
};

export function ProductCard({ product, onQuickView, priority = false }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const onAddToBag = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  const onMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -py * 10, ry: px * 12 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ rx: 0, ry: 0 })}
      style={{ transform: `perspective(1100px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
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
        <button
          aria-label="Wishlist"
          onClick={() => setWished((w) => !w)}
          className={wished ? "product-card__wish product-card__wish--active" : "product-card__wish"}
        >
          <Heart size={16} strokeWidth={1.5} fill={wished ? "currentColor" : "none"} />
        </button>
        {product.badge && (
          <span className="product-card__badge">
            {product.badge}
          </span>
        )}
        <div className="product-card__overlay">
          <button
            aria-label="Quick view"
            onClick={() => onQuickView(product)}
            className="product-card__quick"
          >
            <Eye size={14} strokeWidth={1.5} /> Quick View
          </button>
        </div>
        <button
          aria-label={`Add ${product.name} to bag`}
          onClick={onAddToBag}
          className={added ? "product-card__bag product-card__bag--added" : "product-card__bag"}
        >
          <ShoppingBag size={15} strokeWidth={1.5} />
          {added ? "Added to Bag" : "Add to Bag"}
        </button>
      </div>
      <div className="product-card__info">
        <h3 className="product-card__name">
          {product.name}
        </h3>
        <p className="product-card__meta">
          {product.fabric} · {product.color}
        </p>
        <p className="product-card__price">
          {formatPrice(product.price)}
        </p>
      </div>
    </div>
  );
}
