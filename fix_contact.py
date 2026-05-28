#!/usr/bin/env python3
"""
fix_contact.py
Restructures the contact page layout:
  • Two-column layout — form left, contact info right
  • Fixed address (removes data-astro-cid artifacts from <br> tags)
  • Simplified map section (wider, no duplicate address block)
  • Fixed meta title/description
  • GDPR note near submit
  • Response promise + trust badges in info column
"""
import re
from pathlib import Path

CONTACT = Path('dist/contact/index.html')
html = CONTACT.read_text(encoding='utf-8')
changes = 0

# ── 1. Meta title ──────────────────────────────────────────────────────────────
old = '<title>Construction Projects Bath &amp; BANES | Aspect Builds and Maintenance</title>'
new = '<title>Contact Us | Aspect Builds and Maintenance | Bath &amp; Somerset</title>'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  meta title')
else:
    print('⚠️   meta title: not found')

# ── 2. Meta description ────────────────────────────────────────────────────────
old = 'content="View our completed construction projects across Bath, Batheaston, Bradford on Avon, Melksham and Keynsham. Extensions, loft conversions, period renovation and new build."'
new = 'content="Get in touch with Aspect Builds and Maintenance. No-obligation quotes for extensions, loft conversions, renovations and new builds across Bath and Somerset."'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  meta description')
else:
    print('⚠️   meta description: not found')

# ── 3. Canonical URL ──────────────────────────────────────────────────────────
old = '<link rel="canonical" href="https://aspectbuilds.co.uk/projects/">'
new = '<link rel="canonical" href="https://aspectbuilds.co.uk/contact/">'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  canonical URL')
else:
    print('⚠️   canonical URL: not found')

# ── 4. OG URL ─────────────────────────────────────────────────────────────────
old = '<meta property="og:url" content="https://aspectbuilds.co.uk/projects/">'
new = '<meta property="og:url" content="https://aspectbuilds.co.uk/contact/">'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  og:url')
else:
    print('⚠️   og:url: not found')

# ── 5. OG title ───────────────────────────────────────────────────────────────
old = '<meta property="og:title" content="Construction Projects Bath &#38; BANES | Aspect Builds and Maintenance">'
new = '<meta property="og:title" content="Contact Us | Aspect Builds and Maintenance | Bath &amp; Somerset">'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  og:title')
else:
    print('⚠️   og:title: not found')

# ── 6. Hero content padding — match services/location pages ──────────────────
# Services/location use padding-block:clamp(6rem,10vw,8rem) on both ends.
# Contact about-hero had a shorter bottom padding — align them.
old = 'padding-top:clamp(6rem,10vw,8rem);padding-bottom:clamp(3rem,6vw,5rem);display:flex;flex-direction:column;gap:var(--space-m)'
new = 'padding-block:clamp(6rem,10vw,8rem);display:flex;flex-direction:column;gap:var(--space-m)'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  hero padding-block')
else:
    print('⚠️   hero padding-block: not found')

# ── 7. Add responsive CSS for two-col form grid ────────────────────────────────
old = ('@media(max-width:600px){.contact-process [style*="grid-template-columns"]'
       '{grid-template-columns:1fr!important}.contact-map [style*="grid-template-columns"]'
       '{grid-template-columns:1fr!important}}')
new = (old + '\n'
       '@media(max-width:900px){'
       '.contact-form-grid{grid-template-columns:1fr!important}'
       '.contact-form-grid>div:last-child{position:static!important}'
       '}')
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  responsive CSS')
else:
    print('⚠️   responsive CSS: not found')

