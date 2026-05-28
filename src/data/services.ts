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
  href: string;
}

export const servicesData: ServicePillar[] = [
  {
    id: 'structural',
    title: 'Structural & Scale Builds',
    subtitle: 'Architectural Additions & Engineering Excellence',
    description: 'Expand your property\'s footprint and market value with flawless structural additions. From single and double-storey extensions to complete turnkey new builds and complex conversions, we handle the entire process from groundworks to structural steel installations.',
    features: [
      'House Extensions (Single & Double-Storey)',
      'New Build Projects (Turnkey Delivery)',
      'Loft & Basement Conversions',
      'Structural Steel & RSJ Installations',
    ],
    image: '/images/services/structural-builds.webp',
    href: '/services/structural-builds',
  },
  {
    id: 'heritage',
    title: 'Heritage & Restoration',
    subtitle: 'Preserving Period Character with Authentic Craftsmanship',
    description: 'Specialized renovation care for Grade II listed buildings, traditional Bath stone properties, and conservation zone homes. We understand traditional building materials, replacing damaging modern patches with authentic, breathable materials to restore structural integrity.',
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
    description: 'Complete internal remodels executed with surgical precision. We open up restricted historical layouts into bright, contemporary spaces, installing premium kitchens, luxury bathrooms, and high-end joinery finishes.',
    features: [
      'Full Property Refurbishments',
      'Bespoke Kitchen Design & Installation',
      'Luxury Bathrooms & Wetrooms',
      'Internal Wall Reconfigurations',
    ],
    image: '/images/services/turnkey-interiors.webp',
    href: '/services/interiors-refurbishments',
  },
  {
    id: 'property-care',
    title: 'Property Care & Landscaping',
    subtitle: 'Premium External Works & Ongoing Maintenance',
    description: 'Protecting your investment inside and out. We combine master garden landscaping — specializing in structural retaining walls and premium paving — with a reliable, highly organized domestic maintenance and repair service.',
    features: [
      'Outdoor & Architectural Landscaping',
      'Structural Stone Retaining Walls',
      'Comprehensive Property Maintenance',
      'Responsive Home Repairs & Roofing',
    ],
    image: '/images/services/property-care.webp',
    href: '/services/property-care',
  },
];