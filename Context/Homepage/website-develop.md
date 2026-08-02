# Developer Prompt: Kanchipuram Silks — 3D E-Commerce Experience

## Project Overview
Build a high-performance, immersive 3D animated website for a luxury Indian silk saree brand. The site features 4 primary routes: **Home**, **About**, **Collection**, and **Blog**. The hero experience is a scroll-driven 3D stage where background-removed model cutouts and textile assets are layered in z-space with parallax, depth-of-field, and camera movement.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS Modules |
| 3D Engine | React Three Fiber (R3F) + Drei |
| Animation | GSAP (ScrollTrigger, Flip) + Lenis (smooth scroll) |
| State | Zustand |
| CMS | Sanity.io (for blog & collection data) |
| Image Processing | Cloudinary (background removal API) |
| Deployment | Vercel |

---

## Global Architecture

### Routing Structure
/app
├── page.tsx                 # Home (3D Experience)
├── about/page.tsx           # About (Cinematic Scroll)
├── collection/page.tsx      # Collection (WebGL Gallery)
├── blog/page.tsx            # Blog (Editorial Grid)
├── layout.tsx               # Root with Nav + Smooth Scroll
└── components/
├── navigation/
├── sections/
├── three/
└── ui/


### Performance Budget
- First Contentful Paint: < 1.2s
- Time to Interactive: < 2.5s
- Lighthouse Performance: > 90
- Total Blocking Time: < 200ms

### Critical Optimizations
1. **Lazy-load R3F canvas** — only initialize WebGL after user interaction or when hero enters viewport
2. **Texture compression** — use KTX2/WebP for all textile images
3. **Instanced rendering** for repeated motifs/particles
4. **Offscreen canvas** for background image processing where possible
5. **Preload critical assets** — hero model cutout + first saree texture

---

## Navigation Component

### Structure
- Fixed top bar, `z-index: 50`, glassmorphism on scroll (`backdrop-blur-md bg-white/10`)
- 4 links: **Home** | **About** | **Collection** | **Blog**
- Mobile: hamburger morphs to close icon, full-screen overlay menu with staggered link reveal

### Behavior
- Active route underline uses GSAP Flip for smooth morphing
- On scroll down: nav hides (`translateY(-100%)`); on scroll up: reveals
- Hover state: text splits into characters with staggered y-axis wave animation

---

## Home Page: 3D Stage Specification

### Section 1 — Hero (Image 1: Purple Saree Front View)

**Layout (Z-Space Depth Map):**

z: -200px  →  [Big Brand Text "KANCHIPURAM"] — left aligned
z: -100px  →  [Description Block + CTA] — right aligned
z:    0px  →  [Model Cutout — Image 1] — center
z:  -50px  →  [Ambient floating gold zari particles]
z: -300px  →  [Temple background — subtle, desaturated]


**Implementation:**
- Model cutout rendered as `<Plane>` with alphaMap texture in R3F
- Text uses Drei `<Text3D>` with custom font geometry (Playfair Display extruded)
- Description block is HTML overlay via `<Html>` portal, positioned in 3D space
- CTA Button: "View Collection" — magnetic hover effect using custom shader on rounded rectangle

**Animation Sequence (on load):**
1. Camera starts at `z: 500` looking at origin
2. Text letters fly in from `x: -500` with `ease: power3.out`, stagger: 0.05s
3. Model fades in + scales from `0.9 → 1.0` with `ease: expo.out`
4. Description block slides from `x: 200, opacity: 0`
5. Gold particles emit from behind model and disperse

**Scroll Behavior:**
- Scroll down: camera pushes forward (`z: 500 → 0`), text parallax moves left (`x: -200`), model subtly rotates (`y: 0 → 0.3` radians)

---

### Section 2 — Brand Heritage (Image 2: Purple Saree Back View)

**Layout (Z-Space):**

z: -150px  →  [Horizontal infinite carousel of brand logos/moments]
z:    0px  →  [Model Cutout — Image 2, back view, center]
z:  -80px  →  [Floating silk texture overlays]
z: -250px  →  [Warm amber gradient environment]


**Implementation:**
- Carousel built as cylindrical geometry in R3F — cards mapped to inner curve
- Auto-rotation: 0.5 rpm
- On scroll: carousel accelerates based on scroll velocity
- Model cutout: same technique as hero, but with back-facing normal map for fabric detail

**Scroll Animation:**
- Section pins for 100vh
- Carousel rotates 360° during pin
- Model has subtle breathing animation (scale oscillation: `1.0 → 1.02`)
- Background color transitions from temple stone to warm amber

---

### Section 3 — The Weave (Image 3: Pink Saree Fabric + Image 4: Pink Saree Back View)

**Layout (Z-Space):**

z: -100px  →  [Image 3 — Saree fabric, draped and flowing, left-to-right diagonal]
z:    0px  →  [Image 4 — Model back view, same pose, center-right]
z:  -50px  →  [Gold zari thread lines connecting fabric to model]
z: -200px  →  [Deep magenta void with subtle noise texture]


**Implementation:**
- Image 3 (fabric) rendered as curved `<Plane>` with vertex shader displacement — simulates silk flow using sine waves based on time uniform
- Image 4 (model) positioned to appear as if wearing the flowing fabric
- Connecting threads: `<Line>` instances with animated dash-offset
- Interactive: mouse movement creates wind force affecting fabric vertex displacement

