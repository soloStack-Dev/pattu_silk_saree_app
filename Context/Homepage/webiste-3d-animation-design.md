# 3D Animation Prompt: Kanchipuram Silks — Home Page Cinematic Stage

## Overview

Transform the Home page into a scroll-driven 3D cinematic experience using React Three Fiber. The scene is a continuous 3D stage where the camera moves through five distinct depth-composed sections. Each uploaded image is precisely positioned in 3D space with background-removed model cutouts, textile planes, and environmental storytelling.

**Core Concept**: The user scrolls *through* a temple corridor where silk, gold, and heritage float in dimensional space.

---

## Scene Setup

### Canvas Configuration
```javascript
&lt;Canvas
  camera={{ position: [0, 0, 500], fov: 45, near: 1, far: 2000 }}
  gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
  dpr={[1, 2]} // Responsive pixel ratio
&gt;
  &lt;fog attach="fog" args={['#1A1A1A', 200, 900]} /&gt;
  &lt;ambientLight intensity={0.4} color="#FFF8E7" /&gt;
  &lt;directionalLight position={[10, 10, 5]} intensity={1.2} color="#F4E4BC" /&gt;
  &lt;pointLight position={[-10, 0, 10]} intensity={0.8} color="#D4AF37" /&gt;
&lt;/Canvas&gt;

Global Scroll Rig
Use @react-three/drei's <ScrollControls> with pages: 5 (one per section)
Damping: 0.1 for smooth inertia
Scroll progress drives camera z-position: cameraZ = 500 - (scroll.offset * 1000)
Section 1: Hero — "The Arrival"
3D Composition (Camera at Z: 500 → 400)
Layer 1: Temple Background (Z: -300)
Asset: Procedural stone texture or HDR temple environment
Geometry: Large curved plane creating a cylindrical room feel
Material: MeshStandardMaterial, roughness: 0.9, color: #5D4037
Animation: Subtle UV scroll (0.01 units/frame) suggesting ancient dust motes
Layer 2: Brand Typography (Z: -200, X: -150)
Text: "KANCHIPURAM" — extruded 3D geometry
Font: Playfair Display Bold converted to JSON for Text3D
Material: MeshPhysicalMaterial with gold properties:
color: #D4AF37
metalness: 1.0
roughness: 0.2
clearcoat: 1.0
clearcoatRoughness: 0.1
Size: height: 2, size: 15
Position: [-80, 10, -200], rotated slightly [-0.1, 0.2, 0] for perspective
Animation:
Load: Letters fly in from x: -300 with stagger 0.05s per character
Scroll: Parallax at 0.3x scroll speed, drifts left as camera moves forward
Layer 3: Description Block (Z: -100, X: +120)
Content:
Headline: "Woven with Devotion"
Body: "Handcrafted silk sarees where every thread carries 400 years of tradition."
CTA: "View Collection" button
Implementation: <Html> portal positioned at [80, -10, -100]
Container: width: 380px, pointer-events: auto
Style: Ivory text, left-aligned, CTA uses CSS 3D transform on hover
Animation:
Load: Slides from x: 200, opacity: 0, delay 1.0s
Scroll: Parallax at 0.5x, slight rotation y: 0.1 as camera passes
Layer 4: Hero Model — Image 1 (Z: 0, Center)
Asset: download.jpg — woman in purple saree, front view, BACKGROUND REMOVED
Geometry: <Plane args={[50, 80]}> — aspect ratio preserved
Material: MeshBasicMaterial with alphaMap + transparent: true
Position: [0, -20, 0] — bottom-aligned to appear standing on ground plane
Scale: 1.0 (base unit)
Shadow:
Fake shadow plane beneath feet: circular gradient texture, opacity 0.3, y: -40
Softens the "cutout" look
Animation — Idle:

// Gentle breathing/sway
useFrame((state) => {
  mesh.position.y = -20 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  mesh.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
});

Animation — Scroll:
As camera moves from Z:500 → 400, model rotates y: 0 → 0.3 (turns to acknowledge viewer)
Scale pulses subtly: 1.0 → 1.02 tied to scroll velocity
Layer 5: Gold Zari Particles (Z: -50 to +50)
System: Points with 500 particles
Geometry: BufferGeometry with random positions in sphere around model
Texture: Gold dust sprite (soft circle gradient)
Animation:
Emit from behind model (z: -20) on load
Float upward with noise-based drift
Respond to scroll: velocity increases, particles stream backward like wind
Material: PointsMaterial, color: #D4AF37, size: 0.5, transparent: true, blending: AdditiveBlending
Layer 6: Ground Plane (Z: -10, Y: -40)
Geometry: <Plane args={[500, 500]}>
Material: MeshStandardMaterial, color: #2A1810, roughness: 0.8
Reflection: Subtle environment reflection of model
Section 2: Heritage — "The Legacy"
3D Composition (Camera at Z: 400 → 300)
Transition
Background color morphs from purple to warm amber via scroll
Fog color transitions: #1A1A1A → #3E2723
Layer 1: Infinite Brand Carousel (Z: -150, wrapping around camera)
Geometry: Cylinder with radius 120, height 60, open-ended
Material: 12 planes mapped to inner surface, each 300x200 texture
Content: Brand milestones, awards, loom photos, zari closeups
Animation:
Constant rotation: 0.005 rad/frame
Scroll-accelerated: rotation.y += scroll.delta * 2
Position: Cylinder center at [0, 0, -150], camera inside looking at model
Layer 2: Heritage Model — Image 2 (Z: 0, Center)
Asset: download_two.png — woman in purple saree, BACK VIEW, BACKGROUND REMOVED
Geometry: <Plane args={[50, 80]>
Position: [0, -20, 0]
Rotation: y: Math.PI (facing away from camera)
Material: Same alpha-cutout technique as Hero
Animation — Scroll:
Section pins: camera orbits 30° around model (theta: 0 → 0.5)
Model has breathing animation: scale oscillates 1.0 ↔ 1.015 over 4s
Hair/saree edge subtle wind effect via vertex shader displacement
Layer 3: Floating Silk Overlays (Z: -80)
Geometry: 3 translucent planes with silk texture
Material: MeshPhysicalMaterial, transmission: 0.6, roughness: 0.2, color: #4A148C
Animation: Float and rotate slowly, like fabric caught in temple breeze
Position: Scattered at [-40, 20, -80], [30, -10, -90], [0, 40, -85]
Section 3: The Weave — "The Fabric Lives"
3D Composition (Camera at Z: 300 → 200)
Transition
Environment shifts to deep magenta void
Fog: #4A0011 → #1A0010
Point lights intensify to simulate spotlight on fabric
Layer 1: Flowing Saree Fabric — Image 3 (Z: -100, Diagonal)
Asset: download_three.jpg — pink saree fabric with gold border, BACKGROUND ISOLATED
Geometry: <Plane args={[120, 40], 64, 64> — high segmentation for vertex animation
Position: [-30, 10, -100], rotation: [0, 0.3, 0.2] — diagonal drape
Material: MeshStandardMaterial with fabric texture
Vertex Shader Animation (Silk Flow):

uniform float uTime;
uniform float uScrollVelocity;

void main() {
  vec3 pos = position;
  // Wave along the length
  float wave = sin(pos.x * 0.1 + uTime * 2.0) * 2.0;
  // Scroll adds wind force
  wave += sin(pos.y * 0.2 - uTime * 3.0) * uScrollVelocity * 3.0;
  pos.z += wave;
  // Ripple at edges
  pos.z += sin(pos.x * 0.5 + uTime) * 0.5 * (1.0 - abs(uv.y - 0.5) * 2.0);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}

Layer 2: Weave Model — Image 4 (Z: 0, Center-Right)
Asset: download_four.png — woman in pink saree, BACK VIEW, SAREE FLOWING, BACKGROUND REMOVED
Geometry: <Plane args={[55, 85]>
Position: [25, -20, 0] — shifted right to align with fabric flow
Rotation: y: -0.2 — slightly turned toward fabric
CRITICAL POSE ALIGNMENT:
The fabric's top-left corner (Image 3) must visually connect to her right shoulder
Use a connecting thread line (bezier curve) from fabric edge to shoulder point
Thread material: Line with LineBasicMaterial, color #D4AF37, linewidth: 2
Animation — Scroll:
Fabric "unfolds" from folded state (vertex morph target 0 → 1)
Model rotates y: -0.5 → 0 (turns to show profile)
Gold threads draw-on: dashOffset animates from 1.0 → 0.0
Layer 3: Gold Thread Lines (Z: -50)
Geometry: 20 instanced bezier curves connecting fabric to model
Material: LineBasicMaterial, color: #D4AF37
Animation:
On section entry: lines draw from fabric toward model
Pulse effect: opacity oscillates 0.6 → 1.0 like living thread
Layer 4: Text Overlay (HTML Portal)
Position: [-60, 30, -80] (left side, in front of fabric)
Content:
"The Art of Zari" — Playfair Display, gold, clamp(2rem, 4vw, 4rem)
"45 days. 2 master weavers. 1 timeless creation." — Inter, ivory
Animation: Characters reveal with stagger on scroll entry
Section 4: Editorial — "Stories in Silk"
3D Composition (Camera at Z: 200 → 100)
Transition
Background lightens to soft studio: #FAF9F6 → #E8E4E1
Fog dissipates to near: 500 (essentially clear)
Layer 1: Editorial Model — Image 5 (Z: 0, Center)
Asset: download_five.png — woman in pink saree, FRONT VIEW, STANDING STRAIGHT, BACKGROUND REMOVED
Geometry: <Plane args={[50, 85]>
Position: [0, -20, 0]
Rotation: y: 0 — facing camera directly, confident stance
Material: Alpha cutout
Animation — Idle:
Subtle sway: rotation.z: Math.sin(time) * 0.01 (weight shift)
Gentle bob: position.y: -20 + Math.sin(time * 0.7) * 0.3
Layer 2: Blog Card Grid (Z: -120, Flanking Model)
Left Side Cards (2 stacked):
Card 1 position: [-50, 15, -120]
Card 2 position: [-50, -25, -120]
Right Side Cards (2 stacked):
Card 1 position: [50, 15, -120]
Card 2 position: [50, -25, -120]
Card Geometry: <RoundedBox args={[35, 25, 2]} radius={1}>
Card Material: MeshTransmissionMaterial from Drei:
backside: true
samples: 16
resolution: 512
transmission: 0.95
roughness: 0.2
ior: 1.5
thickness: 2
color: #FFF8E7
Card Content: HTML overlay inside each card:
Blog thumbnail image (16:10)
Title: "The History of Kanchipuram Weaving"
Date: "Aug 2, 2026"
Arrow icon bottom-right
Animation — Scroll:
Left cards enter from x: -150, right from x: 150
Stagger: 0.1s between cards
Float: each card has independent y oscillation (phase offset by index)
On hover: hovered card moves to z: 20 (in front of model), others blur: 2px
Layer 3: Orbiting Category Tags (Z: -60)
Geometry: Small text planes arranged in elliptical orbit around model
Tags: "Weaving", "Styling", "Culture", "Care"
Material: Text from Drei, gold color, Cinzel Decorative
Animation: Orbit y axis at 0.002 rad/frame, tags always face camera (lookAt)
Section 5: Footer — "The Threshold"
3D Composition (Camera at Z: 100 → 0)
Transition
Camera exits 3D canvas, hands control back to DOM
3D elements fade out (globalOpacity: 1 → 0 last 50vh)
DOM footer fades in with y: 50 → 0
3D Exit Animation
Model (Image 5): scales down 1.0 → 0.8, opacity 1 → 0, drifts backward z: 0 → -50
Blog cards: disperse outward (left cards to x: -200, right to x: 200)
Gold particles: accelerate upward and fade
Global Animation Choreography
Camera Path
The camera does not move straight down Z. It has subtle drift:

useFrame((state) => {
  const scroll = scrollControls.offset;
  camera.position.x = Math.sin(scroll * Math.PI * 2) * 10; // Slight S-curve
  camera.position.y = Math.cos(scroll * Math.PI) * 5; // Gentle bob
  camera.position.z = 500 - (scroll * 500);
  camera.lookAt(0, -10, 0);
});

Scroll Velocity Effects
Fast scroll: all elements tilt backward (rotation.x: velocity * 0.1)
Fast scroll: particles streak
Fast scroll: motion blur post-processing intensifies
Post-Processing Stack
Bloom: threshold 0.8, strength 0.6, radius 0.5 — for gold glow
Depth of Field: focusDistance tied to camera z, focalLength 0.05, bokehScale 3
Noise: film grain, intensity 0.15 — vintage texture
Vignette: darkness 0.6, offset 0.5 — draws eye to center
Asset Specifications for 3D
Image Processing Requirements
Table
Image	File	Background Removal	Output Spec	3D Usage
Hero Model	download.jpg	REQUIRED — clean edge, preserve jewelry detail	PNG, 2048px height, alpha channel	Hero plane texture
Heritage Model	download_two.png	REQUIRED — back view, preserve hair/saree edge	PNG, 2048px height, alpha channel	Heritage plane texture
Fabric	download_three.jpg	Isolate fabric only, remove any background/stand	PNG, preserve fold details	Vertex-displaced plane
Weave Model	download_four.png	REQUIRED — flowing saree, preserve motion in fabric	PNG, 2048px height, alpha channel	Weave section plane
Editorial Model	download_five.png	REQUIRED — straight stance, clean feet for grounding	PNG, 2048px height, alpha channel	Editorial plane texture
Normal Map Generation
Generate normal maps from saree fabric images for realistic light interaction
Use AI normal map generator or Photoshop 3D filter
Apply to fabric planes for micro-detail
Environment Map
HDRi: warm studio or temple interior
Used for gold jewelry reflections on text and particles
Blur level: 0.5 for soft reflections
Performance Optimization for 3D
LOD System:
Distance > 300: use 512px textures
Distance < 100: use 2048px textures
Frustum Culling:
Disable rendering for objects behind camera
Disable particles when not in viewport
Texture Atlasing:
Combine UI elements into single sprite sheet
Combine blog thumbnails into texture atlas
Shader Complexity:
Fabric vertex shader only active when section is visible
Use useFrame conditional execution
Garbage Collection:
Dispose geometries/materials when sections exit viewport
Use useMemo for all static geometries
Interaction Map

| User Action     | 3D Response                                               |
| --------------- | --------------------------------------------------------- |
| Scroll Down     | Camera moves forward, parallax layers shift, fabric waves |
| Scroll Fast     | Motion blur, elements tilt back, particles streak         |
| Hover Hero CTA  | Button glows, nearby gold particles attract to cursor     |
| Hover Blog Card | Card lifts to z:20, others blur, model pauses sway        |
| Mouse Move      | Subtle camera parallax (±5px), fabric wind force          |
| Touch Drag      | Same as scroll, with velocity-based momentum              |
| Page Load       | Curtain reveal, then sequential element entrance          |


| Image           | File                 | Background Removal                                       | Output Spec                       | 3D Usage                |
| --------------- | -------------------- | -------------------------------------------------------- | --------------------------------- | ----------------------- |
| Hero Model      | `download.jpg`       | **REQUIRED** — clean edge, preserve jewelry detail       | PNG, 2048px height, alpha channel | Hero plane texture      |
| Heritage Model  | `download_two.png`   | **REQUIRED** — back view, preserve hair/saree edge       | PNG, 2048px height, alpha channel | Heritage plane texture  |
| Fabric          | `download_three.jpg` | Isolate fabric only, remove any background/stand         | PNG, preserve fold details        | Vertex-displaced plane  |
| Weave Model     | `download_four.png`  | **REQUIRED** — flowing saree, preserve motion in fabric  | PNG, 2048px height, alpha channel | Weave section plane     |
| Editorial Model | `download_five.png`  | **REQUIRED** — straight stance, clean feet for grounding | PNG, 2048px height, alpha channel | Editorial plane texture |


Animation Timing Reference

| Section   | Scroll Range | Camera Z  | Key Animation                            |
| --------- | ------------ | --------- | ---------------------------------------- |
| Hero      | 0% – 20%     | 500 → 400 | Text fly-in, model fade, particle emit   |
| Heritage  | 20% – 40%    | 400 → 300 | Carousel spin, camera orbit, color shift |
| Weave     | 40% – 60%    | 300 → 200 | Fabric unfold, thread draw, model turn   |
| Editorial | 60% – 80%    | 200 → 100 | Cards cascade, tags orbit, model sway    |
| Footer    | 80% – 100%   | 100 → 0   | 3D fade-out, DOM handover                |


Design Responsive UI with 3D Animations Color Palette and Performance Optimizations
I'll generate three comprehensive markdown documents tailored to each role. Since these are text-based outputs, I'll present them directly in the response.
File 1: developer_prompt.md
Markdown
Copy
Code
Preview
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
plain

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
plain

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
plain

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
plain

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
plain

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

```json
{
  "dependencies": {
    "next": "^14.0.0",
    "react": "^18.2.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.92.0",
    "gsap": "^3.12.0",
    "lenis": "^1.0.0",
    "zustand": "^4.4.0",
    "tailwindcss": "^3.4.0"
  }
}
Build Checklist
[ ] Set up Next.js with App Router
[ ] Configure Tailwind + custom color tokens (gold, purple, magenta)
[ ] Implement Lenis smooth scroll
[ ] Build Navigation with GSAP Flip active state
[ ] Process all 5 images (background removal)
[ ] Create R3F canvas with performance monitoring (R3F-perf)
[ ] Implement Hero section with 3D text + model
[ ] Build Brand Heritage carousel section
[ ] Build Weave section with fabric vertex shader
[ ] Build Editorial section with blog grid
[ ] Build About, Collection, Blog pages
[ ] Responsive testing + reduced motion support
[ ] Lighthouse optimization
[ ] Vercel deployment
plain

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
plain

