"use client";

import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import { X, ShoppingBag, ShieldCheck, RotateCcw, Truck } from "lucide-react";
import { formatPrice, type Product } from "@/lib/data/products";
import { useCartStore } from "@/lib/store/cart-store";

type QuickViewDialogProps = {
  product: Product | null;
  onClose: () => void;
};

export function QuickViewDialog({ product, onClose }: QuickViewDialogProps) {
  const addItem = useCartStore((s) => s.addItem);

  const onAddToBag = () => {
    if (!product) return;
    addItem(product);
    onClose();
  };
  return (
    <Dialog
      open={Boolean(product)}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 0,
            bgcolor: "#faf8f5",
            maxWidth: 960,
            margin: 2,
          },
        },
      }}
    >
      {product && (
        <div className="qv-dialog">
          <IconButton
            aria-label="Close"
            onClick={onClose}
            sx={{ position: "absolute", right: 12, top: 12, zIndex: 10, color: "#1a1a1a" }}
          >
            <X size={20} strokeWidth={1.5} />
          </IconButton>

          <div className="qv-dialog__media">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>

          <div className="qv-dialog__body">
            <p className="qv-dialog__label">
              The Heritage Collection · {product.category}
            </p>
            <h3 className="qv-dialog__name">
              {product.name}
            </h3>
            <p className="qv-dialog__price">
              {formatPrice(product.price)}
            </p>

            <div className="qv-dialog__specs">
              <div className="qv-dialog__spec">
                <span className="qv-dialog__spec-label">Fabric</span>
                <span>{product.fabric}</span>
              </div>
              <div className="qv-dialog__spec">
                <span className="qv-dialog__spec-label">Occasion</span>
                <span>{product.occasion}</span>
              </div>
              <div className="qv-dialog__spec">
                <span className="qv-dialog__spec-label">Colour</span>
                <span style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
                  {product.color}
                  <span
                    className="qv-dialog__color-dot"
                    style={{
                      background:
                        product.color === "Red"
                          ? "#b91c1c"
                          : product.color === "Pink"
                            ? "#f9a8d4"
                            : "#166534",
                    }}
                  />
                </span>
              </div>
            </div>

            <p className="qv-dialog__desc">
              Handwoven on traditional pit looms with pure zari. Each piece is
              authenticated and individually numbered — a heirloom to be worn
              and passed down.
            </p>

            <div className="qv-dialog__actions">
              <button className="btn-primary" onClick={onAddToBag}>
                <ShoppingBag size={15} strokeWidth={1.5} /> Add to Bag
              </button>
              <button className="btn-outline">
                Book an Atelier Visit
              </button>
            </div>

            <div className="qv-dialog__services">
              <div className="qv-dialog__service">
                <Truck size={16} strokeWidth={1.5} />
                <span>Free Shipping</span>
              </div>
              <div className="qv-dialog__service">
                <ShieldCheck size={16} strokeWidth={1.5} />
                <span>Authentic Zari</span>
              </div>
              <div className="qv-dialog__service">
                <RotateCcw size={16} strokeWidth={1.5} />
                <span>7-Day Return</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Dialog>
  );
}
