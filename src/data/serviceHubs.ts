// src/data/serviceHubs.ts
// Service hub database — drives the /{service}/ hub index pages.
//
// ARCHITECTURE NOTE (2026-09-01, additive hub model):
// Before this, /driveway-cleaning/ /patio-cleaning/ /roof-cleaning/ were 404s
// even though they are the URL parent of 48 live /{service}/{area}/ pages.
// These hubs close that gap WITHOUT touching any existing URL — the
// /{service}-bath/ and /{service}-bristol/ city pages stay exactly where they
// are, because they hold every page-1 ranking the site currently has.
// See BREADCRUMB-ARCHITECTURE.md (Option A/C) for the variants we did NOT take.
//
// KEYWORD NOTE: hubs deliberately target REGIONALLY QUALIFIED head terms
// ("driveway cleaning bath & bristol"), never bare national generics. The
// Sept 2026 GSC report showed the site already ranks top-3 nationally for
// "pressure washing" / "render cleaning" / "roof cleaning" and those 3,151
// impressions produced 2 clicks all year. Hubs must not deepen that trap.

export interface ServiceHubFaq {
  q: string;
  a: string;
}

export interface ServiceHub {
  /** Matches the keys used in locations.ts serviceContext */
  id: string;
  /** URL path, no trailing slash */
  href: string;
  /** Short label for breadcrumbs and internal links */
  label: string;
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  heroImage: string;
  /** Editorial block under the hero */
  introHeading: string;
  introBody: string;
  /** What the service covers — rendered as a checklist */
  features: string[];
  /** City page links — these are the money pages, hub feeds them */
  cityPages: { label: string; href: string; blurb: string }[];
  /** True when /{service}/{area}/ pages exist for this service */
  hasAreaPages: boolean;
  faq: ServiceHubFaq[];
  ctaHeading: string;
  ctaBody: string;
  ctaImage: string;
}

