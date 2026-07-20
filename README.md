# i-Portfolio

A creative portfolio website showcasing photography, music, web development, and chess.

**Live Site:** https://ishatxt.github.io

---

## Performance Optimization Log

### Session: July 20, 2026

#### Critical Fixes
- Removed hidden preload block from all 4 pages (~21 MB of images + videos force-downloaded on every page load)
- Added `loading="lazy"` to all below-fold images
- Set `preload="none"` on non-visible videos (only preloader video keeps `preload="auto"`)
- Fixed render-blocking CSS — moved Google Fonts `@import` to `<link>` in `<head>`
- Reduced `will-change: transform` from 125+ elements to 0 (freed GPU compositor layers)

#### Font Optimization
- Self-hosted 3 custom fonts (`psl`, `psr`, `nhm`) — previously loaded from adcker.com
- Removed `.woff` fallbacks, kept only `.woff2`
- Added `<link rel="preconnect">` for Google Fonts
- Removed adcker.com preconnect dependency

#### SEO & Meta
- Added `<meta name="description">` to all 4 pages
- Added Open Graph tags (`og:title`, `og:description`, `og:type`, `og:url`) to all pages
- Added Twitter Card meta tags
- Fixed broken canonical URL on about.html (relative → absolute)
- Fixed broken `og:url` on about.html
- Created `robots.txt`
- Created `sitemap.xml`

#### Code Cleanup
- Deleted dead `js/script.js` (639 KB, never referenced by any page)
- Removed WordPress leftover classes from `<body>` (`wp-singular`, `wp-theme-adcker`, `page-template-*`, `page-id-*`)
- Removed adcker.com font references from CSS (now local)

#### Preloader Fix
- Fixed preloader stuck at 11% — changed from tracking all images to only non-lazy images
- Changed progress calculation from `Math.min` to time-driven counter
- Preloader animates from 00% to 100% over 4 seconds, then reveals page

---

## File Structure

```
/
├── index.html          # Home page
├── skills.html         # Skills/services page
├── works.html          # Projects page
├── about.html          # About page
├── robots.txt          # Search engine directives
├── sitemap.xml         # Site map for crawlers
├── css/
│   └── style.css       # Main stylesheet (Tailwind + GLightbox)
├── fonts/
│   ├── psl.woff2       # Custom font (300 weight)
│   ├── psr.woff2       # Custom font (400 weight)
│   └── nhm.woff2       # Custom font (400 weight)
├── images/             # AVIF format images
├── videos/             # MP4 video assets
│   ├── dance.mp4       # 3.3 MB
│   ├── loader.mp4      # 3.3 MB
│   ├── thermal.mp4     # 2.4 MB
│   ├── skills.mp4      # 761 KB
│   └── butterfly.mp4   # 164 KB
└── js/
    ├── vendor.js       # Bundled libraries (Lenis, Anime.js, Barba.js, Swiper, GLightbox)
    ├── utils.js
    ├── animations.js   # Scroll animations + blur effects
    ├── ui.js
    ├── media.js        # Preloader + video handling
    ├── gallery.js
    ├── navigation.js   # Lenis smooth scroll + Barba.js transitions
    └── app.js
```

## Tech Stack

- **HTML/CSS** — Tailwind CSS v3.4.17
- **JavaScript** — Vanilla JS
- **Libraries** — Lenis (smooth scroll), Anime.js (animations), Barba.js (page transitions), Swiper (sliders), GLightbox
- **Hosting** — GitHub Pages
- **Images** — AVIF format
- **Videos** — MP4 format
