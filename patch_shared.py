#!/usr/bin/env python3
"""
patch_shared.py
Deploys dist/_astro/site.css to every page and strips inline style
blocks that are now superseded by site.css.

Usage:
  python3 patch_shared.py           — apply to all pages
  python3 patch_shared.py --check   — preview only, no writes

Run this once after every Astro rebuild, before page-specific
scripts (fix_contact.py, fix_filmstrip_images.py, etc.).
"""
import re, sys
from pathlib import Path

DRY      = '--check' in sys.argv
BASE     = Path('dist')
CSS_FILE = BASE / '_astro' / 'site.css'
LINK_TAG = '<link rel="stylesheet" href="/_astro/site.css">'

# ── Discover pages ─────────────────────────────────────────────────────────────
pages = sorted({
    *BASE.rglob('index.html'),
    BASE / '404.html',
} - {p for p in BASE.rglob('index.html') if '_astro' in p.parts})
pages = [p for p in pages if p.exists()]

# ── Inline blocks to strip (superseded by site.css) ───────────────────────────
# Each pattern targets a distinct style block injected by the Astro build or
# earlier patch scripts. All are now covered by site.css.
STRIP = [
    # Legacy a11y / mobile-centre blocks (from earlier patch scripts)
    re.compile(r'<style id="mob-centre">.*?</style>', re.DOTALL),
    re.compile(r'<style id="a11y">.*?</style>',       re.DOTALL),

    # Footer spacing — desktop and mobile (site.css §FOOTER)
    re.compile(r'<style>\s*/\* Footer spacing tighten \*/.*?</style>', re.DOTALL),
    re.compile(r'<style>\s*/\* Premium mobile footer \*/.*?</style>',  re.DOTALL),

    # Old ab-logo + partial nav-transparent block (site.css §LOGO + §NAVIGATION)
    # Identified by .ab-logo being the first rule; only strips the narrow old block.
    re.compile(r'<style>\s*\.ab-logo\{display:flex!important.*?</style>', re.DOTALL),

    # Dark hero treatment — hero bg, pills, breadcrumb, CTA (site.css §HERO)
    re.compile(r'<style>\s*/\* ── Dark hero treatment ── \*/.*?</style>', re.DOTALL),

    # Services index hub-card styles (now superseded by svc-item in site.css)
    re.compile(r'<style>\s*\.svc-hub-grid\{.*?</style>', re.DOTALL),
]

# ── Process each page ──────────────────────────────────────────────────────────
injected = skipped = stripped_total = 0

for page in pages:
    html     = page.read_text(encoding='utf-8')
    original = html

    # Strip redundant inline blocks first (runs on every pass, idempotent)
    for pattern in STRIP:
        html, n = pattern.subn('', html)
        stripped_total += n

    # Inject site.css link if not already present
    if LINK_TAG in html:
        skipped += 1
    elif '</head>' in html:
        html = html.replace('</head>', f'{LINK_TAG}</head>', 1)
        injected += 1

    if html != original:
        if DRY:
            print(f'  would update → {page.relative_to(BASE)}')
        else:
            page.write_text(html, encoding='utf-8')

# ── Summary ───────────────────────────────────────────────────────────────────
prefix = '[dry-run] ' if DRY else ''
print(f'\n{prefix}patch_shared.py complete')
print(f'  {injected:>3} pages injected with site.css link')
print(f'  {stripped_total:>3} redundant inline blocks stripped')
print(f'  {skipped:>3} pages already up to date (site.css link present)')
print(f'\nTo update shared styles: edit dist/_astro/site.css')
print(f'then re-run: python3 patch_shared.py')
