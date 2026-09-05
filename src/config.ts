// Central business facts + structured-data builders.
//
// Single source of truth for NAP (Name / Address / Phone), booking, pricing,
// reviews, and every JSON-LD schema on the site. Import from here rather than
// re-declaring these values per page so structured data stays consistent.
//
// This site builds statically (output: "static"), so these are plain constants —
// NOT read from import.meta.env. See CLAUDE.md "Environment Variables".

import type {
  ProfessionalService,
  Person,
  Service,
  ContactPage,
  BreadcrumbList,
  WithContext,
} from "schema-dts";

export const SITE_URL = "https://daliamcmillan.uk";

/** Canonical business / practitioner facts. Keep in sync with contact page + llms.txt. */
export const BUSINESS = {
  name: "Dalia McMillan",
  alternateName: "Dalia McMillan Hypnotherapy",
  jobTitle: "Solution Focused Hypnotherapist",
  email: "daliamcmillantherapy@gmail.com",
  /** E.164 for tel: links and schema. */
  telephone: "+447826323155",
  /** Human-readable form shown on the contact page. */
  telephoneDisplay: "07826 323155",
  bookingUrl: "https://calendly.com/daliamcdalia",
  /** £60–£70 per session → "££" per schema.org priceRange convention. */
  priceRange: "££",
  /** Portrait of the practitioner — a real photo for Person / knowledge panels. */
  image: `${SITE_URL}/dalia-mcmillan.jpg`,
  addressLocality: "Hassocks",
  addressRegion: "West Sussex",
  addressCountry: "GB",
  /** Approximate Hassocks village centre — town-level, not the home address. */
  latitude: 50.9231,
  longitude: -0.1487,
} as const;

/** The business's stable @id, so per-page schema can reference the same entity. */
const BUSINESS_ID = `${SITE_URL}/#business`;

/** Towns/regions served, in person and online. Drives areaServed. */
function areaServed() {
  return [
    { "@type": "City" as const, name: "Hassocks" },
    { "@type": "City" as const, name: "Burgess Hill" },
    { "@type": "City" as const, name: "Haywards Heath" },
    { "@type": "City" as const, name: "Lewes" },
    { "@type": "City" as const, name: "Brighton" },
    { "@type": "City" as const, name: "Crawley" },
    { "@type": "AdministrativeArea" as const, name: "West Sussex" },
    { "@type": "AdministrativeArea" as const, name: "Sussex" },
    { "@type": "Country" as const, name: "United Kingdom" },
    "Online",
  ];
}

function postalAddress() {
  return {
    "@type": "PostalAddress" as const,
    addressLocality: BUSINESS.addressLocality,
    addressRegion: BUSINESS.addressRegion,
    addressCountry: BUSINESS.addressCountry,
  };
}

// ---------------------------------------------------------------------------
// Reviews (single source of truth for the Reviews component AND review schema)
// ---------------------------------------------------------------------------

export type Review = {
  quote: string;
  name: string;
  detail?: string; // e.g. "Anxiety" or "Brighton" — optional context
  rating?: number; // defaults to 5
};

export const googleReviewsUrl = "https://share.google/W8ejmp8nh6sCBHlFQ";

export const reviews: Review[] = [
  {
    quote:
      "Therapy with Dalia McMillan completely transformed my life — she gave me real, practical tools to use for life to regain my clarity, confidence, and life purpose.",
    name: "Kuridakuya Mubwandarikwa",
    detail: "Confidence & clarity",
  },
  {
    quote:
      "Dalia has such a gentle, kind and calming approach — it immediately puts you at ease. She helped me to overcome my fear of flying, for which I'm very grateful.",
    name: "Ivona Weinstein",
    detail: "Fear of flying",
  },
  {
    quote:
      "Dalia's hypnosis session is a blast of positive energy — her infectious enthusiasm for life permeates the session, and the guided scenes we entered allowed me to see aspects of life differently. She is caring and very easy to talk to; she creates a space that feels both gentle and non-judgemental, where one can open up and then move forwards much more confidently.",
    name: "Marijke",
    detail: "Confidence & positivity",
  },
];

