# harishmanderna.com (draft, unpublished)

Multi-page static site: plain HTML, CSS and vanilla JS, generated at build time. GitHub Pages ready (custom domain via CNAME).

## Build
    python3 ../src/build.py        # from site/, or: python3 src/build.py from the project root
Sources live outside the deploy folder in `/workspace/harishmanderna/src/`:
- `build.py` page content, service data (17 services, prices from the approved plan) and the page generator
- `partials/head.html`, `partials/footer.html` shared head and footer (header with active nav state is generated in build.py)
- `icons/` Lucide SVGs inlined at build time
- `legacy/` the old single-page template, kept for reference only
Edit `css/styles.css` and `js/*.js` in `site/` directly. Never edit generated `.html` files by hand; rebuild instead.

## Pages
`/` Home (hero video), `/services.html` (6 category sections with anchors, #international-buyers, #case-studies, process), `/about.html` (photo, experience, research, #faq), `/book.html` (consultation tiles, #pricing with all 17 prices, #enquiry form), plus footer-only `/legal.html` and `/404.html`, `sitemap.xml`, `robots.txt`. Prices appear only on book.html. Root-relative links work at the domain root and at http://localhost:8080/.

## Placeholders to swap (js/config.js)
1. `booking[].url`: three Cal.com placeholder links (15/30/60 min). Replace with the real paid Cal.com event links.
2. `FORM_ENDPOINT`: empty means the form opens a mailto to `FALLBACK_EMAIL` with `CC_EMAIL` in cc. The form service (Formspree or similar) must be set to deliver to BOTH addresses.
3. `FALLBACK_EMAIL` (hello@harishmanderna.com, mailbox must exist first) and `CC_EMAIL` (manderna.1242@gmail.com).
config.js is only loaded on book.html. Privacy and terms text in legal.html (via build.py) are placeholders.

## Video
Home hero only: `assets/hero-clyde.mp4` (H.264 High, 30 fps CFR, ~1.5 Mbps capped at 2 Mbps, keyframe every 1 s, faststart, no audio) and `.webm` (VP9, same settings), 8 s 720p seamless loop, poster `hero-clyde-poster.jpg/.webp`, plain cream overlay (no filters). js/main.js attaches sources only at 768 px and wider without prefers-reduced-motion or Save-Data, and pauses when off-screen or the tab is hidden. Credits in CREDITS.md. Never deploy the 4K originals (kept in `../video-shortlist/`).

## Local preview
    cd site && nohup python3 -m http.server 8080 --bind 127.0.0.1 &   # http://localhost:8080/
(python's server does not serve 404.html for missing paths; GitHub Pages does.)

## Deploy (GitHub Pages), only when approved
1. Push the contents of `site/` (screens/ is excluded by .gitignore).
2. Settings > Pages > deploy from branch `main`, root. 3. DNS: apex A records 185.199.108.153, .109.153, .110.153, .111.153; `www` CNAME to `<user>.github.io`. 4. Enforce HTTPS.
