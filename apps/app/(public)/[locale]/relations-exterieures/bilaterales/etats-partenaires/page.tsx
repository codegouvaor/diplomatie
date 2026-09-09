import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { localizedAlternates, resolveLocaleParam } from "@/lib/localized-metadata";
import { Link } from "@/i18n/navigation";
import { CtaButtonsGroup } from "@/components/public/content/ads-fragments";
import {
  partnerStates,
  partnerStatesSummary,
  partnerStateRegionOrder,
  partnerStateRepresentationOrder,
  partnerStateStatusOrder,
  type PartnerState,
  type PartnerStateStatus,
} from "@/lib/partner-states";

const PAGE_PATH = "/relations-exterieures/bilaterales/etats-partenaires";
const PAGE_SIZE = 12;

type PageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);

  const t = await getTranslations({ locale, namespace: "etatsPartenaires" });

  return {
    title: { absolute: t("metaTitle") },
    description: t("metaDescription"),
    ...localizedAlternates(locale, PAGE_PATH),
  };
}

/* Layout helpers below use the ADS design tokens through `var(--ads-*)` (the
 * single source of tokens — main.css) so light/dark switching and theming stay
 * owned by the Design System. Only the ministry-specific arrangement of these
 * blocks is expressed here, inline, without any local stylesheet. */

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
  color: "var(--ads-color-text-muted)",
};

const flagStyle: CSSProperties = {
  fontSize: "1.5rem",
  lineHeight: 1,
};

const statusPillStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontSize: "0.75rem",
  fontWeight: 700,
  letterSpacing: "0.06em",
  textTransform: "uppercase",
  color: "var(--ads-color-text-muted)",
};

const cardMetaStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
  fontSize: "0.875rem",
  lineHeight: 1.5,
  color: "var(--ads-color-text-muted)",
};

const cardCtaStyle: CSSProperties = {
  marginTop: "auto",
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontWeight: 600,
  color: "var(--ads-color-primary)",
};

/* ---- Recherche et filtres -------------------------------------------------- */

const filtersFormStyle: CSSProperties = {
  marginBottom: "2rem",
  padding: "1.5rem",
  background: "var(--ads-color-surface-muted)",
  border: "1px solid var(--ads-color-border)",
};

const searchRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "0.75rem",
};

const searchInputStyle: CSSProperties = {
  flex: "1 1 20rem",
  minWidth: "16rem",
  padding: "0.625rem 0.875rem",
  fontSize: "1rem",
  lineHeight: 1.4,
  color: "var(--ads-color-text)",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderRadius: "0.25rem",
};

const submitButtonStyle: CSSProperties = {
  padding: "0.625rem 1.25rem",
  fontSize: "0.9375rem",
  lineHeight: 1.4,
  fontWeight: 600,
  color: "var(--ads-color-on-primary)",
  background: "var(--ads-color-primary)",
  border: "1px solid var(--ads-color-primary)",
  borderRadius: "0.25rem",
  cursor: "pointer",
};

const hintStyle: CSSProperties = {
  margin: "0.625rem 0 0",
  fontSize: "0.875rem",
  color: "var(--ads-color-text-muted)",
};

const filtersRowStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "1rem 1.5rem",
  alignItems: "flex-end",
  marginTop: "1.25rem",
};

const selectLabelStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.375rem",
};

const selectCaptionStyle: CSSProperties = {
  fontSize: "0.8125rem",
  fontWeight: 600,
  color: "var(--ads-color-text-muted)",
};

const selectStyle: CSSProperties = {
  minWidth: "12rem",
  padding: "0.5rem 0.75rem",
  fontSize: "0.9375rem",
  lineHeight: 1.4,
  color: "var(--ads-color-text)",
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  borderRadius: "0.25rem",
};

const resetLinkStyle: CSSProperties = {
  fontSize: "0.875rem",
  fontWeight: 600,
  textUnderlineOffset: "0.2em",
};

/* ---- Résultats ------------------------------------------------------------- */

const toolbarStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  gap: "0.75rem 1.5rem",
  margin: "1.5rem 0 1.25rem",
};

const resultsCountStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  color: "var(--ads-color-text-muted)",
};

