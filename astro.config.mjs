import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://aspectbuilds.co.uk',
  outDir: './dist',
  integrations: [
    sitemap({
      filter: (page) =>
        !page.includes('/style-guide') &&
        !page.includes('/contact/success') &&
        !page.includes('/offline') &&
        !page.includes('/404') &&
        !page.includes('/brand-tools') &&
        !page.includes('/social-generator') &&
        !page.includes('/tools/fb-ad') &&
        !page.includes('/tools/fb-banner'),
    }),
  ],
});