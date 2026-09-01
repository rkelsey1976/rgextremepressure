// Real Google reviews for RG Extreme Pressure
// Source: Google Business Profile, supplied by Richard 2026-09-01.
//
// ⚠ REBUILT 2026-09-01. The previous version of this file carried REAL review
// text under INVENTED reviewer names and INVENTED locations — e.g. Kelly
// Woolford's roof review (Peasedown St John) was published as "Claire, Bath",
// and Christina Maddox's gutter review (Bristol) as "Tim, Keynsham". Five of
// the twelve were provably misattributed on both name and town; the other seven
// could not be matched to any real review at all and have been dropped.
//
// RULES FOR THIS FILE FROM NOW ON:
//   1. Name must be the reviewer's actual Google display name.
//   2. `location` is set ONLY where the reviewer or the review states it.
//      No inferring a town because it would suit a page.
//   3. `stars` is what they actually gave. Not every review is five stars.
//   4. Quotes ending in "…" are truncated excerpts of longer reviews. Never
//      invent the rest.

export interface Review {
  quote: string;
  name: string;
  service: string;
  location?: string;
  stars: number;
}

export const googleReviews: Review[] = [
  // ── Gutter cleaning & minor repairs ──
  {
    quote: "Robert was able to provide a quote quickly and was available at short notice to fix our gutters. He was quick and professional. Highly recommend.",
    name: "Tom Mavir",
    service: "Gutter Cleaning & Repair",
    stars: 5,
  },
  {
    quote: "Called Robert for a quote to clear my blocked gutters, gave me a competitive price and attended today to do the job. Turned up smack on time as agreed and all work carried out with minimum of fuss and efficiently. He also managed to repair and reseal some leaking joints…",
    name: "Andrew Willis",
    service: "Gutter Cleaning & Repair",
    stars: 5,
  },
  {
    quote: "Excellent service from Rob. Polite, efficient and very clean. I had my gutters cleaned and repaired as one was leaking. Very reasonable cost.",
    name: "Christina Maddox",
    service: "Gutter Cleaning & Repair",
    location: "Bristol",
    stars: 5,
  },
  {
    quote: "Robert was fantastic and did a great job clearing the gutters and doing minor repairs. I would highly recommend him. Thanks so much Robert!",
    name: "Tiffy Shax",
    service: "Gutter Cleaning & Repair",
    location: "Hanham, Bristol",
    stars: 5,
  },
  {
    quote: "We are very pleased with the work that Robert did for us. He was very courteous and respectful, explaining how he would clean our roof guttering and then showing us afterwards. Robert did a great job. He ensured that water drains as it should…",
    name: "Paul Farwell",
    service: "Gutter Cleaning",
    location: "Weston, Bath",
    stars: 5,
  },
  {
    quote: "Robert communicated well, arrived on time, was very pleasant, did a good job and didn't overcharge! 👍😊",
    name: "Viv Morris",
    service: "Gutter Cleaning",
    location: "Bath",
    stars: 5,
  },
  {
    quote: "Nice gutter cleaning",
    name: "Kenneth Ng",
    service: "Gutter Cleaning",
    stars: 5,
  },
  {
    // NOTE: "Bristol-based" in this review describes RG Extreme Pressure, not the
    // customer's own location, so no `location` is set. Confirm with Robert if known.
    quote: "Robert from Bristol-based RG Extreme Pressure cleaned all my gutters, facias and conservatory exterior yesterday. He was organised, well equipped, including de-ionised water for the conservatory, on time, and did a fantastic job.",
    name: "Guy Seymour",
    service: "Gutter, Fascia & Conservatory Cleaning",
    stars: 5,
  },

  // ── Patio, path & driveway jet washing ──
  {
    quote: "Robert did a wonderful job on our patio and path. He was punctual, very polite and professional and worked hard to restore our very grubby patio back to its former glory. The entire garden looks lighter and brighter…",
    name: "Judith St John Steiner",
    service: "Patio & Path Cleaning",
    stars: 5,
  },
  {
    quote: "Delighted with the results! My balcony and patio looks brand new after the power wash. Rob was punctual, efficient, and friendly. Would happily recommend to anyone looking for this service.",
    name: "Megan Thomas",
    service: "Balcony & Patio Cleaning",
    stars: 5,
  },
  {
    quote: "Excellent service, really happy with the result. Driveway looking like NEW again and Robert was very professional. Thank you.",
    name: "Fran Baskerville",
    service: "Driveway Cleaning",
    stars: 5,
  },
  {
    quote: "Excellent service - driveway now looks like new once again! Thanks",
    name: "Deborah Parish",
    service: "Driveway Cleaning",
    stars: 5,
  },
  {
    quote: "Robert cleaned our patio which was looking terrible. Now it looks like new. We have been very impressed with them. Excellent communication, very polite, explained everything and arrived early.",
    name: "Trina Welsh",
    service: "Patio Cleaning",
    stars: 5,
  },
  {
    quote: "Driveway looks like new! Fantastic job by Robert, thank you!!!",
    name: "Rob Massey",
    service: "Driveway Cleaning",
    stars: 5,
  },
  {
    quote: "Great work, my garden patio has been brilliantly cleaned. Thanks Robert!",
    name: "Kyle Armstrong",
    service: "Patio Cleaning",
    stars: 5,
  },
  {
    quote: "Highly recommended. Fantastic work and perseverance to bring 4 very poor patio areas back to life with excellent results. Quick to respond, tidy working and really friendly. Thanks again!",
    name: "Janine Johnson",
    service: "Patio Cleaning",
    stars: 5,
  },

  // ── Render, roof & wall cleaning ──
  {
    quote: "Robert did such a great job on our roof and algae on our side wall!!! My friend thought we'd gotten a new roof done. He was polite, cleaned up after himself and clearly takes pride in his work.",
    name: "Kelly Woolford",
    service: "Roof & Render Cleaning",
    location: "Peasedown St John",
    stars: 5,
  },
  {
    quote: "After completing roof cleaning and gutters for my mother Robert came across to do render clean on my house and did a great job ending up doing my gutters and my neighbours. I found RG team to be a good communicator, reliable…",
    name: "Richard Taylor",
    service: "Roof, Gutter & Render Cleaning",
    stars: 5,
  },
  {
    // GBP display name is "John 123" — shortened to "John" for display only.
    quote: "Had my render cleaned by Robert. Highly recommended, prompt and professional service 👍",
    name: "John",
    service: "Render Cleaning",
    stars: 5,
  },

  // ── Complex multi-surface jobs ──
  {
    quote: "We are extremely pleased with the work Robert has done for us at our home in Weston, Bath this week. Our gutters needed a really good clean… He also cleaned our block driveway which was filthy with brake fluid staining, weeds…",
    name: "Annie Frere",
    service: "Gutter & Driveway Cleaning",
    location: "Weston, Bath",
    stars: 5,
  },
  {
    quote: "Robert did a fantastic job and it was good value for money. There were complexities: we were cleaning a wall, steps, patio and balcony, all in different places, but Robert worked around the logistical challenges. He was punctual, friendly, considerate and efficient.",
    name: "Emily Commander",
    service: "Wall, Steps, Patio & Balcony Cleaning",
    stars: 5,
  },

  // ── General ──
  {
    quote: "Prompt and professional service. Thanks",
    name: "Charlotte Hickson",
    service: "Exterior Cleaning",
    stars: 5,
  },
  {
    quote: "Great service. Looks amazing. Thanks mate",
    name: "Craig Hurman",
    service: "Exterior Cleaning",
    stars: 5,
  },
  {
    // Four stars, not five. Kept accurate deliberately — see rule 3 above.
    quote: "Very helpful and did a thorough job.",
    name: "Stephen Cope",
    service: "Exterior Cleaning",
    stars: 4,
  },
  {
    quote: "Friendly and professional service. 100% would recommend.",
    name: "Chris Hulbert",
    service: "Exterior Cleaning",
    stars: 5,
  },
  {
    quote: "Very efficient and lovely service. Will be using again in the future. Thank you Robert",
    name: "Christinea Blake",
    service: "Exterior Cleaning",
    stars: 5,
  },
];

// ── Selection helpers ──
// The Sept 2026 report notes reviews compound a converting page ("bath gutter
// cleaning" runs at 8.82% CTR), so the service pages carry them, not just the
// homepage. Matching is by keyword against the real `service` string, and every
// review always renders with its true name and location.

/** Reviews whose service text matches any of the given keywords. */
export function reviewsForService(keywords: string[]): Review[] {
  const k = keywords.map(x => x.toLowerCase());
  return googleReviews.filter(r =>
    k.some(word => r.service.toLowerCase().includes(word))
  );
}

/**
 * Up to `limit` reviews for a service page: exact service matches first,
 * preferring ones whose stated location mentions the given city, then topped up
 * with other genuine reviews so the block is never empty.
 */
export function reviewsForPage(keywords: string[], city?: string, limit = 3): Review[] {
  const matches = reviewsForService(keywords);
  const local   = city ? matches.filter(r => r.location?.includes(city)) : [];
  const rest    = matches.filter(r => !local.includes(r));
  const others  = googleReviews.filter(r => !matches.includes(r));
  return [...local, ...rest, ...others].slice(0, limit);
}
