"use client";

import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/reveal";

gsap.registerPlugin(ScrollTrigger);

/* ========================================================================== */
/* STATIC CONTENT — kept outside the component so the JSX stays readable.      */
/* ========================================================================== */

/* Two "pillar" cards that explain the brand vision. */
const VISION_CARDS = [
  {
    icon: "/asserts/about-page-images/aboutpage-icon.png",
    title: "Architectural Drape",
    body: "Every pleat and fold is calculated. We treat the saree as a canvas for structural innovation, ensuring movement and grace are built into the design.",
  },
  {
    icon: "/asserts/about-page-images/aboutpage-icon-two.png",
    title: "Quiet Luxury",
    body: "We prioritize the hand-feel of the silk and the weight of the weave over loud embellishment. Luxury that speaks softly but resonates deeply.",
  },
];

/* Checklist items under the "craftsmanship" section. */
const CHECKLIST = [
  { icon: "/asserts/about-page-images/aboutpage-icon.png", text: "Ethically sourced Mulberry and Tussar silk." },
  { icon: "/asserts/about-page-images/aboutpage-icon-two.png", text: "Pure Zari containing certified silver and gold." },
  { icon: "/asserts/about-page-images/aboutpage-icon-three.png", text: "Limited production runs to maintain exclusivity." },
];

/* Company milestones — `side` decides which rail the card sits on. */
const TIMELINE = [
  {
    year: "2020",
    label: "The Seed",
    side: "right" as const,
    body: "Extensive field research begins across weaving clusters in India to identify master artisans who share our vision for modern minimalism.",
  },
  {
    year: "2022",
    label: "First Prototype",
    side: "left" as const,
    body: "Our first collection of 'Liquid Silks' is developed, marrying the drape of luxury satin with the durability of handloom silk.",
  },
  {
    year: "2024",
    label: "The Launch",
    side: "right" as const,
    body: "AARYA opens its flagship digital boutique, offering curated collections to the global Indian diaspora and luxury enthusiasts.",
  },
];

/* ========================================================================== */
/* PAGE — the About / philosophy page                                          */
/* ========================================================================== */

export default function AboutPage() {
  const timelineRef = useRef<HTMLDivElement>(null);

  // ---------- timeline scroll animations ----------
  useLayoutEffect(() => {
    const el = timelineRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      // 1. The vertical rail grows from top to bottom as the user scrolls.
      gsap.fromTo(
        ".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        },
      );

      // 2. Each milestone card slides in from its own side.
      gsap.utils.toArray<HTMLElement>(".milestone").forEach((m) => {
        const fromLeft = m.classList.contains("milestone-left");
        gsap.fromTo(
          m,
          { autoAlpha: 0, x: fromLeft ? -40 : 40 },
          {
            autoAlpha: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: m, start: "top 82%", once: true },
          },
        );
      });

      // 3. The dot markers pop in with a springy scale.
      gsap.utils.toArray<HTMLElement>(".timeline-dot").forEach((d) => {
        gsap.fromTo(
          d,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.5,
            ease: "back.out(3)",
            scrollTrigger: { trigger: d, start: "top 80%", once: true },
          },
        );
      });
    }, el);

    // Revert all animations when the page unmounts (GSAP best practice).
    return () => ctx.revert();
  }, []);

  // ---------- render ----------
  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="about-hero">
        <div className="about-hero__text">
          <Reveal>
            <p className="eyebrow">Our Philosophy</p>
            <h1 className="about-hero__title">Preserving Modern Heritage</h1>
            <p className="about-hero__body">
              AARYA is born from a desire to bridge the gap between ancient
              Indian craftsmanship and the contemporary global silhouette. We
              believe heritage isn&apos;t a museum piece; it&apos;s a living,
              breathing dialogue.
            </p>
          </Reveal>
        </div>
        <div className="about-hero__media">
          <Image
            src="/asserts/about-page-images/herosection-image.png"
            alt="Woman in magenta silk saree"
            fill
            priority
            sizes="(max-width: 768px) 100vw, 55vw"
          />
          <div className="about-hero__gradient" />
        </div>
      </section>

      {/* ---------- vision ---------- */}
      <section className="about-section">
        <div className="container-1280 vision__grid">
          <div>
            <Reveal>
              <h2 className="vision__heading">The Vision of Refinement</h2>
              <p className="vision__body">
                Founded in 2024, AARYA was established to redefine how the world
                views ethnic couture. We discard the heavy, the cluttered, and
                the temporary in favor of the timeless, the precise, and the
                meaningful.
              </p>
            </Reveal>
          </div>
          {/* Two pillar cards, each revealed slightly later than the last. */}
          <div className="vision__cards">
            {VISION_CARDS.map((card, i) => (
              <Reveal key={card.title} delay={i * 0.12} y={30}>
                <div className="vision-card">
                  <Image src={card.icon} alt="" width={28} height={28} />
                  <h3 className="vision-card__title">{card.title}</h3>
                  <p className="vision-card__body">{card.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- craftsmanship ---------- */}
      <section className="about-section" style={{ paddingTop: 0 }}>
        <div className="container-1280 craft__grid">
          <div className="craft__media">
            <Image
              src="/asserts/about-page-images/mainsection-image.png"
              alt="Hands weaving on a traditional loom"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <Reveal>
              <p className="eyebrow">The Hands of Heritage</p>
              <h2 className="craft__title">Uncompromising Craftsmanship</h2>
              <p className="craft__body">
                We collaborate directly with master weavers in Banaras,
                Kanchipuram, and Chanderi. These relationships are the soul of
                AARYA. By eliminating middlemen, we ensure our artisans receive
                fair compensation while we gain unparalleled control over every
                thread.
              </p>
              {/* Checklist items with staggered reveals. */}
              <ul className="craft-list">
                {CHECKLIST.map((item, i) => (
                  <Reveal key={item.text} delay={i * 0.15} y={20}>
                    <li className="craft-list__item">
                      <span className="craft-list__check">
                        <Check size={14} strokeWidth={2} />
                      </span>
                      <span className="craft-list__text">{item.text}</span>
                    </li>
                  </Reveal>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      <section ref={timelineRef} className="timeline">
        <div className="container-1280">
          <Reveal>
            <h2 className="timeline__title">Milestones of the Journey</h2>
            <div className="timeline__rule" />
          </Reveal>

          <div className="timeline__rail">
            {/* The animated vertical line the dots sit on. */}
            <div className="timeline__line timeline-line" />
            <div className="timeline__items">
              {TIMELINE.map((m) => {
                // Alternate the card between the left and right rail.
                const isLeft = m.side === "left";
                return (
                  <div
                    key={m.year}
                    className={
                      isLeft
                        ? "timeline__item timeline__item--left"
                        : "timeline__item timeline__item--right"
                    }
                  >
                    <span className="timeline-dot timeline__dot" />
                    <div
                      className={
                        isLeft ? "milestone milestone-left" : "milestone milestone-right"
                      }
                    >
                      <p className="timeline__year">{m.year}</p>
                      <p className="timeline__label">{m.label}</p>
                      <p className="timeline__body">{m.body}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ---------- cta quote ---------- */}
      <section className="cta-quote">
        <Reveal>
          <p className="cta-quote__text">
            &ldquo;A garment that tells a story, a fabric that holds a
            legacy.&rdquo;
          </p>
          <div className="cta-quote__actions">
            <Link href="/collection" className="btn-primary">
              Explore Collections
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <Link href="/blog" className="btn-outline">
              The Heritage Log
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
