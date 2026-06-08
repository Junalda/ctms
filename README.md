# Capture the Moment Solutions — Astro

Cinematische storytelling-studio uit Rotterdam. Deze repository is de **Astro-versie**
van de site, gemigreerd vanuit de oorspronkelijke React + Vite (SPA) codebase en
volledig vertaald naar het **Nederlands**.

## Stack

- **Astro 5** — statische generatie, file-based routing (MPA i.p.v. een React SPA)
- **Tailwind CSS 3** via `@astrojs/tailwind` — styling 1-op-1 overgenomen
- **astro-icon** + `@iconify-json/lucide` — vervangt `lucide-react`, rendert inline SVG
- **@astrojs/sitemap** — automatische `sitemap-index.xml`
- Interactiviteit met kleine, eigen `<script>`-eilanden (vanilla JS) — **geen React/Vue/Svelte**

## Aan de slag

```bash
npm install
npm run dev      # dev-server op http://localhost:8080
npm run build    # statische build naar dist/
npm run preview  # preview van de build
```

## Projectstructuur

```
.
├── astro.config.mjs          # Astro + integraties (tailwind, icon, sitemap)
├── tailwind.config.mjs       # Tailwind-thema (1-op-1 uit het origineel)
├── tsconfig.json             # @/* alias → src/*
├── public/
│   ├── robots.txt            # ongewijzigd overgenomen
│   └── placeholder.svg       # favicon, ongewijzigd overgenomen
└── src/
    ├── styles/global.css     # fonts, keyframes, CSS-variabelen (uit index.css)
    ├── lib/
    │   ├── booking.ts        # boekings-/WhatsApp-/CRM-URL's
    │   └── images.ts         # centrale afbeeldingsbibliotheek (CloudFront)
    ├── data/nav.ts           # navigatie- en footerlinks (vertaalde labels)
    ├── layouts/BaseLayout.astro   # <html lang="nl">, head/meta, Header + Footer
    ├── components/
    │   ├── Header.astro      # scroll-effect + mobiel menu (script-eiland)
    │   └── Footer.astro      # nieuwsbriefformulier (script-eiland)
    └── pages/                # file-based routing — één bestand per route
        ├── index.astro                       →  /
        ├── about.astro                       →  /about
        ├── services.astro                    →  /services
        ├── real-estate.astro                 →  /real-estate
        ├── content-creation.astro            →  /content-creation
        ├── portfolio.astro                   →  /portfolio
        ├── process.astro                     →  /process
        ├── contact.astro                     →  /contact
        ├── rotterdam-real-estate.astro       →  /rotterdam-real-estate
        ├── rotterdam-personal-branding.astro →  /rotterdam-personal-branding
        └── 404.astro                         →  404-pagina
```

## Routes (identiek aan het origineel)

| Route | Pagina |
|---|---|
| `/` | Homepage |
| `/about` | Over Gabriel |
| `/services` | Diensten |
| `/real-estate` | Vastgoed (pakketten, voor/na-schuif, FAQ) |
| `/content-creation` | Personal branding & content |
| `/portfolio` | Portfolio (filter + lightbox) |
| `/process` | Werkwijze |
| `/contact` | Contact (boekingskaart + formulier) |
| `/rotterdam-real-estate` | Landingspagina vastgoed Rotterdam |
| `/rotterdam-personal-branding` | Landingspagina branding Rotterdam |

## Wat is er met de originele bestanden gebeurd?

**Samengevoegd / vervangen**

- `src/pages/*.tsx` → gelijknamige `.astro`-pagina's. `Home.tsx` en `Index.tsx`
  delegeerden allebei naar `AppLayout` — die drie zijn samengevoegd tot één
  `src/pages/index.astro`.
- `src/components/AppLayout.tsx` → opgegaan in `index.astro` (de homepage-inhoud).
- `src/components/Layout.tsx` → vervangen door `src/layouts/BaseLayout.astro`.
  De `scrollTo`-op-routewissel is overbodig: bij een MPA laadt elke pagina vers
  en reset de scroll vanzelf.
- `src/components/Header.tsx` / `Footer.tsx` → `.astro`-componenten met een klein
  `<script>` voor de interactie (scroll-state, mobiel menu, nieuwsbrief-POST).
- `index.html` (Vite-template) + `src/main.tsx` / `App.tsx` (React-bootstrap en
  React Router) → niet meer nodig; Astro verzorgt routing en de HTML-shell via
  `BaseLayout.astro`.
