import type { FrIconClassName } from "@codegouvaor/react-ads/fr";

/**
 * Homepage content of the diplomacy portal.
 *
 * This module is the seam where a future government API plugs in: every
 * section of the homepage is driven by these arrays, so replacing the demo
 * values with real data only touches this file (and the message catalogs for
 * labels). Presentation stays in the page component; never hard-code a value
 * of this module into the JSX.
 *
 * Labels (kickers, titles, item texts) are never stored here — they resolve
 * from the `home` namespace of the message catalogs through the keys carried
 * by each entry.
 */

/** Diplomatic status of a country, used by the world map and the legend. */
export type WorldStatusKey =
  | "strategic"
  | "reinforced"
  | "established"
  | "developing"
  | "suspended";

/** A country dot of the world map; the display name is `home.entities.<entityKey>`. */
export type WorldCountry = {
  slug: string;
  entityKey: string;
  lat: number;
  lon: number;
  status: WorldStatusKey;
};

export type DiplomaticStat = {
  key: "relations" | "missions" | "accords" | "organisations";
  value: number;
  href: string;
};

/** A relation showcased in “Relations à suivre”; tag is `home.relations.items.<key>.tag`. */
export type FeaturedRelation = {
  key: string;
  entityKey: string;
  href: string;
};

export type ActivityType = "meeting" | "declaration" | "agreement" | "visit" | "event";

/** An entry of the “Activité diplomatique” timeline. */
export type DiplomaticActivityItem = {
  key: string;
  /** ISO date (yyyy-mm-dd), formatted per locale in the page. */
  date: string;
  type: ActivityType;
  entityKey: string;
  href: string;
};

export type AgreementStatus = "inForce" | "ratifying" | "signed";

/** A recent international engagement; title is `home.agreements.items.<key>.title`. */
export type InternationalAgreement = {
  key: string;
  date: string;
  status: AgreementStatus;
  entityKey: string;
  href: string;
};

/** A thematic position of the Republic; title/desc are `home.positions.items.<key>.*`. */
export type AstoriaPosition = {
  key: string;
  iconId: FrIconClassName;
  href: string;
};

/** A diplomatic-network figure; label is `home.network.items.<key>.label`. */
export type DiplomaticNetworkItem = {
  key: "ambassades" | "consulats" | "missions";
  value: number;
  href: string;
};

/** A citizen service tile; title/desc are `home.services.items.<key>.*`. */
export type CitizenService = {
  key: "travel" | "liveAbroad" | "consular" | "emergency";
  iconId: FrIconClassName;
  href: string;
};

export type PopularSearch = {
  key: string;
  href: string;
};

