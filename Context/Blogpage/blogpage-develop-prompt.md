Build a responsive, luxury "Blog / Journal" page for AARYA — a modern Indian heritage 
saree brand. The page must feel editorial, magazine-like, minimalist, and premium. 


STRUCTURE (Single Page, Vertical Scroll):
├── Sticky Navbar (nav links left, CENTERED logo, icons right — unique layout!)
├── Hero Header (centered label + italic serif heading)
├── Featured Article Section (split: large image left, text right)
├── Category Cards (3-column grid: Style Guide | Heritage Care | Trends)
├── Article Grid Row 1 (3 text-only article cards)
├── Newsletter Section (email signup, warm beige background)
├── Article Grid Row 2 (2 cards: image left + text right, editorial layout)
└── Footer (4-column: brand + socials + 2 link columns + copyright)

TECH REQUIREMENTS:
- Fully responsive (mobile: stack all, tablet: 2-col where applicable, desktop: full layout)
- Smooth scroll behavior (CSS scroll-behavior: smooth)
- Scroll-triggered animations using Intersection Observer or GSAP ScrollTrigger
- Navbar becomes slightly opaque/blurred on scroll (glassmorphism subtle)
- Images lazy-loaded with fade-in on enter
- Category cards: hover lifts card slightly + image zoom
- Featured article: parallax on image, text staggers in
- Article cards: stagger fade-up on scroll entry
- No horizontal scroll ever. Max-width container: 1280px centered.

ANIMATION SPECS:
- Hero label + heading: stagger fade-up on load
- Featured article image: subtle parallax (0.06 rate), scale 1.02→1
- Featured text: stagger fade-up (label → title → paragraph → link)
- Category cards: stagger fade-up + scale(0.97→1), 0.15s delay between cards
- Article grid cards: stagger fade-up from bottom, 0.12s apart
- Newsletter: fade-up on scroll entry
- Bottom article cards: image slides in from left/right, text fades up
- Footer: simple fade-up on entry

COLORS (exact):
- Primary Background: #FAF8F5 (warm cream)
- Secondary Background: #F2EFEA (warm beige for newsletter)
- Footer Background: #E8E4E0 (slightly darker beige)
- Primary Accent: #8B1A3C (deep burgundy/maroon)
- Category Label: #7A6A3D (olive/dark gold for article labels)
- Text Primary: #1A1A1A (near black)
- Text Secondary: #5C5C5C (muted gray)
- Text Muted: #8B8B8B (lighter gray)
- White: #FFFFFF
- Card Border: rgba(0,0,0,0.06)
- Input Border: #C4C4C4

TYPOGRAPHY:
- Headings: Serif font (Playfair Display / Cormorant Garamond / Times New Roman fallback).
  Hero H1: 48px desktop / 32px mobile, weight 500, line-height 1.15, color #1A1A1A, italic.
  Section H2: 40px desktop / 28px mobile, weight 500.
  Article Title: Serif, 22px desktop / 18px mobile, weight 500, color #1A1A1A.
  Featured Title: Serif, 32px desktop / 24px mobile, weight 500, line-height 1.2.
- Labels ("THE JOURNAL", "CRAFTSMANSHIP / MAY 2024"): Sans-serif (Inter / DM Sans), 
  11-12px, uppercase, letter-spacing 2px.
  "THE JOURNAL": color #8B1A3C.
  "CRAFTSMANSHIP / MAY 2024": color #7A6A3D (olive gold).
- Body: Sans-serif, 15px, weight 400, line-height 1.7, color #5C5C5C.
- Nav links: Sans-serif, 13px, weight 400, color #1A1A1A, uppercase, letter-spacing 1px. 
  Active link underlined in burgundy.
- "Read More" / "Read The Feature": Sans-serif, 12px, uppercase, letter-spacing 1px, 
  color #8B1A3C, with right arrow icon.

SPACING:
- Section vertical padding: 80px desktop / 50px mobile
- Container max-width: 1280px, horizontal padding: 24px mobile / 48px tablet / 80px desktop
- Grid gaps: 24px-32px
- Navbar height: 72px
- Hero padding: 60px top / 40px bottom

COMPONENTS:
- Primary Button: bg #8B1A3C, text white, padding 14px 32px, font 12px uppercase tracking-wide, 
  no border-radius, hover: bg darken 10%.
- Email Input: border 1px solid #C4C4C4, padding 14px 16px, font 12px uppercase sans-serif, 
  placeholder color #8B8B8B, focus border #8B1A3C, no border-radius.
- Category Card: image container overflow hidden, label below in uppercase sans-serif 11px 
  letter-spacing 1.5px, color #8B1A3C.
- Article Card (text-only): no border, no background. Title serif 22px, description sans 15px 
  color #5C5C5C, 2-line clamp.
- Article Card (image+text): image left ~40%, text right ~60%. Label uppercase sans 11px 
  color #7A6A3D. Title serif 24px. "Read More" link burgundy.
- Social Icons: 18px stroke icons, color #1A1A1A, hover color #8B1A3C.