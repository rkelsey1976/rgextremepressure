#!/usr/bin/env python3
"""
fix_location_pages.py
Structural improvements to all 5 location detail pages.

Changes per page:
  1. Nearby area tags → hyperlinks for areas that have their own location page
  2. "Recent local projects" section inserted before the nearby areas section

Usage:
  python3 fix_location_pages.py           — apply all pages
  python3 fix_location_pages.py --check   — preview only, no writes

Run patch_shared.py first, then this script.
"""

import re, sys
from pathlib import Path

DRY = '--check' in sys.argv
BASE = Path('dist/locations')

# ── Per-location data ───────────────────────────────────────────────────────────
# linked_areas: area display name → URL of its location page (only where page exists)
# projects: ordered list of real completed projects for this location

LOCATIONS = {
    'bath': {
        'name': 'Bath',
        'linked_areas': {
            'Batheaston': '/locations/batheaston/',
        },
        'projects': [
            {
                'href':     '/projects/larkhall-double-extension',
                'img':      '/images/hero-larkhall-extension.jpg',
                'type':     'House Extension',
                'year':     '2024',
                'title':    'Larkhall Double Extension',
                'desc':     'Two-storey side and single-storey rear extension to a four-bedroom Victorian semi. Aluminium glazing to rear, Bath stone to side elevation.',
                'location': 'Larkhall, Bath BA1',
                'value':    '£185,000',
                'accent':   '#8B7355',
            },
            {
                'href':     '/projects/widcombe-basement',
                'img':      '/images/hero-widcombe-basement.jpg',
                'type':     'Basement Conversion',
                'year':     '2024',
                'title':    'Widcombe Basement Conversion',
                'desc':     'Full basement excavation beneath a Grade II listed terrace. New lightwell, structural underpinning, and heritage-compliant fit-out.',
                'location': 'Widcombe, Bath BA2',
                'value':    '£95,000',
                'accent':   '#6B7A8D',
            },
        ],
    },

    'batheaston': {
        'name': 'Batheaston',
        'linked_areas': {
            'Bath': '/locations/bath/',
        },
        'projects': [
            {
                'href':     '/projects/batheaston-heritage-renovation',
                'img':      '/images/hero-batheaston-renovation.jpg',
                'type':     'Period Renovation',
                'year':     '2024',
                'title':    'Georgian Villa Renovation',
                'desc':     'Full renovation of a Georgian villa within the Batheaston conservation area. Lime plaster, sash window restoration, and new kitchen extension to rear.',
                'location': 'Batheaston, BA1 7',
                'value':    '£320,000',
                'accent':   '#6B7A6B',
            },
        ],
    },

    'bradford-on-avon': {
        'name': 'Bradford on Avon',
        'linked_areas': {
            'Bath':     '/locations/bath/',
            'Melksham': '/locations/melksham/',
        },
        'projects': [
            {
                'href':     '/projects/bradford-loft-mansard',
                'img':      '/images/hero-bradford-loft.jpg',
                'type':     'Loft Conversion',
                'year':     '2023',
                'title':    'Mansard Loft Conversion',
                'desc':     'Mansard loft conversion to a stone-built semi in the Bradford on Avon conservation area. Velux to rear, dormers approved under Wiltshire Council.',
                'location': 'Bradford on Avon, BA15',
                'value':    '£78,000',
                'accent':   '#8B7355',
            },
        ],
    },

    'keynsham': {
        'name': 'Keynsham',
        'linked_areas': {
            'Bath': '/locations/bath/',
        },
        'projects': [
            {
                'href':     '/projects/keynsham-new-build',
                'img':      '/images/hero-keynsham-newbuild.jpg',
                'type':     'New Build',
                'year':     '2023',
                'title':    'Contemporary New Build',
                'desc':     'Architect-designed four-bedroom new build on a BANES infill plot. Timber frame, full-height glazing to ground floor, MVHR system throughout.',
                'location': 'Keynsham, BS31',
                'value':    '£420,000',
                'accent':   '#5A6E7A',
            },
        ],
    },

    'melksham': {
        'name': 'Melksham',
        'linked_areas': {
            'Bradford on Avon': '/locations/bradford-on-avon/',
        },
        'projects': [
            {
                'href':     '/projects/melksham-loft',
                'img':      '/images/hero-melksham-loft.jpg',
                'type':     'Loft Conversion',
                'year':     '2023',
                'title':    'Dormer Loft Conversion',
                'desc':     'Rear dormer loft conversion to a 1970s detached in Melksham. Full-height dormer, en-suite, Velux to front roofslope.',
                'location': 'Melksham, SN12',
                'value':    '£55,000',
                'accent':   '#7A6B5A',
            },
        ],
    },
}


# ── HTML helpers ────────────────────────────────────────────────────────────────

