// src/data/services.ts
// Master service pillar database — drives the services showcase page
// 4 pillars, each with ID, title, subtitle, description, features, and image

export interface ServicePillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  video?: string;
  videoPoster?: string;
  href: string;
}

export const servicesData: ServicePillar[] = [
  {
    id: 'loft',
    title: 'Loft Conversions',
    subtitle: 'Dormer, Velux, Hip-to-Gable & Mansard',
    description: 'The most cost-effective way to add a bedroom, ensuite, or home office without losing garden space. Dormer, Velux, hip-to-gable, and mansard conversions — all managed under one fixed-price contract with full building regs compliance.',
    features: [
      'Dormer Conversions (Rear & Side)',
      'Velux Rooflight Conversions',
      'Hip-to-Gable & Mansard',
      'Full Building Regs & Planning Management',
    ],
    image: '/images/hero-bath-loft-extension.webp',
    href: '/services/loft-conversions',
  },
  {
    id: 'extensions',
    title: 'House Extensions',
    subtitle: 'Single & Double-Storey, Side-Return, Garden Rooms',
    description: 'Add genuine living space with a properly built extension — open-plan kitchens, additional bedrooms, garden-connected living. Fixed-price contracts and full planning management across Bath & BANES.',
    features: [
      'Single-Storey Rear Extensions',
      'Double-Storey Extensions',
      'Side-Return & Wraparound',
      'Garden Rooms & Orangeries',
    ],
    image: '/images/hero-medford-garden-extension.webp',
    href: '/services/extensions',
  },
  {
    id: 'structural',
    title: 'Structural & Scale Builds',
    subtitle: 'New Build, RSJs, Basement & Garage Conversions',
    description: 'Full structural project delivery — new builds, RSJ installations, basement conversions, and garage transformations. Engineering precision, clean sites, and single-point project management.',
    features: [
      'New Build Projects (Turnkey Delivery)',
      'Structural Steel & RSJ Installations',
      'Basement & Garage Conversions',
      'Complete Groundworks & Substructure',
    ],
    image: '/images/services/structural-builds.webp',
    href: '/services/structural-builds',
  },
  {
    id: 'heritage',
    title: 'Heritage & Restoration',
    subtitle: 'Preserving Period Character with Authentic Craftsmanship',
    description: 'Specialized renovation care for Grade II listed buildings, traditional Bath stone properties, and conservation zone homes. Authentic, breathable materials to restore structural integrity.',
    features: [
      'Period Property Renovations',
      'Traditional Lime Mortar Repointing',
      'Bath Stone Restoration & Masonry',
      'Sympathetic Internal Fabric Repairs',
    ],
    image: '/images/services/heritage-restoration.webp',
    href: '/services/heritage-restoration',
  },
  {
    id: 'interiors',
    title: 'Turnkey Interiors & Refurbishments',
    subtitle: 'High-Specification Internal Transformations',
    description: 'Complete internal remodels executed with surgical precision. Premium kitchens, luxury bathrooms, and high-end joinery finishes.',
    features: [
      'Full Property Refurbishments',
      'Bespoke Kitchen Design & Installation',
      'Luxury Bathrooms & Wetrooms',
      'Internal Wall Reconfigurations',
    ],
    image: '/images/medford-garden-extension-14.webp',
    href: '/services/interiors-refurbishments',
  },
  {
    id: 'property-care',
    title: 'Property Care & Landscaping',
    subtitle: 'Premium External Works & Ongoing Maintenance',
    description: 'Protecting your investment inside and out. Master garden landscaping, structural retaining walls, and a reliable domestic maintenance and repair service.',
    features: [
      'Outdoor & Architectural Landscaping',
      'Structural Stone Retaining Walls',
      'Comprehensive Property Maintenance',
      'Responsive Home Repairs & Roofing',
    ],
    image: '/images/services/property-care.webp',
    video: '/images/bath-landscaping-video.mp4',
    videoPoster: '/images/bath-landscaping-video-poster.webp',
    href: '/services/property-care',
  },
];