**Secondary Button**
Background: var(--color-royal-purple)
Text: ivory
Border-radius: 2px
Hover: Background shifts to deep magenta, subtle lift (translateY: -2px)
plain

### Cards

**Blog Card**
Background: rgba(255, 248, 231, 0.05)
Backdrop-filter: blur(10px)
Border: 1px solid rgba(212, 175, 55, 0.2)
Border-radius: 4px
Hover: Border glow intensifies, image zooms 1.05x, title underline draws from left
plain

**Collection Product Card**
Background: var(--color-silk-white)
Shadow: 0 20px 60px rgba(0,0,0,0.1)
3D Tilt: perspective(1000px) rotateX(var(--rx)) rotateY(var(--ry))
Hover: Shadow deepens, "Quick View" badge slides up from bottom
plain

### Navigation

**Desktop Nav**
Height: 80px
Background: transparent → blur(20px) bg-charcoal/80 on scroll
Logo: Gold zari emblem + "KANCHIPURAM" in Cinzel Decorative
Links: Ivory, 14px, uppercase, letter-spacing: 0.15em
Active: Gold underline with 2px height, draws via scaleX animation
Hover: Text color → gold, subtle y-axis lift
plain

**Mobile Menu Overlay**
Background: var(--color-charcoal) with subtle silk texture pattern
Links: Display L size, stacked vertically, staggered reveal (0.1s delay each)
Close: X morphs from hamburger with SVG path animation
plain

