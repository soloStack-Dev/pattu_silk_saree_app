Build a responsive, luxury "Collection" page for AARYA — a modern Indian heritage 
saree brand. The page must feel editorial, minimalist, and premium.

## Dependencies

take a reference in this package here the exact location /my-app/package.json i add 3d animation package [three js]

STRUCTURE (Single Page, Vertical Scroll):
├── Sticky Navbar (logo left, nav center, icons right)
├── Hero Section (centered text, no image)
├── Filter Bar (horizontal row of dropdown filters + results count)
├── Product Grid (3-column masonry/staggered grid, product cards)
├── Discover More Button (centered CTA)
├── Newsletter Section (email signup, beige background)
└── Footer (4-column: brand + socials + 2 link columns)

TECH REQUIREMENTS:
- Fully responsive (mobile: 1-2 columns, tablet: 2 columns, desktop: 3 columns)
- Smooth scroll behavior (CSS scroll-behavior: smooth)
- Scroll-triggered animations using Intersection Observer or GSAP ScrollTrigger
- Navbar becomes slightly opaque/blurred on scroll (glassmorphism subtle)
- Product images lazy-loaded with fade-in on enter
- Filter dropdowns: click to expand, smooth height animation, close on outside click
- Product cards stagger in on page load / scroll (cascade effect)
- Middle column of product grid is offset lower by ~60px (masonry effect)
- No horizontal scroll ever. Max-width container: 1280px centered.

ANIMATION SPECS:
- Hero text: stagger fade-up (0.1s delay between lines), heading has slight scale
- Filter bar: fade-down on scroll entry
- Product cards: stagger fade-up + scale(0.98→1), column 2 delayed extra 0.15s for masonry feel
- Card hover: image zoom scale(1.05), title color shifts to burgundy
- Discover More button: fade-up on scroll
- Newsletter section: fade-up, input focus has subtle border glow
- Footer: simple fade-up on entry

COLORS (exact):
- Primary Background: #FAF8F5 (warm cream)
- Secondary Background: #EDEAE6 (warm beige for newsletter/footer)
- Primary Accent: #8B1A3C (deep burgundy/maroon)
- Hero Heading: #7A1532 (slightly deeper burgundy for H1)
- Text Primary: #1A1A1A (near black)
- Text Secondary: #5C5C5C (muted gray)
- Text Muted: #8B8B8B (lighter gray for labels)
- White: #FFFFFF
- Card Border: rgba(0,0,0,0.06)
- Input Border: #C4C4C4

TYPOGRAPHY:
- Headings: Serif font (Playfair Display / Cormorant Garamond / Times New Roman fallback).
  Hero H1: 52px desktop / 34px mobile, weight 500, line-height 1.1, color #7A1532.
  Section H2: 40px desktop / 28px mobile, weight 500, color #1A1A1A.
- Labels ("THE HERITAGE COLLECTION"): Sans-serif (Inter / DM Sans), 
  12px, uppercase, letter-spacing 2.5px, color #8B1A3C.
- Body: Sans-serif, 16px, weight 400, line-height 1.7, color #5C5C5C.
- Product Title: Serif, 18px, weight 500, color #1A1A1A, centered.
- Product Label: Sans-serif, 11px, uppercase, letter-spacing 1.5px, color #8B8B8B, centered.
- Product Price: Serif, 16px, weight 500, color #8B1A3C, centered.
- Nav links: Sans-serif, 14px, weight 400, color #1A1A1A. Active link underlined in burgundy.
- Filter labels: Sans-serif, 13px, uppercase, letter-spacing 1px, color #1A1A1A.

SPACING:
- Section vertical padding: 80px desktop / 50px mobile
- Container max-width: 1280px, horizontal padding: 24px mobile / 48px tablet / 80px desktop
- Product grid gap: 24px horizontal, 48px vertical
- Navbar height: 72px
- Hero padding: 120px top / 60px bottom

COMPONENTS:
- Primary Button: bg #8B1A3C, text white, padding 14px 32px, font 12px uppercase tracking-wide, 
  no border-radius (sharp corners), hover: bg darken 10%.
- Secondary/Outline Button: bg transparent, border 1px solid #8B1A3C, text #8B1A3C, 
  padding 12px 28px, font 12px uppercase tracking-wide, hover: bg #8B1A3C, text white.
- Filter Dropdown: text + down chevron icon. On click: expand panel below with filter options.
- Product Card: no border, no background, image container overflow hidden. 
  Image aspect ratio ~3:4. Text below image centered.
- Email Input: border 1px solid #C4C4C4, padding 14px 16px, font 13px uppercase sans-serif, 
  placeholder color #8B8B8B, focus border #8B1A3C, no border-radius.
- Social Icons: 20px stroke icons, color #1A1A1A, hover color #8B1A3C.