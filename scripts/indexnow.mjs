#!/usr/bin/env node
/**
 * IndexNow submission for rgextremepressure.co.uk — pings Bing (and other
 * IndexNow engines) with URLs so new/changed pages are crawled within
 * hours instead of waiting for slow organic crawl.
 *
 * Run after each deploy: node scripts/indexnow.mjs
 * Optionally pass specific URLs: node scripts/indexnow.mjs /services/jet-washing/
 */

const HOST = 'rgextremepressure.co.uk';
const KEY = 'd3434917213544818fcdd11257220ab0';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrls() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`));
  }
  const res = await fetch(`https://${HOST}/sitemap-0.xml`);
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());
  if (urls.length === 0) throw new Error('No <loc> entries found in sitemap');
  return urls;
}

async function main() {
  // Verify the key file is live first
  const keyRes = await fetch(KEY_LOCATION);
  const keyBody = (await keyRes.text()).trim();
  if (!keyRes.ok || keyBody !== KEY) {
    throw new Error(`Key file not live yet at ${KEY_LOCATION} (HTTP ${keyRes.status}) — deploy first`);
  }

  const urlList = await getUrls();

  console.log(`Submitting ${urlList.length} URLs for ${HOST}…`);

  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList,
    }),
  });

  if (res.status >= 200 && res.status < 300) {
    console.log(`IndexNow response: HTTP ${res.status} OK`);
    console.log('Done — Bing will crawl the submitted URLs shortly.');
  } else {
    const text = await res.text();
    throw new Error(`IndexNow failed: HTTP ${res.status} — ${text}`);
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
