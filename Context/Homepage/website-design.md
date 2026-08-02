
---

# File 2: `uiux_design_prompt.md`

```markdown
# UI/UX Design Prompt: Kanchipuram Silks — Immersive Luxury Experience

## Design Philosophy

**"Temple Architecture Meets Digital Silk"**

The interface should feel like walking through a South Indian temple corridor where stone gives way to silk. Every element carries the weight of heritage but moves with the fluidity of handwoven fabric. The design language balances **opulence** with **breathability** — generous whitespace framed by intricate gold detailing.

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-royal-purple` | `#4A148C` | Primary brand, hero backgrounds, CTAs |
| `--color-deep-magenta` | `#C2185B` | Secondary, saree accents, hover states |
| `--color-gold-zari` | `#D4AF37` | Typography highlights, borders, icons, jewelry |
| `--color-gold-light` | `#F4E4BC` | Gradient stops, glow effects, subtle accents |
| `--color-temple-stone` | `#5D4037` | Earthy neutrals, footer, grounding elements |
| `--color-ivory` | `#FFF8E7` | Primary background, text on dark |
| `--color-charcoal` | `#1A1A1A` | Deep backgrounds, 3D void space |
| `--color-silk-white` | `#FAF9F6` | Card backgrounds, modal overlays |

**Gradient Definitions:**
- `gradient-hero`: `linear-gradient(135deg, #4A148C 0%, #1A1A1A 100%)`
- `gradient-gold-shimmer`: `linear-gradient(90deg, #D4AF37 0%, #F4E4BC 50%, #D4AF37 100%)`
- `gradient-magenta-glow`: `radial-gradient(circle, #C2185B 0%, transparent 70%)`

### Typography

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display | **Playfair Display** | 400, 700, 900 | Hero headlines, section titles, 3D extruded text |
| Body | **Inter** | 300, 400, 500 | Descriptions, blog content, UI labels |
| Accent | **Cinzel Decorative** | 400, 700 | Nav links, buttons, ornamental text, category tags |
| Tamil/Hindi | **Noto Sans Tamil** | 400, 700 | Localized text, cultural authenticity |

**Type Scale (Fluid):**
- Display XL: `clamp(4rem, 10vw, 12rem)` — Hero "KANCHIPURAM" text
- Display L: `clamp(2.5rem, 5vw, 6rem)` — Section headers
- H1: `clamp(2rem, 4vw, 3.5rem)` — Page titles
- Body: `clamp(1rem, 1.2vw, 1.25rem)` — Paragraphs
- Caption: `0.875rem` — Meta, dates, tags

**Typography Treatments:**
- Display text: slight negative letter-spacing (`-0.02em`), gold gradient fill, subtle text-shadow `0 4px 30px rgba(212,175,55,0.3)`
- Body text: `line-height: 1.7`, `letter-spacing: 0.01em` for readability
- All caps + `font-feature-settings: "kern" 1, "liga" 1` for display

### Spacing System

Base unit: `8px`

| Token | Value | Usage |
|-------|-------|-------|
| `space-xs` | `8px` | Tight gaps, icon padding |
| `space-sm` | `16px` | Component internal padding |
| `space-md` | `24px` | Card padding, section gutters |
| `space-lg` | `48px` | Section internal spacing |
| `space-xl` | `96px` | Between major sections |
| `space-2xl` | `160px` | Hero breathing room |

**Container:**
- Max-width: `1440px`
- Side padding: `clamp(1rem, 5vw, 4rem)`

---

## Component Library

### Buttons

**Primary CTA — "View Collection"**

Background: transparent
Border: 1px solid var(--color-gold-zari)
Text: var(--color-gold-zari), Cinzel Decorative, 14px, uppercase, tracking-widest
Padding: 16px 40px
Border-radius: 0 (sharp corners — temple architecture)
Hover: Background fills with gold gradient, text turns charcoal,
box-shadow: 0 0 40px rgba(212,175,55,0.4)
Transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1)
Active: Scale 0.98


**Secondary Button**

Background: var(--color-royal-purple)
Text: ivory
Border-radius: 2px
Hover: Background shifts to deep magenta, subtle lift (translateY: -2px)


### Cards

**Blog Card**

Background: rgba(255, 248, 231, 0.05)
Backdrop-filter: blur(10px)
Border: 1px solid rgba(212, 175, 55, 0.2)
Border-radius: 4px
Hover: Border glow intensifies, image zooms 1.05x, title underline draws from left


**Collection Product Card**

Background: var(--color-silk-white)
Shadow: 0 20px 60px rgba(0,0,0,0.1)
3D Tilt: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))
Hover: Shadow deepens, "Quick View" badge slides up from bottom


### Navigation

**Desktop Nav**

