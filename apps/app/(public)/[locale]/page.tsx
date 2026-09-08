import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { Link, getPathname } from "@/i18n/navigation";
import { diplomacyHome, type WorldStatusKey } from "@/lib/home-content";
import { PortalSearchBar } from "@/components/public/search/portal-search-bar";
import {
  CtaButtonsGroup,
  LinkTile,
  SearchSuggestionTag,
} from "@/components/public/content/ads-fragments";

const HOME_PATH = "/";
const RELATIONS_PATH = "/relations-exterieures";
const COUNTRIES_PATH = "/pays";
const ACTIVITY_PATH = "/activite-diplomatique";
const AGREEMENTS_PATH = "/accords";
const NETWORK_PATH = "/ministere/ambassades-consulats";

type PageProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const tHome = await getTranslations({ locale, namespace: "home" });
  const tMeta = await getTranslations({ locale, namespace: "meta" });

  return {
    title: { absolute: tHome("metaTitle") },
    description: tMeta("description"),
    ...localizedAlternates(locale, HOME_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the ministry-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet. */

const heroContainerStyle: CSSProperties = {
  maxWidth: "52rem",
  marginInline: "auto",
  textAlign: "center",
};

const searchBlockStyle: CSSProperties = {
  maxWidth: "42rem",
  margin: "2.25rem auto 0",
  textAlign: "left",
};

const searchTitleStyle: CSSProperties = {
  margin: "0 0 0.75rem",
  fontSize: "1.25rem",
  lineHeight: 1.3,
  fontWeight: 700,
};

const popularLabelStyle: CSSProperties = {
  margin: "0 0 0.5rem",
  fontSize: "0.875rem",
  color: "var(--ads-color-text-muted)",
};

const popularListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexWrap: "wrap",
  gap: "0.5rem",
};

const cardListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "grid",
  gap: "1.5rem",
};

/** Whole-card link block (indicators, relations, agreements…). */
const teaserCardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  height: "100%",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderTop: "3px solid var(--ads-color-primary)",
  textDecoration: "none",
  color: "var(--ads-color-text)",
};

const teaserTagStyle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-primary)",
};

const teaserTitleStyle: CSSProperties = {
  display: "block",
  fontSize: "1.0625rem",
  lineHeight: 1.35,
  fontWeight: 700,
};

const teaserDescStyle: CSSProperties = {
  display: "block",
  fontSize: "0.875rem",
  lineHeight: 1.55,
  color: "var(--ads-color-text-muted)",
};

const teaserArrowStyle: CSSProperties = {
  marginTop: "auto",
  alignSelf: "flex-end",
  fontSize: "1rem",
  color: "var(--ads-color-primary)",
};

const figureValueStyle: CSSProperties = {
  display: "block",
  fontSize: "clamp(1.5rem, 3vw, 2rem)",
  lineHeight: 1.2,
  fontWeight: 700,
};

const figureLabelStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9375rem",
  fontWeight: 600,
};

/* ---- World map ------------------------------------------------------------- */

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 500;

const toMapX = (lon: number) => ((lon + 180) / 360) * MAP_WIDTH;
const toMapY = (lat: number) => ((90 - lat) / 180) * MAP_HEIGHT;

const worldStatusOrder: WorldStatusKey[] = [
  "strategic",
  "reinforced",
  "established",
  "developing",
  "suspended",
];

const worldStatusColors: Record<WorldStatusKey, string> = {
  strategic: "var(--ads-color-primary)",
  reinforced: "var(--ads-color-info)",
  established: "var(--ads-color-success)",
  developing: "var(--ads-color-warning)",
  suspended: "var(--ads-color-danger)",
};

const mapPanelStyle: CSSProperties = {
  maxWidth: "72rem",
  padding: "1.25rem",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
};

const legendStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.875rem 1.5rem",
  marginTop: "1rem",
};

const legendItemStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.875rem",
  lineHeight: 1.4,
};

const statusColumnStyle: CSSProperties = {
  flex: "1 1 13rem",
  minWidth: "13rem",
};

const statusColumnTitleStyle: CSSProperties = {
  margin: "0 0 0.5rem",
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--ads-color-text-muted)",
};

const statusColumnListStyle: CSSProperties = {
  listStyle: "none",
  margin: "0",
  padding: "0",
  display: "flex",
  flexDirection: "column",
  gap: "0.25rem",
  fontSize: "0.9375rem",
};

/* ---- Diplomatic activity timeline ------------------------------------------ */

