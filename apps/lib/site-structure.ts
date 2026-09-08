/**
 * URL structure of the public portal.
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry.
 */
export const PORTAL_HOME = "/";

export type PrimaryNavKey =
  | "leParlement"
  | "legislation"
  | "travauxParlementaires"
  | "participation"
  | "parlementaires"
  | "recherche";

/** A link inside a mega-menu panel; its label is a `nav.panel` message key. */
export type PrimaryNavLink = {
  labelKey: string;
  href: string;
};

/**
 * One column of a mega-menu panel. The heading is either plain text
 * (`titleKey`) or, when the column heading is itself the main destination of
 * the group, a link (`mainLink`) — rendered by the ADS `MegaMenu` as
 * `categoryMainText` / `categoryMainLink`.
 */
export type MegaMenuCategory =
  | {
      /** Message key (`nav.panel`) of the category heading. */
      titleKey: string;
      mainLink?: never;
      links: ReadonlyArray<PrimaryNavLink>;
    }
  | {
      titleKey?: never;
      /** Heading rendered as a link (e.g. “Toutes les démarches”). */
      mainLink: PrimaryNavLink;
      links: ReadonlyArray<PrimaryNavLink>;
    };

/**
 * One top-level entry of the Government Header navigation.
 *
 * Navigation principle (info.gouv.fr-inspired, adapted to Astoria): the
 * Parliament header is question- and task-oriented rather than organised
 * around generic website categories. Every section answers a citizen question
 * and opens a mega-menu panel composed of
 *  - a leader band: the section name, a one-line description and the main
 *    section action,
 *  - a small number of link columns — the mega-menu is not the sitemap of the
 *    portal: only the destinations that matter to the user journey.
 *
 * Top-level labels resolve under `nav.primary` (`labelKey`), panel content
 * under `nav.panel` (`titleKey`, `paragraphKey` and nested `labelKey`s).
 */
export type PrimaryNavItem =
  | {
      type: "link";
      labelKey: string;
      href: string;
    }
  | {
      type: "megaMenu";
      labelKey: string;
      href: string;
      /** Leader band shown on top of the panel. */
      leader: {
        titleKey: string;
        paragraphKey: string;
        link: PrimaryNavLink;
      };
      categories?: ReadonlyArray<MegaMenuCategory>;
    };

export type FooterColumn = {
  /** Message key (`footer.columns`) of the column heading. */
  columnKey: string;
  links: ReadonlyArray<PrimaryNavLink>;
};

export const sectionPaths = {
  parlement: "/parlement",
  legislation: "/legislation",
  travaux: "/travaux",
  participation: "/participation",
  parlementaires: "/parlementaires",
} as const;

export const legalPaths = {
  accessibility: "/legal/accessibility",
  privacy: "/legal/privacy",
  terms: "/legal/terms",
  cookies: "/legal/cookies",
  sitemap: "/sitemap",
} as const;

export const searchPath = "/search";

/** DOM ids used as skip-link targets. */
export const pageAnchors = {
  content: "main-content",
  footer: "main-footer",
} as const;

