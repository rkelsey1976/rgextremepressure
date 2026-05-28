#!/usr/bin/env python3
"""
fix_service_cards.py
Converts two remaining non-standard card patterns to the shared svc-item
component used on the homepage and location pages:

  1. Services index (dist/services/index.html)
       svc-hub-card  →  svc-item
       Strips the inline <style> block for svc-hub-card / svc-hub-grid.

  2. Service detail pages (×10)
       related-card  →  svc-item  (adds image + description from SERVICE_DATA)

CSS for the grid containers (svc-hub-grid, related-grid) lives in site.css —
run patch_shared.py after this script if you haven't already.

Usage:
  python3 fix_service_cards.py           — apply all pages
  python3 fix_service_cards.py --check   — preview only, no writes
"""

import re, sys
from pathlib import Path

DRY  = '--check' in sys.argv
BASE = Path('dist/services')

ARROW_SVG = ('<svg width="14" height="14" viewBox="0 0 14 14" fill="none" '
             'aria-hidden="true"><path d="M1 7h12M7 1l6 6-6 6" stroke="currentColor" '
             'stroke-width="1.5" stroke-linecap="round"/></svg>')

# Idempotency marker
CONVERTED_MARKER = 'class="svc-item"'

# ── Service data ─────────────────────────────────────────────────────────────
# Keyed by directory slug (matches dist/services/<slug>/).
# 'dir' is used to find the page; 'href' is the canonical link target.
SERVICE_DATA = {
    'extensions': {
        'href':  '/services/extensions',
        'title': 'House Extensions',
        'img':   '/images/hero-larkhall-extension.jpg',
        'desc':  ('The test of a good extension is simple: does it look like it was '
                  'always there? After twelve years in Bath, we know exactly what that '
                  'takes — and exactly what BANES will and will not approve.'),
    },
    'loft-conversions': {
        'href':  '/services/loft-conversions',
        'title': 'Loft Conversions',
        'img':   '/images/hero-melksham-loft.jpg',
        'desc':  ('Bath’s premium rooflines hide extraordinary potential. From a Velux '
                  'conversion at £28k to a full mansard at £75k+, we unlock the space '
                  'above you.'),
    },
    'period-renovation': {
        'href':  '/services/period-renovation',
        'title': 'Period Renovation',
        'img':   '/images/hero-batheaston-renovation.jpg',
        'desc':  ('Bath stone. Lime mortar. Sash windows. We understand the material '
                  'language of Bath’s heritage properties — and how to modernise them '
                  'without losing their soul.'),
    },
    'new-build': {
        'href':  '/services/new-build',
        'title': 'New Build',
        'img':   '/images/hero-keynsham-newbuild.jpg',
        'desc':  ('The best new homes earn their place. They do not ignore the street, '
                  'they do not ape the neighbours, and they do not compromise on '
                  'performance to save a few pounds during construction.'),
    },
    'basement-conversions': {
        'href':  '/services/basement-conversions',
        'title': 'Basement Conversions',
        'img':   '/images/hero-widcombe-basement.jpg',
        'desc':  ('Bath’s city-centre terraces sit on a wealth of untapped space. We '
                  'convert cellars and basements into extraordinary living areas — light '
                  'wells, waterproofing, full fit-out.'),
    },
    'refurbishment': {
        'href':  '/services/refurbishment',
        'title': 'Full Refurbishment',
        'img':   '/images/hero-bradford-loft.jpg',
        'desc':  'The best time to fix a property is all at once. One programme, one contract, one fixed price.',
    },
    'property-maintenance': {
        'href':  '/services/property-maintenance',
        'title': 'Property Maintenance',
        'img':   '/images/hero-home.jpg',
        'desc':  'A property that is looked after costs less to run, lets for more, and stands longer. Fixed monthly fees, priority callouts.',
    },
    'repairs': {
        'href':  '/services/repairs',
        'title': 'Repairs',
        'img':   '/images/the-royal-crescent-terrace-of-georgian-houses-with-ornate-railings-DBHYY1.jpg',
        'desc':  'A repair that fails within a year was not a repair — it was a delay. We investigate, specify, and build repairs that hold.',
    },
    'kitchens': {
        'href':  '/services/kitchens',
        'title': 'Kitchens',
        'img':   '/images/falco-bath-510548_1920.jpg',
        'desc':  'A kitchen is not a showroom. We design and build kitchens that work as hard as they look.',
    },
    'outdoor-and-landscaping': {
        'href':  '/services/outdoor-landscaping',
        'title': 'Outdoor &amp; Landscaping',
        'img':   '/images/bath-somerset-england-uk-BY1GJE.jpg',
        'desc':  'Patios that drain, walls that hold, and rooms that happen to be in the garden.',
    },
}

