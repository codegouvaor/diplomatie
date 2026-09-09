/**
 * Partner states of the Republic of Astoria — the public register of the
 * bilateral relations of the Republic.
 *
 * This module is the seam where a future government API plugs in (same role
 * as `lib/home-content.ts` for the homepage): every section of the États
 * partenaires page is driven by these arrays, so replacing the demo values
 * with real data only touches this file (and the message catalogs for
 * labels). Presentation stays in the page component; never hard-code a value
 * of this module into the JSX.
 *
 * Labels (statuses, regions, representations, card strings) are never stored
 * here — they resolve from the `etatsPartenaires` namespace of the message
 * catalogs through the keys carried by each entry. Country names resolve from
 * `home.entities.<entityKey>`. Capitals and representation cities are plain
 * strings (proper nouns shared by both locales); move them to the catalogs
 * when the real data source lands.
 */

/** Nature of the bilateral relation between Astoria and a partner state. */
export type PartnerStateStatus =
  | "strategic"
  | "privileged"
  | "partner"
  | "developing"
  | "suspended";

/** World region of a partner state; label is `etatsPartenaires.region.<key>`. */
export type PartnerStateRegion =
  | "europe"
  | "asie"
  | "afrique"
  | "ameriques"
  | "moyenOrient"
  | "oceanie";

/** Diplomatic representation of Astoria in the partner state. */
export type PartnerStateRepresentation = "embassy" | "consulate" | "mission" | "none";

/**
 * A partner state of the Republic.
 *
 * The model does not assume `relationsEstablished === true`: a state can
 * appear in the referential without a fully established diplomatic relation,
 * and is ready to evolve towards more granular statuses (established, being
 * established, developing, suspended, none).
 */
export type PartnerState = {
  /** Slug used by the future relation fiche route (`/pays/fiches/<slug>`). */
  slug: string;
  /** Message key of the localized country name (`home.entities.<entityKey>`). */
  entityKey: string;
  /** ISO 3166-1 alpha-3 code, searchable. */
  code: string;
  /** Capital city (plain string, shared by both locales). */
  capital: string;
  /** Emoji flag — decorative only, the localized name is always rendered next to it. */
  flagEmoji: string;
  region: PartnerStateRegion;
  status: PartnerStateStatus;
  /** Year the diplomatic relations were established. */
  establishedAt: number;
  representation: PartnerStateRepresentation;
  /** City of the Astorian representation, when there is one. */
  representationCity?: string;
  /** Number of bilateral agreements in force with Astoria. */
  agreements: number;
  /** ISO date (yyyy-mm-dd) of the latest recorded diplomatic activity. */
  latestActivity?: string;
};

/** Display order of the relation-levels filter. */
export const partnerStateStatusOrder: readonly PartnerStateStatus[] = [
  "strategic",
  "privileged",
  "partner",
  "developing",
  "suspended",
];

/** Display order of the region filter. */
export const partnerStateRegionOrder: readonly PartnerStateRegion[] = [
  "europe",
  "asie",
  "afrique",
  "ameriques",
  "moyenOrient",
  "oceanie",
];

/** Display order of the representation filter. */
export const partnerStateRepresentationOrder: readonly PartnerStateRepresentation[] = [
  "embassy",
  "consulate",
  "mission",
  "none",
];

/**
 * Headline figures of the register (header section). Demonstration values,
 * coherent with the homepage indicators (87 diplomatic relations, 42 missions);
 * they will be computed from the API once it ships.
 */
export const partnerStatesSummary = {
  states: 87,
  establishedRelations: 76,
  strategicPartnerships: 24,
  representations: 42,
} as const;

/**
 * Demonstration registry. The full official referential will come from the
 * API; this subset is enough to exercise every filter and both views.
 */