### Form Elements

**Newsletter Input**
Background: transparent
Border-bottom: 1px solid var(--color-gold-zari)
Text: ivory, Inter
Placeholder: "Enter your email" in gold-light at 50% opacity
Focus: Border-bottom animates to 2px, gold glow beneath
Submit: Arrow icon that rotates 45° on hover
plain

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
File 3: animation_3d_prompt.md
Markdown
Copy
Code
Preview
# 3D Animation Prompt: Kanchipuram Silks — Home Page Cinematic Stage

## Overview

Transform the Home page into a scroll-driven 3D cinematic experience using React Three Fiber. The scene is a continuous 3D stage where the camera moves through five distinct depth-composed sections. Each uploaded image is precisely positioned in 3D space with background-removed model cutouts, textile planes, and environmental storytelling.

**Core Concept**: The user scrolls *through* a temple corridor where silk, gold, and heritage float in dimensional space.

---

## Scene Setup

### Canvas Configuration
```javascript
<Canvas
  camera={{ position: [0, 0, 500], fov: 45, near: 1, far: 2000 }}
  gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
  dpr={[1, 2]} // Responsive pixel ratio
>
  <fog attach="fog" args={['#1A1A1A', 200, 900]} />
  <ambientLight intensity={0.4} color="#FFF8E7" />
  <directionalLight position={[10, 10, 5]} intensity={1.2} color="#F4E4BC" />
  <pointLight position={[-10, 0, 10]} intensity={0.8} color="#D4AF37" />
</Canvas>
Global Scroll Rig
Use @react-three/drei's <ScrollControls> with pages: 5 (one per section)
Damping: 0.1 for smooth inertia
Scroll progress drives camera z-position: cameraZ = 500 - (scroll.offset * 1000)
Section 1: Hero — "The Arrival"
3D Composition (Camera at Z: 500 → 400)
Layer 1: Temple Background (Z: -300)
Asset: Procedural stone texture or HDR temple environment
Geometry: Large curved plane creating a cylindrical room feel
Material: MeshStandardMaterial, roughness: 0.9, color: #5D4037
Animation: Subtle UV scroll (0.01 units/frame) suggesting ancient dust motes
Layer 2: Brand Typography (Z: -200, X: -150)
Text: "KANCHIPURAM" — extruded 3D geometry
Font: Playfair Display Bold converted to JSON for Text3D
Material: MeshPhysicalMaterial with gold properties:
color: #D4AF37
metalness: 1.0
roughness: 0.2
clearcoat: 1.0
clearcoatRoughness: 0.1
Size: height: 2, size: 15
Position: [-80, 10, -200], rotated slightly [-0.1, 0.2, 0] for perspective
Animation:
Load: Letters fly in from x: -300 with stagger 0.05s per character
Scroll: Parallax at 0.3x scroll speed, drifts left as camera moves forward
Layer 3: Description Block (Z: -100, X: +120)
Content:
Headline: "Woven with Devotion"
Body: "Handcrafted silk sarees where every thread carries 400 years of tradition."
CTA: "View Collection" button
Implementation: <Html> portal positioned at [80, -10, -100]
Container: width: 380px, pointer-events: auto
Style: Ivory text, left-aligned, CTA uses CSS 3D transform on hover
Animation:
Load: Slides from x: 200, opacity: 0, delay 1.0s
Scroll: Parallax at 0.5x, slight rotation y: 0.1 as camera passes
Layer 4: Hero Model — Image 1 (Z: 0, Center)
Asset: download.jpg — woman in purple saree, front view, BACKGROUND REMOVED
Geometry: <Plane args={[50, 80]}> — aspect ratio preserved
Material: MeshBasicMaterial with alphaMap + transparent: true
Position: [0, -20, 0] — bottom-aligned to appear standing on ground plane
Scale: 1.0 (base unit)
Shadow:
Fake shadow plane beneath feet: circular gradient texture, opacity 0.3, y: -40
Softens the "cutout" look
Animation — Idle:
JavaScript
// Gentle breathing/sway
useFrame((state) => {
  mesh.position.y = -20 + Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
  mesh.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.02;
});
Animation — Scroll:
As camera moves from Z:500 → 400, model rotates y: 0 → 0.3 (turns to acknowledge viewer)
Scale pulses subtly: 1.0 → 1.02 tied to scroll velocity
Layer 5: Gold Zari Particles (Z: -50 to +50)
System: Points with 500 particles
Geometry: BufferGeometry with random positions in sphere around model
Texture: Gold dust sprite (soft circle gradient)
Animation:
Emit from behind model (z: -20) on load
Float upward with noise-based drift
Respond to scroll: velocity increases, particles stream backward like wind
Material: PointsMaterial, color: #D4AF37, size: 0.5, transparent: true, blending: AdditiveBlending
Layer 6: Ground Plane (Z: -10, Y: -40)
Geometry: <Plane args={[500, 500]}>
Material: MeshStandardMaterial, color: #2A1810, roughness: 0.8
Reflection: Subtle environment reflection of model
Section 2: Heritage — "The Legacy"
3D Composition (Camera at Z: 400 → 300)
Transition
Background color morphs from purple to warm amber via scroll
Fog color transitions: #1A1A1A → #3E2723
Layer 1: Infinite Brand Carousel (Z: -150, wrapping around camera)
Geometry: Cylinder with radius 120, height 60, open-ended
Material: 12 planes mapped to inner surface, each 300x200 texture
Content: Brand milestones, awards, loom photos, zari closeups
Animation:
Constant rotation: 0.005 rad/frame
Scroll-accelerated: rotation.y += scroll.delta * 2
Position: Cylinder center at [0, 0, -150], camera inside looking at model
Layer 2: Heritage Model — Image 2 (Z: 0, Center)
Asset: download_two.png — woman in purple saree, BACK VIEW, BACKGROUND REMOVED
Geometry: <Plane args={[50, 80]>
Position: [0, -20, 0]
Rotation: y: Math.PI (facing away from camera)
Material: Same alpha-cutout technique as Hero
Animation — Scroll:
Section pins: camera orbits 30° around model (theta: 0 → 0.5)
Model has breathing animation: scale oscillates 1.0 ↔ 1.015 over 4s
Hair/saree edge subtle wind effect via vertex shader displacement
Layer 3: Floating Silk Overlays (Z: -80)
Geometry: 3 translucent planes with silk texture
Material: MeshPhysicalMaterial, transmission: 0.6, roughness: 0.2, color: #4A148C
Animation: Float and rotate slowly, like fabric caught in temple breeze
Position: Scattered at [-40, 20, -80], [30, -10, -90], [0, 40, -85]
Section 3: The Weave — "The Fabric Lives"
3D Composition (Camera at Z: 300 → 200)
Transition
Environment shifts to deep magenta void
Fog: #4A0011 → #1A0010
Point lights intensify to simulate spotlight on fabric
Layer 1: Flowing Saree Fabric — Image 3 (Z: -100, Diagonal)
Asset: download_three.jpg — pink saree fabric with gold border, BACKGROUND ISOLATED
Geometry: <Plane args={[120, 40], 64, 64> — high segmentation for vertex animation
Position: [-30, 10, -100], rotation: [0, 0.3, 0.2] — diagonal drape
Material: MeshStandardMaterial with fabric texture
Vertex Shader Animation (Silk Flow):
glsl
uniform float uTime;
uniform float uScrollVelocity;

void main() {
  vec3 pos = position;
  // Wave along the length
  float wave = sin(pos.x * 0.1 + uTime * 2.0) * 2.0;
  // Scroll adds wind force
  wave += sin(pos.y * 0.2 - uTime * 3.0) * uScrollVelocity * 3.0;
  pos.z += wave;
  // Ripple at edges
  pos.z += sin(pos.x * 0.5 + uTime) * 0.5 * (1.0 - abs(uv.y - 0.5) * 2.0);
  
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
Layer 2: Weave Model — Image 4 (Z: 0, Center-Right)
Asset: download_four.png — woman in pink saree, BACK VIEW, SAREE FLOWING, BACKGROUND REMOVED
Geometry: <Plane args={[55, 85]>
Position: [25, -20, 0] — shifted right to align with fabric flow
Rotation: y: -0.2 — slightly turned toward fabric
CRITICAL POSE ALIGNMENT:
The fabric's top-left corner (Image 3) must visually connect to her right shoulder
Use a connecting thread line (bezier curve) from fabric edge to shoulder point
Thread material: Line with LineBasicMaterial, color #D4AF37, linewidth: 2
Animation — Scroll:
Fabric "unfolds" from folded state (vertex morph target 0 → 1)
Model rotates y: -0.5 → 0 (turns to show profile)
Gold threads draw-on: dashOffset animates from 1.0 → 0.0
Layer 3: Gold Thread Lines (Z: -50)
Geometry: 20 instanced bezier curves connecting fabric to model
Material: LineBasicMaterial, color: #D4AF37
Animation:
On section entry: lines draw from fabric toward model
Pulse effect: opacity oscillates 0.6 → 1.0 like living thread
Layer 4: Text Overlay (HTML Portal)
Position: [-60, 30, -80] (left side, in front of fabric)
Content:
"The Art of Zari" — Playfair Display, gold, clamp(2rem, 4vw, 4rem)
"45 days. 2 master weavers. 1 timeless creation." — Inter, ivory
Animation: Characters reveal with stagger on scroll entry
Section 4: Editorial — "Stories in Silk"
3D Composition (Camera at Z: 200 → 100)
Transition
Background lightens to soft studio: #FAF9F6 → #E8E4E1
Fog dissipates to near: 500 (essentially clear)
Layer 1: Editorial Model — Image 5 (Z: 0, Center)
Asset: download_five.png — woman in pink saree, FRONT VIEW, STANDING STRAIGHT, BACKGROUND REMOVED
Geometry: <Plane args={[50, 85]>
Position: [0, -20, 0]
Rotation: y: 0 — facing camera directly, confident stance
Material: Alpha cutout
Animation — Idle:
Subtle sway: rotation.z: Math.sin(time) * 0.01 (weight shift)
Gentle bob: position.y: -20 + Math.sin(time * 0.7) * 0.3
Layer 2: Blog Card Grid (Z: -120, Flanking Model)
Left Side Cards (2 stacked):
Card 1 position: [-50, 15, -120]
Card 2 position: [-50, -25, -120]
Right Side Cards (2 stacked):
Card 1 position: [50, 15, -120]
Card 2 position: [50, -25, -120]
Card Geometry: <RoundedBox args={[35, 25, 2]} radius={1}>
Card Material: MeshTransmissionMaterial from Drei:
backside: true
samples: 16
resolution: 512
transmission: 0.95
roughness: 0.2
ior: 1.5
thickness: 2
color: #FFF8E7
Card Content: HTML overlay inside each card:
Blog thumbnail image (16:10)
Title: "The History of Kanchipuram Weaving"
Date: "Aug 2, 2026"
Arrow icon bottom-right
Animation — Scroll:
Left cards enter from x: -150, right from x: 150
Stagger: 0.1s between cards
Float: each card has independent y oscillation (phase offset by index)
On hover: hovered card moves to z: 20 (in front of model), others blur: 2px
Layer 3: Orbiting Category Tags (Z: -60)
Geometry: Small text planes arranged in elliptical orbit around model
Tags: "Weaving", "Styling", "Culture", "Care"
Material: Text from Drei, gold color, Cinzel Decorative
Animation: Orbit y axis at 0.002 rad/frame, tags always face camera (lookAt)
Section 5: Footer — "The Threshold"
3D Composition (Camera at Z: 100 → 0)
Transition
Camera exits 3D canvas, hands control back to DOM
3D elements fade out (globalOpacity: 1 → 0 last 50vh)
DOM footer fades in with y: 50 → 0
3D Exit Animation
Model (Image 5): scales down 1.0 → 0.8, opacity 1 → 0, drifts backward z: 0 → -50
Blog cards: disperse outward (left cards to x: -200, right to x: 200)
Gold particles: accelerate upward and fade
Global Animation Choreography
Camera Path
The camera does not move straight down Z. It has subtle drift:
JavaScript
useFrame((state) => {
  const scroll = scrollControls.offset;
  camera.position.x = Math.sin(scroll * Math.PI * 2) * 10; // Slight S-curve
  camera.position.y = Math.cos(scroll * Math.PI) * 5; // Gentle bob
  camera.position.z = 500 - (scroll * 500);
  camera.lookAt(0, -10, 0);
});
Scroll Velocity Effects
Fast scroll: all elements tilt backward (rotation.x: velocity * 0.1)
Fast scroll: particles streak
Fast scroll: motion blur post-processing intensifies
Post-Processing Stack
Bloom: threshold 0.8, strength 0.6, radius 0.5 — for gold glow
Depth of Field: focusDistance tied to camera z, focalLength 0.05, bokehScale 3
Noise: film grain, intensity 0.15 — vintage texture
Vignette: darkness 0.6, offset 0.5 — draws eye to center
Asset Specifications for 3D
Image Processing Requirements
Table
Image	File	Background Removal	Output Spec	3D Usage
Hero Model	download.jpg	REQUIRED — clean edge, preserve jewelry detail	PNG, 2048px height, alpha channel	Hero plane texture
Heritage Model	download_two.png	REQUIRED — back view, preserve hair/saree edge	PNG, 2048px height, alpha channel	Heritage plane texture
Fabric	download_three.jpg	Isolate fabric only, remove any background/stand	PNG, preserve fold details	Vertex-displaced plane
Weave Model	download_four.png	REQUIRED — flowing saree, preserve motion in fabric	PNG, 2048px height, alpha channel	Weave section plane
Editorial Model	download_five.png	REQUIRED — straight stance, clean feet for grounding	PNG, 2048px height, alpha channel	Editorial plane texture
Normal Map Generation
Generate normal maps from saree fabric images for realistic light interaction
Use AI normal map generator or Photoshop 3D filter
Apply to fabric planes for micro-detail
Environment Map
HDRi: warm studio or temple interior
Used for gold jewelry reflections on text and particles
Blur level: 0.5 for soft reflections
Performance Optimization for 3D
LOD System:
Distance > 300: use 512px textures
Distance < 100: use 2048px textures
Frustum Culling:
Disable rendering for objects behind camera
Disable particles when not in viewport
Texture Atlasing:
Combine UI elements into single sprite sheet
Combine blog thumbnails into texture atlas
Shader Complexity:
Fabric vertex shader only active when section is visible
Use useFrame conditional execution
Garbage Collection:
Dispose geometries/materials when sections exit viewport
Use useMemo for all static geometries
Interaction Map
Table
User Action	3D Response
Scroll Down	Camera moves forward, parallax layers shift, fabric waves
Scroll Fast	Motion blur, elements tilt back, particles streak
Hover Hero CTA	Button glows, nearby gold particles attract to cursor
Hover Blog Card	Card lifts to z:20, others blur, model pauses sway
Mouse Move	Subtle camera parallax (±5px), fabric wind force
Touch Drag	Same as scroll, with velocity-based momentum
Page Load	Curtain reveal, then sequential element entrance
Animation Timing Reference
Table
Section	Scroll Range	Camera Z	Key Animation
Hero	0% – 20%	500 → 400	Text fly-in, model fade, particle emit
Heritage	20% – 40%	400 → 300	Carousel spin, camera orbit, color shift
Weave	40% – 60%	300 → 200	Fabric unfold, thread draw, model turn
Editorial	60% – 80%	200 → 100	Cards cascade, tags orbit, model sway
Footer	80% – 100%	100 → 0	3D fade-out, DOM handover
Build Notes for 3D Developer
Use @react-three/drei's useScroll for scroll synchronization
Use useFrame for all continuous animations (never setInterval)
Implement useIntersectionObserver to pause off-screen animations
Test on mid-tier mobile devices — reduce particle count to 100 on low-end
Ensure all alpha textures use premultipliedAlpha: true to avoid dark fringes
Use SoftShadows from Drei for model grounding


---

## Summary

| File | Role | Purpose |
|------|------|---------|
| `developer_prompt.md` | Full-Stack Developer | Technical architecture, component structure, animation libraries, responsive logic, performance budgets |
| `uiux_design_prompt.md` | UI/UX Designer | Design system (colors, typography, spacing), component specs, interaction patterns, responsive behavior, accessibility |
| `animation_3d_prompt.md` | 3D/Animation Developer | Precise 3D scene composition, camera choreography, vertex shaders, z-depth layering, scroll-driven animation timelines |

Each file references the **5 uploaded images** with exact positioning, background removal requirements, and 3D spatial coordinates. The home page is fully specified as a continuous 3D scroll experience, while the other pages include high-level direction for the respective roles to expand upon.