// ---------------------------------------------------------------------------
// Practitioner (Person) — reused inside the business schema and on /about
// ---------------------------------------------------------------------------

/** Person fields without @context, for embedding as provider / worksFor. */
function personCore() {
  return {
    "@type": "Person" as const,
    name: BUSINESS.name,
    jobTitle: BUSINESS.jobTitle,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    url: `${SITE_URL}/about/`,
    image: BUSINESS.image,
    memberOf: {
      "@type": "Organization" as const,
      name: "Association for Solution Focused Hypnotherapy (AfSFH)",
    },
    knowsAbout: [
      "Solution Focused Hypnotherapy",
      "Anxiety",
      "Stress",
      "Sleep",
      "Confidence",
      "Habits and addiction",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential" as const,
        credentialCategory: "certification",
        name: "CPHT — Clifton Practice Hypnotherapy Training",
      },
      {
        "@type": "EducationalOccupationalCredential" as const,
        credentialCategory: "background check",
        name: "Enhanced DBS checked",
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Schema builders
// ---------------------------------------------------------------------------

/** Primary LocalBusiness schema for the homepage — the canonical business entity. */
export function professionalServiceSchema(
  description: string,
): WithContext<ProfessionalService> {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
    alternateName: BUSINESS.alternateName,
    description,
    url: `${SITE_URL}/`,
    image: BUSINESS.image,
    email: BUSINESS.email,
    telephone: BUSINESS.telephone,
    priceRange: BUSINESS.priceRange,
    areaServed: areaServed(),
    address: postalAddress(),
    geo: {
      "@type": "GeoCoordinates",
      latitude: BUSINESS.latitude,
      longitude: BUSINESS.longitude,
    },
    founder: personCore(),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: 5,
      reviewCount: reviews.length,
      bestRating: 5,
    },
    review: reviews.map((r) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating ?? 5,
        bestRating: 5,
      },
      author: { "@type": "Person", name: r.name },
      reviewBody: r.quote,
    })),
    potentialAction: {
      "@type": "ReserveAction",
      target: BUSINESS.bookingUrl,
      name: "Book a free initial consultation",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Solution Focused Hypnotherapy sessions",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Anxiety, stress & trauma" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Habits & addiction" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Confidence & performance" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sleep, mood & pain" } },
      ],
    },
  };
}

/** Practitioner schema for the /about page. */
export function personSchema(): WithContext<Person> {
  return {
    "@context": "https://schema.org",
    ...personCore(),
    worksFor: { "@type": "Organization", "@id": BUSINESS_ID, name: BUSINESS.name },
  };
}

/** Reference to the business entity, for use as a provider on Service schema. */
function providerRef() {
  return {
    "@type": "ProfessionalService" as const,
    "@id": BUSINESS_ID,
    name: BUSINESS.name,
  };
}

/** Service schema for a service-oriented page (what-i-can-help-with, children). */
export function serviceSchema(opts: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
}): WithContext<Service> {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: opts.name,
    description: opts.description,
    url: `${SITE_URL}${opts.path}`,
    serviceType: opts.serviceType,
    provider: providerRef(),
    areaServed: areaServed(),
  };
}

/** ContactPage schema for /contact. */
export function contactPageSchema(description: string): WithContext<ContactPage> {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Dalia McMillan",
    description,
    url: `${SITE_URL}/contact/`,
    mainEntity: {
      "@type": "ProfessionalService",
      "@id": BUSINESS_ID,
      name: BUSINESS.name,
      email: BUSINESS.email,
      telephone: BUSINESS.telephone,
      url: `${SITE_URL}/`,
      address: postalAddress(),
    },
  };
}

/** Breadcrumb trail. Pass pages from home → current (home is prepended for you). */
export function breadcrumbSchema(
  trail: { name: string; path: string }[],
): WithContext<BreadcrumbList> {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.path}`,
    })),
  };
}
