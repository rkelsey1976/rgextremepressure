import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { execSync } from 'child_process';
import { statSync, existsSync, readFileSync } from 'fs';
import { join } from 'path';

const SITE = 'https://rgextremepressure.co.uk';
const PAGES_DIR = './src/pages';
const CONTENT_BLOG_DIR = './src/content/blog';

// Service hub routes — see src/data/serviceHubs.ts
const SERVICE_HUBS = [
  '/driveway-cleaning',
  '/patio-cleaning',
  '/roof-cleaning',
  '/gutter-cleaning',
  '/render-cleaning',
];

// ============================================================
// Sitemap helpers — added 2026-07-26 to give every URL a real
// lastmod, priority and changefreq. Without these the sitemap
// has just <loc> tags, which means Google has no signal for
// when to re-crawl.
// ============================================================

/**
 * Map a URL like /blog/my-post/ or /driveway-cleaning/combe-down-bath/
 * to the source file on disk so we can read its last-modified date.
 */
function urlToSource(url) {
  if (!url) return null;
  let path = url.replace(SITE, '').replace(/\/$/, '') || '/';

  // Blog index
  if (path === '/blog') {
    const candidate = join(PAGES_DIR, 'blog', 'index.astro');
    if (existsSync(candidate)) return candidate;
    return null;
  }
  // Blog post — content collection, .md file
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    const candidate = join(CONTENT_BLOG_DIR, `${slug}.md`);
    if (existsSync(candidate)) return candidate;
    return null;
  }
  // Static page — try .astro then /index.astro
  const cleanPath = path === '/' ? '' : path;
  const candidates = [
    join(PAGES_DIR, `${cleanPath}.astro`),
    join(PAGES_DIR, cleanPath, 'index.astro'),
  ];
  for (const c of candidates) {
    if (existsSync(c)) return c;
  }
  // Dynamic routes — try matching [slug] in the parent segment
  // e.g. /areas-covered/bear-flat-bath/ → src/pages/areas-covered/[slug].astro
  //      /driveway-cleaning/combe-down-bath/ → src/pages/driveway-cleaning/[slug].astro
  const parts = cleanPath.split('/');
  for (let i = parts.length; i > 0; i--) {
    const parent = parts.slice(0, i).join('/');
    const rest = parts.slice(i).join('/');
    if (!rest) continue;
    const dynamicCandidate = join(PAGES_DIR, parent, '[slug].astro');
    if (existsSync(dynamicCandidate)) return dynamicCandidate;
  }
  return null;
}

/**
 * Get lastmod for a source file:
 *  1. Blog markdown — read updatedDate or pubDate from frontmatter
 *  2. Try git log for the file's last commit date (author date)
 *  3. Fall back to filesystem mtime
 *  4. Last resort — undefined (omit from sitemap entry)
 */
function getLastmod(sourcePath) {
  if (!sourcePath) return undefined;

  // Blog markdown — read frontmatter
  if (sourcePath.endsWith('.md')) {
    try {
      const content = readFileSync(sourcePath, 'utf8');
      const fmMatch = content.match(/^---[\s\S]*?---/);
      if (fmMatch) {
        const fm = fmMatch[0];
        const updatedMatch = fm.match(/updatedDate:\s*(\d{4}-\d{2}-\d{2})/);
        if (updatedMatch) return new Date(updatedMatch[1]);
        const pubMatch = fm.match(/pubDate:\s*(\d{4}-\d{2}-\d{2})/);
        if (pubMatch) return new Date(pubMatch[1]);
      }
    } catch (_) { /* fall through */ }
  }

  // Try git log
  try {
    const out = execSync(`git log -1 --format=%aI -- "${sourcePath}"`, {
      cwd: process.cwd(),
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim();
    if (out) return new Date(out);
  } catch (_) { /* git not available, fall through */ }

  // Fall back to file mtime
  try {
    return statSync(sourcePath).mtime;
  } catch (_) { /* file unreadable */ }

  return undefined;
}

/**
 * Per-URL priority. Homepage gets the highest weight;
 * service-area and service-city pages get the next tier;
 * blog posts get a moderate weight; everything else gets baseline.
 */
function getPriority(url) {
  const path = url.replace(SITE, '').replace(/\/$/, '') || '/';
  if (path === '/') return 1.0;
  // Blog (and blog index) — check first, before generic /word/word regex
  if (path === '/blog' || path.startsWith('/blog/')) return 0.6;
  // Service hubs — head-term pages that parent the service-area pages.
  // Kept in sync with src/data/serviceHubs.ts. Without this they fell to the
  // 0.5 baseline, i.e. below the suburb pages they are the parent of.
  if (SERVICE_HUBS.includes(path)) return 0.9;
  // Service city pages — /{service}-bath/ or /{service}-bristol/
  if (/^\/[a-z-]+-(?:bath|bristol)$/.test(path)) return 0.9;
  // Areas covered hubs — informational "do you serve my area" pages
  if (path.startsWith('/areas-covered/')) return 0.8;
  // Service area pages — /{service}/{area}
  if (/^\/[a-z-]+\/[a-z-]+(?:-[a-z-]+)?$/.test(path)) return 0.85;
  // Top-level commercial-only Bath pages
  if (/^\/(commercial-jet-washing|conservatory-cleaning|soffit-fascia-cleaning)-bath$/.test(path)) return 0.7;
  // About / contact / services / privacy / terms
  return 0.5;
}

function getChangefreq(url) {
  const path = url.replace(SITE, '').replace(/\/$/, '') || '/';
  if (path === '/') return 'weekly';
  if (path.startsWith('/blog/')) return 'monthly';
  return 'monthly';
}

export default defineConfig({
  site: SITE,
  outDir: './dist',
  redirects: {
    '/block-paving-cleaning-bath': { status: 301, destination: '/driveway-cleaning-bath' },
    // Privacy policy redirect lives in netlify.toml — Astro static builds
    // without the Netlify adapter don't emit _redirects.
  },
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
        !page.includes('/tools/fb-banner') &&
        !page.includes('/privacy-policy'),
      serialize(item) {
        const sourcePath = urlToSource(item.url);
        const lastmod = getLastmod(sourcePath);
        return {
          ...item,
          ...(lastmod ? { lastmod } : {}),
          priority: getPriority(item.url),
          changefreq: getChangefreq(item.url),
        };
      },
    }),
  ],
});