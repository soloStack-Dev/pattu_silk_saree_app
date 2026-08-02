"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useCartCount } from "@/lib/store/cart-store";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/collection", label: "Collection" },
  { href: "/blog", label: "Blog" },
];

export function SiteNav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isBlog = pathname.startsWith("/blog");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const cartCount = useCartCount();

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      setHidden(y > lastY && y > 200);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const active = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const navClasses = (href: string) => {
    const cls = ["site-nav__link"];
    if (active(href)) cls.push("site-nav__link--active");
    if (isHome) cls.push("site-nav__link--light");
    return cls.join(" ");
  };

  const underline = (href: string) =>
    active(href) && (
      <span
        className={
          isHome ? "site-nav__underline site-nav__underline--gold" : "site-nav__underline site-nav__underline--burgundy"
        }
      />
    );

  const navCenterLinks = (
    <div className="site-nav__links">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className={navClasses(l.href)}>
          {l.label}
          {underline(l.href)}
        </Link>
      ))}
    </div>
  );

  const navLeftLinks = (
    <div className="site-nav__links site-nav__links--tight">
      {LINKS.map((l) => (
        <Link key={l.href} href={l.href} className={navClasses(l.href)}>
          {l.label}
          {underline(l.href)}
        </Link>
      ))}
    </div>
  );

  const icons = (
    <div className="site-nav__icons">
      <button aria-label="Search" className={isHome ? "site-nav__icon site-nav__icon--light" : "site-nav__icon"}>
        <Search size={19} strokeWidth={1.5} />
      </button>
      <button
        aria-label="Account"
        className={
          isHome
            ? "site-nav__icon site-nav__icon--light site-nav__icon--hidden-sm"
            : "site-nav__icon site-nav__icon--hidden-sm"
        }
      >
        <User size={19} strokeWidth={1.5} />
      </button>
      <Link
        href="/cart"
        aria-label="Cart"
        className={isHome ? "site-nav__icon site-nav__cart site-nav__icon--light" : "site-nav__icon site-nav__cart"}
      >
        <ShoppingBag size={19} strokeWidth={1.5} />
        {cartCount > 0 && <span className="site-nav__cart-dot">{cartCount}</span>}
      </Link>
    </div>
  );

  const headerClasses = ["site-nav"];
  if (isHome) {
    headerClasses.push("site-nav--home");
    if (scrolled) headerClasses.push("scrolled");
    if (hidden) headerClasses.push("site-nav--hidden");
  } else {
    headerClasses.push("site-nav--static");
  }

  return (
    <>
      <header className={headerClasses.join(" ")}>
        <div className="site-nav__inner">
          {isBlog ? (
            <>
              {navLeftLinks}
              <Link href="/" className="site-nav__logo--serif">
                AARYA
              </Link>
              {icons}
            </>
          ) : (
            <>
              <Link href="/" className={isHome ? "site-nav__logo site-nav__logo--gold" : "site-nav__logo"}>
                Kanchipuram
              </Link>
              <nav className="site-nav__nav">{navCenterLinks}</nav>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                {!isHome && (
                  <span style={{ display: "inline-flex", alignItems: "center" }}>{icons}</span>
                )}
                <button
                  aria-label="Menu"
                  onClick={() => setOpen(true)}
                  className={isHome ? "site-nav__menu-btn site-nav__menu-btn--light" : "site-nav__menu-btn"}
                >
                  <Menu size={22} strokeWidth={1.5} />
                </button>
              </div>
            </>
          )}
        </div>
      </header>

      {/* mobile overlay menu */}
      <div className={open ? "mobile-menu mobile-menu--open" : "mobile-menu mobile-menu--closed"}>
        <div className="mobile-menu__top">
          <span className="font-accent-display uppercase" style={{ fontSize: 15, letterSpacing: "0.35em", color: "var(--gold)" }}>
            Kanchipuram
          </span>
          <button aria-label="Close" onClick={() => setOpen(false)} className="mobile-menu__close">
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="mobile-menu__nav">
          {LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={active(l.href) ? "mobile-menu__link mobile-menu__link--active" : "mobile-menu__link"}
              style={{ transitionDelay: open ? `${120 + i * 90}ms` : "0ms" }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/cart"
            onClick={() => setOpen(false)}
            className={pathname === "/cart" ? "mobile-menu__link mobile-menu__link--active" : "mobile-menu__link"}
            style={{ transitionDelay: open ? `${120 + LINKS.length * 90}ms` : "0ms" }}
          >
            Cart{cartCount > 0 ? ` (${cartCount})` : ""}
          </Link>
        </nav>
      </div>
    </>
  );
}
