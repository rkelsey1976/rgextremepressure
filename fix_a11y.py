#!/usr/bin/env python3
"""
fix_a11y.py
Fixes axe accessibility violations and incomplete items across all dist HTML files.

Changes:
 1. Injects <style id="a11y"> with contrast overrides for footer logo sub + footer bottom text
 2. Stats spans: replaces opacity:.6 with color:var(--concrete)
 3. Services t-label: replaces inline color:var(--steel) with color:var(--concrete)
 4. Footer bottom <p>: removes opacity:.55
 5. Stat number elements: adds role="img" to make aria-label valid
 6. Mobile menu: adds inert attribute to initial state + updates JS toggle
"""

import os, re

DIST = "/Users/richardkelsey/Desktop/aspects-builds-mainenance/dist"

A11Y_CSS = '<style id="a11y">.site-footer .ab-logo__sub{color:rgba(255,255,255,.65)!important}.footer-bottom__inner p,.footer-bottom__inner .t-label,.footer-bottom__inner a{color:#8892A4!important;opacity:1!important}</style>'

MARKER = 'id="a11y"'

# Collect HTML files (excluding _astro/ and non-page files)
html_files = []
for root, dirs, files in os.walk(DIST):
    # skip _astro directory
    dirs[:] = [d for d in dirs if d != '_astro']
    for f in files:
        if f.endswith('.html'):
            html_files.append(os.path.join(root, f))

print(f"Found {len(html_files)} HTML files")

changed = 0
for fpath in sorted(html_files):
    with open(fpath, 'r', encoding='utf-8') as fh:
        content = fh.read()

    original = content

    # ── 1. Inject / replace <style id="a11y"> ──────────────────────────────
    if MARKER in content:
        # Replace existing a11y block
        content = re.sub(r'<style id="a11y">.*?</style>', A11Y_CSS, content, flags=re.DOTALL)
    else:
        # Inject before </head>
        content = content.replace('</head>', A11Y_CSS + '</head>', 1)

    # ── 2. Stats spans: opacity:.6 → color:var(--concrete) ────────────────
    # £ span
    content = content.replace(
        'style="font-size:.45em;opacity:.6;margin-right:.1em;line-height:1"',
        'style="font-size:.45em;color:var(--concrete);margin-right:.1em;line-height:1"'
    )
    # M+ span
    content = content.replace(
        'style="font-size:.45em;opacity:.6;margin-left:.05em;line-height:1"',
        'style="font-size:.45em;color:var(--concrete);margin-left:.05em;line-height:1"'
    )

    # ── 3. Services t-label: steel → concrete ─────────────────────────────
    # Only replace on span.t-label elements with inline color:var(--steel)
    # Use regex to be safe (avoids touching CSS files or other contexts)
    content = re.sub(
        r'(<span\b[^>]*\bt-label\b[^>]*\bstyle="[^"]*?)color:var\(--steel\)',
        r'\1color:var(--concrete)',
        content
    )

    # ── 4. Footer bottom <p>: remove opacity:.55 ──────────────────────────
    content = content.replace(
        'style="font-size:.7rem;line-height:1.5;opacity:.55"',
        'style="font-size:.7rem;line-height:1.5"'
    )

    # ── 5. Stat number role="img" ──────────────────────────────────────────
    # Only add role="img" if aria-label present and role not already set
    # stat-number spans with aria-label
    content = re.sub(
        r'(<span class="stat-number")( data-odometer="[^"]*" (?:data-suffix="[^"]*" )?aria-label="[^"]*")',
        lambda m: m.group(1) + ' role="img"' + m.group(2) if 'role=' not in m.group(0) else m.group(0),
        content
    )
    # stat-number div with aria-label (the £18M+ div)
    content = re.sub(
        r'(<div class="stat-number" aria-label="[^"]*")',
        lambda m: m.group(1).replace('<div class="stat-number"', '<div class="stat-number" role="img"') if 'role=' not in m.group(1) else m.group(1),
        content
    )

    # ── 6. Mobile menu: add inert to initial state ─────────────────────────
    # Add inert to the initial mobile-menu div
    content = content.replace(
        'class="mobile-menu" id="mobile-menu" aria-hidden="true" data-astro-cid-37fxchfa>',
        'class="mobile-menu" id="mobile-menu" aria-hidden="true" inert data-astro-cid-37fxchfa>'
    )
    # Update close button onclick to also set inert
    content = content.replace(
        "m.classList.remove('is-open');m.setAttribute('aria-hidden','true');document.getElementById('nav-burger').setAttribute('aria-expanded','false');",
        "m.classList.remove('is-open');m.setAttribute('aria-hidden','true');m.setAttribute('inert','');document.getElementById('nav-burger').setAttribute('aria-expanded','false');"
    )

    if content != original:
        with open(fpath, 'w', encoding='utf-8') as fh:
            fh.write(content)
        changed += 1
        print(f"  Updated: {os.path.relpath(fpath, DIST)}")

print(f"\nDone — {changed}/{len(html_files)} files updated.")


# ── 7. Fix nav-burger JS in hoisted.BSVbWn2E.js ───────────────────────────
js_path = os.path.join(DIST, "_astro", "hoisted.BSVbWn2E.js")
if os.path.exists(js_path):
    with open(js_path, 'r', encoding='utf-8') as fh:
        js = fh.read()

    # The burger click handler toggles aria-hidden — add inert toggle alongside it
    old_js = 'q?.setAttribute("aria-hidden",String(!t)),document.body.style.overflow=t?"hidden":""'
    new_js = 'q?.setAttribute("aria-hidden",String(!t)),t?q?.removeAttribute("inert"):q?.setAttribute("inert",""),document.body.style.overflow=t?"hidden":""'

    if old_js in js:
        js = js.replace(old_js, new_js)
        with open(js_path, 'w', encoding='utf-8') as fh:
            fh.write(js)
        print(f"\nUpdated JS: _astro/hoisted.BSVbWn2E.js (inert toggle added)")
    elif new_js in js:
        print(f"\nJS already patched: _astro/hoisted.BSVbWn2E.js")
    else:
        print(f"\nWARNING: Could not find nav-burger pattern in hoisted.BSVbWn2E.js — manual fix needed")
else:
    print(f"\nWARNING: {js_path} not found")