Height: 80px
Background: transparent → blur(20px) bg-charcoal/80 on scroll
Logo: Gold zari emblem + "KANCHIPURAM" in Cinzel Decorative
Links: Ivory, 14px, uppercase, letter-spacing: 0.15em
Active: Gold underline with 2px height, draws via scaleX animation
Hover: Text color → gold, subtle y-axis lift


**Mobile Menu Overlay**

Background: var(--color-charcoal) with subtle silk texture pattern
Links: Display L size, stacked vertically, staggered reveal (0.1s delay each)
Close: X morphs from hamburger with SVG path animation


### Form Elements

**Newsletter Input**

Background: transparent
Border-bottom: 1px solid var(--color-gold-zari)
Text: ivory, Inter
Placeholder: "Enter your email" in gold-light at 50% opacity
Focus: Border-bottom animates to 2px, gold glow beneath
Submit: Arrow icon that rotates 45° on hover


---

## Page Specifications

### Home Page

#### Section 1 — Hero
- **Background**: Deep purple-to-charcoal gradient with subtle animated noise texture (opacity 0.03)
- **Left Side (Behind Model)**: 
  - "KANCHIPURAM" in Playfair Display 900, Display XL size
  - Color: gold gradient with shimmer animation (background-position shift)
  - Position: `left: 5vw`, `top: 50%`, `transform: translateY(-50%)`
  - Slight parallax on scroll: moves left at 0.3x scroll speed
  
- **Right Side (Behind Model)**:
  - Headline: "Woven with Devotion, Worn with Pride"
  - Subhead: "Handcrafted Kanchipuram silk sarees, where every thread tells a story of tradition."
  - CTA: "View Collection" (Primary button)
  - Position: `right: 8vw`, `top: 55%`, max-width: `400px`
  - Text alignment: left
  - Entrance: fade in + slide from right, delay 0.8s after page load

- **Center**: 
  - Model (Image 1, background removed) standing at `height: 85vh`, bottom-aligned
  - Drop shadow: `0 30px 60px rgba(0,0,0,0.5)` for depth separation
  - Subtle idle: gentle float animation (translateY: ±10px, 6s duration, ease-in-out)

#### Section 2 — Brand Heritage
- **Background**: Warm amber gradient transitioning from hero's purple
- **Center**: Model (Image 2, back view) at `height: 80vh`, centered
- **Carousel (In Front of Model)**:
  - Horizontal infinite scroll of brand milestone images/logos
  - Cards: `width: 300px`, `height: 200px`, rounded corners 4px
  - Motion: smooth linear scroll, speed increases on user scroll
  - Overlay: Each card has gradient overlay from bottom for text readability
  - Card labels: Year + Milestone in Cinzel Decorative, gold

#### Section 3 — The Weave
- **Background**: Deep magenta void (`#4A0011` to `#1A1A1A` radial)
- **Left-to-Right**: Saree fabric (Image 3) draped diagonally across section
  - Fabric appears to flow with subtle wave animation
  - Gold zari border catches light with shimmer effect
  
- **Center-Right**: Model (Image 4, back view, same pose)
  - Positioned to appear as if the flowing fabric is her saree pallu
  - Connection point: fabric edge meets her shoulder with soft blend

- **Text Overlay**: 
  - "The Art of Zari" — Display L, positioned top-left
  - Description: "Each saree takes 45 days to complete. Our master weavers use pure gold thread to create motifs inspired by temple architecture."
  - Position: bottom-right, max-width: 450px

#### Section 4 — Editorial / Blog Preview
- **Background**: Soft studio gradient (ivory to warm gray)
- **Center**: Model (Image 5, front view, standing straight)
  - `height: 85vh`, facing camera
  - Slight shadow beneath feet for grounding
  
- **Left Side Blog Grid**:
  - 2 cards stacked vertically
  - Each: `width: 320px`, aspect-ratio 4:3 image + title + date
  - Position: `left: 8vw`, vertically centered
  
- **Right Side Blog Grid**:
  - 2 cards stacked vertically
  - Mirror of left side
  - Position: `right: 8vw`, vertically centered
  
- **Card Design**:
  - Image with parallax zoom on scroll
  - Title: Playfair Display 700, 20px, charcoal
  - Date: Inter 400, 12px, temple-stone color
  - Hover: Card lifts (translateY: -8px), shadow expands, "Read Article" underline draws

#### Section 5 — Footer
- **Background**: Charcoal with subtle repeating temple pillar pattern (opacity 0.03)
- **Top**: Newsletter signup — large headline "Join the Heritage" left, input right
- **Middle**: 4-column grid — Brand, Shop, Support, Connect
- **Bottom**: Copyright + social icons (gold, 24px, hover: rotate 360° + scale 1.2)
- **Divider**: 1px gold line with gradient fade at edges

---

### About Page

#### Section 1 — Manifesto
- Full-bleed video background (muted weaving process)
- Centered text: "Preserving 400 Years of Craft" — Display XL, ivory with text-shadow
- Scroll: text pins for 50vh while video plays, then fades