export const diplomacyHome = {
  hero: {
    actions: {
      explore: { href: "/relations-exterieures" },
      search: { href: "/search" },
    },
  },
  popularSearches: [
    { key: "france", href: "/search?q=Relations+avec+la+France" },
    { key: "visa", href: "/search?q=formalites+de+voyage" },
    { key: "accords", href: "/search?q=accords+avec+le+Japon" },
    { key: "ambassades", href: "/search?q=ambassades+consulats" },
  ] as PopularSearch[],
  stats: {
    indicators: [
      { key: "relations", value: 87, href: "/relations-exterieures" },
      { key: "missions", value: 42, href: "/ministere/ambassades-consulats" },
      { key: "accords", value: 126, href: "/accords" },
      { key: "organisations", value: 31, href: "/relations-exterieures/organisations-internationales" },
    ] as DiplomaticStat[],
  },
  world: {
    astoria: { lat: 46.9, lon: 19.5 },
    countries: [
      { slug: "france", entityKey: "france", lat: 48.86, lon: 2.35, status: "strategic" },
      { slug: "allemagne", entityKey: "allemagne", lat: 52.52, lon: 13.41, status: "strategic" },
      { slug: "royaume-uni", entityKey: "royaume-uni", lat: 51.51, lon: -0.13, status: "strategic" },
      { slug: "etats-unis", entityKey: "etats-unis", lat: 38.9, lon: -77.04, status: "strategic" },
      { slug: "chine", entityKey: "chine", lat: 39.9, lon: 116.4, status: "strategic" },
      { slug: "espagne", entityKey: "espagne", lat: 40.42, lon: -3.7, status: "reinforced" },
      { slug: "italie", entityKey: "italie", lat: 41.9, lon: 12.5, status: "reinforced" },
      { slug: "pays-bas", entityKey: "pays-bas", lat: 52.37, lon: 4.9, status: "reinforced" },
      { slug: "pologne", entityKey: "pologne", lat: 52.23, lon: 21.01, status: "reinforced" },
      { slug: "japon", entityKey: "japon", lat: 35.68, lon: 139.69, status: "reinforced" },
      { slug: "coree-du-sud", entityKey: "coree-du-sud", lat: 37.57, lon: 126.98, status: "reinforced" },
      { slug: "suede", entityKey: "suede", lat: 59.33, lon: 18.07, status: "established" },
      { slug: "ukraine", entityKey: "ukraine", lat: 50.45, lon: 30.52, status: "established" },
      { slug: "suisse", entityKey: "suisse", lat: 46.95, lon: 7.45, status: "established" },
      { slug: "norvege", entityKey: "norvege", lat: 59.91, lon: 10.75, status: "established" },
      { slug: "canada", entityKey: "canada", lat: 45.42, lon: -75.7, status: "established" },
      { slug: "bresil", entityKey: "bresil", lat: -15.79, lon: -47.88, status: "established" },
      { slug: "argentine", entityKey: "argentine", lat: -34.6, lon: -58.38, status: "established" },
      { slug: "vietnam", entityKey: "vietnam", lat: 21.03, lon: 105.85, status: "established" },
      { slug: "arabie-saoudite", entityKey: "arabie-saoudite", lat: 24.71, lon: 46.68, status: "established" },
      { slug: "israel", entityKey: "israel", lat: 31.77, lon: 35.21, status: "established" },
      { slug: "algerie", entityKey: "algerie", lat: 36.75, lon: 3.06, status: "established" },
      { slug: "egypte", entityKey: "egypte", lat: 30.04, lon: 31.24, status: "established" },
      { slug: "senegal", entityKey: "senegal", lat: 14.72, lon: -17.47, status: "established" },
      { slug: "ghana", entityKey: "ghana", lat: 5.6, lon: -0.19, status: "established" },
      { slug: "nigeria", entityKey: "nigeria", lat: 9.08, lon: 7.4, status: "established" },
      { slug: "afrique-du-sud", entityKey: "afrique-du-sud", lat: -25.75, lon: 28.19, status: "established" },
      { slug: "australie", entityKey: "australie", lat: -35.28, lon: 149.13, status: "established" },
      { slug: "nouvelle-zelande", entityKey: "nouvelle-zelande", lat: -41.29, lon: 174.78, status: "established" },
      { slug: "mexique", entityKey: "mexique", lat: 19.43, lon: -99.13, status: "developing" },
      { slug: "chili", entityKey: "chili", lat: -33.45, lon: -70.67, status: "developing" },
      { slug: "colombie", entityKey: "colombie", lat: 4.71, lon: -74.07, status: "developing" },
      { slug: "perou", entityKey: "perou", lat: -12.05, lon: -77.04, status: "developing" },
      { slug: "inde", entityKey: "inde", lat: 28.61, lon: 77.21, status: "developing" },
      { slug: "indonesie", entityKey: "indonesie", lat: -6.21, lon: 106.85, status: "developing" },
      { slug: "singapour", entityKey: "singapour", lat: 1.35, lon: 103.82, status: "developing" },
      { slug: "emirats-arabes-unis", entityKey: "emirats-arabes-unis", lat: 24.45, lon: 54.38, status: "developing" },
      { slug: "maroc", entityKey: "maroc", lat: 34.02, lon: -6.84, status: "developing" },
      { slug: "russie", entityKey: "russie", lat: 55.76, lon: 37.62, status: "suspended" },
    ] as WorldCountry[],
  },
  relations: [
    { key: "france", entityKey: "france", href: "/pays/fiches/france" },
    { key: "japon", entityKey: "japon", href: "/pays/fiches/japon" },
    { key: "unionEuropeenne", entityKey: "union-europeenne", href: "/relations-exterieures/organisations-internationales/union-europeenne" },
    { key: "nationsUnies", entityKey: "nations-unies", href: "/relations-exterieures/organisations-internationales/nations-unies" },
    { key: "allemagne", entityKey: "allemagne", href: "/pays/fiches/allemagne" },
    { key: "chine", entityKey: "chine", href: "/pays/fiches/chine" },
    { key: "bresil", entityKey: "bresil", href: "/pays/fiches/bresil" },
    { key: "afriqueDuSud", entityKey: "afrique-du-sud", href: "/pays/fiches/afrique-du-sud" },
  ] as FeaturedRelation[],
  activity: [
    { key: "japon", date: "2026-09-09", type: "meeting", entityKey: "japon", href: "/activite-diplomatique/rencontres/japon" },
    { key: "conseilSecurite", date: "2026-09-08", type: "declaration", entityKey: "nations-unies", href: "/activite-diplomatique/declarations/conseil-de-securite" },
    { key: "bresil", date: "2026-09-06", type: "agreement", entityKey: "bresil", href: "/activite-diplomatique/actualites/accord-bresil" },
    { key: "allemagne", date: "2026-09-04", type: "visit", entityKey: "allemagne", href: "/activite-diplomatique/visites-officielles/allemagne" },
    { key: "climat", date: "2026-09-02", type: "event", entityKey: "nations-unies", href: "/activite-diplomatique/rencontres/climat" },
  ] as DiplomaticActivityItem[],
  agreements: {
    total: { value: 126, href: "/accords" },
    figures: [
      { key: "inForce", value: 94, href: "/accords/en-vigueur" },
      { key: "ratifying", value: 18, href: "/accords/ratifications" },
      { key: "signed", value: 8, href: "/accords/signes" },
    ] as { key: AgreementStatus; value: number; href: string }[],
    recent: [
      { key: "japon", date: "2026-08-12", status: "inForce", entityKey: "japon", href: "/accords/bilateraux/japon" },
      { key: "france", date: "2026-05-20", status: "inForce", entityKey: "france", href: "/accords/conventions/france" },
      { key: "unionEuropeenne", date: "2026-03-15", status: "signed", entityKey: "union-europeenne", href: "/accords/engagements/union-europeenne" },
      { key: "climat", date: "2026-01-30", status: "ratifying", entityKey: "nations-unies", href: "/accords/conventions/climat" },
    ] as InternationalAgreement[],
  },
  positions: {
    items: [
      { key: "paix", iconId: "fr-icon-shield-line", href: "/politique-etrangere/positions-officielles/paix-securite" },
      { key: "climat", iconId: "fr-icon-leaf-line", href: "/politique-etrangere/positions-officielles/climat-environnement" },
      { key: "commerce", iconId: "fr-icon-global-line", href: "/politique-etrangere/positions-officielles/commerce-international" },
      { key: "cyber", iconId: "fr-icon-lock-line", href: "/politique-etrangere/positions-officielles/cybersecurite" },
      { key: "ia", iconId: "fr-icon-sparkling-2-line", href: "/politique-etrangere/positions-officielles/intelligence-artificielle" },
      { key: "cooperation", iconId: "fr-icon-community-line", href: "/politique-etrangere/positions-officielles/cooperation-internationale" },
    ] as AstoriaPosition[],
    featured: { href: "/politique-etrangere/positions-officielles/paix-securite" },
  },
  network: [
    { key: "ambassades", value: 22, href: "/ministere/ambassades-consulats/ambassades" },
    { key: "consulats", value: 14, href: "/ministere/ambassades-consulats/consulats" },
    { key: "missions", value: 6, href: "/ministere/ambassades-consulats/missions-permanentes" },
  ] as DiplomaticNetworkItem[],
  services: [
    { key: "travel", iconId: "fr-icon-suitcase-2-line", href: "/services/voyager" },
    { key: "liveAbroad", iconId: "fr-icon-home-4-line", href: "/services/vivre-a-l-etranger" },
    { key: "consular", iconId: "fr-icon-passport-line", href: "/services/consulaires" },
    { key: "emergency", iconId: "fr-icon-alert-line", href: "/services/urgence" },
  ] as CitizenService[],
} as const;