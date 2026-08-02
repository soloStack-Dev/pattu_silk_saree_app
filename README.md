<div align="center">

<style>
  .patu-root {
    position: relative;
    overflow: hidden;
    border: 1px solid rgba(212, 175, 55, 0.35);
    border-radius: 18px;
    background:
      radial-gradient(1200px 500px at 50% -10%, rgba(212, 175, 55, 0.16), transparent 60%),
      radial-gradient(900px 600px at 85% 110%, rgba(139, 26, 60, 0.55), transparent 60%),
      linear-gradient(160deg, #0b0710 0%, #1a0b16 55%, #2b1020 100%);
    padding: 42px 28px 48px;
    color: #f4e4bc;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
  }

  /* ---- dust motes ---- */
  .dust-field { position: absolute; inset: 0; pointer-events: none; z-index: 0; }
  .mote {
    position: absolute;
    border-radius: 50%;
    background: radial-gradient(circle, #f4e4bc 0%, rgba(212, 175, 55, 0.6) 40%, transparent 75%);
    opacity: 0;
    animation: drift linear infinite;
  }
  .mote:nth-child(1)  { width: 5px;  height: 5px;  left: 8%;  bottom: -4%;  animation-duration: 17s;  animation-delay: 0s; }
  .mote:nth-child(2)  { width: 3px;  height: 3px;  left: 22%; bottom: -5%;  animation-duration: 23s;  animation-delay: 2s; }
  .mote:nth-child(3)  { width: 6px;  height: 6px;  left: 38%; bottom: -3%;  animation-duration: 19s;  animation-delay: 4s; }
  .mote:nth-child(4)  { width: 2px;  height: 2px;  left: 53%; bottom: -6%;  animation-duration: 27s;  animation-delay: 1s; }
  .mote:nth-child(5)  { width: 4px;  height: 4px;  left: 67%; bottom: -4%;  animation-duration: 21s;  animation-delay: 5s; }
  .mote:nth-child(6)  { width: 5px;  height: 5px;  left: 81%; bottom: -5%;  animation-duration: 25s;  animation-delay: 3s; }
  .mote:nth-child(7)  { width: 3px;  height: 3px;  left: 92%; bottom: -3%;  animation-duration: 18s;  animation-delay: 6s; }
  .mote:nth-child(8)  { width: 6px;  height: 6px;  left: 15%; bottom: -6%;  animation-duration: 29s;  animation-delay: 7s; }
  .mote:nth-child(9)  { width: 4px;  height: 4px;  left: 45%; bottom: -4%;  animation-duration: 22s;  animation-delay: 8s; }
  .mote:nth-child(10) { width: 3px;  height: 3px;  left: 74%; bottom: -5%;  animation-duration: 26s;  animation-delay: 9s; }
  .mote:nth-child(11) { width: 5px;  height: 5px;  left: 30%; bottom: -7%;  animation-duration: 20s;  animation-delay: 10s; }
  .mote:nth-child(12) { width: 2px;  height: 2px;  left: 60%; bottom: -4%;  animation-duration: 31s;  animation-delay: 11s; }
  .mote:nth-child(13) { width: 4px;  height: 4px;  left: 88%; bottom: -6%;  animation-duration: 24s;  animation-delay: 12s; }
  .mote:nth-child(14) { width: 6px;  height: 6px;  left: 5%;  bottom: -8%;  animation-duration: 28s;  animation-delay: 13s; }
  .mote:nth-child(15) { width: 3px;  height: 3px;  left: 50%; bottom: -5%;  animation-duration: 16s;  animation-delay: 14s; }

  @keyframes drift {
    0%   { transform: translate3d(0, 0, 0) scale(0.6); opacity: 0; }
    8%   { opacity: 0.9; }
    50%  { transform: translate3d(60px, -46vh, 0) scale(1.15); opacity: 0.7; }
    92%  { opacity: 0.5; }
    100% { transform: translate3d(-40px, -96vh, 0) scale(0.8); opacity: 0; }
  }

  .patu-emoji { animation: float 4.5s ease-in-out infinite; display: inline-block; font-size: 44px; filter: drop-shadow(0 0 14px rgba(212, 175, 55, 0.55)); }
  @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }

  .patu-title {
    margin: 14px 0 6px;
    font-size: 46px;
    font-weight: 800;
    letter-spacing: 2px;
    background: linear-gradient(120deg, #f4e4bc 0%, #d4af37 40%, #fff3d6 60%, #d4af37 100%);
    background-size: 220% auto;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shimmer 6s linear infinite;
  }
  @keyframes shimmer { to { background-position: -220% center; } }

  .patu-sub { margin: 0; font-size: 15px; letter-spacing: 6px; text-transform: uppercase; color: #cbb27e; }
  .patu-tagline { margin: 14px auto 22px; max-width: 640px; font-size: 15px; line-height: 1.7; color: #d9c9a8; }

  .patu-divider { width: 130px; height: 1px; margin: 0 auto 26px; background: linear-gradient(90deg, transparent, #d4af37, transparent); position: relative; }
  .patu-divider::after { content: "✦"; position: absolute; left: 50%; top: -9px; transform: translateX(-50%); color: #d4af37; font-size: 12px; animation: twinkle 2s ease-in-out infinite; }
  @keyframes twinkle { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }

  .patu-badges { display: flex; flex-wrap: wrap; gap: 10px; justify-content: center; margin: 6px 0 26px; }
  .patu-badge {
    display: inline-block;
    padding: 7px 14px;
    border-radius: 999px;
    border: 1px solid rgba(212, 175, 55, 0.45);
    background: rgba(20, 10, 16, 0.55);
    font-size: 12px;
    letter-spacing: 0.5px;
    color: #e6d3a1;
    backdrop-filter: blur(4px);
    transition: all 0.25s ease;
  }
  .patu-badge:hover { border-color: #d4af37; color: #fff3d6; transform: translateY(-2px); box-shadow: 0 8px 24px rgba(212, 175, 55, 0.25); }
  .patu-badge b { color: #d4af37; font-weight: 700; }

  .patu-btn {
    display: inline-block;
    margin: 4px 8px 8px 0;
    padding: 13px 30px;
    border-radius: 10px;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px;
    letter-spacing: 0.5px;
    transition: all 0.25s ease;
  }
  .patu-btn--gold { background: linear-gradient(120deg, #d4af37, #b8932c); color: #1a0b16; box-shadow: 0 10px 30px rgba(212, 175, 55, 0.3); }
  .patu-btn--gold:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(212, 175, 55, 0.45); }
  .patu-btn--ghost { border: 1px solid rgba(212, 175, 55, 0.55); color: #f4e4bc; background: transparent; }
  .patu-btn--ghost:hover { background: rgba(212, 175, 55, 0.12); transform: translateY(-3px); }

  /* ---- sections ---- */
  .patu-section { position: relative; z-index: 1; margin: 34px 0 0; }
  .patu-h2 {
    display: inline-block;
    font-size: 20px;
    font-weight: 700;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #d4af37;
    margin: 0 0 16px;
    border-bottom: 1px solid rgba(212, 175, 55, 0.4);
    padding-bottom: 6px;
  }
  .patu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 12px; text-align: left; }
  .patu-card {
    border: 1px solid rgba(212, 175, 55, 0.22);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    padding: 16px 14px;
    transition: all 0.25s ease;
  }
  .patu-card:hover { border-color: rgba(212, 175, 55, 0.7); background: rgba(212, 175, 55, 0.08); transform: translateY(-4px); }
  .patu-card b { display: block; color: #f4e4bc; font-size: 14px; margin-bottom: 6px; }
  .patu-card span { font-size: 12.5px; line-height: 1.55; color: #c3b28d; }
  .patu-stack { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; }
  .patu-chip {
    padding: 7px 15px;
    border-radius: 8px;
    border: 1px solid rgba(212, 175, 55, 0.35);
    background: rgba(139, 26, 60, 0.25);
    font-size: 13px;
    color: #ecd9a8;
    transition: all 0.25s ease;
  }
  .patu-chip:hover { background: rgba(212, 175, 55, 0.16); border-color: #d4af37; transform: scale(1.05); }
  .patu-list { list-style: none; padding: 0; margin: 0; text-align: left; }
  .patu-list li { position: relative; padding: 8px 0 8px 26px; font-size: 14px; color: #d9c9a8; border-bottom: 1px dashed rgba(212, 175, 55, 0.15); }
  .patu-list li::before { content: "✦"; position: absolute; left: 2px; top: 8px; color: #d4af37; font-size: 12px; }
  .patu-list code { background: rgba(0, 0, 0, 0.35); color: #f4e4bc; padding: 2px 7px; border-radius: 5px; font-size: 12.5px; }

  .patu-code {
    display: block;
    text-align: left;
    background: #0d0710;
    border: 1px solid rgba(212, 175, 55, 0.3);
    border-radius: 12px;
    padding: 18px 20px;
    font-family: "Cascadia Code", "Fira Code", Consolas, monospace;
    font-size: 13.5px;
    line-height: 1.8;
    color: #ecd9a8;
    overflow-x: auto;
  }
  .patu-code .c { color: #7a6a5a; }
  .patu-code .k { color: #d4af37; }
  .patu-code .s { color: #9fd0b0; }
  .patu-footer { margin-top: 34px; padding-top: 20px; border-top: 1px solid rgba(212, 175, 55, 0.25); font-size: 12.5px; letter-spacing: 1px; color: #9c8b6a; }
</style>

<div class="patu-root">

  <div class="dust-field">
    <span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span>
    <span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span>
    <span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span><span class="mote"></span>
  </div>

  <span class="patu-emoji">🪷</span>
  <div class="patu-title">PATTU SILK SAREE</div>
  <div class="patu-sub">AARYA · Kanchipuram Silks</div>

  <p class="patu-tagline">
    A cinematic <b>WebGL 3D</b> showcase where centuries of <b>hand-woven Kanchipuram silk</b>
    drift like golden dust through a modern Indian heritage experience — liquid shaders,
    temple gold particles and a living, breathing atelier storefront.
  </p>

  <div class="patu-divider"></div>

  <div class="patu-badges">
    <span class="patu-badge"><b>Next.js</b> 16</span>
    <span class="patu-badge"><b>React</b> 19</span>
    <span class="patu-badge"><b>Three.js</b> r185</span>
    <span class="patu-badge"><b>R3F</b> v9</span>
    <span class="patu-badge"><b>GSAP</b> Scroll-driven</span>
    <span class="patu-badge"><b>Zustand</b> Cart</span>
    <span class="patu-badge"><b>TypeScript</b></span>
  </div>

  <a class="patu-btn patu-btn--gold" href="#get-started">✦ Get Started</a>
  <a class="patu-btn patu-btn--ghost" href="#features">Experience</a>

  <!-- ============ FEATURES ============ -->
  <div class="patu-section" id="features">
    <div class="patu-h2">✦ The Experience</div>
    <div class="patu-grid">
      <div class="patu-card"><b>🧵 Liquid Heritage</b><span>Six sarees reimagined as a GPU liquid shader gallery with gsap-driven hover distortion.</span></div>
      <div class="patu-card"><b>✨ Gold Dust Particles</b><span>Thousands of additive-blended gold motes drifting through every scroll chapter.</span></div>
      <div class="patu-card"><b>🧍‍♀️ Living Models</b><span>Alpha cut-out muse, editorial figures and ground shadows swaying in scroll space.</span></div>
      <div class="patu-card"><b>🌬 Touch Burst</b><span>On mobile, a tap erupts a 3D shockwave ring + particle fountain at your fingertip.</span></div>
      <div class="patu-card"><b>🛍 Cart &amp; Checkout</b><span>Persisted zustand bag with quantity steppers, live nav badge and order totals.</span></div>
      <div class="patu-card"><b>🎉 3D Order Rite</b><span>Placing an order blooms a full 3D celebration — gold rings, sparkles, confetti.</span></div>
      <div class="patu-card"><b>🎞 Cinematic Scroll</b><span>GSAP timeline + lenis smooth-scroll choreographing 5 chapters of story.</span></div>
      <div class="patu-card"><b>🏛 Heritage UI</b><span>Burgundy, ivory &amp; temple-gold design system — no Tailwind, pure handcrafted CSS.</span></div>
    </div>
  </div>

  <!-- ============ TECH STACK ============ -->
  <div class="patu-section">
    <div class="patu-h2">✦ Woven With</div>
    <div class="patu-stack">
      <span class="patu-chip">Next.js 16</span>
      <span class="patu-chip">React 19</span>
      <span class="patu-chip">TypeScript</span>
      <span class="patu-chip">Three.js</span>
      <span class="patu-chip">@react-three/fiber</span>
      <span class="patu-chip">@react-three/drei</span>
      <span class="patu-chip">GSAP + ScrollTrigger</span>
      <span class="patu-chip">Lenis Smooth Scroll</span>
      <span class="patu-chip">Zustand</span>
      <span class="patu-chip">TanStack Query</span>
      <span class="patu-chip">MUI</span>
      <span class="patu-chip">lucide-react</span>
    </div>
  </div>

  <!-- ============ PROJECT MAP ============ -->
  <div class="patu-section">
    <div class="patu-h2">✦ The Loom</div>
    <div class="patu-code">
<span class="c"># project map</span>
<span class="k">my-app/</span>
├── app/                 <span class="c"># pages · home · collection · cart · about · blog</span>
│   ├── cart/
│   ├── collection/
│   └── globals.css       <span class="c"># heritage design system (pure CSS)</span>
├── components/
│   ├── home/three/       <span class="c"># R3F scene · liquid shaders · particles · touch burst</span>
│   ├── collection/       <span class="c"># product cards · filters · quick-view</span>
│   └── cart/             <span class="c"># order-success 3D celebration</span>
├── lib/
│   ├── data/products     <span class="c"># catalogue + filters</span>
│   └── store/cart-store  <span class="c"># persisted zustand cart</span>
└── asserts/             <span class="c"># art direction imagery</span>
    </div>
  </div>

  <!-- ============ GET STARTED ============ -->
  <div class="patu-section" id="get-started">
    <div class="patu-h2">✦ Get Started</div>
    <div class="patu-code">
<span class="c"># step into the atelier</span>
<span class="k">cd</span> my-app
<span class="k">npm</span> install
<span class="k">npm</span> run dev
    </div>
    <p class="patu-tagline">Then open <code>http://localhost:3000</code> and scroll — the silk unfolds in 3D.</p>
  </div>

  <!-- ============ SCRIPTS ============ -->
  <div class="patu-section">
    <div class="patu-h2">✦ Commands</div>
    <div class="patu-code">
<span class="k">npm run dev</span>       <span class="c"># start the dev server</span>
<span class="k">npm run build</span>     <span class="c"># production build</span>
<span class="k">npm run start</span>     <span class="c"># serve the build</span>
    </div>
  </div>

  <div class="patu-footer">
    🪷 WOVEN WITH DEVOTION · PATTU SILK SAREE · A CINEMATIC HERITAGE EXPERIENCE
  </div>

</div>
</div>