# Lookup by lowercase display title → service key (for related-card matching)
_TITLE_MAP = {v['title'].lower().replace('&amp;', '&'): k
              for k, v in SERVICE_DATA.items()}

# href-slug → SERVICE_DATA key (for cases where URL slug differs from dir name)
_HREF_MAP = {v['href'].split('/')[-1]: k for k, v in SERVICE_DATA.items()}


def build_card(svc):
    """Build a svc-item <a> element from a SERVICE_DATA entry."""
    return (
        f'<a href="{svc["href"]}" class="svc-item">\n'
        f'  <img class="svc-item__img" src="{svc["img"]}" alt="{svc["title"].replace("&amp;", "&amp;")} — Aspect Builds" loading="lazy">\n'
        f'  <div class="svc-item__body">\n'
        f'    <span class="svc-item__name">{svc["title"]}</span>\n'
        f'    <p class="svc-item__desc">{svc["desc"]}</p>\n'
        f'    <span class="svc-item__link">Learn more {ARROW_SVG}</span>\n'
        f'  </div>\n'
        f'</a>'
    )


# ── Regex: inline style block on services index ──────────────────────────────
HUB_STYLE_RE = re.compile(
    r'<style>\s*\.svc-hub-grid\{.*?</style>',
    re.DOTALL
)

# ── Regex: full svc-hub-card element ─────────────────────────────────────────
HUB_CARD_RE = re.compile(
    r'<a\s[^>]*class="svc-hub-card"[^>]*>.*?</a>',
    re.DOTALL
)

# ── Regex: full related-card element ─────────────────────────────────────────
RELATED_CARD_RE = re.compile(
    r'<a\s[^>]*class="related-card"[^>]*>.*?</a>',
    re.DOTALL
)


def hub_card_to_svc(match):
    """Replace one svc-hub-card match with the corresponding svc-item."""
    block = match.group(0)
    # Extract href
    href_m = re.search(r'href="(/services/[^"]+)"', block)
    if not href_m:
        return block  # bail — don't corrupt unknown card
    href = href_m.group(1)
    href_slug = href.split('/')[-1]
    # Try direct key first, then href-slug map (covers dir-name ≠ url-slug)
    svc = SERVICE_DATA.get(href_slug) or SERVICE_DATA.get(_HREF_MAP.get(href_slug, ''))
    if not svc:
        return block
    return build_card(svc)


def related_card_to_svc(match):
    """Replace one related-card match with the corresponding svc-item."""
    block = match.group(0)
    # Extract title text
    title_m = re.search(r'<h3[^>]*>([^<]+)</h3>', block)
    href_m  = re.search(r'href="([^"]+)"', block)
    if not title_m or not href_m:
        return block
    title = title_m.group(1).strip()
    key   = _TITLE_MAP.get(title.lower())
    svc   = SERVICE_DATA.get(key) if key else None
    if not svc:
        # Fallback: no image / desc available — keep original
        return block
    return build_card(svc)


# ── 1. Services index ─────────────────────────────────────────────────────────
index_page = BASE / 'index.html'
if index_page.exists():
    html = index_page.read_text(encoding='utf-8')

    if CONVERTED_MARKER in html:
        print('ℹ️  services/index: already converted — skipping')
    else:
        # Strip the inline svc-hub-card style block
        html, n_style = HUB_STYLE_RE.subn('', html)

        # Rewrite each hub card
        html, n_cards = HUB_CARD_RE.subn(hub_card_to_svc, html)

        if DRY:
            print(f'  [dry-run] services/index: {n_cards} hub cards → svc-item, {n_style} style block(s) stripped')
        else:
            index_page.write_text(html, encoding='utf-8')
            print(f'✅  services/index: {n_cards} hub cards → svc-item, {n_style} style block(s) stripped')
else:
    print('⚠️  services/index.html not found')


# ── 2. Service detail pages ───────────────────────────────────────────────────
detail_pages = sorted(
    p for p in BASE.iterdir()
    if p.is_dir() and (p / 'index.html').exists()
)

for page_dir in detail_pages:
    page = page_dir / 'index.html'
    html = page.read_text(encoding='utf-8')

    # Check section exists
    if 'class="related-card"' not in html:
        # Already converted or section absent
        if CONVERTED_MARKER in html and 'svc-related' in html:
            print(f'ℹ️  services/{page_dir.name}: related cards already converted — skipping')
        else:
            print(f'⚠️  services/{page_dir.name}: no related-card section found')
        continue

    html, n = RELATED_CARD_RE.subn(related_card_to_svc, html)

    if DRY:
        print(f'  [dry-run] services/{page_dir.name}: {n} related cards → svc-item')
    else:
        page.write_text(html, encoding='utf-8')
        print(f'✅  services/{page_dir.name}: {n} related cards → svc-item')