#### Section 2 — Timeline
- Horizontal scroll section (pinned)
- Years: 1920, 1950, 1980, 2000, 2026
- Each year: large typography + archival image + 2-line description
- Progress bar: gold line at bottom filling as user scrolls

#### Section 3 — Master Weavers
- Grid: 3 portrait cards
- Each: black and white photo, name in gold, years of experience
- Hover: photo transitions to color, quote appears below

#### Section 4 — Sustainability
- Split screen: left text, right data visualization
- Stats: "100% Silk", "0% Power Loom", "45 Days Per Saree"
- Numbers animate counting up on scroll entry

---

### Collection Page

#### Section 1 — Filter Bar
- Sticky top, below nav
- Categories: All | Bridal | Festive | Casual | Contemporary
- Active: gold underline with pill background
- Filter pills with remove icon (X) when active

#### Section 2 — Product Grid
- Masonry layout, 3 columns desktop, 2 tablet, 1 mobile
- Gap: `24px`
- Each card:
  - Image: aspect-ratio 3:4, object-fit cover
  - Badge: "New" or "Best Seller" in top-right, gold pill
  - Title: Saree name in Playfair Display
  - Price: Gold zari color, Cinzel Decorative
  - Quick actions: Heart (wishlist), Eye (quick view) — appear on hover

#### Section 3 — Quick View Modal
- Overlay: `bg-charcoal/90 backdrop-blur-lg`
- Content: Left — large image with zoom on hover; Right — details, color swatches, size guide, add to cart
- Close: top-right, gold X icon
- Entrance: scale from 0.9 + fade, 0.3s ease-out

---

### Blog Page

#### Section 1 — Featured Post
- Full-width, `height: 70vh`
- Image: parallax background-attachment fixed
- Text overlay: bottom-left, gradient fade from bottom
  - Category pill: gold background, charcoal text
  - Title: Display L, ivory
  - Excerpt: Body L, ivory at 80% opacity
  - Read time + date: Caption, gold-light

#### Section 2 — Post Grid
- 3-column grid, gap `32px`
- Cards: vertical stack — image (16:10), category, title, excerpt, date
- Hover: image scales 1.05, title color → royal purple

#### Section 3 — Categories
- Horizontal scrollable pills: Weaving, Styling, Culture, Care Guide, Trends
- Active: gold border + background tint

---

## Interaction Design

### Micro-interactions
1. **Cursor**: Custom gold ring cursor that expands over clickable elements
2. **Page Load**: Silk curtain reveal — two panels slide apart to reveal content
3. **Scroll Indicator**: Subtle gold line pulsing at hero bottom, fades after first scroll
4. **Image Reveal**: Clip-path polygon animation (0% → 100%) on section entry
5. **Text Reveal**: Split by words, staggered fade-up on scroll

### Transitions
- Page transitions: fade + slight blur removal, 0.5s
- Section transitions: color morphs via CSS custom properties tied to scroll
- Hover states: `cubic-bezier(0.16, 1, 0.3, 1)` — snappy but elegant

### Loading States
- Skeleton screens using animated gradient (shimmer) in gold tones
- 3D model placeholders: wireframe spinning cube in brand purple
- Image loading: blur-up technique with low-res placeholder

---

## Responsive Behavior

### Tablet (768px–1024px)
- Hero text stacks: headline above model, description below
- Blog grid: 2 columns instead of 4
- Collection: 2 columns
- Reduced parallax intensity

### Mobile (< 768px)
- Hero: model centered, text overlay at bottom with gradient scrim
- All carousels become swipeable touch sliders
- Navigation: hamburger with full-screen overlay
- Touch targets: minimum 44px
- Typography: reduce Display XL by 40%

---

## Accessibility

- Focus rings: 2px solid gold with 2px offset
- Skip-to-content link: gold background, charcoal text, top-left on Tab
- ARIA labels for all 3D interactive elements
- `prefers-reduced-motion`: disable parallax, switch to simple fades
- Minimum contrast: 4.5:1 for body, 3:1 for large text

---

## Asset Requirements

### Images Needed (Beyond Uploaded)
- About: 3 master weaver portraits, 5 archival timeline photos
- Collection: 12–16 product shots (3:4 aspect)
- Blog: 6 featured images (16:10), 4 thumbnail images (4:3)

### Icons
- Style: Thin stroke, 1.5px, gold color
- Set: Lucide React
- Custom: Saree drape icon, Zari thread icon, Loom icon

---

## Prototype Checklist

- [ ] Design tokens documented in Figma variables
- [ ] Component library with variants (default, hover, active, disabled)
- [ ] All 5 uploaded images placed in home page wireframe with exact positioning
- [ ] Mobile breakpoint mockups (375px, 768px)
- [ ] Interaction prototype for hero scroll experience
- [ ] Style guide: typography specimens, color swatches, spacing scale
- [ ] Accessibility audit: contrast checks, focus order, alt text templates