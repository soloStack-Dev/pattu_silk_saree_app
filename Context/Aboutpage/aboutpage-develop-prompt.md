Build a responsive, luxury "About" page for AARYA — a modern Indian heritage saree brand. 
The page must feel editorial, minimalist, and premium. Use React (Next.js) or plain HTML/CSS/JS.

STRUCTURE (Single Page, Vertical Scroll):
├── Sticky Navbar (logo left, nav center, icons right)
├── Hero Section (split layout: text left, full-height image right)
├── Vision Cards Section (heading left, 2 feature cards right)
├── Craftsmanship Section (image left, text right with checklist)
├── Timeline Section (vertical alternating timeline, 3 milestones)
├── CTA Quote Section (centered italic quote + 2 buttons)
└── Footer (4-column layout: brand + 3 link columns)

TECH REQUIREMENTS:
- Fully responsive (mobile: stack all columns, tablet: 2-col, desktop: split)
- Smooth scroll behavior (CSS scroll-behavior: smooth)
- Scroll-triggered animations using Intersection Observer or GSAP ScrollTrigger
- Navbar becomes slightly opaque/blurred on scroll (glassmorphism subtle)
- Images lazy-loaded with fade-in on enter
- Timeline dots animate (scale up) when scrolled into view
- Text reveals: headings fade-up + translateY(30px→0), paragraphs stagger in
- Button hover: filled button darkens; outline button fills with burgundy + text turns white
- No horizontal scroll ever. Max-width container: 1280px centered.

ANIMATION SPECS:
- Hero text: stagger fade-up (0.1s delay between lines)
- Hero image: subtle parallax (moves slower than scroll, 0.05 rate)
- Vision cards: fade-up + slight scale(0.98→1) on scroll entry
- Craftsmanship image: slide-in from left (-50px→0) + fade
- Checklist items: stagger fade-in from bottom (0.15s apart)
- Timeline: vertical line draws downward on scroll; each milestone fades in alternately left/right
- CTA quote: slow fade-in with slight letter-spacing expansion
- Footer: simple fade-up on entry

COLORS (exact):
- Primary Background: #FAF8F5 (warm cream)
- Secondary Background: #E8E4E0 (warm beige for timeline/footer)
- Primary Accent: #8B1A3C (deep burgundy/maroon)
- Text Primary: #1A1A1A (near black)
- Text Secondary: #5C5C5C (muted gray)
- Gold Accent: #C9A96E (subtle gold for icons/highlights)
- White: #FFFFFF
- Card Border: rgba(0,0,0,0.06)

TYPOGRAPHY:
- Headings: Serif font (Playfair Display / Cormorant Garamond / Times New Roman fallback). 
  Hero H1: 56px desktop / 36px mobile, weight 500, line-height 1.1, color #1A1A1A.
  Section H2: 40px desktop / 28px mobile, weight 500.
- Labels ("OUR PHILOSOPHY", "THE HANDS OF HERITAGE"): Sans-serif (Inter / DM Sans), 
  12px, uppercase, letter-spacing 2px, color #8B1A3C.
- Body: Sans-serif, 16px, weight 400, line-height 1.7, color #5C5C5C.
- Quote: Serif italic, 28px desktop / 20px mobile, color #1A1A1A.
- Nav links: Sans-serif, 14px, weight 400, color #1A1A1A. Active link underlined in burgundy.

SPACING:
- Section vertical padding: 100px desktop / 60px mobile
- Container max-width: 1280px, horizontal padding: 24px mobile / 48px tablet / 80px desktop
- Gap between vision cards: 24px
- Navbar height: 72px

COMPONENTS:
- Primary Button: bg #8B1A3C, text white, padding 14px 32px, font 12px uppercase tracking-wide, 
  no border-radius (sharp corners), hover: bg darken 10%.
- Secondary Button: bg transparent, border 1px solid #1A1A1A, text #1A1A1A, same padding, 
  hover: bg #8B1A3C, border #8B1A3C, text white.
- Feature Cards: bg #FFFFFF, border 1px solid rgba(0,0,0,0.06), padding 32px, no border-radius.
- Timeline dot: 10px circle, bg #8B1A3C, white border 2px. Connected by 1px vertical line #8B1A3C.
- Checklist icon: 20px circle with burgundy outline + burgundy checkmark inside.

## Dependencies

take a reference in this package here the exact location /my-app/package.json i add 3d animation package [three js]