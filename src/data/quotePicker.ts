// Step-by-step quote pop-up data (see src/components/QuoteModal.astro).
// No prices on purpose: the site quotes gutter cleaning at three different
// figures on different pages, so nothing is shown until Robert supplies one
// price list.

export type JobKind = 'area' | 'house' | 'site';

export interface PickerJob {
  id: string;
  label: string;
  /** Matches the contact form's service dropdown wording. */
  formLabel: string;
  kind: JobKind;
  /** URL prefix of this service's pages, used to pre-tick it. */
  pagePrefix: string;
  icon: string;
}

export const JOBS: PickerJob[] = [
  { id: 'drive', label: 'Driveway', formLabel: 'Driveway Cleaning', kind: 'area', pagePrefix: 'driveway-cleaning', icon: 'M3 20l4-16h10l4 16M12 6v2M12 11v2M12 16v2' },
  { id: 'patio', label: 'Patio', formLabel: 'Patio Cleaning', kind: 'area', pagePrefix: 'patio-cleaning', icon: 'M3 9h18v11H3zM3 14.5h18M9 9v11M15 9v11' },
  { id: 'roof', label: 'Roof', formLabel: 'Roof Cleaning', kind: 'house', pagePrefix: 'roof-cleaning', icon: 'M2 12l10-8 10 8M5 10v10h14V10' },
  { id: 'gutter', label: 'Gutters', formLabel: 'Gutter Cleaning', kind: 'house', pagePrefix: 'gutter-cleaning', icon: 'M3 7h18l-2 4H5zM18 11v9' },
  { id: 'render', label: 'Render and walls', formLabel: 'Render Cleaning', kind: 'house', pagePrefix: 'render-cleaning', icon: 'M3 5h18v14H3zM3 9.5h18M3 14h18M9 5v4.5M15 9.5V14M9 14v5' },
  { id: 'soffit', label: 'Soffits and fascias', formLabel: 'Soffit & Fascia Cleaning', kind: 'house', pagePrefix: 'soffit-fascia-cleaning', icon: 'M2 10l10-6 10 6M4 9v3h16V9' },
  { id: 'conserv', label: 'Conservatory', formLabel: 'Conservatory Cleaning', kind: 'house', pagePrefix: 'conservatory-cleaning', icon: 'M3 20V11l9-6 9 6v9zM12 5v15M3 13h18' },
  { id: 'solar', label: 'Solar panels', formLabel: 'Solar Panel Cleaning', kind: 'house', pagePrefix: 'solar-panel-cleaning', icon: 'M4 6h16l-2 10H6zM9 6l-1 10M15 6l1 10M5 11h14M12 16v4M8 20h8' },
  { id: 'comm', label: 'Commercial site', formLabel: 'Commercial Jet Washing', kind: 'site', pagePrefix: 'commercial-jet-washing', icon: 'M3 21V8l6-4v17M9 21V10h12v11M13 14h4M13 17h4' },
];

export const AREAS = [
  { id: 'small', label: 'Small', sub: 'A path or 1 car' },
  { id: 'medium', label: 'Medium', sub: '2 cars or a patio' },
  { id: 'large', label: 'Large', sub: '3+ cars' },
  { id: 'unsure', label: 'Not sure', sub: 'Robert will check' },
];

export const HOUSES = ['Terrace', 'Semi-detached', 'Detached', 'Bungalow', 'Flats or a block', 'Something else'];
export const SITES = ['Car park', 'Forecourt', 'Shop front', 'Something else'];
export const REPLIES = ['Call', 'WhatsApp', 'Email'];

/** BA and BS districts, plus SN12 Melksham, SN13 Corsham, SN14/SN15 Chippenham. */
export const COVERAGE_NOTE = 'BA, BS and SN12–SN15';