export const serviceHubs: ServiceHub[] = [
  // ── Driveway Cleaning ──
  {
    id: 'driveway-cleaning',
    href: '/driveway-cleaning',
    label: 'Driveway Cleaning',
    metaTitle: 'Driveway Cleaning Bath & Bristol | All Areas Covered',
    metaDescription: 'Driveway cleaning across Bath, Bristol and Somerset. Block paving, tarmac, concrete and resin jet washed, re-sanded and sealed. 111 five-star reviews. Call 07474 939 398.',
    heroEyebrow: 'Bath · Bristol · Somerset',
    heroHeading: 'Driveway Cleaning in Bath & Bristol',
    heroBody: 'Block paving, tarmac, concrete and resin driveways jet washed back to their original colour. Oil stains lifted, joints re-sanded, sealing available. Free quotes across every area we cover.',
    heroImage: '/images/before-after/job-gallery-13.webp',
    introHeading: 'One Service, Every Area We Cover',
    introBody: 'A driveway collects everything the weather throws at it — moss in the joints, tyre marks across the entry, oil where the car sits, and a general grey film that creeps in over a few winters. We jet wash to suit the surface rather than blasting everything at the same pressure, then re-sand block paving joints with kiln-dried sand so weeds have nothing to root into. Pick your area below for local detail and pricing, or go straight to the Bath or Bristol page.',
    features: [
      'Block Paving Deep Clean & Kiln-Dried Re-Sand',
      'Tarmac & Concrete Driveway Wash',
      'Oil Stain & Tyre Mark Treatment',
      'Resin Drive Gentle Clean',
      'Edge Restraint Check',
      'Sealant Application Available',
    ],
    cityPages: [
      { label: 'Driveway Cleaning Bath', href: '/driveway-cleaning-bath', blurb: 'Bath and every surrounding district — Georgian frontages, steep shared drives and modern block paving.' },
      { label: 'Driveway Cleaning Bristol', href: '/driveway-cleaning-bristol', blurb: 'All Bristol postcodes BS1–BS16, from Clifton townhouses to Kingswood and Downend estates.' },
    ],
    hasAreaPages: true,
    faq: [
      { q: 'How much does driveway cleaning cost?', a: 'Driveway cleaning typically starts from around £3 per square metre, depending on surface type, condition and access. A standard double driveway usually lands between £120 and £200. Every quote is free and given on site with no obligation.' },
      { q: 'Will jet washing damage my block paving?', a: 'No. We adjust pressure and lance angle to suit the surface. Block paving is cleaned at a medium pressure that lifts dirt and moss without dislodging or etching the blocks, and we re-sand the joints afterwards to stabilise the surface.' },
      { q: 'Do you re-sand the joints afterwards?', a: 'Yes, on block paving that is included as standard. Washing removes the old jointing sand along with the dirt, so leaving it out would let the blocks shift and weeds return within weeks. We use kiln-dried jointing sand.' },
      { q: 'How long does a driveway take?', a: 'A standard double driveway of around 30m² takes two to four hours. Larger or heavily soiled driveways can take a full day. You will get a time estimate at the free site visit.' },
      { q: 'How often should a driveway be cleaned?', a: 'Most driveways in the Bath and Bristol area benefit from a clean every 18 months to two years. North-facing drives and those under trees green up faster and may want annual attention.' },
    ],
    ctaHeading: 'Get a Free Driveway Quote',
    ctaBody: 'Call 07474 939 398 for a free, no-obligation quote on your driveway. We cover Bath, Bristol and the surrounding Somerset and Wiltshire areas.',
    ctaImage: '/images/before-after/drive-after.jpg',
  },

  // ── Patio Cleaning ──
  {
    id: 'patio-cleaning',
    href: '/patio-cleaning',
    label: 'Patio Cleaning',
    metaTitle: 'Patio Cleaning Bath & Bristol | All Areas Covered',
    metaDescription: 'Patio cleaning across Bath, Bristol and Somerset. Indian sandstone, porcelain, slate and concrete — algae, moss and black spot removed safely. 111 five-star reviews.',
    heroEyebrow: 'Bath · Bristol · Somerset',
    heroHeading: 'Patio Cleaning in Bath & Bristol',
    heroBody: 'Indian sandstone, porcelain, slate and concrete slabs brought back without etching the stone. Algae, moss and black spot removed. Free quotes across every area we cover.',
    heroImage: '/images/before-after/job-gallery-02.webp',
    introHeading: 'One Service, Every Area We Cover',
    introBody: 'Patios are where pressure does the most damage in the wrong hands. Indian sandstone scars if you hold a turbo nozzle on it, porcelain needs almost no pressure at all, and old concrete flags will take far more than either. We set the machine to the stone rather than the other way round, and treat black spot lichen chemically because no amount of pressure shifts it. Pick your area below, or go straight to the Bath or Bristol page.',
    features: [
      'Indian Sandstone Patio Cleaning',
      'Porcelain & Slate Tile Washing',
      'Concrete Slab & Flagstone Clean',
      'Black Spot Lichen Treatment',
      'Algae & Moss Removal',
      'Joint Re-Pointing Available',
    ],
    cityPages: [
      { label: 'Patio Cleaning Bath', href: '/patio-cleaning-bath', blurb: 'Bath and surrounding districts — Bath stone terraces, sandstone patios and shaded city gardens.' },
      { label: 'Patio Cleaning Bristol', href: '/patio-cleaning-bristol', blurb: 'All Bristol postcodes — from Redland courtyards to larger suburban patios and garden terraces.' },
    ],
    hasAreaPages: true,
    faq: [
      { q: 'Will pressure washing damage Indian sandstone?', a: 'Not the way we do it. Sandstone is soft and will scar under a turbo nozzle held too close. We use a flat surface cleaner at reduced pressure, which cleans evenly and leaves no lance stripes across the slabs.' },
      { q: 'Can you remove black spot from patio slabs?', a: 'Yes. Black spot is a lichen that roots into the stone, so pressure alone will not shift it. We apply a specialist treatment that kills it at the root. It can take a few weeks to fully fade after treatment.' },
      { q: 'How much does patio cleaning cost?', a: 'Patio cleaning generally starts from around £3 per square metre depending on stone type, condition and access. Black spot treatment is quoted separately as it needs a second visit. All quotes are free.' },
      { q: 'Do you clean porcelain patios?', a: 'Yes. Porcelain needs very little pressure — mostly it is a rinse and a specialist detergent to lift the surface film. It is one of the easiest surfaces to bring back and one of the easiest to damage if over-pressured.' },
      { q: 'Will the weeds come back?', a: 'Slower, but eventually — seeds blow in and settle in the joints regardless. Re-pointing or re-sanding the joints after cleaning slows it considerably. We can quote for that at the same visit.' },
    ],
    ctaHeading: 'Get a Free Patio Quote',
    ctaBody: 'Call 07474 939 398 for a free, no-obligation quote on your patio. We cover Bath, Bristol and the surrounding Somerset and Wiltshire areas.',
    ctaImage: '/images/before-after/patio-after.jpg',
  },

  // ── Roof Cleaning ──
  {
    id: 'roof-cleaning',
    href: '/roof-cleaning',
    label: 'Roof Cleaning',
    metaTitle: 'Roof Cleaning & Moss Removal Bath & Bristol | All Areas',
    metaDescription: 'Roof cleaning and moss removal across Bath, Bristol and Somerset. Spinning brush system cleans tiles from ground level — no walking on your roof. 111 five-star reviews.',
    heroEyebrow: 'Bath · Bristol · Somerset',
    heroHeading: 'Roof Cleaning in Bath & Bristol',
    heroBody: 'Moss and algae removed with a spinning brush system worked from ground level. No concentrated jet on your tiles, nobody walking across the roof. Free quotes across every area we cover.',
    heroImage: '/images/before-after/job-gallery-25.webp',
    introHeading: 'One Service, Every Area We Cover',
    introBody: 'Moss holds water against the tile, and water that sits through a Somerset winter gets into the frost cycle and cracks it. The usual fix — a man on the roof with a pressure lance — solves the moss and creates two new problems: broken tiles underfoot and water forced up under the laps. We use a spinning brush head on a telescopic lance from the ground, then apply biocide so regrowth is slow. Pick your area below, or go straight to the Bath or Bristol page.',
    features: [
      'Spinning Brush Roof Cleaning',
      'Manual Moss Removal',
      'Biocide Anti-Growth Treatment',
      'Gutter & Valley Clear After Clean',
      'Ground-Level Working — No Roof Traffic',
      'Ridge & Verge Condition Check',
    ],
    cityPages: [
      { label: 'Roof Cleaning Bath', href: '/roof-cleaning-bath', blurb: 'Bath and surrounding districts — clay pantiles, concrete interlocks and older slate roofs.' },
      { label: 'Roof Cleaning Bristol', href: '/roof-cleaning-bristol', blurb: 'All Bristol postcodes — Victorian slate through to modern estate concrete tiles.' },
    ],
    hasAreaPages: true,
    faq: [
      { q: 'Do you walk on the roof?', a: 'No. The spinning brush runs on a telescopic lance operated from the ground or from a tower where height needs it. Nobody stands on your tiles, so nothing gets cracked underfoot.' },
      { q: 'Is pressure washing safe on roof tiles?', a: 'Concentrated pressure is not, which is why we do not use it. A jet lance can strip the granular surface off concrete tiles and force water up under the laps. The spinning brush cleans mechanically at low pressure instead.' },
      { q: 'How long does roof cleaning last?', a: 'With biocide treatment applied afterwards, most roofs stay clear for four to five years. Without it, moss is usually visible again within about two. North-facing roofs and those under trees regrow fastest.' },
      { q: 'How much does roof cleaning cost?', a: 'Roof cleaning is quoted per property rather than per metre, because access, pitch and moss depth vary so much. A standard semi typically falls between £350 and £600 including biocide. Quotes are free and given on site.' },
      { q: 'What happens to the moss that comes off?', a: 'It comes down into the gutters and onto the ground. We clear the gutters and valleys as part of the job and sheet up beds and paths beforehand, then clear the debris before we leave.' },
    ],
    ctaHeading: 'Get a Free Roof Cleaning Quote',
    ctaBody: 'Call 07474 939 398 for a free, no-obligation roof survey and quote. We cover Bath, Bristol and the surrounding Somerset and Wiltshire areas.',
    ctaImage: '/images/before-after/roof-after-2.webp',
  },

  // ── Gutter Cleaning ──
  {
    id: 'gutter-cleaning',
    href: '/gutter-cleaning',
    label: 'Gutter Cleaning',
    metaTitle: 'Gutter Cleaning Bath & Bristol | All Areas Covered',
    metaDescription: 'Gutter cleaning across Bath, Bristol and Somerset. Full gutter clear, downpipe flush and minor repair from ground level. 111 five-star reviews. Call 07474 939 398.',
    heroEyebrow: 'Bath · Bristol · Somerset',
    heroHeading: 'Gutter Cleaning in Bath & Bristol',
    heroBody: 'Full gutter clear, downpipe flush and minor repair — vacuumed from ground level, no ladders leaning on your roofline. Free quotes across every area we cover.',
    heroImage: '/images/before-after/job-gallery-18.webp',
    introHeading: 'One Service, Every Area We Cover',
    introBody: 'A blocked gutter does not announce itself until the damp patch appears inside. Leaves pack down into a mat, water backs up over the fascia and runs down the wall all winter, and by the time it shows on the plaster the repair is a great deal more than a gutter clear. We vacuum from the ground with a camera on the pole, so you see what came out and what the gutter looks like afterwards. Pick your city below.',
    features: [
      'Full Gutter Clear & Downpipe Flush',
      'Ground-Level Vacuum System',
      'Before & After Camera Footage',
      'Moss & Leaf Debris Removal',
      'Minor Gutter Repair & Reseal',
      'Soffit & Fascia Clean Available',
    ],
    cityPages: [
      { label: 'Gutter Cleaning Bath', href: '/gutter-cleaning-bath', blurb: 'Bath and surrounding districts — including tall Georgian terraces and awkward rear access.' },
      { label: 'Gutter Cleaning Bristol', href: '/gutter-cleaning-bristol', blurb: 'All Bristol postcodes — Victorian terraces, semis and modern estate housing.' },
    ],
    hasAreaPages: false,
    faq: [
      { q: 'How do you clear gutters without ladders?', a: 'A vacuum system with carbon-fibre poles reaches up to roughly 40 feet from the ground. A camera on the pole head shows what is in the gutter as we work, so nothing is guessed at. Ladders only come out where a vacuum genuinely cannot reach.' },
      { q: 'How often should gutters be cleaned?', a: 'Annually for most properties, ideally in late autumn once the leaves are down. Properties with mature trees overhead often want twice a year — one clear in autumn and a second in spring.' },
      { q: 'How much does gutter cleaning cost?', a: 'A standard semi-detached property usually falls between £60 and £90 for a full clear and downpipe flush. Larger or three-storey properties are priced on access. Quotes are free.' },
      { q: 'Do you show what came out?', a: 'Yes. The pole camera records before and after on each run, and we will show you the footage on the day. It is the only way to prove a gutter three storeys up is actually clear.' },
      { q: 'Can you fix a leaking gutter joint?', a: 'Minor repairs and resealing on the day, yes — a dropped bracket, a perished union seal, a downpipe that has come apart. Full gutter replacement is not something we take on.' },
    ],
    ctaHeading: 'Get a Free Gutter Cleaning Quote',
    ctaBody: 'Call 07474 939 398 for a free, no-obligation quote. We cover Bath, Bristol and the surrounding Somerset and Wiltshire areas.',
    ctaImage: '/images/before-after/job-gallery-18.webp',
  },

  // ── Render Cleaning ──
  {
    id: 'render-cleaning',
    href: '/render-cleaning',
    label: 'Render Cleaning',
    metaTitle: 'Render Cleaning Bath & Bristol | Soft Wash, All Areas',
    metaDescription: 'Soft wash render cleaning across Bath, Bristol and Somerset. K-Rend, silicone and painted render cleaned without high pressure. 111 five-star reviews. Call 07474 939 398.',
    heroEyebrow: 'Bath · Bristol · Somerset',
    heroHeading: 'Render Cleaning in Bath & Bristol',
    heroBody: 'K-Rend, silicone and painted render cleaned by soft wash — algae killed at the root, no high pressure anywhere near the surface. Free quotes across every area we cover.',
    heroImage: '/images/before-after/job-render-action-2.webp',
    introHeading: 'One Service, Every Area We Cover',
    introBody: 'Render is the surface people most often ruin trying to clean it themselves. A pressure washer will take the top coat off K-Rend and leave a permanent patchwork you cannot undo — the only fix after that is a re-render. Soft washing applies a biocide at effectively no pressure, kills the algae in the surface, and lets it weather off over the following weeks. Slower to look finished, but the render survives it. Pick your city below.',
    features: [
      'K-Rend & Silicone Render Soft Wash',
      'Painted Exterior Wall Cleaning',
      'Red & Green Algae Treatment',
      'Pollution Stain Removal',
      'Pebbledash & Roughcast Clean',
      'No High Pressure On Render',
    ],
    cityPages: [
      { label: 'Render Cleaning Bath', href: '/render-cleaning-bath', blurb: 'Bath and surrounding districts — modern render on newer developments and painted period frontages.' },
      { label: 'Render Cleaning Bristol', href: '/render-cleaning-bristol', blurb: 'All Bristol postcodes — K-Rend and silicone render across newer estates and city refurbishments.' },
    ],
    hasAreaPages: false,
    faq: [
      { q: 'Can you pressure wash K-Rend?', a: 'You can, and it is the single most common way K-Rend gets wrecked. High pressure lifts the through-coloured top layer and leaves lighter patches that never blend back. Soft washing is the only method we will use on it.' },
      { q: 'What is soft washing?', a: 'A biocide solution applied at garden-hose pressure that kills algae, lichen and moss spores in the surface rather than blasting them off. The growth dies, loses its grip and weathers away over the following weeks.' },
      { q: 'How long before it looks clean?', a: 'Some change is visible within days, but the full result usually takes two to six weeks depending on rainfall and how heavy the growth was. That lag is normal and it is the trade-off for not damaging the render.' },
      { q: 'How much does render cleaning cost?', a: 'Render cleaning is quoted per property based on wall area and access. A typical detached house falls between £400 and £800. Quotes are free and given on site.' },
      { q: 'Will the algae come back?', a: 'Eventually, though the biocide leaves a residual effect that slows it considerably — most properties get three to four years before it is noticeable again. North-facing and tree-shaded walls regrow fastest.' },
    ],
    ctaHeading: 'Get a Free Render Cleaning Quote',
    ctaBody: 'Call 07474 939 398 for a free, no-obligation quote. We cover Bath, Bristol and the surrounding Somerset and Wiltshire areas.',
    ctaImage: '/images/before-after/render-after-1.webp',
  },
];

export function getServiceHub(id: string): ServiceHub | undefined {
  return serviceHubs.find(h => h.id === id);
}
