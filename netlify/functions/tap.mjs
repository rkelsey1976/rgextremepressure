// Cookieless CTA counter. GA4 only sees visitors who accept the cookie
// banner (about a third), so this counts every phone tap, quote click,
// WhatsApp/email tap and completed form without cookies or identifiers.
//
// POST /api/tap  {"e":"phone_click","p":"/gutter-cleaning-bristol/","l":"Call now"}
//   One small blob per tap: event, page path, button label, timestamp.
//   No IP, user agent, cookie or device storage, so nothing personal is kept.
//
// GET /api/tap?key=<TAP_REPORT_KEY>&month=2026-11
//   Totals for the month by event, and by event + page.
import { getStore } from '@netlify/blobs';

const EVENTS = new Set([
  'phone_click', 'quote_click', 'whatsapp_click', 'email_click',
  'quote_submit', 'generate_lead',
]);

const clean = (v, max) => String(v ?? '').replace(/[^\w\-\/ .&'£]/g, '').slice(0, max);

export default async (req) => {
  const store = getStore('taps');

  if (req.method === 'POST') {
    let body;
    try { body = JSON.parse(await req.text()); } catch { return new Response(null, { status: 400 }); }
    const e = String(body?.e || '');
    const p = clean(body?.p, 120);
    if (!EVENTS.has(e) || !p.startsWith('/')) return new Response(null, { status: 400 });
    const now = new Date();
    const key = `${now.toISOString().slice(0, 10)}/${now.getTime()}-${Math.random().toString(36).slice(2, 8)}`;
    await store.setJSON(key, { e, p, l: clean(body?.l, 60), t: now.toISOString() });
    return new Response(null, { status: 204 });
  }

  if (req.method === 'GET') {
    const url = new URL(req.url);
    const secret = process.env.TAP_REPORT_KEY;
    if (!secret || url.searchParams.get('key') !== secret) return new Response('Not found', { status: 404 });
    const month = /^\d{4}-\d{2}$/.test(url.searchParams.get('month') || '')
      ? url.searchParams.get('month')
      : new Date().toISOString().slice(0, 7);
    const { blobs } = await store.list({ prefix: month });
    const totals = {};
    const byPage = {};
    for (const { key } of blobs) {
      const tap = await store.get(key, { type: 'json' });
      if (!tap) continue;
      totals[tap.e] = (totals[tap.e] || 0) + 1;
      const k = `${tap.e} ${tap.p}`;
      byPage[k] = (byPage[k] || 0) + 1;
    }
    return Response.json({ month, taps: blobs.length, totals, byPage }, {
      headers: { 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
    });
  }

  return new Response(null, { status: 405 });
};

export const config = { path: '/api/tap' };
