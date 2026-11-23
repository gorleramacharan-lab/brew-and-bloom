# ☕ Brew & Bloom Café

A fully responsive, premium single-page website for a fictional café in Vijayawada, India.
Built with plain HTML, CSS, and JavaScript — no frameworks, no build step.

**Live demo:** https://brew-and-bloom-amber.vercel.app

## Features

- Sticky glassmorphism navbar with mobile hamburger menu
- Hero section with floating badges and animated brand stamp
- Filterable menu (16 items, prices in ₹) rendered from JS data
- Signature Specials spotlight section
- Customer reviews carousel (auto-advance + arrows + dots)
- Gallery, opening hours, contact section with validated form
- Working shopping cart: slide-in drawer, quantities, totals, demo checkout
- Preloader, scroll-reveal animations, back-to-top button, toast notifications

## Project structure

```text
brew-and-bloom/
├── index.html      # all page markup
├── css/style.css   # full stylesheet (custom properties, responsive)
├── js/main.js      # menu render, cart, carousel, validation, animations
└── images/         # 28 optimized JPEGs
```

## Run locally

```bash
cd brew-and-bloom
python3 -m http.server 8000
# open http://localhost:8000
```

© 2026 Brew & Bloom Café. Demo project.
