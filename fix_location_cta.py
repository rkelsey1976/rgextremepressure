#!/usr/bin/env python3
"""
fix_location_cta.py
Replaces the full 3-step contact form on every location page with a
lightweight CTA section that directs visitors to /contact/.

The form was ~15 KB of duplicated HTML per page with zero localisation.
The CTA carries location-specific copy and points to the dedicated
contact page for the actual form submission.

Usage:
  python3 fix_location_cta.py           — apply all pages
  python3 fix_location_cta.py --check   — preview only, no writes
"""

import re, sys
from pathlib import Path

DRY  = '--check' in sys.argv
BASE = Path('dist/locations')

# ── Per-location copy ───────────────────────────────────────────────────────────
LOCATIONS = {
    'bath': {
        'name':   'Bath',
        'sub':    "No obligation. No hard sell. Just honest advice from people who know Bath's buildings inside and out.",
    },
    'batheaston': {
        'name':   'Batheaston',
        'sub':    "No obligation. No hard sell. Honest advice from people experienced with Batheaston's conservation area and listed buildings.",
    },
    'bradford-on-avon': {
        'name':   'Bradford on Avon',
        'sub':    "No obligation. No hard sell. Honest advice from people who know Bradford on Avon's conservation area and Wiltshire planning rules.",
    },
    'keynsham': {
        'name':   'Keynsham',
        'sub':    "No obligation. No hard sell. Honest advice from people who know Keynsham and the BANES planning process.",
    },
    'melksham': {
        'name':   'Melksham',
        'sub':    "No obligation. No hard sell. Honest advice from people familiar with Melksham and Wiltshire Council's planning team.",
    },
}

# ── CTA section template ────────────────────────────────────────────────────────
SECTION_MARKER = '<!-- CTA — replaces 3-step form'

def build_cta(name, sub):
    return f'''\
{SECTION_MARKER} -->
<section class="section loc-cta" id="contact" style="background:var(--chalk);padding-block:clamp(4rem,8vw,7rem);text-align:center">
  <div class="container" style="max-width:680px">
    <span class="t-label" style="color:var(--accent)">Ready to start?</span>
    <h2 style="margin-top:var(--space-l);color:#fff;font-family:var(--font-display);font-size:clamp(2rem,5vw,3.5rem);line-height:1.05;letter-spacing:.02em">
      Let&#39;s talk about<br>your {name} project.
    </h2>
    <p style="margin-top:var(--space-xl);color:rgba(255,255,255,.6);font-size:1rem;line-height:1.75;max-width:46ch;margin-inline:auto">
      {sub}
    </p>
    <div style="margin-top:var(--space-2xl);display:flex;gap:var(--space-l);justify-content:center;flex-wrap:wrap;align-items:center">
      <a href="/contact/" class="btn btn--primary" style="min-width:180px">Get a free quote</a>
      <a href="tel:01225000000" style="display:inline-flex;align-items:center;gap:.6rem;color:rgba(255,255,255,.75);text-decoration:none;font-family:var(--font-display);font-size:1.3rem;letter-spacing:.02em;transition:color .2s" aria-label="Call us on 01225 000000">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
          <path d="M3 3h4l2 4-2.5 1.5a8 8 0 004 4L12 10l4 2v4a2 2 0 01-2 2C6 18 0 12 0 5a2 2 0 012-2h1z" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/>
        </svg>
        01225 000000
      </a>
    </div>
    <p style="margin-top:var(--space-2xl);color:rgba(255,255,255,.3);font-size:.75rem;letter-spacing:.12em;text-transform:uppercase">
      Typical response within one working day
    </p>
  </div>
</section>
'''

# ── Pattern: matches the full 3-step form section ──────────────────────────────
FORM_PATTERN = re.compile(
    r'<section class="section contact-section" id="contact" data-astro-cid-xmivup5a>.*?</section>',
    re.DOTALL
)

# ── Process each page ──────────────────────────────────────────────────────────
total_saved = 0

for slug, data in LOCATIONS.items():
    page = BASE / slug / 'index.html'
    if not page.exists():
        print(f'⚠️  {slug}: page not found — skipping')
        continue

    html     = page.read_text(encoding='utf-8')
    original = html

    # Already converted — idempotent
    if SECTION_MARKER in html:
        print(f'ℹ️  {slug}: CTA already applied — skipping')
        continue

    cta_html = build_cta(data['name'], data['sub'])
    html, count = FORM_PATTERN.subn(cta_html, html)

    if count == 0:
        print(f'⚠️  {slug}: form section pattern not found')
        continue

    saved = len(original) - len(html)
    total_saved += saved

    if DRY:
        print(f'  [dry-run] {slug}: would remove {saved:,} bytes (form → CTA)')
    else:
        page.write_text(html, encoding='utf-8')
        print(f'✅  {slug}: -{saved:,} bytes — form replaced with CTA')

print(f'\n{"[dry-run] " if DRY else ""}fix_location_cta.py complete')
print(f'  Total saved: {total_saved:,} bytes ({total_saved // 1024} KB) across location pages')
