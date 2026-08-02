"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, Eye } from "lucide-react";
import { fetchProducts, applyFilters, DEFAULT_FILTER, type Product, type ProductFilter } from "@/lib/data/products";
import { Reveal } from "@/components/reveal";
import { FilterBar } from "@/components/collection/filter-bar";
import { ProductCard } from "@/components/collection/product-card";
import { QuickViewDialog } from "@/components/collection/quick-view-dialog";
import { Newsletter } from "@/components/newsletter";

export default function CollectionPage() {
  const [filter, setFilter] = useState<ProductFilter>(DEFAULT_FILTER);
  const [quickView, setQuickView] = useState<Product | null>(null);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["collection", "products"],
    queryFn: fetchProducts,
  });

  const visible = applyFilters(products, filter);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="coll-hero">
        <Reveal y={20}>
          <div className="container-1280" style={{ textAlign: "center", maxWidth: 640 }}>
            <p className="coll-hero__label">The Heritage Collection</p>
            <h1 className="coll-hero__title">Woven Dreams</h1>
            <p className="coll-hero__body">
              Experience the architectural elegance of Indian craftsmanship. Each
              saree in our curation is a testament to centuries of hand-weaving
              traditions, reimagined for the contemporary woman.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ---------- filter bar ---------- */}
      <FilterBar filter={filter} onChange={setFilter} count={visible.length} />

      {/* ---------- product grid ---------- */}
      <section className="coll-section">
        <div className="container-1280">
          {isLoading ? (
            <div className="coll-grid">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className={i % 3 === 1 ? "coll-grid__item--offset" : ""}>
                  <div className="coll-skeleton coll-skeleton--media" />
                  <div className="coll-skeleton coll-skeleton--line" />
                  <div className="coll-skeleton coll-skeleton--line-sm" />
                </div>
              ))}
            </div>
          ) : visible.length === 0 ? (
            <div className="coll-empty">
              <Eye size={28} strokeWidth={1.5} className="coll-empty__icon" />
              <p className="coll-empty__title">No sarees match those filters</p>
              <p className="coll-empty__body">Try clearing a filter or two.</p>
            </div>
          ) : (
            <div className="coll-grid">
              {visible.map((product, i) => (
                <div key={product.id} className={i % 3 === 1 ? "coll-grid__item--offset" : ""}>
                  <Reveal delay={(i % 3) * 0.12} y={30}>
                    <ProductCard
                      product={product}
                      onQuickView={setQuickView}
                      priority={i < 3}
                    />
                  </Reveal>
                </div>
              ))}
            </div>
          )}

          {/* sticky count */}
          {!isLoading && visible.length > 0 && (
            <div className="coll-count">
              Viewing {visible.length} of {products.length} sarees
            </div>
          )}

          {/* discover more */}
          <div className="coll-more">
            <Reveal>
              <button className="coll-more__btn">
                Discover More Sarees
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- newsletter ---------- */}
      <Newsletter
        title="Join the AARYA Circle"
        body="Receive early access to new collections, heritage stories, and private atelier visits."
        bg="sand"
      />

      <QuickViewDialog product={quickView} onClose={() => setQuickView(null)} />
    </>
  );
}