export const partnerStates: readonly PartnerState[] = [
  // ---- Partenariats stratégiques -------------------------------------------
  { slug: "france", entityKey: "france", code: "FRA", capital: "Paris", flagEmoji: "🇫🇷", region: "europe", status: "strategic", establishedAt: 1962, representation: "embassy", representationCity: "Paris", agreements: 24, latestActivity: "2026-08-30" },
  { slug: "allemagne", entityKey: "allemagne", code: "DEU", capital: "Berlin", flagEmoji: "🇩🇪", region: "europe", status: "strategic", establishedAt: 1963, representation: "embassy", representationCity: "Berlin", agreements: 21, latestActivity: "2026-09-04" },
  { slug: "royaume-uni", entityKey: "royaume-uni", code: "GBR", capital: "Londres", flagEmoji: "🇬🇧", region: "europe", status: "strategic", establishedAt: 1962, representation: "embassy", representationCity: "Londres", agreements: 19, latestActivity: "2026-07-18" },
  { slug: "etats-unis", entityKey: "etats-unis", code: "USA", capital: "Washington", flagEmoji: "🇺🇸", region: "ameriques", status: "strategic", establishedAt: 1962, representation: "embassy", representationCity: "Washington", agreements: 23, latestActivity: "2026-09-02" },
  { slug: "chine", entityKey: "chine", code: "CHN", capital: "Pékin", flagEmoji: "🇨🇳", region: "asie", status: "strategic", establishedAt: 1964, representation: "embassy", representationCity: "Pékin", agreements: 26, latestActivity: "2026-08-28" },
  { slug: "japon", entityKey: "japon", code: "JPN", capital: "Tokyo", flagEmoji: "🇯🇵", region: "asie", status: "strategic", establishedAt: 1987, representation: "embassy", representationCity: "Tokyo", agreements: 18, latestActivity: "2026-09-09" },
  { slug: "canada", entityKey: "canada", code: "CAN", capital: "Ottawa", flagEmoji: "🇨🇦", region: "ameriques", status: "strategic", establishedAt: 1962, representation: "embassy", representationCity: "Ottawa", agreements: 14, latestActivity: "2026-08-15" },

  // ---- Partenaires privilégiés --------------------------------------------
  { slug: "espagne", entityKey: "espagne", code: "ESP", capital: "Madrid", flagEmoji: "🇪🇸", region: "europe", status: "privileged", establishedAt: 1963, representation: "embassy", representationCity: "Madrid", agreements: 12, latestActivity: "2026-07-05" },
  { slug: "italie", entityKey: "italie", code: "ITA", capital: "Rome", flagEmoji: "🇮🇹", region: "europe", status: "privileged", establishedAt: 1962, representation: "embassy", representationCity: "Rome", agreements: 15, latestActivity: "2026-06-22" },
  { slug: "pays-bas", entityKey: "pays-bas", code: "NLD", capital: "Amsterdam", flagEmoji: "🇳🇱", region: "europe", status: "privileged", establishedAt: 1962, representation: "embassy", representationCity: "La Haye", agreements: 11 },
  { slug: "coree-du-sud", entityKey: "coree-du-sud", code: "KOR", capital: "Séoul", flagEmoji: "🇰🇷", region: "asie", status: "privileged", establishedAt: 1989, representation: "embassy", representationCity: "Séoul", agreements: 9, latestActivity: "2026-08-12" },
  { slug: "bresil", entityKey: "bresil", code: "BRA", capital: "Brasilia", flagEmoji: "🇧🇷", region: "ameriques", status: "privileged", establishedAt: 1974, representation: "embassy", representationCity: "Brasilia", agreements: 13, latestActivity: "2026-09-06" },
  { slug: "inde", entityKey: "inde", code: "IND", capital: "New Delhi", flagEmoji: "🇮🇳", region: "asie", status: "privileged", establishedAt: 1975, representation: "mission", representationCity: "New Delhi", agreements: 10, latestActivity: "2026-08-03" },
  { slug: "australie", entityKey: "australie", code: "AUS", capital: "Canberra", flagEmoji: "🇦🇺", region: "oceanie", status: "privileged", establishedAt: 1970, representation: "embassy", representationCity: "Canberra", agreements: 8, latestActivity: "2026-07-27" },

  // ---- Partenaires ----------------------------------------------------------
  { slug: "suede", entityKey: "suede", code: "SWE", capital: "Stockholm", flagEmoji: "🇸🇪", region: "europe", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Stockholm", agreements: 7 },
  { slug: "pologne", entityKey: "pologne", code: "POL", capital: "Varsovie", flagEmoji: "🇵🇱", region: "europe", status: "partner", establishedAt: 1963, representation: "embassy", representationCity: "Varsovie", agreements: 9 },
  { slug: "ukraine", entityKey: "ukraine", code: "UKR", capital: "Kyiv", flagEmoji: "🇺🇦", region: "europe", status: "partner", establishedAt: 1992, representation: "embassy", representationCity: "Kyiv", agreements: 6 },
  { slug: "suisse", entityKey: "suisse", code: "CHE", capital: "Berne", flagEmoji: "🇨🇭", region: "europe", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Berne", agreements: 8 },
  { slug: "norvege", entityKey: "norvege", code: "NOR", capital: "Oslo", flagEmoji: "🇳🇴", region: "europe", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Oslo", agreements: 5 },
  { slug: "argentine", entityKey: "argentine", code: "ARG", capital: "Buenos Aires", flagEmoji: "🇦🇷", region: "ameriques", status: "partner", establishedAt: 1973, representation: "embassy", representationCity: "Buenos Aires", agreements: 9 },
  { slug: "vietnam", entityKey: "vietnam", code: "VNM", capital: "Hanoï", flagEmoji: "🇻🇳", region: "asie", status: "partner", establishedAt: 1976, representation: "embassy", representationCity: "Hanoï", agreements: 7, latestActivity: "2026-09-01" },
  { slug: "arabie-saoudite", entityKey: "arabie-saoudite", code: "SAU", capital: "Riyad", flagEmoji: "🇸🇦", region: "moyenOrient", status: "partner", establishedAt: 1976, representation: "embassy", representationCity: "Riyad", agreements: 6 },
  { slug: "israel", entityKey: "israel", code: "ISR", capital: "Jérusalem", flagEmoji: "🇮🇱", region: "moyenOrient", status: "partner", establishedAt: 1993, representation: "embassy", representationCity: "Tel Aviv", agreements: 5 },
  { slug: "algerie", entityKey: "algerie", code: "DZA", capital: "Alger", flagEmoji: "🇩🇿", region: "afrique", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Alger", agreements: 8 },
  { slug: "egypte", entityKey: "egypte", code: "EGY", capital: "Le Caire", flagEmoji: "🇪🇬", region: "afrique", status: "partner", establishedAt: 1972, representation: "embassy", representationCity: "Le Caire", agreements: 7 },
  { slug: "senegal", entityKey: "senegal", code: "SEN", capital: "Dakar", flagEmoji: "🇸🇳", region: "afrique", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Dakar", agreements: 11, latestActivity: "2026-08-08" },
  { slug: "ghana", entityKey: "ghana", code: "GHA", capital: "Accra", flagEmoji: "🇬🇭", region: "afrique", status: "partner", establishedAt: 1962, representation: "embassy", representationCity: "Accra", agreements: 5 },
  { slug: "nigeria", entityKey: "nigeria", code: "NGA", capital: "Abuja", flagEmoji: "🇳🇬", region: "afrique", status: "partner", establishedAt: 1971, representation: "embassy", representationCity: "Abuja", agreements: 4 },
  { slug: "afrique-du-sud", entityKey: "afrique-du-sud", code: "ZAF", capital: "Pretoria", flagEmoji: "🇿🇦", region: "afrique", status: "partner", establishedAt: 1994, representation: "embassy", representationCity: "Pretoria", agreements: 6 },
  { slug: "nouvelle-zelande", entityKey: "nouvelle-zelande", code: "NZL", capital: "Wellington", flagEmoji: "🇳🇿", region: "oceanie", status: "partner", establishedAt: 1972, representation: "embassy", representationCity: "Wellington", agreements: 4 },

  // ---- Relations en développement ------------------------------------------
  { slug: "mexique", entityKey: "mexique", code: "MEX", capital: "Mexico", flagEmoji: "🇲🇽", region: "ameriques", status: "developing", establishedAt: 1977, representation: "consulate", representationCity: "Mexico", agreements: 6 },
  { slug: "chili", entityKey: "chili", code: "CHL", capital: "Santiago", flagEmoji: "🇨🇱", region: "ameriques", status: "developing", establishedAt: 1975, representation: "consulate", representationCity: "Santiago", agreements: 5 },
  { slug: "colombie", entityKey: "colombie", code: "COL", capital: "Bogota", flagEmoji: "🇨🇴", region: "ameriques", status: "developing", establishedAt: 1981, representation: "consulate", representationCity: "Bogota", agreements: 4 },
  { slug: "perou", entityKey: "perou", code: "PER", capital: "Lima", flagEmoji: "🇵🇪", region: "ameriques", status: "developing", establishedAt: 1973, representation: "consulate", representationCity: "Lima", agreements: 4 },
  { slug: "indonesie", entityKey: "indonesie", code: "IDN", capital: "Jakarta", flagEmoji: "🇮🇩", region: "asie", status: "developing", establishedAt: 1974, representation: "mission", representationCity: "Jakarta", agreements: 6 },
  { slug: "singapour", entityKey: "singapour", code: "SGP", capital: "Singapour", flagEmoji: "🇸🇬", region: "asie", status: "developing", establishedAt: 1985, representation: "mission", representationCity: "Singapour", agreements: 7, latestActivity: "2026-08-19" },
  { slug: "emirats-arabes-unis", entityKey: "emirats-arabes-unis", code: "ARE", capital: "Abou Dabi", flagEmoji: "🇦🇪", region: "moyenOrient", status: "developing", establishedAt: 1980, representation: "consulate", representationCity: "Abou Dabi", agreements: 8, latestActivity: "2026-08-25" },
  { slug: "maroc", entityKey: "maroc", code: "MAR", capital: "Rabat", flagEmoji: "🇲🇦", region: "afrique", status: "developing", establishedAt: 1962, representation: "consulate", representationCity: "Rabat", agreements: 9, latestActivity: "2026-07-30" },

  // ---- Relations suspendues -------------------------------------------------
  { slug: "russie", entityKey: "russie", code: "RUS", capital: "Moscou", flagEmoji: "🇷🇺", region: "europe", status: "suspended", establishedAt: 1962, representation: "none", agreements: 3 },
];