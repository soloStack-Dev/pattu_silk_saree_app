"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, ArrowUpRight, Mail } from "lucide-react";
import { InstagramIcon, PinterestIcon } from "@/components/brand-icons";
import { BLOG_POSTS } from "./assets";

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Page({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <section className={`hp-page ${className}`}>{children}</section>;
}

function RevealOnView({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const { ref, inView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`hp-reveal ${inView ? "hp-reveal--in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ------------------------------ HERO ------------------------------ */
function HeroOverlay() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.35 })
        .fromTo(
          ".hero-brand",
          { y: 80, autoAlpha: 0, rotateX: 35 },
          { y: 0, autoAlpha: 1, rotateX: 0, duration: 1.4, ease: "power4.out" },
        )
        .fromTo(
          ".hero-subline",
          { autoAlpha: 0, x: -20 },
          { autoAlpha: 1, x: 0, duration: 0.9, ease: "power2.out" },
          "-=0.8",
        )
        .fromTo(
          ".hero-copy",
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1.1, ease: "power3.out" },
          "-=0.7",
        );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <Page className="pointer-events-none">
      <div ref={root} className="hp-hero">
        {/* brand text — left */}
        <div className="hp-hero__brand">
          <p className="hp-hero__subline hero-subline">
            Silks · Est. 1612
          </p>
          <h1
            className="hero-brand hp-hero__title text-gold-shimmer text-shadow-hero"
            style={{ perspective: "800px" }}
          >
            KANCHIPURAM
          </h1>
        </div>

        {/* copy — right */}
        <div className="hp-hero__copy hero-copy">
          <div className="hp-hero__rule" />
          <h2 className="hp-hero__heading">
            Woven with Devotion, <span className="italic" style={{ color: "var(--gold)" }}>Worn with Pride</span>
          </h2>
          <p className="hp-hero__body">
            Handcrafted Kanchipuram silk sarees, where every thread tells a story
            of 400 years of tradition.
          </p>
          <Link href="/collection" className="hp-hero__cta">
            View Collection
            <ArrowRight size={15} strokeWidth={1.5} />
          </Link>
        </div>

        {/* mobile brand */}
        <div className="hp-hero__mobile">
          <h1 className="hp-hero__mobile-title text-gold-shimmer">
            KANCHIPURAM
          </h1>
          <p className="hp-hero__mobile-sub">
            Silks · Est. 1612
          </p>
        </div>

        {/* scroll indicator */}
        <div className="hp-hero__scroll">
          <span className="hp-hero__scroll-label">Scroll</span>
          <span className="hp-hero__scroll-track">
            <span className="hp-hero__scroll-bar animate-scrollline" />
          </span>
        </div>
      </div>
    </Page>
  );
}

/* ---------------------------- HERITAGE ---------------------------- */
function HeritageOverlay() {
  return (
    <Page className="pointer-events-none">
      <div className="hp-left-title">
        <RevealOnView>
          <p className="eyebrow--gold">01 · Heritage</p>
          <h2 className="hp-section-title">The Legacy</h2>
        </RevealOnView>
      </div>
      <div className="hp-center-bottom">
        <RevealOnView delay={150}>
          <p className="hp-copy">
            Six generations of master weavers. One unbroken line of royal patronage.
            Every saree is a chapter in a story that refuses to end.
          </p>
        </RevealOnView>
      </div>
    </Page>
  );
}

/* ----------------------------- WEAVE ------------------------------ */
function WeaveOverlay() {
  return (
    <Page className="pointer-events-none">
      <div className="hp-weave-title">
        <RevealOnView>
          <p className="eyebrow--gold">02 · The Weave</p>
          <h2 className="hp-section-title hp-section-title--tight text-gold-shimmer">
            The Art of Zari
          </h2>
          <p className="hp-weave-sub">Where Gold Meets Silk</p>
        </RevealOnView>
      </div>
      <div className="hp-right-bottom">
        <RevealOnView delay={120}>
          <p className="hp-copy hp-copy--brighter">
            Each saree takes 45 days to complete. Two master weavers. One timeless
            creation. Pure gold thread woven into motifs inspired by temple architecture.
          </p>
          <div className="hp-stats">
            <div className="hp-stat">
              <span className="hp-stat__value">45</span>
              <span className="hp-stat__label">Days</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat__value">2</span>
              <span className="hp-stat__label">Weavers</span>
            </div>
            <div className="hp-stat">
              <span className="hp-stat__value">15</span>
              <span className="hp-stat__label">Generations</span>
            </div>
          </div>
        </RevealOnView>
      </div>
    </Page>
  );
}

/* ---------------------------- EDITORIAL --------------------------- */
function EditorialOverlay() {
  const leftCards = BLOG_POSTS.slice(0, 2);
  const rightCards = BLOG_POSTS.slice(2, 4);

  const Card = ({ post, delay }: { post: (typeof BLOG_POSTS)[number]; delay: number }) => (
    <RevealOnView delay={delay}>
      <Link href="/blog" className="hp-card">
        <div className="hp-card__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.src} alt={post.title} />
        </div>
        <div className="hp-card__body">
          <p className="hp-card__date">{post.date}</p>
          <h4 className="hp-card__title">{post.title}</h4>
          <p className="hp-card__read">
            Read <ArrowUpRight size={13} strokeWidth={1.5} />
          </p>
        </div>
      </Link>
    </RevealOnView>
  );

  return (
    <Page className="pointer-events-none">
      <div className="hp-center-head">
        <RevealOnView>
          <p className="eyebrow--gold" style={{ color: "rgba(122,21,50,0.8)" }}>03 · The Journal</p>
          <h2 className="hp-editorial-title">Stories in Silk</h2>
        </RevealOnView>
      </div>

      {/* flanking cards — desktop */}
      <div className="hp-editorial-cards hp-editorial-cards--left">
        {leftCards.map((post, i) => (
          <Card key={post.title} post={post} delay={i * 140} />
        ))}
      </div>
      <div className="hp-editorial-cards hp-editorial-cards--right">
        {rightCards.map((post, i) => (
          <Card key={post.title} post={post} delay={i * 140} />
        ))}
      </div>

      {/* mobile row */}
      <div className="hp-editorial-mobile">
        {BLOG_POSTS.slice(0, 2).map((post, i) => (
          <RevealOnView key={post.title} delay={i * 130}>
            <Link href="/blog" className="hp-mobile-card">
              <div className="hp-mobile-card__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.src} alt={post.title} />
              </div>
              <div className="hp-mobile-card__body">
                <h4 className="hp-mobile-card__title">{post.title}</h4>
              </div>
            </Link>
          </RevealOnView>
        ))}
      </div>
    </Page>
  );
}

/* ----------------------------- FOOTER ----------------------------- */
function FooterOverlay() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);
  return (
    <Page className="pointer-events-none">
      <div
        ref={ref}
        className={inView ? "hp-footer hp-footer--show" : "hp-footer hp-footer--hidden"}
      >
        <div className="hp-footer__inner">
          <div className="hp-footer__top">
            <div>
              <h3 className="hp-footer__heading">
                Join the <span className="italic" style={{ color: "var(--gold)" }}>Heritage</span>
              </h3>
              <p className="hp-footer__desc">
                Private collection previews, weaving stories and atelier visits —
                delivered with the same care as our silk.
              </p>
            </div>
            <form
              className="hp-footer__form"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="hp-footer__input"
              />
              <button type="submit" className="hp-footer__submit">
                Subscribe →
              </button>
            </form>
          </div>

          <div className="hp-footer__grid">
            <div>
              <p className="hp-footer__brand">Kanchipuram</p>
              <p className="hp-footer__desc-small">
                Woven with devotion in the temple city of Kanchipuram.
              </p>
            </div>
            {[
              { label: "EXPLORE", links: ["The Collection", "The Atelier", "Bespoke Orders", "Our Story"] },
              { label: "SUPPORT", links: ["Shipping & Returns", "Care Guide", "Privacy Policy", "Contact"] },
              { label: "CONNECT", links: ["Instagram", "Pinterest", "Journal", "Newsletter"] },
            ].map((col) => (
              <div key={col.label}>
                <p className="hp-footer__col-label">{col.label}</p>
                <ul className="hp-footer__links">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="hp-footer__link">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="hp-footer__bottom">
            <p className="hp-footer__copyright">© 2026 Kanchipuram Silks. All rights reserved.</p>
            <div className="hp-footer__social">
              <a href="#" aria-label="Instagram">
                <InstagramIcon size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Pinterest">
                <PinterestIcon size={20} strokeWidth={1.5} />
              </a>
              <a href="#" aria-label="Mail">
                <Mail size={20} strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
}

/* ----------------------------- STAGE ------------------------------ */
export function HomeOverlays() {
  return (
    <div className="hp-root">
      <HeroOverlay />
      <HeritageOverlay />
      <WeaveOverlay />
      <EditorialOverlay />
      <FooterOverlay />
    </div>
  );
}