**Scroll Animation:**
- Fabric unwraps from folded state (vertex morph) to flowing state
- Model rotates from `y: -0.5 → 0` to face viewer
- Gold threads draw-on effect (progress 0 → 1 tied to scroll)

---

### Section 4 — Editorial (Image 5: Pink Saree Front View)

**Layout (Z-Space):**

z:    0px  →  [Model Cutout — Image 5, standing straight, center]
z: -120px  →  [Blog grid — 2x2 cards, left & right of model]
z:  -60px  →  [Floating blog category tags orbiting model]
z: -180px  →  [Soft studio gradient]


**Implementation:**
- Model centered, facing camera directly
- Blog grid: 4 cards arranged in 2x2, positioned in 3D space flanking model
- Cards use `<RoundedBox>` with glass material (`MeshTransmissionMaterial` from Drei)
- Each card displays: blog thumbnail, title, date, "Read" arrow

**Animation:**
- Model: gentle sway (idle animation)
- Cards: float with independent sine-wave y-offsets (phase-shifted)
- On hover: hovered card moves to `z: 50` (in front of model), scales 1.1, others blur

**Scroll Behavior:**
- Cards cascade in from sides (left cards from `x: -300`, right from `x: 300`)
- Model fades from `opacity: 0.5 → 1.0`

---

### Section 5 — Footer

**Layout:**
- Transition from 3D canvas to standard DOM footer
- Newsletter signup with 3D textile input field (fabric texture on focus)
- Links: Home, About, Collection, Blog, Contact, Privacy
- Social icons: 3D gold coin style with rotation on hover

---

## About Page

### Design Direction: Cinematic Scroll Documentary
- Full-bleed video background (muted, autoplay) of weaving process
- Scroll-driven text reveals with SplitText
- Timeline component: brand history from 1920 → 2026
- Image comparison slider: traditional loom vs. modern design studio
- Team section: 3D card flip on hover

### Sections
1. **Manifesto** — Large typography over video
2. **Heritage Timeline** — Horizontal scroll section with pinned dates
3. **Craftsmanship** — Interactive hotspots on loom imagery
4. **Sustainability** — Data visualization (charts) with textile-themed styling

---

## Collection Page

### Design Direction: WebGL Product Gallery
- Filter sidebar (collapsible): Color, Fabric, Occasion, Price
- Product grid: masonry layout
- Each product card: 3D tilt on hover, quick-view modal with R3F fabric simulation
- Wishlist heart: particle burst on click
- Sticky "Viewing [X] of [Y] sarees" indicator

### Features
- **Color Filter**: clicking a color swatch updates ambient light in the 3D scene to match
- **Fabric Preview**: on card hover, a 3D fabric swatch rotates showing texture
- **Quick View**: modal with model wearing selected saree (similar to home page technique)

---

## Blog Page

### Design Direction: Editorial Magazine
- Hero: featured post (full-width, parallax image)
- Grid: 3-column on desktop, 1 on mobile
- Category pills with active state underline animation
- Post card: image with hover zoom, title, excerpt, read time
- Infinite scroll with skeleton loading states

### Features
- **Reading Progress**: thin gold line at top of page
- **Share**: hover reveals Twitter/X, Pinterest, WhatsApp icons with stagger
- **Related Posts**: "You may also like" section at bottom with 3D carousel

---

## Asset Pipeline

### Image Processing Requirements
All 5 uploaded images must be processed:

| File | Processing | Output |
|------|-----------|--------|
| `download.jpg` (Image 1) | Background removal, edge feather 2px, PNG | Hero model |
| `download_two.png` (Image 2) | Background removal, edge feather 2px, PNG | Heritage model |
| `download_three.jpg` (Image 3) | Isolate fabric, preserve folds, PNG | Weave fabric |
| `download_four.png` (Image 4) | Background removal, edge feather 2px, PNG | Weave model |
| `download_five.png` (Image 5) | Background removal, edge feather 2px, PNG | Blog model |

### 3D Assets
- Generate normal maps from saree textures for fabric realism
- Create HDR environment map for gold jewelry reflections
- Particle sprites: gold dust, silk fiber strands

---

## Responsive Breakpoints

| Breakpoint | Behavior |
|-----------|----------|
| `> 1440px` | Full 3D experience, all parallax layers active |
| `1024–1440px` | Reduced particle count, simplified fabric shader |
| `768–1024px` | 3D canvas → CSS 3D transforms (performance mode) |
| `< 768px` | Static layered composition with scroll-triggered CSS animations |

---

## Accessibility

- `prefers-reduced-motion`: disable parallax, switch to fade transitions
- All 3D text has `aria-label` with plain text equivalent
- Focus trapping in modals
- Color contrast ratio: minimum 4.5:1 for all text
- Keyboard navigation: arrow keys control carousel, Enter activates 3D cards

---

## Dependencies

take a reference in this package here the exact location /my-app/package.json i add 3d animation package [three js]

Build Checklist
[ ] Set up Next.js with App Router
[ ] Configure Tailwind + custom color tokens (gold, purple, magenta)
[ ] Implement Lenis smooth scroll
[ ] Build Navigation with GSAP Flip active state
[ ] Create R3F canvas with performance monitoring (R3F-perf)
[ ] Implement Hero section with 3D text + model
[ ] Build Brand Heritage carousel section
[ ] Build Weave section with fabric vertex shader
[ ] Build Editorial section with blog grid
[ ] Build About, Collection, Blog pages
[ ] Responsive testing + reduced motion support
[ ] Lighthouse optimization
[ ] Vercel deployment