const timelineDateStyle: CSSProperties = {
  display: "block",
  fontSize: "0.9375rem",
  fontWeight: 600,
  color: "var(--ads-color-text-muted)",
  fontVariantNumeric: "tabular-nums",
};

const activityTypeStyle: CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-primary)",
};

const activityTitleStyle: CSSProperties = {
  fontSize: "1.0625rem",
  lineHeight: 1.4,
  fontWeight: 700,
  color: "var(--ads-color-text)",
  textDecoration: "none",
  textUnderlineOffset: "0.2em",
};

const activityEntityStyle: CSSProperties = {
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: "var(--ads-color-text-muted)",
};

/** Formats an ISO date (`yyyy-mm-dd`) in the active locale, UTC-safe. */
function formatDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/**
 * Homepage of the Ministry of Foreign Affairs — the synthetic view of the
 * diplomacy of the Republic of Astoria.
 *
 * The header allows exploring the ministry (six subjects, unchanged); this
 * page allows understanding. It answers “what are the foreign relations of
 * the Republic?”, section after section:
 *
 *   01 Hero / Recherche            — who we are, and search first
 *   02 Indicateurs diplomatiques   — the diplomacy in figures
 *   03 Astoria dans le monde       — where the Republic has relations
 *   04 Relations à suivre          — the relations worth watching
 *   05 Activité diplomatique       — what the diplomacy does right now
 *   06 Engagements internationaux  — the public register of treaties
 *   07 Positions d'Astoria         — what the Republic officially defends
 *   08 Réseau diplomatique         — embassies, consulates, missions
 *   09 Services aux citoyens       — consular services, discreet closing
 *
 * Every section is driven by the `diplomacyHome` configuration
 * (lib/home-content.ts) and the message catalogs, so the content can evolve
 * without rewriting the interface. The six subjects deliberately do not
 * appear here as a second navigation: they belong to the header. Newsletter
 * and social accounts are relegated to the footer (stay-in-touch zone of
 * GovernmentFooter).
 */