- `src/index.css` → `src/styles/global.css` (zie aanpassingen hieronder).
- `lucide-react` → `astro-icon` + `@iconify-json/lucide` (zelfde icon-set).

**Vervallen (dode code in het origineel)**

- `src/components/ui/**` (≈50 shadcn/ui-componenten), `src/hooks/**`,
  `src/contexts/AppContext.tsx`, `src/components/theme-provider.tsx`,
  `src/App.css`. Geen enkele pagina importeerde deze; ze hingen alleen aan de
  React-opzet. Daarmee vervielen ook de bijbehorende dependencies (Radix UI,
  react-hook-form, react-query, next-themes, recharts, embla, enz.).
- Vite-specifieke configuratie (`vite.config.ts`, `eslint.config.js`,
  `postcss.config.js`, `tsconfig.app.json`, `tsconfig.node.json`,
  `components.json`) → vervangen door `astro.config.mjs` en een enkele
  `tsconfig.json`.

## Aanpassingen aan het design (en waarom)

Het design, de layout, kleuren, typografie en spacing zijn **ongewijzigd**
overgenomen — dezelfde Tailwind-classes, hetzelfde kleuraccent (`#D4AF37`),
dezelfde fonts (Inter / Cormorant Garamond / JetBrains Mono) en animaties
(`kenburns`, `fade-up`, `fade-in`). Alleen het volgende is bewust aangepast:

1. **Interactie zonder React.** De React-state (testimonial-carrousel,
   portfolio-filter + lightbox, FAQ-accordeon, voor/na-schuif, formulieren) is
   herbouwd als kleine vanilla-`<script>`-eilanden. Functioneel en visueel
   identiek; alleen de implementatie verschilt. Dit volgt het verzoek "anders
   puur Astro" en houdt de JS-bundel minimaal.
2. **`src/index.css` opgeschoond.** De ongebruikte `.markdown-editor` /
   `.markdown-preview`-regels (bedoeld voor een shadcn-markdown-editor die op
   deze site niet bestaat) zijn weggelaten. Geen zichtbaar effect.
3. **Nederlandse teksten.** Een enkele kop liep in het Nederlands iets langer;
   waar nodig is met een `<br />` op een natuurlijk punt afgebroken, zonder de
   typografische schaal te wijzigen.

## SEO / taal

- `<html lang="nl">`, `og:locale = nl_NL`, en `hreflang="nl-nl"` + `x-default`.
- Per pagina een eigen, vertaalde `<title>` en meta-description (in het origineel
  stond er alleen globale meta in `index.html`).
- JSON-LD (`ProfessionalService`) vertaald; `areaServed` gebruikt nu o.a.
  "Den Haag".
- `astro.config.mjs` → `site` staat op `https://www.capturethemoment.nl`
  (placeholder, zie hieronder) en voedt canonical-URL's + de sitemap.

## ⚠️ Input nodig / keuzes om te bevestigen

Deze waarden komen uit de originele code en zijn nog **placeholders**:

- **Productiedomein** — `site` in `astro.config.mjs` (`www.capturethemoment.nl`).
  Pas aan naar de echte URL; dit bepaalt canonical-links en de sitemap.
- **WhatsApp-nummer** — `WHATSAPP_URL` in `src/lib/booking.ts` is `31600000000`.
- **Telefoon / KvK** — `+31 (0)6 00 00 00 00`, `+31 (0)10 000 00 00` en
  `KvK 00000000` in `Footer.astro` / `contact.astro` zijn nog dummywaarden.
- **Social links** — Instagram/LinkedIn/YouTube in de footer wijzen naar `#`.
- **Footerlinks Privacy / Voorwaarden** — wijzen naar `#`; nog geen pagina's.
- **Externe diensten** (werkten al in het origineel, geen key in de frontend
  nodig): de Famous CRM-boekings-/subscribe-endpoints en de OpenStreetMap-embed
  op de contactpagina.
- **Vertaalkeuzes** — vaktermen die in Nederlandse marketing gangbaar Engels
  blijven, zijn bewust niet vertaald: *content, personal branding, storytelling,
  reel, retainer, SEO, dashboard, Google Meet, Funda, Pararius*. Merknaam
  "Capture the Moment Solutions" en eigennamen (Wijnhaven, Kralingen, ...) zijn
  ongewijzigd.