/**
 * Secondary navigation zone of the site footer, distinct from the main
 * navigation of the header. Organised like an institutional footer:
 *
 *   Le Parlement    → presentation, organisation, the three chambers, presidency
 *   Législation     → projets, propositions, textes adoptés, archives
 *   Travaux         → agenda, séances, commissions, archives
 *   Participation   → consultations, candidatures, MyGouv
 *   Presse & droits → presse, légal, plan du portail
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = [
  {
    columnKey: "leParlement",
    links: [
      { labelKey: "parlementPresentation", href: "/parlement/presentation" },
      { labelKey: "parlementOrganisation", href: "/parlement/organisation" },
      { labelKey: "parlementTroisChambres", href: "/parlement/chambres" },
      { labelKey: "parlementPresidence", href: "/parlement/presidence" },
    ],
  },
  {
    columnKey: "legislation",
    links: [
      { labelKey: "legislationProjetsLoi", href: "/legislation/projets-de-loi" },
      { labelKey: "legislationPropositionsLoi", href: "/legislation/propositions-de-loi" },
      { labelKey: "legislationTextesAdoptes", href: "/legislation/textes-adoptes" },
      { labelKey: "legislationArchives", href: "/legislation/archives" },
    ],
  },
  {
    columnKey: "travaux",
    links: [
      { labelKey: "travauxAgendaJour", href: "/travaux/agenda-du-jour" },
      { labelKey: "travauxSeances", href: "/travaux/seances" },
      { labelKey: "travauxCommissions", href: "/travaux/commissions" },
      { labelKey: "travauxArchives", href: "/travaux/archives" },
    ],
  },
  {
    columnKey: "participation",
    links: [
      { labelKey: "participationConsultations", href: "/participation/consultations" },
      { labelKey: "participationCandidatures", href: "/participation/candidatures" },
      { labelKey: "participationMyGouv", href: "https://sso.gouv.aor" },
    ],
  },
];

/**
 * Main navigation of the Government Header of the Parliament of the Republic
 * of Astoria — the permanent information architecture of the application, in
 * six subjects. The header is question-oriented: every entry answers a
 * citizen question about the institution.
 *
 *   Le Parlement          → Comprendre : qu'est-ce que le Parlement ?
 *   Législation           → Suivre : qu'est-ce qui devient du droit ?
 *   Travaux parlementaires→ Suivre : que fait le Parlement actuellement ?
 *   Participation         → Agir : comment puis-je participer ?
 *   Parlementaires        → Accéder : qui exerce le mandat parlementaire ?
 *   Recherche             → Accéder : que puis-je retrouver ?
 *
 * The first four are the thematic pillars of the institution (comprendre,
 * suivre, agir); the last two are transversal access points. Each pillar
 * opens a mega-menu panel with a leader band and a few link columns. The
 * structure is configuration-driven: the same architecture can be reused by
 * another institution by providing a different `primaryNavigation`.
 *
 * Hrefs follow the URL plan of the Parliament portal; a few point to pages
 * being published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<PrimaryNavItem> = [
  {
    type: "megaMenu",
    labelKey: "leParlement",
    href: "/parlement",
    leader: {
      titleKey: "parlementTitle",
      paragraphKey: "parlementText",
      link: { labelKey: "parlementAllLink", href: "/parlement" },
    },
    categories: [
      {
        // L'INSTITUTION
        titleKey: "parlementInstitutionCategory",
        links: [
          { labelKey: "parlementPresentation", href: "/parlement/presentation" },
          { labelKey: "parlementRoleConstitutionnel", href: "/parlement/role-constitutionnel" },
          { labelKey: "parlementCadreConstitutionnel", href: "/parlement/cadre-constitutionnel" },
        ],
      },
      {
        // ORGANISATION & FONCTIONNEMENT
        titleKey: "parlementOrganisationCategory",
        links: [
          { labelKey: "parlementOrganisation", href: "/parlement/organisation" },
          { labelKey: "parlementFonctionnement", href: "/parlement/fonctionnement" },
          { labelKey: "parlementStructureInstitutionnelle", href: "/parlement/structure-institutionnelle" },
        ],
      },
      {
        // LES TROIS CHAMBRES
        titleKey: "parlementChambresCategory",
        links: [
          { labelKey: "parlementChambreCitoyenne", href: "/parlement/chambres/chambre-citoyenne" },
          { labelKey: "parlementChambreDeputes", href: "/parlement/chambres/chambre-des-deputes" },
          { labelKey: "parlementSenat", href: "/parlement/chambres/senat" },
        ],
      },
      {
        // PRÉSIDENCE & ADMINISTRATION
        titleKey: "parlementPresidenceCategory",
        links: [
          { labelKey: "parlementPresidence", href: "/parlement/presidence" },
          { labelKey: "parlementAdministration", href: "/parlement/administration-parlementaire" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "legislation",
    href: "/legislation",
    leader: {
      titleKey: "legislationTitle",
      paragraphKey: "legislationText",
      link: { labelKey: "legislationAllLink", href: "/legislation" },
    },
    categories: [
      {
        // L'INITIATIVE
        titleKey: "legislationInitiativeCategory",
        links: [
          { labelKey: "legislationProjetsLoi", href: "/legislation/projets-de-loi" },
          { labelKey: "legislationPropositionsLoi", href: "/legislation/propositions-de-loi" },
          { labelKey: "legislationAmendements", href: "/legislation/amendements" },
        ],
      },
      {
        // L'EXAMEN
        titleKey: "legislationExamenCategory",
        links: [
          { labelKey: "legislationTextesEnCours", href: "/legislation/textes-en-cours" },
          { labelKey: "legislationDebats", href: "/legislation/debats" },
          { labelKey: "legislationVotes", href: "/legislation/votes" },
        ],
      },
      {
        // LE CYCLE DE VIE D'UN TEXTE
        titleKey: "legislationCycleCategory",
        links: [
          { labelKey: "legislationTextesAdoptes", href: "/legislation/textes-adoptes" },
          { labelKey: "legislationVersionsSuccessives", href: "/legislation/versions-successives" },
          { labelKey: "legislationHistoriqueLegislatif", href: "/legislation/historique-legislatif" },
          { labelKey: "legislationPromulgation", href: "/legislation/promulgation" },
        ],
      },
      {
        // LES ARCHIVES
        titleKey: "legislationArchivesCategory",
        links: [
          { labelKey: "legislationArchives", href: "/legislation/archives" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "travauxParlementaires",
    href: "/travaux",
    leader: {
      titleKey: "travauxTitle",
      paragraphKey: "travauxText",
      link: { labelKey: "travauxAllLink", href: "/travaux" },
    },
    categories: [
      {
        // EN CE MOMENT
        titleKey: "travauxEnCeMomentCategory",
        links: [
          { labelKey: "travauxAgendaJour", href: "/travaux/agenda-du-jour" },
          { labelKey: "travauxAgendaAVenir", href: "/travaux/agenda-a-venir" },
          { labelKey: "travauxSessions", href: "/travaux/sessions" },
        ],
      },
      {
        // SÉANCES & DÉBATS
        titleKey: "travauxSeancesCategory",
        links: [
          { labelKey: "travauxSeances", href: "/travaux/seances" },
          { labelKey: "travauxDebats", href: "/travaux/debats" },
          { labelKey: "travauxVotes", href: "/travaux/votes" },
        ],
      },
      {
        // COMMISSIONS & AUDITIONS
        titleKey: "travauxCommissionsCategory",
        links: [
          { labelKey: "travauxCommissions", href: "/travaux/commissions" },
          { labelKey: "travauxAuditions", href: "/travaux/auditions" },
          { labelKey: "travauxQuestionsParlementaires", href: "/travaux/questions-parlementaires" },
          { labelKey: "travauxRapports", href: "/travaux/rapports" },
        ],
      },
      {
        // LES ARCHIVES DES TRAVAUX
        titleKey: "travauxArchivesCategory",
        links: [
          { labelKey: "travauxArchives", href: "/travaux/archives" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "participation",
    href: "/participation",
    leader: {
      titleKey: "participationTitle",
      paragraphKey: "participationText",
      link: { labelKey: "participationAllLink", href: "/participation" },
    },
    categories: [
      {
        // PRENDRE PART
        titleKey: "participationPrendrePartCategory",
        links: [
          { labelKey: "participationConsultations", href: "/participation/consultations" },
          { labelKey: "participationPetitions", href: "/participation/petitions" },
          { labelKey: "participationInitiativesCitoyennes", href: "/participation/initiatives-citoyennes" },
        ],
      },
      {
        // VOTES & RÉFÉRENDUMS
        titleKey: "participationVotesCategory",
        links: [
          { labelKey: "participationVotesCitoyens", href: "/participation/votes" },
          { labelKey: "participationReferendums", href: "/participation/referendums" },
        ],
      },
      {
        // DEVENIR PARLEMENTAIRE
        titleKey: "participationCandidatureCategory",
        links: [
          { labelKey: "participationCandidatures", href: "/participation/candidatures" },
          { labelKey: "participationChambreCitoyenne", href: "/participation/chambre-citoyenne" },
        ],
      },
      {
        // MON ESPACE
        titleKey: "participationMyGouvCategory",
        links: [
          { labelKey: "participationMyGouv", href: "https://sso.gouv.aor" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "parlementaires",
    href: "/parlementaires",
    leader: {
      titleKey: "parlementairesTitle",
      paragraphKey: "parlementairesText",
      link: { labelKey: "parlementairesAllLink", href: "/parlementaires" },
    },
    categories: [
      {
        // LES MEMBRES
        titleKey: "parlementairesMembresCategory",
        links: [
          { labelKey: "parlementairesChambreCitoyenne", href: "/parlementaires/chambre-citoyenne" },
          { labelKey: "parlementairesDeputes", href: "/parlementaires/deputes" },
          { labelKey: "parlementairesSenateurs", href: "/parlementaires/senateurs" },
        ],
      },
      {
        // GROUPES PARLEMENTAIRES
        titleKey: "parlementairesGroupesCategory",
        links: [
          { labelKey: "parlementairesGroupes", href: "/parlementaires/groupes" },
        ],
      },
      {
        // MANDATS & ACTIVITÉ
        titleKey: "parlementairesMandatCategory",
        links: [
          { labelKey: "parlementairesMandats", href: "/parlementaires/mandats" },
          { labelKey: "parlementairesActivite", href: "/parlementaires/activite" },
        ],
      },
    ],
  },
  {
    type: "link",
    labelKey: "recherche",
    href: searchPath,
  },
];