# ── 7. Replace Form Section + Map Section ─────────────────────────────────────
NEW_SECTIONS = '''\
<!-- Form + Contact Section -->
<section class="section contact-section" id="contact" style="background:var(--white);padding-block:clamp(3rem,6vw,5rem)">
  <div class="container">
    <div class="contact-form-grid" style="display:grid;grid-template-columns:1fr .55fr;gap:clamp(3rem,6vw,6rem);align-items:start">

      <!-- Form column -->
      <div>
        <h2 class="about-section__headline" style="margin-bottom:var(--space-xs)">Send us a message.</h2>
        <p style="margin-bottom:var(--space-xl);max-width:52ch;font-size:.95rem;line-height:1.65;color:var(--concrete)">Tell us about your project and we will get back to you within one working day.</p>
        <form class="contact-form" style="background:var(--stone);padding:clamp(2rem,4vw,3rem)">
          <div class="field" style="margin-bottom:var(--space-l)">
            <label class="field__label" for="service">What are you building?</label>
            <select id="service" name="service" style="background:#1A233208;border:1px solid var(--border);color:var(--chalk);padding:.9rem 1.1rem;font-family:var(--font-body);font-size:.88rem;width:100%;outline:none;appearance:none;-webkit-appearance:none;background-image:url(&quot;data:image/svg+xml,%3Csvg xmlns=&apos;http://www.w3.org/2000/svg&apos; width=&apos;12&apos; height=&apos;8&apos;%3E%3Cpath d=&apos;M1 1l5 5 5-5&apos; stroke=&apos;%23777&apos; stroke-width=&apos;1.5&apos; fill=&apos;none&apos;/%3E%3C/svg%3E&quot;);background-repeat:no-repeat;background-position:right 1rem center;cursor:pointer;transition:border-color .2s">
              <option value="" disabled selected>Select a service</option>
              <option value="extensions">House Extensions</option>
              <option value="loft">Loft Conversions</option>
              <option value="renovation">Period Renovation</option>
              <option value="new-build">New Build</option>
              <option value="basement">Basement Conversions</option>
              <option value="refurbishment">Full Refurbishment</option>
              <option value="maintenance">Property Maintenance</option>
              <option value="repairs">Repairs</option>
              <option value="kitchens">Kitchens</option>
              <option value="outdoor">Outdoor &amp; Landscaping</option>
            </select>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-l)">
            <div class="field">
              <label class="field__label" for="name">Full name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" style="background:#1A233208;border:1px solid var(--border);color:var(--chalk);padding:.9rem 1.1rem;font-family:var(--font-body);font-size:.88rem;width:100%;outline:none;transition:border-color .2s"/>
            </div>
            <div class="field">
              <label class="field__label" for="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="01225..." style="background:#1A233208;border:1px solid var(--border);color:var(--chalk);padding:.9rem 1.1rem;font-family:var(--font-body);font-size:.88rem;width:100%;outline:none;transition:border-color .2s"/>
            </div>
          </div>
          <div class="field" style="margin-top:var(--space-l)">
            <label class="field__label" for="email">Email address</label>
            <input id="email" name="email" type="email" required placeholder="hello@..." style="background:#1A233208;border:1px solid var(--border);color:var(--chalk);padding:.9rem 1.1rem;font-family:var(--font-body);font-size:.88rem;width:100%;outline:none;transition:border-color .2s"/>
          </div>
          <div class="field" style="margin-top:var(--space-l)">
            <label class="field__label" for="message">Tell us about your project</label>
            <textarea id="message" name="message" rows="4" placeholder="What work do you need? Where is your property?" style="background:#1A233208;border:1px solid var(--border);color:var(--chalk);padding:.9rem 1.1rem;font-family:var(--font-body);font-size:.88rem;width:100%;outline:none;resize:vertical;transition:border-color .2s"></textarea>
          </div>
          <button type="submit" class="btn btn--primary" style="width:100%;margin-top:var(--space-xl)">Send message</button>
          <p style="margin-top:var(--space-m);font-size:.78rem;color:var(--concrete);line-height:1.5">Your details are kept private. We never share your information. See our <a href="/privacy" style="color:inherit;text-decoration:underline">Privacy Policy</a>.</p>
        </form>
      </div>

      <!-- Info column -->
      <div style="position:sticky;top:5rem">
        <p class="t-label" style="color:var(--accent);margin-bottom:var(--space-l)">Or reach us directly</p>
        <a href="tel:01225000000" style="display:block;font-family:var(--font-display);font-size:clamp(1.4rem,2.2vw,1.9rem);font-weight:700;color:var(--chalk);text-decoration:none;line-height:1.1;margin-bottom:var(--space-s);transition:color .2s">01225 000000</a>
        <a href="mailto:hello@aspectbuilds.co.uk" style="display:inline-flex;align-items:center;gap:var(--space-s);font-size:.9rem;color:var(--concrete);text-decoration:none;transition:color .2s;margin-bottom:var(--space-xl)">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true"><rect x="1" y="4" width="16" height="11" rx="2" stroke="currentColor" stroke-width="1.3" fill="none"/><path d="M1 4l8 6 8-6" stroke="currentColor" stroke-width="1.3" fill="none" stroke-linecap="round"/></svg>
          hello@aspectbuilds.co.uk
        </a>
        <div style="border-top:1px solid var(--border);padding-top:var(--space-l);margin-bottom:var(--space-l)">
          <p style="font-weight:600;font-size:.9rem;margin-bottom:var(--space-xs)">Aspect Builds &amp; Maintenance</p>
          <p style="color:var(--concrete);font-size:.88rem;line-height:1.7">Bath Road<br>Keynsham<br>Bath &amp; North East Somerset<br>BS31 1XX</p>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:var(--space-l);margin-bottom:var(--space-l)">
          <p style="font-weight:600;font-size:.875rem;margin-bottom:var(--space-xs)">Office hours</p>
          <div style="display:grid;grid-template-columns:auto 1fr;gap:0 var(--space-l);color:var(--concrete);font-size:.875rem;line-height:2">
            <span>Mon&ndash;Fri</span><span>8:00 &ndash; 18:00</span>
            <span>Saturday</span><span>9:00 &ndash; 12:00</span>
            <span>Sunday</span><span>Closed</span>
          </div>
        </div>
        <div style="border-top:1px solid var(--border);padding-top:var(--space-l)">
          <div style="display:flex;gap:var(--space-s);flex-wrap:wrap;margin-bottom:var(--space-l)">
            <span style="font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.3rem .65rem;border:1px solid var(--border);color:var(--concrete)">FMB Member</span>
            <span style="font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.3rem .65rem;border:1px solid var(--border);color:var(--concrete)">TrustMark</span>
            <span style="font-size:.7rem;font-weight:600;letter-spacing:.1em;text-transform:uppercase;padding:.3rem .65rem;border:1px solid var(--border);color:var(--concrete)">BANES Award</span>
          </div>
          <p style="display:flex;align-items:center;gap:.5rem;font-size:.85rem;color:var(--concrete)">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"><path d="M2 7l4 4 6-6" stroke="var(--accent)" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
            We reply within one working day
          </p>
        </div>
      </div>

    </div>
  </div>
</section>

<!-- Map Section -->
<section class="section contact-map" style="background:var(--stone);padding-block:clamp(3rem,6vw,5rem)">
  <div class="container">
    <h2 class="about-section__headline" style="margin-bottom:var(--space-l)">Find us.</h2>
    <div style="border-radius:var(--radius);overflow:hidden;aspect-ratio:21/9;min-height:280px">
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.8!2d-2.4919!3d51.4142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sKeynsham%2C+Bath!5e0!3m2!1sen!2suk!4v1" width="100%" height="100%" style="border:0;display:block" allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Aspect Builds and Maintenance location in Keynsham"></iframe>
    </div>
  </div>
</section>

'''

pattern = re.compile(r'<!-- Form Section -->.*?<!-- What Happens Next -->', re.DOTALL)
replacement = NEW_SECTIONS + '<!-- What Happens Next -->'
new_html, count = pattern.subn(replacement, html)
if count:
    html = new_html; changes += count
    print('✅  form + map sections restructured')
else:
    print('⚠️   form + map: pattern not found')

# ── 8. "What happens next" — fix section background ──────────────────────────
# --chalk is #1A2332 (dark navy) — heading text inherits the same colour, invisible.
# Page uses white/stone alternation; this should be --white before the dark footer.
old = '<section class="section contact-process" data-astro-cid-xmivup5a style="background:var(--chalk);padding-block:clamp(3rem,6vw,5rem)">'
new = '<section class="section contact-process" data-astro-cid-xmivup5a style="background:var(--white);padding-block:clamp(3rem,6vw,5rem)">'
if old in html:
    html = html.replace(old, new); changes += 1
    print('✅  process section background')
else:
    print('⚠️   process section background: not found')

# ── Write ──────────────────────────────────────────────────────────────────────
CONTACT.write_text(html, encoding='utf-8')
print(f'\n{changes} change(s) written → {CONTACT}')
