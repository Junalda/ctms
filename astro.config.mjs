import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Domein per omgeving. Standaard het productiedomein; op Vercel kun je
// PUBLIC_SITE_URL per environment overschrijven (Preview = staging-URL,
// Production = live domein). Voedt sitemap, canonical-URL's en hreflang.
const SITE = process.env.PUBLIC_SITE_URL ?? 'https://www.capturethemoment.nl';

// https://astro.build/config
export default defineConfig({
  site: SITE,
  // De originele Vite-dev-server draaide op poort 8080 — behouden voor herkenbaarheid.
  server: { host: true, port: 8080 },
  integrations: [
    // applyBaseStyles: false — we importeren onze eigen global.css met de
    // @tailwind-directives, zodat de styling 1-op-1 gelijk blijft aan het origineel.
    tailwind({ applyBaseStyles: false }),
    icon(),
    sitemap(),
  ],
});
