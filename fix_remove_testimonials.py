#!/usr/bin/env python3
"""
fix_remove_testimonials.py
Removes the placeholder testimonials section and its inline CSS from
every page on the site. Run once when ready to add real testimonials
later — just rebuild from Astro and re-run the patch pipeline.

Usage:
  python3 fix_remove_testimonials.py           — apply all pages
  python3 fix_remove_testimonials.py --check   — preview only, no writes
"""

import re, sys
from pathlib import Path

DRY  = '--check' in sys.argv
BASE = Path('dist')

SECTION_OPEN  = '<section class="testimonials-section"'
STYLE_PATTERN = re.compile(
    r'<style>\.testimonials-section\[data-astro-cid-aadlzisc\].*?</style>',
    re.DOTALL
)


def strip_section(html, open_marker):
    """
    Remove a <section> block identified by open_marker, correctly
    handling any nested <section> tags inside it.
    Returns (new_html, True) if found and removed, (html, False) otherwise.
    """
    start = html.find(open_marker)
    if start == -1:
        return html, False

    depth = 0
    pos   = start

    while pos < len(html):
        next_open  = html.find('<section', pos + 1)
        next_close = html.find('</section>', pos + 1)

        if next_close == -1:
            break  # malformed HTML — bail

        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open
        else:
            if depth == 0:
                end = next_close + len('</section>')
                return html[:start] + html[end:], True
            depth -= 1
            pos = next_close

    return html, False


# ── Discover all pages ─────────────────────────────────────────────────────────
pages = sorted(
    {p for p in BASE.rglob('index.html') if '_astro' not in p.parts}
    | {BASE / '404.html'}
)
pages = [p for p in pages if p.exists()]

removed = skipped = 0

for page in pages:
    html     = page.read_text(encoding='utf-8')
    original = html
    changed  = False

    # Skip if already cleaned
    if SECTION_OPEN not in html and not STYLE_PATTERN.search(html):
        continue

    # 1. Remove the HTML section (depth-aware)
    if SECTION_OPEN in html:
        html, ok = strip_section(html, SECTION_OPEN)
        if ok:
            changed = True

    # 2. Remove the inline CSS style block
    html, n = STYLE_PATTERN.subn('', html)
    if n:
        changed = True

    rel = page.relative_to(BASE)
    saved = len(original) - len(html)

    if changed:
        if DRY:
            print(f'  would remove {saved:>7,} bytes  →  {rel}')
        else:
            page.write_text(html, encoding='utf-8')
            print(f'✅  -{saved:>7,} bytes  {rel}')
        removed += 1
    else:
        skipped += 1

prefix = '[dry-run] ' if DRY else ''
print(f'\n{prefix}fix_remove_testimonials.py complete')
print(f'  {removed} page(s) updated, {skipped} already clean')
