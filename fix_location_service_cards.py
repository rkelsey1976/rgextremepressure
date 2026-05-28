#!/usr/bin/env python3
"""
fix_location_service_cards.py
Rewrites the service cards on all 5 location pages from the plain
loc-service-card pattern (numbered, no image) to the svc-item pattern
used on the homepage (image + title + description + "Learn more" CTA).

Also fixes the broken link on House Extensions cards (was /services,
should be /services/extensions).

CSS for svc-item and the grid override lives in site.css — no inline
styles needed here.

Usage:
  python3 fix_location_service_cards.py           — apply all pages
  python3 fix_location_service_cards.py --check   — preview only
"""

import re, sys
from pathlib import Path

DRY  = '--check' in sys.argv
BASE = Path('dist/locations')

# ── Service type → hero image ────────────────────────────────────────────────
# Using the same images already in the project, same as homepage cards.
# Unmapped services fall back to hero-home.jpg (placeholder until client supplies).
IMAGE_MAP = {
    'house extensions':     '/images/hero-larkhall-extension.jpg',
    'loft conversions':     '/images/hero-melksham-loft.jpg',
    'period renovation':    '/images/hero-batheaston-renovation.jpg',
    'basement conversions': '/images/hero-widcombe-basement.jpg',
    'new build':            '/images/hero-keynsham-newbuild.jpg',
    'full refurbishment':   '/images/hero-bradford-loft.jpg',
    'listed building work': '/images/hero-batheaston-renovation.jpg',
    'mill conversions':     '/images/hero-bradford-loft.jpg',
    'garage conversions':   '/images/hero-larkhall-extension.jpg',
}
FALLBACK_IMG = '/images/hero-home.jpg'

LOCATIONS = {
    'bath':             'Bath',
    'batheaston':       'Batheaston',
    'bradford-on-avon': 'Bradford on Avon',
    'keynsham':         'Keynsham',
    'melksham':         'Melksham',
}

ARROW_SVG = '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>'

# Idempotency marker — present in already-converted grids
CONVERTED_MARKER = 'class="svc-item"'


def img_for(title):
    return IMAGE_MAP.get(title.strip().lower(), FALLBACK_IMG)


def fix_href(href, title):
    """Fix the broken House Extensions link."""
    if href == '/services' and 'extension' in title.lower():
        return '/services/extensions'
    return href


def build_card(href, title, desc, loc_name):
    href  = fix_href(href, title)
    img   = img_for(title)
    title = title.strip()
    desc  = re.sub(r'\s+', ' ', desc).strip()
    alt   = f'{title} — {loc_name}'
    return (
        f'<a href="{href}" class="svc-item">\n'
        f'  <img class="svc-item__img" src="{img}" alt="{alt}" loading="lazy">\n'
        f'  <div class="svc-item__body">\n'
        f'    <span class="svc-item__name">{title}</span>\n'
        f'    <p class="svc-item__desc">{desc}</p>\n'
        f'    <span class="svc-item__link">Learn more {ARROW_SVG}</span>\n'
        f'  </div>\n'
        f'</a>'
    )


# ── Card extraction regex ────────────────────────────────────────────────────
CARD_RE = re.compile(
    r'<a href="([^"]+)" class="loc-service-card"[^>]*>'   # href
    r'.*?<h3[^>]*>([^<]+)</h3>'                           # title
    r'.*?<p[^>]*>(.*?)</p>'                               # description
    r'.*?</a>',
    re.DOTALL
)

# Grid opening tag (preserve data-astro-cid + stagger for JS)
GRID_OPEN_RE  = re.compile(r'<div class="loc-services__grid[^"]*"[^>]*>')
# Everything from grid open to end of section
GRID_TO_END_RE = re.compile(
    r'(<div class="loc-services__grid[^"]*"[^>]*>)'
    r'.*?'
    r'(</div>\s*</div>\s*</section>)',
    re.DOTALL
)


def rewrite_section(html, loc_name):
    """
    Find the loc-services section, extract all card data, rebuild with
    svc-item pattern. Returns (new_html, cards_rewritten).
    """
    # Find the full loc-services section
    sec_m = re.search(
        r'<section[^>]*loc-services[^>]*>.*?</section>',
        html, re.DOTALL
    )
    if not sec_m:
        return html, 0

    section = sec_m.group(0)

    # Already converted?
    if CONVERTED_MARKER in section:
        return html, -1  # -1 = already done

    # Extract cards
    cards = CARD_RE.findall(section)
    if not cards:
        return html, 0

    # Build new card HTML
    new_cards = '\n'.join(
        build_card(href, title, desc, loc_name)
        for href, title, desc in cards
    )

    # Replace grid contents, keep outer wrappers intact
    new_section = GRID_TO_END_RE.sub(
        lambda m: m.group(1) + '\n' + new_cards + '\n' + m.group(2),
        section
    )

    return html.replace(section, new_section, 1), len(cards)


# ── Run ──────────────────────────────────────────────────────────────────────
for slug, loc_name in LOCATIONS.items():
    page = BASE / slug / 'index.html'
    if not page.exists():
        print(f'⚠️  {slug}: not found')
        continue

    html     = page.read_text(encoding='utf-8')
    new_html, count = rewrite_section(html, loc_name)

    if count == -1:
        print(f'ℹ️  {slug}: already converted — skipping')
    elif count == 0:
        print(f'⚠️  {slug}: no cards found or section missing')
    else:
        if DRY:
            print(f'  [dry-run] {slug}: {count} cards would be rewritten')
        else:
            page.write_text(new_html, encoding='utf-8')
            print(f'✅  {slug}: {count} cards rewritten to svc-item pattern')
