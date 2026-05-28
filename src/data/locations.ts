// src/data/locations.ts
// Master location database — drives all dynamic /areas-covered/[slug] pages
// Add new entries here and Astro generates them automatically at build time

export interface LocationData {
  slug: string;
  townName: string;
  county: string;
  group: 'city' | 'town' | 'market';
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroHeading: string;
  heroBody: string;
  editorialHeading: string;
  editorialBody: string;
  localNuance: string;
  propertyFocus: string[];
  ctaHeading: string;
}

export const locationsDatabase: LocationData[] = [
  // ── City & Historic Neighbours ──
  {
    slug: 'central-bath-districts',
    townName: 'Central Bath & Districts',
    county: 'Somerset',
    group: 'city',
    metaTitle: 'Specialist Heritage Builders Central Bath',
    metaDescription: 'Premium property renovations, traditional lime mortar repointing, and Grade II listed restorations across Central Bath. Fully accredited and insured.',
    heroEyebrow: 'BA1 & BA2 · Bath & North East Somerset',
    heroHeading: 'Conservation Specialists & Builders in Central Bath',
    heroBody: 'Preserving Georgian heritage with authentic craftsmanship, traditional lime masonry, and premium internal property modernizations.',
    editorialHeading: 'Sympathetic Property Restoration for Bath\'s Historic Fabric',
    editorialBody: 'Working within Central Bath demands absolute respect for architectural heritage and strict adherence to conservation guidelines. Our team specializes in managing the complex logistics of city-centre builds, focusing heavily on matching historic Ashlar stone work, executing traditional raking and lime mortar repointing, and sympathetically upgrading internal living spaces without compromising period character.',
    localNuance: 'We handle all local site logistics end-to-end, including complex scaffolding setups, central resident parking permits, and heritage planning compliance.',
    propertyFocus: [
      'Grade I & II Listed Building Restorations',
      'Traditional Structural Lime Repointing',
      'Sash Window & Heritage Timber Overhauls',
      'Intricate Stone Masonry Repair & Cleaning',
    ],
    ctaHeading: 'Start Your Project in Central Bath',
  },

  {
    slug: 'batheaston',
    townName: 'Batheaston',
    county: 'Somerset',
    group: 'town',
    metaTitle: 'Local Builders & Property Maintenance Batheaston',
    metaDescription: 'Village property care, cottage modernizations, and domestic maintenance in Batheaston. Trusted local builders with transparent pricing.',
    heroEyebrow: 'Batheaston · Bath & North East Somerset',
    heroHeading: 'Builders & Property Maintenance in Batheaston',
    heroBody: 'Local village property care, sympathetic cottage modernizations, and reliable ongoing domestic maintenance by trusted local tradespeople.',
    editorialHeading: 'Village Property Care with Professional Standards',
    editorialBody: 'Batheaston\'s mix of period cottages, Victorian terraces, and modern infill developments requires a builder who understands the nuances of village-scale construction. Our team delivers everything from sensitive period cottage modernizations to full domestic maintenance programmes, always with the same rigorous project management and clean-site protocols we apply to our largest Central Bath commissions.',
    localNuance: 'Village access routes, neighbouring property considerations, and local conservation overlay requirements are handled end-to-end.',
    propertyFocus: [
      'Period Cottage Modernizations & Extensions',
      'Victorian Terrace Refurbishments',
      'Ongoing Domestic Maintenance Programmes',
      'Garden & External Property Improvements',
    ],
    ctaHeading: 'Discuss Your Batheaston Project',
  },

  {
    slug: 'bathford',
    townName: 'Bathford',
    county: 'Somerset',
    group: 'town',
    metaTitle: 'Stone Cottage Builders & Refurbishment Bathford',
    metaDescription: 'Hillside stone cottage refurbishments, structural brickwork, and traditional masonry updates in Bathford. Accredited and insured.',
    heroEyebrow: 'Bathford · Bath & North East Somerset',
    heroHeading: 'Builders & Stone Specialists in Bathford',
    heroBody: 'Hillside stone cottage refurbishments, structural brickwork, and traditional masonry updates for properties set in Bathford\'s distinctive landscape.',
    editorialHeading: 'Respecting Bathford\'s Hillside Heritage',
    editorialBody: 'Bathford\'s elevated position and historic stone architecture present unique construction challenges — from structural underpinning on sloping ground to matching local Bath stone on exposure-facing elevations. Our experience with hillside properties means we understand the drainage, retaining wall, and structural requirements that keep these homes sound for another century.',
    localNuance: 'Hillside scaffolding, retaining wall assessment, and sloped-site logistics are all managed within our standard project scope.',
    propertyFocus: [
      'Hillside Stone Cottage Refurbishments',
      'Structural Brickwork & Repointing',
      'Retaining Wall Construction & Repair',
      'Traditional Masonry Updates & Matching',
    ],
    ctaHeading: 'Start Your Bathford Project',
  },

  {
    slug: 'bathampton',
    townName: 'Bathampton',
    county: 'Somerset',
    group: 'town',
    metaTitle: 'Canalside Home Repairs & Improvements Bathampton',
    metaDescription: 'Canalside home repairs, structural improvements, and high-quality internal finishes across Bathampton. Fully insured local builders.',
    heroEyebrow: 'Bathampton · Bath & North East Somerset',
    heroHeading: 'Builders & Home Improvements in Bathampton',
    heroBody: 'Canalside home repairs, structural improvements, and premium internal finishes for properties along the Avon and Kennet corridor.',
    editorialHeading: 'Canalside Properties Demand Specialist Care',
    editorialBody: 'Bathampton\'s riverside and canalside properties face persistent moisture challenges that standard builders often misdiagnose. Our team brings specific experience with water-proximate structural improvements — from damp remediation and tanking to high-quality internal finishes that withstand the unique environmental demands of the Avon valley.',
    localNuance: 'Riverside and canalside damp management, flood-risk structural considerations, and water-adjacent access logistics are part of our standard approach.',
    propertyFocus: [
      'Canalside & Riverside Damp Remediation',
      'Structural Improvements & Underpinning',
      'High-Quality Internal Refurbishments',
      'Water-Adjacent External Maintenance',
    ],
    ctaHeading: 'Discuss Your Bathampton Project',
  },

  {
    slug: 'box',
    townName: 'Box',
    county: 'Wiltshire',
    group: 'town',
    metaTitle: 'Period Property Maintenance & Stone Care Box',
    metaDescription: 'Period property maintenance, lime mortar repointing, and historic valley-side home care in Box. Accredited heritage builders.',
    heroEyebrow: 'Box · Wiltshire',
    heroHeading: 'Builders & Period Property Care in Box',
    heroBody: 'Period property maintenance, lime mortar repointing, and historic valley-side home care — preserving Box\'s distinctive architectural character.',
    editorialHeading: 'Valley-Side Period Properties Require Exacting Craft',
    editorialBody: 'Box sits within a steep river valley whose period properties — from stone farmhouses to former quarry workers\' cottages — demand specialist care. Incorrect mortar mixes, inappropriate modern renders, and poor drainage management can rapidly degrade these structures. Our approach uses traditional materials and techniques specified to the building\'s age and construction type.',
    localNuance: 'Valley-side scaffolding access, road-narrow site logistics, and historic stone matching are built into every Box project from day one.',
    propertyFocus: [
      'Period Property Maintenance & Repair',
      'Traditional Lime Mortar Repointing',
      'Historic Stone Matching & Repair',
      'Valley-Side Drainage & Structural Care',
    ],
    ctaHeading: 'Start Your Box Project',
  },

  // ── Charming Small Towns & Commuters ──
  {
    slug: 'bradford-on-avon',
    townName: 'Bradford on Avon',
    county: 'Wiltshire',
    group: 'town',
    metaTitle: 'Heritage Remodelling & Period Builders Bradford on Avon',
    metaDescription: 'Sympathetic heritage remodelling, lime repointing, and bespoke period joinery in Bradford on Avon. FMB-accredited local builders.',
    heroEyebrow: 'Bradford on Avon · Wiltshire',
    heroHeading: 'Heritage Specialists in Bradford on Avon',
    heroBody: 'Sympathetic heritage remodelling, lime repointing, and bespoke period joinery installations — for the town that demands the highest standards of period care.',
    editorialHeading: 'Where Heritage Standards Are Non-Negotiable',
    editorialBody: 'Bradford on Avon possesses one of the finest concentrations of period properties in the region — from the iconic Tythe Barn to weavers\' cottages and Georgian townhouses lining the steep streets down to the river. Our team brings the same exacting standard to every project here: traditional lime mortars, hand-mixed to match the original substrate; period joinery fabricated or restored to original profiles; and structural interventions that preserve the building\'s integrity without compromising its character.',
    localNuance: 'Steep street access, riverside flood considerations, and conservation area planning constraints are managed comprehensively within every project.',
    propertyFocus: [
      'Sympathetic Heritage Remodelling',
      'Traditional Lime Repointing & Render',
      'Bespoke Period Joinery & Sash Windows',
      'Conservation Area Compliance & Planning',
    ],
    ctaHeading: 'Discuss Your Bradford on Avon Project',
  },

  {
    slug: 'corsham',
    townName: 'Corsham',
    county: 'Wiltshire',
    group: 'town',
    metaTitle: 'Character Cottage Updates & Stone Masonry Corsham',
    metaDescription: 'Character cottage updates, historic stone masonry, and high-street standard finishes in Corsham. Fully accredited and insured local builders.',
    heroEyebrow: 'Corsham · Wiltshire',
    heroHeading: 'Builders & Stone Specialists in Corsham',
    heroBody: 'Character cottage updates, historic stone masonry, and high-street standard finishes — preserving Corsham\'s distinctive market-town identity.',
    editorialHeading: 'Market-Town Character Demands Specialist Attention',
    editorialBody: 'Corsham\'s historic High Street and surrounding stone cottages represent a unique concentration of Cotswold-style building stock. Our work here focuses on preserving that character — from matching the distinctive oolitic limestone to reinstating traditional lime renders and ensuring new additions sit comfortably within the existing streetscape. Every project, whether a cottage modernization or a larger-scale conversion, receives the same meticulous material specification.',
    localNuance: 'High Street conservation zone compliance, Bath stone sourcing and matching, and town-centre traffic management for site logistics.',
    propertyFocus: [
      'Character Cottage Updates & Extensions',
      'Historic Stone Masonry & Repair',
      'High-Street Standard Internal Finishes',
      'Conservation-Area Planning & Compliance',
    ],
    ctaHeading: 'Start Your Corsham Project',
  },

  {
    slug: 'saltford-keynsham',
    townName: 'Saltford & Keynsham',
    county: 'Somerset',
    group: 'town',
    metaTitle: 'Home Extension & Conversion Specialists Keynsham',
    metaDescription: 'Expert house extensions, garage conversions, and open-plan reconfigurations across Keynsham and Saltford. Request a transparent quote.',
    heroEyebrow: 'Keynsham & Saltford · Somerset',
    heroHeading: 'Premium Extensions & Conversions in Keynsham & Saltford',
    heroBody: 'Transforming suburban and riverside properties with modern rear extensions, structural knock-throughs, and family-focused open-plan living.',
    editorialHeading: 'Optimizing Modern Family Living and Space Reconfiguration',
    editorialBody: 'Unlike historic city centres, the residential architecture across Keynsham and Saltford offers incredible opportunities for modern space maximization. We focus on transforming 1930s-to-modern housing stock through structural steel installations, open-plan kitchen extensions, and seamless indoor-outdoor living additions designed to handle the changing demands of growing families.',
    localNuance: 'Our team is highly experienced in local structural terrain requirements, including sloped garden layouts and retaining earthworks near the Avon valley slopes.',
    propertyFocus: [
      'Single & Double-Storey Rear Extensions',
      'Open-Plan Structural Steel Knock-Throughs',
      'Premium Garage & Outbuilding Conversions',
      'Structural Retaining Walls & Landscaping',
    ],
    ctaHeading: 'Discuss Your Keynsham Project',
  },

  // ── Vibrant Market Towns & Suburbs ──
  {
    slug: 'chippenham',
    townName: 'Chippenham',
    county: 'Wiltshire',
    group: 'market',
    metaTitle: 'Home Modernization & Structural Extensions Chippenham',
    metaDescription: 'Full-scale home modernizations, open-plan structural knock-throughs, and extensions in Chippenham. Transparent, fixed-quote pricing.',
    heroEyebrow: 'Chippenham · Wiltshire',
    heroHeading: 'Home Modernization & Extensions in Chippenham',
    heroBody: 'Full-scale modern home modernizations, structural knock-throughs, and contemporary extensions — transforming Chippenham\'s diverse housing stock.',
    editorialHeading: 'Modernizing Chippenham\'s Diverse Housing Stock',
    editorialBody: 'Chippenham\'s mix of post-war estates, 1970s developments, and newer build communities presents a broad range of structural opportunities. Our work here centres on whole-home modernizations — opening up compartmentalized layouts, installing structural steel for open-plan living, and delivering contemporary extensions that transform how families use their homes. Every project receives the same rigorous project management regardless of scale.',
    localNuance: 'Estate-access logistics, permitted development rights on newer properties, and drainage/soil conditions across the town\'s varied terrain are all standard considerations.',
    propertyFocus: [
      'Full Home Modernization Programmes',
      'Open-Plan Structural Knock-Throughs',
      'Contemporary Rear & Side Extensions',
      'Structural Additions & Garage Conversions',
    ],
    ctaHeading: 'Start Your Chippenham Project',
  },

  {
    slug: 'frome-radstock-midsomer-norton',
    townName: 'Frome, Radstock & Midsomer Norton',
    county: 'Somerset',
    group: 'market',
    metaTitle: 'Terraced Property Renovations & Sloped Garden Specialists Frome',
    metaDescription: 'Sloped garden landscaping, terraced property updates, and complete structural renovations across Frome, Radstock, and Midsomer Norton.',
    heroEyebrow: 'Frome, Radstock & Midsomer Norton · Somerset',
    heroHeading: 'Builders & Renovation Specialists Across Frome & Radstock',
    heroBody: 'Sloped garden landscaping, terraced property updates, and complete structural renovations — serving the creative communities and heritage towns of the Somer Valley.',
    editorialHeading: 'Creative Towns with Complex Terrain Demand Experienced Builders',
    editorialBody: 'The Frome–Radstock–Midsomer Norton corridor combines steeply terraced hillside properties, former industrial buildings awaiting conversion, and a growing community of homeowner-investors who demand high-quality renovation work. Our experience with sloped site logistics, retaining wall construction, and terraced property structural interventions means we deliver projects here that less experienced contractors simply could not manage.',
    localNuance: 'Sloped-site excavation and retaining, terraced-party-wall considerations, and former mine-shaft survey requirements are all managed proactively.',
    propertyFocus: [
      'Sloped Garden Landscaping & Retaining',
      'Terraced Property Structural Updates',
      'Complete Home Renovations',
      'Former Industrial Building Conversions',
    ],
    ctaHeading: 'Discuss Your Frome Area Project',
  },
];