const viewSwitchStyle: CSSProperties = {
  display: "inline-flex",
  border: "1px solid var(--ads-color-border)",
  borderRadius: "0.25rem",
  overflow: "hidden",
};

const viewButtonStyle = (active: boolean): CSSProperties => ({
  display: "inline-flex",
  alignItems: "center",
  gap: "0.375rem",
  padding: "0.375rem 0.875rem",
  fontSize: "0.875rem",
  fontWeight: 600,
  textDecoration: "none",
  color: active ? "var(--ads-color-on-primary)" : "var(--ads-color-text)",
  background: active ? "var(--ads-color-primary)" : "var(--ads-color-background)",
});

const emptyStateStyle: CSSProperties = {
  padding: "2.5rem 1.5rem",
  textAlign: "center",
  background: "var(--ads-color-surface-muted)",
  border: "1px solid var(--ads-color-border)",
};

/* ---- Tableau (vue liste) --------------------------------------------------- */

const tableStyle: CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: "0.9375rem",
};

const tableHeaderStyle: CSSProperties = {
  padding: "0.75rem 1rem",
  textAlign: "left",
  fontSize: "0.8125rem",
  fontWeight: 700,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--ads-color-text-muted)",
  borderBottom: "2px solid var(--ads-color-border)",
};

const tableCellStyle: CSSProperties = {
  padding: "0.875rem 1rem",
  verticalAlign: "middle",
  borderBottom: "1px solid var(--ads-color-border)",
};

/* ---- Pagination ------------------------------------------------------------ */

const paginationNavStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  gap: "0.75rem 1.5rem",
  marginTop: "2rem",
};

const paginationButtonStyle: CSSProperties = {
  fontSize: "0.9375rem",
  fontWeight: 600,
  textUnderlineOffset: "0.2em",
};

const paginationDisabledStyle: CSSProperties = {
  fontSize: "0.9375rem",
  color: "var(--ads-color-text-muted)",
  opacity: 0.6,
};

const paginationPageStyle: CSSProperties = {
  margin: 0,
  fontSize: "0.9375rem",
  color: "var(--ads-color-text-muted)",
};

/* ---- Données de présentation ----------------------------------------------- */

/** Semantic token of each relation level — used only as a secondary hint. */
const statusDotColors: Record<PartnerStateStatus, string> = {
  strategic: "var(--ads-color-success)",
  privileged: "var(--ads-color-info)",
  partner: "var(--ads-color-primary)",
  developing: "var(--ads-color-warning)",
  suspended: "var(--ads-color-danger)",
};

/** Headline figures of the header section, with their destinations. */
const summaryFigures = [
  { key: "states", value: partnerStatesSummary.states, href: "?" },
  { key: "relations", value: partnerStatesSummary.establishedRelations, href: "?" },
  { key: "strategic", value: partnerStatesSummary.strategicPartnerships, href: "?status=strategic" },
  { key: "representations", value: partnerStatesSummary.representations, href: "/ministere/ambassades-consulats" },
] as const;

