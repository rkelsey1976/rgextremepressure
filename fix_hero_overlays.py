#!/usr/bin/env python3
"""
fix_hero_overlays.py
Strips inline style="" attributes from hero overlay elements so site.css
can own the background gradient for every hero type consistently.

Affected pages:
  - dist/about/index.html           (.about-hero__overlay)
  - dist/contact/index.html         (.about-hero__overlay)
  - dist/projects/index.html        (.proj-hero__overlay)
  - dist/projects/*/index.html ×6   (.pj-hero__overlay)

The homepage .hero__overlay and all svc/loc overlays are already managed
via inline <style> blocks or site.css respectively — they are untouched.

Also strips the redundant inline <style> blocks on project detail pages
and the projects index that duplicate text-colour and nav rules already
covered by site.css.

After this script, site.css is the single source of truth for ALL hero
overlay backgrounds. Run patch_shared.py first (or after) to keep
site.css linked everywhere.

Usage:
  python3 fix_hero_overlays.py           — apply all pages
  python3 fix_hero_overlays.py --check   — preview only, no writes
"""

import re, sys
from pathlib import Path

DRY  = '--check' in sys.argv
BASE = Path('dist')

# ── Elements whose inline style="" attributes we strip ────────────────────────
# Regex strips the style attribute from <div class="<OVERLAY_CLASS>" ...>
# It handles optional data-astro-cid-* attribute before or after style.
OVERLAY_CLASSES = [
    'pj-hero__overlay',
    'proj-hero__overlay',
    'about-hero__overlay',
]

# Matches:  <div class="<cls>" [data-astro-cid-*] style="..." [data-astro-cid-*]>
# Captures groups: (before-style)(after-style)
def make_overlay_re(cls):
    return re.compile(
        r'(<div class="' + re.escape(cls) + r'"(?:\s+[^>]*?)?)'
        r'\s+style="[^"]*"'
        r'([^>]*>)',
        re.DOTALL
    )

OVERLAY_RES = [(cls, make_overlay_re(cls)) for cls in OVERLAY_CLASSES]


# ── Inline <style> blocks to strip on specific pages ─────────────────────────
# These blocks duplicated text-colour + nav-transparent rules that are now
# covered by site.css.  Identified by their opening comment.
STRIP_BLOCKS = [
    # "Project hero photo - white text" — proj-hero text colours (projects idx + contact)
    re.compile(r'<style>\s*/\* Projects? hero photo - white text \*/.*?</style>', re.DOTALL),
    # "Project hero photo - white text" alternate spelling (project detail pages)
    re.compile(r'<style>\s*/\* Project hero photo - white text \*/.*?</style>', re.DOTALL),
    # "Dark hero nav - white overlay" — nav + hero padding (projects idx, about, contact, detail)
    re.compile(r'<style>\s*/\* Dark hero nav - white overlay \*/.*?</style>', re.DOTALL),
    # "Mobile dark hero fixes" — mobile pj-hero overlay (project detail pages)
    re.compile(r'<style>\s*/\* Mobile dark hero fixes \*/.*?</style>', re.DOTALL),
    # "Dark hero nav" — about-hero padding on about page
    re.compile(r'<style>\s*/\* Dark hero nav \*/.*?</style>', re.DOTALL),
]

# ── Discover pages ────────────────────────────────────────────────────────────
pages = sorted(
    p for p in BASE.rglob('index.html')
    if '_astro' not in p.parts
)
pages = [p for p in pages if p.exists()]

changed_count = 0

for page in pages:
    html     = page.read_text(encoding='utf-8')
    original = html
    log      = []

    # 1. Strip inline style attributes from overlay elements
    for cls, pattern in OVERLAY_RES:
        new_html, n = pattern.subn(r'\1\2', html)
        if n:
            log.append(f'{n}× .{cls} inline style stripped')
            html = new_html

    # 2. Strip redundant inline <style> blocks
    for pat in STRIP_BLOCKS:
        new_html, n = pat.subn('', html)
        if n:
            log.append(f'{n}× inline <style> block stripped')
            html = new_html

    if html != original:
        rel = page.relative_to(BASE)
        if DRY:
            print(f'  [dry-run] {rel}:')
            for msg in log: print(f'    {msg}')
        else:
            page.write_text(html, encoding='utf-8')
            print(f'✅  {rel}:')
            for msg in log: print(f'    {msg}')
        changed_count += 1

prefix = '[dry-run] ' if DRY else ''
print(f'\n{prefix}fix_hero_overlays.py complete — {changed_count} page(s) updated')
