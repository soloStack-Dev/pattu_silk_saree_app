"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Mail, Send } from "lucide-react";
import { InstagramIcon, PinterestIcon } from "@/components/brand-icons";
import { Reveal } from "@/components/reveal";

export function SiteFooter() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const columns = [
    {
      label: "SHOP",
      links: [
        { href: "/collection", label: "New Arrivals" },
        { href: "/collection", label: "Sarees" },
        { href: "/collection", label: "Bridal" },
        { href: "/collection", label: "Accessories" },
      ],
    },
    {
      label: "SUPPORT",
      links: [
        { href: "#", label: "Shipping & Returns" },
        { href: "#", label: "Contact Us" },
        { href: "#", label: "Privacy Policy" },
        { href: "#", label: "Terms of Service" },
      ],
    },
    {
      label: "CONNECT",
      links: [
        { href: "#", label: "Instagram" },
        { href: "#", label: "Pinterest" },
        { href: "#", label: "Bespoke" },
        { href: "/blog", label: "The Journal" },
      ],
    },
  ];

  return (
    <footer className="site-footer">
      <Reveal y={30}>
        <div className="container-1280 site-footer__inner">
          <div className="site-footer__grid">
            <div>
              <Link href="/" className="site-footer__brand">
                AARYA
              </Link>
              <p className="site-footer__desc">
                Elevating the spirit of Indian craftsmanship through contemporary
                silhouettes and luxury textiles.
              </p>
              <div className="site-footer__social">
                <a href="#" aria-label="Instagram">
                  <InstagramIcon size={20} strokeWidth={1.5} />
                </a>
                <a href="#" aria-label="Pinterest">
                  <PinterestIcon size={20} strokeWidth={1.5} />
                </a>
                <a href="#" aria-label="Email">
                  <Mail size={20} strokeWidth={1.5} />
                </a>
              </div>
            </div>

            {columns.map((col) => (
              <div key={col.label}>
                <h4 className="site-footer__heading">{col.label}</h4>
                <ul className="site-footer__links">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link href={l.href} className="site-footer__link">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div>
              <h4 className="site-footer__note-heading">NEWSLETTER</h4>
              <p className="site-footer__note">
                © 2024 AARYA Modern Heritage. All rights reserved.
              </p>
              <form
                className="site-footer__newsletter"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="YOUR EMAIL ADDRESS"
                  className="site-footer__newsletter-input"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="site-footer__newsletter-btn"
                >
                  <Send size={16} strokeWidth={1.5} />
                </button>
              </form>
            </div>
          </div>

          <div className="site-footer__copy">
            <p style={{ margin: 0 }}>
              © 2024 AARYA Modern Heritage. All rights reserved.
            </p>
          </div>
        </div>
      </Reveal>
    </footer>
  );
}
