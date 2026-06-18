// src/data/services.ts
// Master service pillar database — drives the services showcase page

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  href: string;
}

export const servicesData: ServicePillar[] = [
  {
    id: 'driveway-cleaning',
    title: 'Driveway Cleaning',
    subtitle: 'Block Paving, Tarmac, Concrete & Resin',
    description: 'Restore your driveway to look brand new. Professional jet washing removes years of dirt, oil stains, tyre marks and weed growth from any surface. Re-sanding and sealing available for block paving.',
    features: [
      'Block Paving Deep Clean & Re-Sand',
      'Tarmac & Concrete Driveway Wash',
      'Oil Stain & Tyre Mark Removal',
      'Resin Drive Gentle Clean',
    ],
    image: '/images/before-after/job-gallery-13.webp',
    href: '/driveway-cleaning-bath',
  },
  {
    id: 'patio-cleaning',
    title: 'Patio Cleaning',
    subtitle: 'Sandstone, Porcelain, Slate & Concrete Slabs',
    description: 'Bring your patio back to life with professional pressure washing. Algae, moss and stains removed from all patio types — sandstone, porcelain, slate and concrete slabs. Careful pressure adjustment protects delicate surfaces.',
    features: [
      'Indian Sandstone Patio Cleaning',
      'Porcelain & Slate Tile Washing',
      'Concrete Slab & Flagstone Clean',
      'Algae & Moss Treatment',
    ],
    image: '/images/before-after/job-gallery-02.webp',
    href: '/patio-cleaning-bath',
  },
  {
    id: 'gutter-cleaning',
    title: 'Gutter Cleaning',
    subtitle: 'Full Clear, Flush & Minor Repair',
    description: 'Blocked gutters cause damp, rot and expensive structural damage. Full gutter clear, downpipe flush and minor repair — keeping water flowing away from your property. We clear moss, leaves and debris from single and multi-storey buildings.',
    features: [
      'Full Gutter Clear & Downpipe Flush',
      'Moss & Leaf Debris Removal',
      'Minor Gutter Repair & Reseal',
      'Soffit & Fascia Clean',
    ],
    image: '/images/before-after/job-gallery-18.webp',
    href: '/gutter-cleaning-bath',
  },
  {
    id: 'roof-cleaning',
    title: 'Roof Cleaning',
    subtitle: 'Spinning Brush, Moss Removal & Treatment',
    description: 'Moss and algae eat into roof tiles, causing cracks, leaks and expensive repairs. Our specialist spinning brush system cleans safely from ground level — no concentrated pressure on your tiles, no walking on the roof.',
    features: [
      'Spinning Brush Roof Cleaning',
      'Manual Moss Removal',
      'Biocide Anti-Growth Treatment',
      'Gutter & Valley Clear After Clean',
    ],
    image: '/images/before-after/job-gallery-25.webp',
    href: '/roof-cleaning-bath',
  },
  {
    id: 'render-cleaning',
    title: 'Render & Exterior Cleaning',
    subtitle: 'K-Rend, Silicone Render & Painted Walls',
    description: 'Green algae streaks and pollution stains ruin the look of rendered properties. Our soft wash system cleans K-Rend, silicone render and painted exterior walls without damage — restoring that fresh-finished look.',
    features: [
      'K-Rend & Silicone Render Clean',
      'Painted Exterior Wall Washing',
      'Algae & Pollution Stain Removal',
      'Pebbledash & Roughcast Clean',
    ],
    image: '/images/before-after/job-gallery-08.webp',
    href: '/render-cleaning-bath',
  },
  {
    id: 'block-paving-cleaning',
    title: 'Block Paving Cleaning',
    subtitle: 'Driveways, Patios & Pathways',
    description: 'Block paving holds dirt, moss and weeds between the joints like nothing else. Professional jet washing lifts years of grime, followed by re-sanding with kiln-dried jointing sand to stabilise and protect the surface.',
    features: [
      'Deep Jet Wash & Weed Removal',
      'Kiln-Dried Sand Re-Jointing',
      'Edge Restraint Check & Repair',
      'Sealant Application Available',
    ],
    image: '/images/before-after/job-gallery-26.webp',
    href: '/driveway-cleaning-bath',
  },
  {
    id: 'soffit-fascia-cleaning',
    title: 'Soffit & Fascia Cleaning',
    subtitle: 'uPVC, Timber & Aluminium Rooflines',
    description: 'Green algae, black streaks and grime on uPVC soffits and fascias age a property fast. Our specialist soft wash technique restores rooflines safely — no high pressure that risks forcing water behind fixings or damaging tiles.',
    features: [
      'uPVC Soft Wash Treatment',
      'Timber Soffit & Fascia Clean',
      'Algae & Mould Biocide Treatment',
      'Barge Board & Verge Cleaning',
    ],
    image: '/images/before-after/job-gallery-11.webp',
    href: '/soffit-fascia-cleaning-bath',
  },
  {
    id: 'conservatory-cleaning',
    title: 'Conservatory Cleaning',
    subtitle: 'Roof, Frame & Glass',
    description: 'A green, dirty conservatory roof blocks light and looks neglected. We clean polycarbonate and glass panels, uPVC frames and gutters using specialist soft wash — safe for seals, fixings and roof tiles.',
    features: [
      'Polycarbonate Roof Soft Wash',
      'Glass Roof Spot-Free Rinse',
      'uPVC Frame Cleaning',
      'Algae & Biocide Treatment',
    ],
    image: '/images/before-after/job-gallery-07.webp',
    href: '/conservatory-cleaning-bath',
  },
  {
    id: 'commercial-jet-washing',
    title: 'Commercial Jet Washing',
    subtitle: 'Car Parks, Forecourts & Commercial Premises',
    description: 'Professional commercial pressure washing for businesses, landlords and facilities managers across Bath and Bristol. Car parks, forecourts, pub terraces and industrial yards — scheduled to fit your operations.',
    features: [
      'Car Park & Forecourt Cleaning',
      'Pub, Restaurant & Hotel Terraces',
      'Industrial Unit & Warehouse Yards',
      'Scheduled Maintenance Contracts',
    ],
    image: '/images/before-after/job-gallery-19.webp',
    href: '/commercial-jet-washing-bath',
  },
];