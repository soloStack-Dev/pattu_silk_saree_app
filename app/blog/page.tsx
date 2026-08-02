"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { Newsletter } from "@/components/newsletter";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_CARDS = [
  {
    image: "/asserts/blog-page-images/heroalongsubsection-image.png",
    label: "Style Guide",
  },
  {
    image: "/asserts/blog-page-images/heroalongsubsection-image-two.png",
    label: "Heritage Care",
  },
  {
    image: "/asserts/blog-page-images/heroalongsubsection-image-three.png",
    label: "Trends",
  },
];

const TEXT_CARDS = [
  {
    title: "5 Ways to Style a Banarasi for the Modern Wedding",
    body: "From power-shoulder blouses to draped dupattas — the new rules of bridal dressing are made for movement, not museum cases.",
  },
  {
    title: "The Art of Preservation: Caring for Your Silk Heirlooms",
    body: "Air, cedar, moonlight. The unhurried rituals that keep a handwoven saree luminous for generations.",
  },
  {
    title: "Minimalist Opulence: 2024 Wedding Fashion Forecast",
    body: "Soft golds, sculpted drapes and quiet embroidery. This season opulence whispers instead of shouts.",
  },
];

const EDITORIAL_CARDS = [
  {
    image: "/asserts/blog-page-images/mainsection-image-one.png",
    label: "Artisan Voice",
    title: "A Conversation with Master Weaver Rajesh Kumar",
    body: "Understanding the rhythmic poetry of the loom and the future of hand-woven luxury.",
  },
  {
    image: "/asserts/blog-page-images/mainsection-image-two.png",
    label: "Lifestyle",
    title: "Curating Your Festive Wardrobe",
    body: "Building a collection that transcends seasons and trends.",
  },
];

function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="reading-progress">
      <div ref={barRef} className="reading-progress__bar" />
    </div>
  );
}

export default function BlogPage() {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = parallaxRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".featured-img",
        { yPercent: -8, scale: 1.06 },
        {
          yPercent: 8,
          scale: 1.06,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <>
      <ReadingProgress />

      {/* ---------- hero header ---------- */}
      <section className="blog-hero">
        <Reveal y={20}>
          <div className="container-1280" style={{ textAlign: "center", maxWidth: 700 }}>
            <p className="blog-hero__label">The Journal</p>
            <h1 className="blog-hero__title">
              Modern Heritage &amp; Artistry
            </h1>
          </div>
        </Reveal>
      </section>

      {/* ---------- featured article ---------- */}
      <section ref={parallaxRef} className="blog-featured">
        <div className="container-1280 blog-featured__grid">
          <div className="blog-featured__media">
            <div className="blog-featured__media-inner">
              <Image
                src="/asserts/blog-page-images/herosection-image.png"
                alt="Woman in magenta saree at a marble palace courtyard"
                fill
                priority
                sizes="(max-width: 768px) 100vw, 55vw"
                className="featured-img"
              />
            </div>
          </div>
          <div>
            <Reveal delay={0.1}>
              <p className="blog-featured__meta">
                Craftsmanship / May 2024
              </p>
              <h2 className="blog-featured__title">
                The Evolution of the Saree: From Royal Courts to Global Runways
              </h2>
              <p className="blog-featured__body">
                An exploration of how the timeless six-yard garment has transformed
                through centuries, preserving its soul while embracing contemporary
                silhouettes.
              </p>
              <Link href="#" className="btn-underline" style={{ marginTop: "1.75rem" }}>
                Read the Feature
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- category cards ---------- */}
      <section className="blog-cats">
        <div className="container-1280 blog-cats__grid">
          {CATEGORY_CARDS.map((card, i) => (
            <Reveal key={card.label} delay={i * 0.15} scale={0.97} y={24}>
              <Link href="#" className="blog-cat">
                <div className="blog-cat__media">
                  <Image
                    src={card.image}
                    alt={card.label}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="blog-cat__label">
                  {card.label}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- article grid row 1 (text only) ---------- */}
      <section className="blog-articles">
        <div className="container-1280 blog-articles__grid">
          {TEXT_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.12} y={30}>
              <article className="blog-article">
                <Link href="#" className="blog-article__link">
                  <h3 className="blog-article__title">
                    {card.title}
                  </h3>
                </Link>
                <p className="blog-article__body">
                  {card.body}
                </p>
                <span className="blog-article__link">
                  Read <ArrowUpRight size={13} strokeWidth={1.5} />
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------- newsletter ---------- */}
      <Newsletter
        title="Join the Inner Circle"
        body="Subscribe to receive our seasonal lookbooks, private sale access, and stories of craftsmanship."
        bg="fog"
      />

      {/* ---------- article grid row 2 (editorial cards) ---------- */}
      <section className="blog-editorial">
        <div className="container-1280 blog-editorial__grid">
          {EDITORIAL_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.15} y={30}>
              <Link href="#" className="blog-edit">
                <div className="blog-edit__media">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 40vw"
                  />
                </div>
                <div className="blog-edit__content">
                  <p className="blog-edit__label">{card.label}</p>
                  <h3 className="blog-edit__title">
                    {card.title}
                  </h3>
                  <p className="blog-edit__body">{card.body}</p>
                  <span className="blog-edit__more">Read More</span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