/** Lowercases and strips accents so “états” matches “États”. */
function normalize(value: string): string {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

/** Formats an ISO date (`yyyy-mm-dd`) in the active locale, UTC-safe. */
function formatDate(isoDate: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${isoDate}T00:00:00Z`));
}

/** First string value of a query param (`string[]` when repeated). */
function firstParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/** Returns the filter value when it is one of the allowed keys, `"all"` otherwise. */
function parseFilter<T extends string>(
  value: string | undefined,
  allowed: readonly T[]
): T | "all" {
  return value !== undefined && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : "all";
}

/**
 * États partenaires — the public register of the bilateral relations of the
 * Republic of Astoria.
 *
 * The page mirrors the homepage structure (data-driven sections over ADS
 * tokens, no local stylesheet) and answers “with which States does Astoria
 * maintain relations, and what is the nature of these relations?”:
 *
 *   01 En-tête du registre   — titre, chiffres clés
 *   02 Partenariats stratégiques — mise en avant institutionnelle
 *   03 Registre              — recherche, filtres, grille/liste, pagination
 *   04 Services aux citoyens — pont vers les informations par pays
 *
 * Search and filters run server-side through the URL query string, so the
 * whole page stays a single server component (no client bundle): the same
 * seam that will later be replaced by API-backed server filtering.
 */
export default async function EtatsPartenairesPage({ params, searchParams }: PageProps) {
  const { locale: rawLocale } = await params;
  const locale = resolveLocaleParam(rawLocale);
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "etatsPartenaires" });
  const tNavPanel = await getTranslations({ locale, namespace: "nav.panel" });
  const tEntities = await getTranslations({ locale, namespace: "home.entities" });

  const sp = await searchParams;
  const query = (firstParam(sp.q) ?? "").trim();
  const statusFilter = parseFilter(firstParam(sp.status), partnerStateStatusOrder);
  const regionFilter = parseFilter(firstParam(sp.region), partnerStateRegionOrder);
  const representationFilter = parseFilter(
    firstParam(sp.representation),
    partnerStateRepresentationOrder
  );
  const view = firstParam(sp.view) === "list" ? "list" : "grid";
  const rawPage = Number.parseInt(firstParam(sp.page) ?? "1", 10);
  const currentPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

  const filteredStates = partnerStates.filter((state) => {
    if (statusFilter !== "all" && state.status !== statusFilter) return false;
    if (regionFilter !== "all" && state.region !== regionFilter) return false;
    if (representationFilter !== "all" && state.representation !== representationFilter)
      return false;
    if (query) {
      const needle = normalize(query);
      const haystack = [
        normalize(tEntities(state.entityKey as never)),
        state.code,
        state.capital,
        normalize(t(`region.${state.region}` as never)),
      ].join(" ");
      if (!haystack.includes(needle)) return false;
    }
    return true;
  });

  const pageCount = Math.max(1, Math.ceil(filteredStates.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, pageCount);
  const visibleStates = filteredStates.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);
  const strategicStates = partnerStates.filter((state) => state.status === "strategic");

  /** Rebuilds the query string, preserving the active filters. */
  const buildQuery = (overrides: Record<string, string | undefined>): string => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (statusFilter !== "all") params.set("status", statusFilter);
    if (regionFilter !== "all") params.set("region", regionFilter);
    if (representationFilter !== "all") params.set("representation", representationFilter);
    if (view === "list") params.set("view", "list");
    for (const [key, value] of Object.entries(overrides)) {
      if (value) params.set(key, value);
      else params.delete(key);
    }
    const qs = params.toString();
    return qs ? `?${qs}` : "?";
  };

  /* ---- Présentation -------------------------------------------------------- */

  const renderStatusPill = (status: PartnerStateStatus) => (
    <span style={statusPillStyle}>
      <span
        aria-hidden="true"
        style={{
          width: "0.625rem",
          height: "0.625rem",
          borderRadius: "9999px",
          background: statusDotColors[status],
        }}
      />
      {t(`status.${status}` as never)}
    </span>
  );

  const representationText = (state: PartnerState): string => {
    const label = t(`representation.${state.representation}` as never);
    return state.representationCity ? `${label} ${t("card.at")} ${state.representationCity}` : label;
  };

  const renderStateCard = (state: PartnerState, spotlight: boolean) => (
    <Link href={`/pays/fiches/${state.slug}`} style={teaserCardStyle}>
      <span style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
        <span aria-hidden="true" style={flagStyle}>
          {state.flagEmoji}
        </span>
        <span style={teaserTitleStyle}>{tEntities(state.entityKey as never)}</span>
      </span>
      {renderStatusPill(state.status)}
      {spotlight && (
        <span style={teaserDescStyle}>{t(`strategic.spotlight.${state.slug}` as never)}</span>
      )}
      <span style={cardMetaStyle}>
        <span>{t("card.relationsSince", { year: state.establishedAt })}</span>
        <span>{representationText(state)}</span>
        <span>{t("card.agreements", { count: state.agreements })}</span>
        {spotlight && state.latestActivity && (
          <span>
            {t("strategic.activityLabel")} — {formatDate(state.latestActivity, locale)}
          </span>
        )}
      </span>
      <span style={cardCtaStyle}>
        {t("card.seeRelation")}
        <span className="fr-icon-arrow-right-line" aria-hidden="true" />
      </span>
    </Link>
  );

  const figureCard = (figure: (typeof summaryFigures)[number]) => {
    const body = (
      <>
        <span style={figureValueStyle}>{figure.value}</span>
        <span style={figureLabelStyle}>{t(`stats.${figure.key}Label` as never)}</span>
        <span className="fr-icon-arrow-right-line" aria-hidden="true" style={teaserArrowStyle} />
      </>
    );
    return figure.href.startsWith("?") ? (
      <a href={figure.href} style={teaserCardStyle}>
        {body}
      </a>
    ) : (
      <Link href={figure.href} style={teaserCardStyle}>
        {body}
      </Link>
    );
  };

  return (
    <>
      {/* 01 — En-tête du registre: titre et chiffres clés. */}
      <section className="gov-section" aria-labelledby="etats-partenaires-title">
        <div className="gov-section__container">
          <p className="gov-kicker">{tNavPanel("relationsBilaterales")}</p>
          <h1 id="etats-partenaires-title">{tNavPanel("relationsBilateralesEtatsPartenaires")}</h1>
          <p className="gov-lead">{t("lead")}</p>

          <ul className="fr-grid-row fr-grid-row--gutters" role="list" style={{ marginTop: "1.5rem" }}>
            {summaryFigures.map((figure) => (
              <li key={figure.key} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                {figureCard(figure)}
              </li>
            ))}
          </ul>
          <p className="fr-text--sm" style={{ color: "var(--ads-color-text-muted)", marginTop: "1rem" }}>
            {t("stats.note")}
          </p>
        </div>
      </section>

      {/* 02 — Partenariats stratégiques: mise en avant institutionnelle des
          relations les plus structurantes. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="strategic-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("strategic.kicker")}</p>
              <h2 id="strategic-title" className="gov-section__title">
                {t("strategic.title")}
              </h2>
              <p className="gov-lead">{t("strategic.lead")}</p>
            </div>
          </div>
          <ul className="fr-grid-row fr-grid-row--gutters" role="list">
            {strategicStates.map((state) => (
              <li key={state.slug} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                {renderStateCard(state, true)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 03 — Registre: recherche, filtres, grille/liste et pagination. */}
      <section className="gov-section" aria-labelledby="registry-title">
        <div className="gov-section__container">
          <div className="gov-section__header">
            <div>
              <p className="gov-kicker">{t("registry.kicker")}</p>
              <h2 id="registry-title" className="gov-section__title">
                {t("registry.title")}
              </h2>
              <p className="gov-lead">{t("registry.lead")}</p>
            </div>
          </div>

          <form method="get" style={filtersFormStyle}>
            <div style={searchRowStyle}>
              <input
                type="search"
                name="q"
                defaultValue={query}
                placeholder={t("search.placeholder")}
                aria-label={t("search.label")}
                style={searchInputStyle}
              />
              <button type="submit" style={submitButtonStyle}>
                {t("search.submit")}
              </button>
            </div>
            <p style={hintStyle}>{t("search.hint")}</p>
            <div style={filtersRowStyle}>
              <label style={selectLabelStyle}>
                <span style={selectCaptionStyle}>{t("filters.statusLabel")}</span>
                <select name="status" defaultValue={statusFilter} style={selectStyle}>
                  <option value="all">{t("filters.allStatuses")}</option>
                  {partnerStateStatusOrder.map((status) => (
                    <option key={status} value={status}>
                      {t(`status.${status}` as never)}
                    </option>
                  ))}
                </select>
              </label>
              <label style={selectLabelStyle}>
                <span style={selectCaptionStyle}>{t("filters.regionLabel")}</span>
                <select name="region" defaultValue={regionFilter} style={selectStyle}>
                  <option value="all">{t("filters.allRegions")}</option>
                  {partnerStateRegionOrder.map((region) => (
                    <option key={region} value={region}>
                      {t(`region.${region}` as never)}
                    </option>
                  ))}
                </select>
              </label>
              <label style={selectLabelStyle}>
                <span style={selectCaptionStyle}>{t("filters.representationLabel")}</span>
                <select name="representation" defaultValue={representationFilter} style={selectStyle}>
                  <option value="all">{t("filters.allRepresentations")}</option>
                  {partnerStateRepresentationOrder.map((representation) => (
                    <option key={representation} value={representation}>
                      {t(`representation.${representation}` as never)}
                    </option>
                  ))}
                </select>
              </label>
              <a href="?" style={resetLinkStyle}>
                {t("search.reset")}
              </a>
            </div>
          </form>

          <div style={toolbarStyle}>
            <p style={resultsCountStyle} aria-live="polite">
              {t("search.results", { count: filteredStates.length })}
            </p>
            <div role="group" aria-label={t("view.label")} style={viewSwitchStyle}>
              <a
                href={buildQuery({ view: undefined })}
                aria-current={view === "grid" ? "page" : undefined}
                style={viewButtonStyle(view === "grid")}
              >
                {t("view.grid")}
              </a>
              <a
                href={buildQuery({ view: "list" })}
                aria-current={view === "list" ? "page" : undefined}
                style={viewButtonStyle(view === "list")}
              >
                {t("view.list")}
              </a>
            </div>
          </div>

          {filteredStates.length === 0 ? (
            <div style={emptyStateStyle}>
              <p style={{ margin: "0 0 0.375rem", fontWeight: 700 }}>
                {t("search.noResultsTitle")}
              </p>
              <p style={{ margin: 0, color: "var(--ads-color-text-muted)" }}>
                {t("search.noResultsText")}
              </p>
            </div>
          ) : view === "grid" ? (
            <ul className="fr-grid-row fr-grid-row--gutters" role="list">
              {visibleStates.map((state) => (
                <li key={state.slug} className="fr-col-12 fr-col-md-6 fr-col-lg-3">
                  {renderStateCard(state, false)}
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <table style={tableStyle}>
                <caption className="ads-sr-only">{t("table.caption")}</caption>
                <thead>
                  <tr>
                    <th scope="col" style={tableHeaderStyle}>
                      {t("table.state")}
                    </th>
                    <th scope="col" style={tableHeaderStyle}>
                      {t("table.region")}
                    </th>
                    <th scope="col" style={tableHeaderStyle}>
                      {t("table.relation")}
                    </th>
                    <th scope="col" style={tableHeaderStyle}>
                      {t("table.representation")}
                    </th>
                    <th scope="col" style={tableHeaderStyle}>
                      {t("table.agreements")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {visibleStates.map((state) => (
                    <tr key={state.slug}>
                      <td style={tableCellStyle}>
                        <Link
                          href={`/pays/fiches/${state.slug}`}
                          style={{ fontWeight: 600, textUnderlineOffset: "0.2em" }}
                        >
                          {tEntities(state.entityKey as never)}
                        </Link>
                      </td>
                      <td style={tableCellStyle}>{t(`region.${state.region}` as never)}</td>
                      <td style={tableCellStyle}>{renderStatusPill(state.status)}</td>
                      <td style={tableCellStyle}>{representationText(state)}</td>
                      <td style={tableCellStyle}>{state.agreements}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {pageCount > 1 && (
            <nav aria-label={t("pagination.label")} style={paginationNavStyle}>
              {safePage > 1 ? (
                <a href={buildQuery({ page: String(safePage - 1) })} style={paginationButtonStyle}>
                  {t("pagination.previous")}
                </a>
              ) : (
                <span style={paginationDisabledStyle}>{t("pagination.previous")}</span>
              )}
              <p style={paginationPageStyle} aria-live="polite">
                {t("pagination.page", { current: safePage, total: pageCount })}
              </p>
              {safePage < pageCount ? (
                <a href={buildQuery({ page: String(safePage + 1) })} style={paginationButtonStyle}>
                  {t("pagination.next")}
                </a>
              ) : (
                <span style={paginationDisabledStyle}>{t("pagination.next")}</span>
              )}
            </nav>
          )}
        </div>
      </section>

      {/* 04 — Services aux citoyens: pont vers les informations par pays. */}
      <section className="gov-section gov-section--subtle" aria-labelledby="citizens-title">
        <div className="gov-section__container">
          <div style={{ maxWidth: "52rem" }}>
            <p className="gov-kicker">{t("citizens.kicker")}</p>
            <h2 id="citizens-title" className="gov-section__title">
              {t("citizens.title")}
            </h2>
            <p className="gov-lead">{t("citizens.text")}</p>
            <CtaButtonsGroup
              buttons={[
                {
                  children: t("citizens.cta"),
                  href: "/pays",
                  priority: "secondary",
                  iconId: "fr-icon-arrow-right-line",
                },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}