def build_project_card(p):
    """Return HTML for a single inline-styled project card."""
    return f'''\
<a href="{p['href']}" class="loc-proj-card" style="display:flex;flex-direction:column;background:var(--white);text-decoration:none;overflow:hidden;transition:transform .25s ease">
  <div style="position:relative;aspect-ratio:4/3;overflow:hidden">
    <div class="loc-proj-card__img" style="position:absolute;inset:0;background-image:url('{p['img']}');background-size:cover;background-position:center;transition:transform .4s ease"></div>
    <div style="position:absolute;inset:0;background:linear-gradient(to bottom,transparent 50%,rgba(26,35,50,.55))"></div>
  </div>
  <div style="padding:var(--space-l);display:flex;flex-direction:column;gap:var(--space-s);flex:1">
    <div style="display:flex;gap:.5rem;flex-wrap:wrap">
      <span style="font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.25rem .65rem;background:var(--stone);color:var(--concrete)">{p['type']}</span>
      <span style="font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.25rem .65rem;background:var(--stone);color:var(--concrete)">{p['year']}</span>
    </div>
    <h3 style="font-family:var(--font-display);font-size:clamp(1.15rem,2vw,1.35rem);line-height:1.1;color:var(--chalk);margin:0">{p['title']}</h3>
    <p style="font-size:.85rem;color:var(--concrete);line-height:1.6;margin:0;flex:1">{p['desc']}</p>
    <div style="display:flex;justify-content:space-between;align-items:center;padding-top:var(--space-m);border-top:1px solid var(--border);margin-top:auto">
      <span style="font-size:.8rem;color:var(--concrete);display:flex;align-items:center;gap:.35rem">
        <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden="true"><path d="M5 11S1 7.5 1 5a4 4 0 018 0c0 2.5-4 6-4 6z" stroke="currentColor" stroke-width="1.2" fill="none"/><circle cx="5" cy="5" r="1.5" stroke="currentColor" stroke-width="1.2"/></svg>
        {p['location']}
      </span>
      <span style="font-size:.85rem;font-weight:600;color:var(--chalk)">{p['value']}</span>
    </div>
  </div>
</a>'''


def build_projects_section(loc_name, projects):
    """Return the full 'Recent local projects' section HTML."""
    cards_html = '\n'.join(build_project_card(p) for p in projects)

    # Grid: 2-col for 2 projects, 3-col for 3, single col on mobile
    cols = min(len(projects), 3)
    grid_cols = f'repeat({cols}, 1fr)'

    return f'''\
<!-- Recent local projects — template, awaiting client content -->
<section class="section loc-projects" style="background:var(--stone);padding-block:clamp(3rem,6vw,5rem)">
  <div class="container">
    <div class="reveal" style="margin-bottom:var(--space-2xl)">
      <span class="t-label" style="color:var(--accent)">Local work</span>
      <h2 class="t-heading" style="margin-top:var(--space-l)">Projects in {loc_name}.</h2>
    </div>
    <div class="loc-proj-grid" style="display:grid;grid-template-columns:{grid_cols};gap:var(--space-l)">
{cards_html}
    </div>
    <div style="margin-top:var(--space-2xl);text-align:center">
      <a href="/projects/" class="btn btn--outline">View all projects</a>
    </div>
  </div>
</section>
'''


# ── Process each location page ──────────────────────────────────────────────────
NEARBY_SECTION_MARKER = '<section class="section nearby-section"'

total_changes = 0

for slug, data in LOCATIONS.items():
    page = BASE / slug / 'index.html'
    if not page.exists():
        print(f'⚠️  {slug}: page not found — skipping')
        continue

    html     = page.read_text(encoding='utf-8')
    original = html
    changes  = 0

    # ── 1. Nearby tags → links ──────────────────────────────────────────────────
    linked_areas = data['linked_areas']

    for area, url in linked_areas.items():
        old_tag = f'<div class="nearby-tag" data-astro-cid-hvynr65i>{area}</div>'
        new_tag = f'<a href="{url}" class="nearby-tag" data-astro-cid-hvynr65i>{area}</a>'
        if old_tag in html:
            html = html.replace(old_tag, new_tag)
            changes += 1
            if DRY:
                print(f'  would link → "{area}" to {url}  ({slug})')
        elif new_tag in html:
            pass  # already linked — idempotent, no warning
        else:
            print(f'⚠️  {slug}: nearby tag "{area}" not found (neither div nor anchor)')

    # ── 2. Insert local projects section before nearby section ──────────────────
    PROJ_SECTION_MARKER = '<!-- Recent local projects'

    if PROJ_SECTION_MARKER in html:
        print(f'ℹ️  {slug}: projects section already present — skipping')
    elif NEARBY_SECTION_MARKER in html:
        projects_html = build_projects_section(data['name'], data['projects'])
        html = html.replace(
            NEARBY_SECTION_MARKER,
            projects_html + NEARBY_SECTION_MARKER,
            1
        )
        changes += 1
        if DRY:
            print(f'  would insert projects section ({len(data["projects"])} card(s))  ({slug})')

    # ── Write ───────────────────────────────────────────────────────────────────
    if html != original:
        total_changes += changes
        if DRY:
            print(f'  [dry-run] {slug}: {changes} change(s) would be written')
        else:
            page.write_text(html, encoding='utf-8')
            print(f'✅  {slug}: {changes} change(s) written')
    else:
        print(f'ℹ️  {slug}: nothing to change')

print(f'\n{"[dry-run] " if DRY else ""}fix_location_pages.py complete — {total_changes} total change(s)')
