# 🪷 Pattu Silk Saree — AARYA

> A cinematic 3D web experience for a modern Indian heritage saree atelier. Hand-woven Kanchipuram silks, temple-gold particles, and a living storefront — all built on Next.js, Three.js and GSAP.

![Next.js](https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white)
![React 19](https://img.shields.io/badge/React%2019-087ea4?style=for-the-badge&logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-r185-black?style=for-the-badge&logo=three.js&logoColor=white)
![R3F](https://img.shields.io/badge/React%20Three%20Fiber-v9-5b3b8c?style=for-the-badge&logo=three.js&logoColor=white)
![GSAP](https://img.shields.io/badge/GSAP-88ce02?style=for-the-badge&logo=greensock&logoColor=black)
![Zustand](https://img.shields.io/badge/Zustand-764abc?style=for-the-badge&logo=javascript&logoColor=white)

---

## ✨ The Experience

- **🧵 Liquid Heritage** — A GPU liquid-shader gallery where six sarees ripple, warp and distort under your cursor.
- **✨ Gold Dust Particles** — Thousands of additive-blended gold motes drifting through every scroll chapter.
- **🧍‍♀️ Living Models** — Alpha-cutout muses, editorial figures and soft ground shadows swaying in scroll space.
- **🌬 Touch Burst** — On mobile, a tap erupts a 3D shockwave ring and particle fountain at your fingertip.
- **🎞 Cinematic Scroll** — A five-chapter GSAP timeline choreographed with Lenis smooth scrolling.
- **🛍 Cart & Checkout** — A persisted cart with quantity steppers, live nav badge and order summaries.
- **🎉 3D Order Rite** — Placing an order blooms a full 3D celebration of gold rings, sparkles and confetti.
- **🏛 Heritage UI** — Burgundy, ivory and temple-gold design system — pure handcrafted CSS, no Tailwind.

## 🧰 Tech Stack

| Layer      | Technology                                   |
| ---------- | -------------------------------------------- |
| Framework  | Next.js 16 · React 19 · TypeScript           |
| 3D         | Three.js · @react-three/fiber · @react-three/drei |
| Motion     | GSAP + ScrollTrigger · Lenis                |
| State      | Zustand (persisted) · TanStack Query        |
| UI         | MUI · lucide-react · plain CSS              |

## 🗂 The Loom

```
my-app/
├── app/                 # pages · home · collection · cart · about · blog
│   ├── cart/
│   ├── collection/
│   └── globals.css      # heritage design system (pure CSS)
├── components/
│   ├── home/three/      # R3F scene · liquid shaders · particles · touch burst
│   ├── collection/      # product cards · filters · quick-view dialog
│   └── cart/            # order-success 3D celebration
├── lib/
│   ├── data/products    # catalogue + filters
│   └── store/cart-store # persisted zustand cart
└── asserts/             # art direction imagery
```

## 🚀 Getting Started

```bash
cd my-app
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and scroll — the silk unfolds in 3D.

## 📜 Commands

| Command            | Description             |
| ------------------ | ----------------------- |
| `npm run dev`      | Start the dev server    |
| `npm run build`    | Production build        |
| `npm run start`    | Serve the build         |
| `npm run lint`     | Lint the codebase       |
| `npx tsc --noEmit` | Type-check              |

## 🗺 Pages

| Route        | Description                                  |
| ------------ | -------------------------------------------- |
| `/`          | Cinematic 3D home — five scroll chapters     |
| `/collection`| Filterable product catalogue with quick-view |
| `/cart`      | Bag, quantity controls, order summary        |
| `/about`     | Atelier heritage story                       |
| `/blog`      | Editorial journal                            |

## 🪷 About

**Pattu Silk Saree · AARYA** celebrates four centuries of Kanchipuram weaving — reimagined as an immersive, cinematic experience where heritage, gold and silk live in real time.
