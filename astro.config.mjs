import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';

// Productiedomein — pas dit aan naar de uiteindelijke URL van de site.
// Wordt gebruikt voor sitemap, canonical-URL's en hreflang.
const SITE = 'https://www.capturethemoment.nl';

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
