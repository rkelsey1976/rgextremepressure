#!/usr/bin/env node
/**
 * IndexNow submission for rgextremepressure.co.uk — pings Bing (and other
 * IndexNow engines) with URLs so new/changed pages are crawled within
 * hours instead of waiting for slow organic crawl.
 *
 * Run after each deploy: node scripts/indexnow.mjs
 * Optionally pass specific URLs: node scripts/indexnow.mjs /services/jet-washing/
 */

import { readFileSync, existsSync } from 'node:fs';

const HOST = 'rgextremepressure.co.uk';
const KEY = 'd3434917213544818fcdd11257220ab0';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getUrls() {
  const args = process.argv.slice(2);
  if (args.length > 0) {
    return args.map((p) => (p.startsWith('http') ? p : `https://${HOST}${p.startsWith('/') ? p : `/${p}`}`));
  }
  return waitForDeployedSitemap();
}

const locs = (xml) => [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1].trim());

async function fetchLiveSitemap() {
  const res = await fetch(`https://${HOST}/sitemap-0.xml`, { cache: 'no-store' });
  if (!res.ok) throw new Error(`Sitemap fetch failed: HTTP ${res.status}`);
  const urls = locs(await res.text());
  if (urls.length === 0) throw new Error('No <loc> entries found in sitemap');
  return urls;
}

/**
 * This workflow runs on push, which fires long before Netlify has finished
 * deploying — so fetching the LIVE sitemap used to submit the PREVIOUS build's
 * URLs and silently skip everything new. It only ever worked when someone
 * happened to push again afterwards.
 *
 * Fix: the workflow now builds first, so dist/sitemap-0.xml holds the URL set
 * this commit SHOULD produce. Wait until the live sitemap contains all of them
 * before submitting. When a commit adds no URLs the sets already match and this
 * returns immediately, so content-only pushes are not delayed.
 */
async function waitForDeployedSitemap() {
  const localPath = 'dist/sitemap-0.xml';
  if (!existsSync(localPath)) {
    console.log('No local dist/sitemap-0.xml — submitting whatever is live.');
    return fetchLiveSitemap();
  }

  const expected = new Set(locs(readFileSync(localPath, 'utf8')));
  const DEADLINE = Date.now() + 8 * 60 * 1000;
  let attempt = 0;

  while (true) {
    attempt++;
    const live = await fetchLiveSitemap();
    const missing = [...expected].filter((u) => !live.includes(u));

    if (missing.length === 0) {
      if (attempt > 1) console.log(`Deploy caught up after ${attempt} checks.`);
      return live;
    }
    if (Date.now() > DEADLINE) {
      const msg = `Deploy did not land within 8 minutes — ${missing.length} URL(s) still missing from the live sitemap. Submitting the live set; re-run this workflow once the deploy finishes.`;
      console.log(process.env.CI ? `::warning title=IndexNow submitted before deploy::${msg}` : msg);
      return live;
    }
    console.log(`Waiting for deploy — ${missing.length} of ${expected.size} URL(s) not live yet (check ${attempt}). e.g. ${missing[0]}`);
    await new Promise((r) => setTimeout(r, 20000));
  }
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