export default async function HomePage({ params }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "home" });

  // Localized destination of a country fiche, used by the SVG map anchors
  // (plain SVG anchors cannot use the next-intl Link component).
  const countryHref = (slug: string) => getPathname({ href: `/pays/fiches/${slug}`, locale });

  const astoria = diplomacyHome.world.astoria;
  const mapCountries = diplomacyHome.world.countries.map((country) => ({
    ...country,
    name: t(`entities.${country.entityKey}`),
    href: countryHref(country.slug),
  }));
  const strategicPartners = mapCountries.filter(
    (country) => country.status === "strategic"
  );

  return (
    <>
      {/* 01 — Hero / Recherche: institutional statement and the main search,
          visually the most important element of the page. */}
      <section className="gov-section" aria-labelledby="home-hero-title">
        <div className="gov-section__container" style={heroContainerStyle}>
          <p className="gov-kicker">{t("hero.kicker")}</p>
          <h1 id="home-hero-title">{t("hero.title")}</h1>
          <p className="gov-lead">{t("hero.lead")}</p>
          <div style={{ marginTop: "2rem" }}>
            <CtaButtonsGroup
              alignment="center"
              buttons={[
                {
                  children: t("hero.exploreLink"),
                  href: diplomacyHome.hero.actions.explore.href,
                  priority: "primary",
                  iconId: "fr-icon-earth-line",
                },
                {
                  children: t("hero.searchLink"),
                  href: diplomacyHome.hero.actions.search.href,
                  priority: "secondary",
                  iconId: "fr-icon-search-line",
                },
              ]}
            />
          </div>
          <div style={searchBlockStyle}>
            <h2 id="home-search-title" style={searchTitleStyle}>
              {t("search.title")}
            </h2>
            <PortalSearchBar label={t("search.label")} placeholder={t("search.placeholder")} />
            <div style={{ marginTop: "1.25rem" }}>
              <p style={popularLabelStyle} id="popular-searches-label">
                {t("search.popularLabel")}
              </p>
              <ul style={popularListStyle} aria-labelledby="popular-searches-label">
                {diplomacyHome.popularSearches.map((search) => (
                  <li key={search.key}>
                    <SearchSuggestionTag
                      label={t(`search.popular.${search.key}`)}
                      href={search.href}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 02 — Indicateurs diplomatiques: synthetic view of the diplomacy,
          driven by the indicators config (the seam where a future data source
          plugs in). */}
      <section className="gov-section gov-section--subtle" aria-labelledby="stats-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("stats.kicker")}</p>
              <h2 id="stats-title" className="gov-section__title">
                {t("stats.title")}
              </h2>
              <p className="gov-lead">{t("stats.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {diplomacyHome.stats.indicators.map((indicator) => (
              <li key={indicator.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <Link href={indicator.href} style={teaserCardStyle}>
                  <span style={figureValueStyle}>{indicator.value}</span>
                  <span style={figureLabelStyle}>
                    {t(`stats.items.${indicator.key}.label`)}
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
            {t("stats.note")}
          </p>
        </div>
      </section>

      {/* 03 — Astoria dans le monde: conceptual world map of the diplomatic
          relations of the Republic, with an accessible country list below. */}
      <section className="gov-section" aria-labelledby="world-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("world.kicker")}</p>
              <h2 id="world-title" className="gov-section__title">
                {t("world.title")}
              </h2>
              <p className="gov-lead">{t("world.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("world.exploreLink"),
                  href: COUNTRIES_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>

          <div style={mapPanelStyle}>
            <svg
              viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`}
              role="img"
              aria-labelledby="world-map-title"
              style={{ display: "block", width: "100%", height: "auto" }}
            >
              <title id="world-map-title">{t("world.mapLabel")}</title>
              {/* Background */}
              <rect
                x={0}
                y={0}
                width={MAP_WIDTH}
                height={MAP_HEIGHT}
                fill="var(--ads-color-surface-muted)"
                rx={8}
              />
              {/* Graticule */}
              {Array.from({ length: 7 }, (_, i) => {
                const lon = -180 + i * 60;
                return (
                  <line
                    key={`v-${lon}`}
                    x1={toMapX(lon)}
                    y1={0}
                    x2={toMapX(lon)}
                    y2={MAP_HEIGHT}
                    stroke="var(--ads-color-border)"
                    strokeOpacity={0.7}
                    strokeWidth={1}
                  />
                );
              })}
              {Array.from({ length: 5 }, (_, i) => {
                const lat = 60 - i * 30;
                return (
                  <line
                    key={`h-${lat}`}
                    x1={0}
                    y1={toMapY(lat)}
                    x2={MAP_WIDTH}
                    y2={toMapY(lat)}
                    stroke="var(--ads-color-border)"
                    strokeOpacity={0.7}
                    strokeWidth={1}
                  />
                );
              })}
              {/* Equator */}
              <line
                x1={0}
                y1={toMapY(0)}
                x2={MAP_WIDTH}
                y2={toMapY(0)}
                stroke="var(--ads-color-border)"
                strokeWidth={1.5}
              />
              {/* Links from Astoria to its strategic partners */}
              {strategicPartners.map((country) => (
                <line
                  key={`link-${country.slug}`}
                  x1={toMapX(astoria.lon)}
                  y1={toMapY(astoria.lat)}
                  x2={toMapX(country.lon)}
                  y2={toMapY(country.lat)}
                  stroke="var(--ads-color-primary)"
                  strokeOpacity={0.18}
                  strokeWidth={1.5}
                />
              ))}
              {/* Country dots */}
              {mapCountries.map((country) => (
                <a
                  key={country.slug}
                  href={country.href}
                  aria-label={`${country.name} — ${t(`world.status.${country.status}`)}`}
                >
                  <circle
                    cx={toMapX(country.lon)}
                    cy={toMapY(country.lat)}
                    r={6}
                    fill={worldStatusColors[country.status]}
                  />
                  <title>{country.name}</title>
                </a>
              ))}
              {/* Astoria marker */}
              <g aria-label={t("world.astoriaLabel")}>
                <title>{t("world.astoriaLabel")}</title>
                <circle
                  cx={toMapX(astoria.lon)}
                  cy={toMapY(astoria.lat)}
                  r={11}
                  fill="var(--ads-color-primary)"
                />
                <circle
                  cx={toMapX(astoria.lon)}
                  cy={toMapY(astoria.lat)}
                  r={5}
                  fill="var(--ads-color-on-primary)"
                />
              </g>
            </svg>

            <div style={legendStyle} aria-label={t("world.legendTitle")}>
              {worldStatusOrder.map((status) => (
                <span key={status} style={legendItemStyle}>
                  <span
                    aria-hidden="true"
                    style={{
                      width: "0.875rem",
                      height: "0.875rem",
                      borderRadius: "9999px",
                      background: worldStatusColors[status],
                    }}
                  />
                  {t(`world.status.${status}`)}
                </span>
              ))}
            </div>
          </div>

          {/* Accessible alternative of the map: every country, grouped by
              status, as plain links. */}
          <div style={{ marginTop: "1.5rem" }}>
            <h3 className="gov-section__subtitle" id="world-list-title">
              {t("world.accessListTitle")}
            </h3>
            <div
              role="list"
              aria-labelledby="world-list-title"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1.5rem 2rem",
              }}
            >
              {worldStatusOrder.map((status) => {
                const countries = mapCountries.filter((c) => c.status === status);
                if (countries.length === 0) return null;
                return (
                  <div key={status} role="listitem" style={statusColumnStyle}>
                    <p style={statusColumnTitleStyle}>
                      {t(`world.status.${status}`)}
                    </p>
                    <ul style={statusColumnListStyle}>
                      {countries.map((country) => (
                        <li key={country.slug}>
                          <Link
                            href={country.href}
                            style={{ textUnderlineOffset: "0.2em" }}
                          >
                            {country.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 04 — Relations à suivre: the relations worth watching, each a door to
          a future country/organisation file. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="relations-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("relations.kicker")}</p>
              <h2 id="relations-title" className="gov-section__title">
                {t("relations.title")}
              </h2>
              <p className="gov-lead">{t("relations.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("relations.allLink"),
                  href: RELATIONS_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {diplomacyHome.relations.map((relation) => (
              <li key={relation.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <Link href={relation.href} style={teaserCardStyle}>
                  <span style={teaserTagStyle}>
                    {t(`relations.items.${relation.key}.tag`)}
                  </span>
                  <span style={teaserTitleStyle}>
                    {t(`entities.${relation.entityKey}`)}
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 05 — Activité diplomatique: what the diplomacy does right now, as a
          short timeline. */}
      <section className="gov-section" aria-labelledby="activity-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("activity.kicker")}</p>
              <h2 id="activity-title" className="gov-section__title">
                {t("activity.title")}
              </h2>
              <p className="gov-lead">{t("activity.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("activity.allLink"),
                  href: ACTIVITY_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul role="list" style={cardListStyle}>
            {diplomacyHome.activity.map((item) => (
              <li
                key={item.key}
                style={{
                  padding: "1.25rem 0",
                  borderBottom: "1px solid var(--ads-color-border)",
                }}
              >
                <div
                  className="fr-grid-row fr-grid-row--gutters"
                  style={{ alignItems: "center" }}
                >
                  <div className="fr-col-12 fr-col-sm-3">
                    <time dateTime={item.date} style={timelineDateStyle}>
                      {formatDate(item.date, locale)}
                    </time>
                  </div>
                  <div className="fr-col-12 fr-col-sm-9">
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0.375rem",
                        }}
                      >
                        <span style={activityTypeStyle}>
                          {t(`activity.types.${item.type}`)}
                        </span>
                        <Link href={item.href} style={activityTitleStyle}>
                          {t(`activity.items.${item.key}`)}
                        </Link>
                        <span style={activityEntityStyle}>
                          {t(`entities.${item.entityKey}`)}
                        </span>
                      </div>
                      <span
                        className="fr-icon-arrow-right-line"
                        aria-hidden="true"
                        style={{ marginLeft: "auto", color: "var(--ads-color-primary)" }}
                      />
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Engagements internationaux: the diplomacy as a documentary
          source — the public register of treaties and agreements. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="agreements-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("agreements.kicker")}</p>
              <h2 id="agreements-title" className="gov-section__title">
                {t("agreements.title")}
              </h2>
              <p className="gov-lead">{t("agreements.lead")}</p>
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "1.75rem",
              maxWidth: "72rem",
              padding: "1.75rem",
              background: "var(--ads-color-background)",
              border: "1px solid var(--ads-color-border)",
            }}
          >
            <div>
              <p
                style={{
                  margin: "0 0 0.375rem",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: "var(--ads-color-text-muted)",
                }}
              >
                {t("agreements.totalLabel")}
              </p>
              <p
                style={{
                  margin: "0 0 1.5rem",
                  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                  lineHeight: 1.2,
                  fontWeight: 700,
                }}
              >
                {diplomacyHome.agreements.total.value}
              </p>
              <CtaButtonsGroup
                buttons={[
                  {
                    children: t("agreements.allLink"),
                    href: AGREEMENTS_PATH,
                    priority: "secondary",
                    iconId: "fr-icon-arrow-right-line",
                  },
                ]}
              />
            </div>
            <ul className="fr-grid-row fr-grid-row--gutters" role="list">
              {diplomacyHome.agreements.figures.map((figure) => (
                <li key={figure.key} className="fr-col-12 fr-col-sm-6 fr-col-lg-3">
                  <Link
                    href={figure.href}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.25rem",
                      height: "100%",
                      padding: "0.875rem 1rem",
                      background: "var(--ads-color-surface-muted)",
                      border: "1px solid var(--ads-color-border)",
                      textDecoration: "none",
                      color: "var(--ads-color-text)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: 600,
                        color: "var(--ads-color-text-muted)",
                      }}
                    >
                      {t(`agreements.figures.${figure.key}`)}
                    </span>
                    <span style={{ fontSize: "1.125rem", lineHeight: 1.3, fontWeight: 700 }}>
                      {figure.value}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <h3 className="gov-section__subtitle" id="agreements-recent-title">
            {t("agreements.recentTitle")}
          </h3>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {diplomacyHome.agreements.recent.map((agreement) => (
              <li key={agreement.key} className="fr-col-12 fr-col-md-6">
                <Link href={agreement.href} style={teaserCardStyle}>
                  <span style={teaserTagStyle}>
                    {t(`agreements.status.${agreement.status}`)}
                  </span>
                  <span style={teaserTitleStyle}>
                    {t(`agreements.items.${agreement.key}.title`)}
                  </span>
                  <span style={teaserDescStyle}>
                    {t(`entities.${agreement.entityKey}`)}
                    {" · "}
                    {formatDate(agreement.date, locale)}
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </Link>
              </li>
            ))}
          </ul>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)" }}>
            {t("agreements.note")}
          </p>
        </div>
      </section>

      {/* 07 — Positions d'Astoria: what the Republic officially defends on the
          international stage, and a featured statement. */}
      <section className="gov-section" aria-labelledby="positions-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("positions.kicker")}</p>
              <h2 id="positions-title" className="gov-section__title">
                {t("positions.title")}
              </h2>
              <p className="gov-lead">{t("positions.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {diplomacyHome.positions.items.map((position) => (
              <li key={position.key} className="fr-col-12 fr-col-md-6 fr-col-lg-4">
                <LinkTile
                  title={t(`positions.items.${position.key}.title`)}
                  desc={t(`positions.items.${position.key}.desc`)}
                  href={position.href}
                  iconId={position.iconId}
                />
              </li>
            ))}
          </ul>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              maxWidth: "72rem",
              marginTop: "2rem",
              padding: "1.5rem",
              background: "var(--ads-color-background)",
              border: "1px solid var(--ads-color-border)",
              borderLeft: "4px solid var(--ads-color-primary)",
            }}
          >
            <span style={teaserTagStyle}>{t("positions.featured.tag")}</span>
            <p style={{ margin: "0", fontSize: "1.25rem", lineHeight: 1.35, fontWeight: 700 }}>
              {t("positions.featured.title")}
            </p>
            <p
              style={{
                margin: "0",
                maxWidth: "52rem",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "var(--ads-color-text-muted)",
              }}
            >
              {t("positions.featured.excerpt")}
            </p>
            <Link
              href={diplomacyHome.positions.featured.href}
              style={{ fontWeight: 600, textUnderlineOffset: "0.2em" }}
            >
              {t("positions.featured.link")}
              <span className="fr-icon-arrow-right-line" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* 08 — Réseau diplomatique: embassies, consulates, permanent missions —
          the gate to the diplomatic network. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="network-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("network.kicker")}</p>
              <h2 id="network-title" className="gov-section__title">
                {t("network.title")}
              </h2>
              <p className="gov-lead">{t("network.lead")}</p>
            </div>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("network.exploreLink"),
                  href: NETWORK_PATH,
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {diplomacyHome.network.map((item) => (
              <li key={item.key} className="fr-col-12 fr-col-md-4">
                <Link href={item.href} style={teaserCardStyle}>
                  <span style={figureValueStyle}>{item.value}</span>
                  <span style={figureLabelStyle}>
                    {t(`network.items.${item.key}.label`)}
                  </span>
                  <span
                    className="fr-icon-arrow-right-line"
                    aria-hidden="true"
                    style={teaserArrowStyle}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 09 — Services aux citoyens: consular services for Astorians abroad,
          functional and deliberately less prominent than the international
          sections above. */}
      <section className="gov-section" aria-labelledby="services-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("services.kicker")}</p>
              <h2 id="services-title" className="gov-section__title">
                {t("services.title")}
              </h2>
              <p className="gov-lead">{t("services.lead")}</p>
            </div>
          </div>
          <div className="fr-grid-row fr-grid-row--gutters">
            {diplomacyHome.services.map((service) => (
              <div key={service.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                <LinkTile
                  grey
                  title={t(`services.items.${service.key}.title`)}
                  desc={t(`services.items.${service.key}.desc`)}
                  href={service.href}
                  iconId={service.iconId}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}