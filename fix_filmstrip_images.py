#!/usr/bin/env python3
"""
fix_filmstrip_images.py
Replaces placeholder hsl background colours on filmstrip cards with actual images.
Only affects index.html (filmstrip only exists there).
"""

import re

DIST = "/Users/richardkelsey/Desktop/aspects-builds-mainenance/dist"
fpath = DIST + "/index.html"

# Map each card's unique hsl placeholder value → image filename
# Order from HTML: Larkhall, Batheaston, Bradford, Widcombe, Keynsham, Melksham, Oldfield Park
REPLACEMENTS = [
    # (old inline style, image path)
    ('style="background: hsl(46.925175645648636, 8%, 90%)"',
     'style="background: url(\'/images/hero-larkhall-extension.jpg\') center/cover no-repeat"'),

    ('style="background: hsl(37.5404708000337, 8%, 90%)"',
     'style="background: url(\'/images/hero-batheaston-renovation.jpg\') center/cover no-repeat"'),

    ('style="background: hsl(37.852535391828965, 8%, 90%)"',
     'style="background: url(\'/images/hero-bradford-loft.jpg\') center/cover no-repeat"'),

    ('style="background: hsl(42, 8%, 90%)"',
     'style="background: url(\'/images/hero-widcombe-basement.jpg\') center/cover no-repeat"'),

    ('style="background: hsl(35, 8%, 90%)"',
     'style="background: url(\'/images/hero-keynsham-newbuild.jpg\') center/cover no-repeat"'),

    ('style="background: hsl(48, 8%, 90%)"',
     'style="background: url(\'/images/hero-melksham-loft.jpg\') center/cover no-repeat"'),

    # Oldfield Park — use a Bath terraced-houses stock image
    ('style="background: hsl(39, 8%, 90%)"',
     'style="background: url(\'/images/row-of-terraced-houses-in-bath-somerset-england-uk-D9C3PR.jpg\') center/cover no-repeat"'),
]

with open(fpath, 'r', encoding='utf-8') as fh:
    content = fh.read()

original = content
for old, new in REPLACEMENTS:
    if old in content:
        content = content.replace(old, new, 1)
        print(f"  ✓ Replaced: {old[:60]}...")
    else:
        print(f"  ✗ NOT FOUND: {old[:60]}...")

if content != original:
    with open(fpath, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f"\nDone — index.html updated with {len(REPLACEMENTS)} image replacements.")
else:
    print("\nNo changes made.")
