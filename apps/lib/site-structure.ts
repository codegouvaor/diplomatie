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
  | "relationsExterieures"
  | "paysTerritoires"
  | "accordsEngagements"
  | "politiqueEtrangere"
  | "activiteDiplomatique"
  | "leMinistere";

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
 * diplomacy header is organised around the reference data of the foreign
 * policy of the Republic — the subjects the visitor needs to understand the
 * external relations of Astoria. Every section opens a mega-menu panel
 * composed of
 *  - a leader band: the section name, a one-line description and the main
 *    section action,
 *  - four theme columns, each headed by the main destination of the group
 *    followed by a few related destinations. The mega-menu is not the sitemap
 *    of the portal: only the destinations that matter to the visitor journey.
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
  relationsExterieures: "/relations-exterieures",
  pays: "/pays",
  accords: "/accords",
  politiqueEtrangere: "/politique-etrangere",
  activiteDiplomatique: "/activite-diplomatique",
  ministere: "/ministere",
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
 * navigation of the header. Organised like an institutional footer, mirroring
 * the six subjects of the header navigation:
 *
 *   Relations extérieures → bilatérales, régionales, organisations, partenariats
 *   Pays & territoires     → répertoire, fiches, représentations, relations
 *   Accords & engagements  → traités, accords, conventions, engagements
 *   Politique étrangère    → priorités, positions, coopération, diplomatie économique
 *   Activité diplomatique  → actualités, visites, rencontres, déclarations
 *   Le Ministère           → ministre, organisation, ambassades, carrières
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = [
  {
    columnKey: "relationsExterieures",
    links: [
      { labelKey: "relationsBilaterales", href: "/relations-exterieures/bilaterales" },
      { labelKey: "relationsRegionales", href: "/relations-exterieures/regionales" },
      {
        labelKey: "relationsOrganisationsInternationales",
        href: "/relations-exterieures/organisations-internationales",
      },
      {
        labelKey: "relationsPartenariatsStrategiques",
        href: "/relations-exterieures/partenariats-strategiques",
      },
    ],
  },
  {
    columnKey: "paysTerritoires",
    links: [
      { labelKey: "paysTousLesPays", href: "/pays" },
      { labelKey: "paysFiches", href: "/pays/fiches" },
      { labelKey: "paysRepresentationsDiplomatiques", href: "/pays/representations" },
      { labelKey: "paysRelationsAvecAstoria", href: "/pays/relations-avec-astoria" },
    ],
  },
  {
    columnKey: "accordsEngagements",
    links: [
      { labelKey: "accordsTraitesInternationaux", href: "/accords/traites-internationaux" },
      { labelKey: "accordsBilateraux", href: "/accords/bilateraux" },
      { labelKey: "accordsConventions", href: "/accords/conventions" },
      { labelKey: "accordsEngagementsInternationaux", href: "/accords/engagements" },
    ],
  },
  {
    columnKey: "politiqueEtrangere",
    links: [
      { labelKey: "politiquePrioritesDiplomatiques", href: "/politique-etrangere/priorites" },
      { labelKey: "politiquePositionsOfficielles", href: "/politique-etrangere/positions-officielles" },
      { labelKey: "politiqueCooperationInternationale", href: "/politique-etrangere/cooperation" },
      { labelKey: "politiqueDiplomatieEconomique", href: "/politique-etrangere/diplomatie-economique" },
    ],
  },
  {
    columnKey: "activiteDiplomatique",
    links: [
      { labelKey: "activiteActualites", href: "/activite-diplomatique/actualites" },
      { labelKey: "activiteVisitesOfficielles", href: "/activite-diplomatique/visites-officielles" },
      { labelKey: "activiteRencontresDiplomatiques", href: "/activite-diplomatique/rencontres" },
      { labelKey: "activiteDeclarations", href: "/activite-diplomatique/declarations" },
    ],
  },
  {
    columnKey: "leMinistere",
    links: [
      { labelKey: "ministereMinistreCabinet", href: "/ministere/ministre" },
      { labelKey: "ministereOrganisation", href: "/ministere/organisation" },
      { labelKey: "ministereAmbassadesConsulats", href: "/ministere/ambassades-consulats" },
      { labelKey: "ministereCarrieresRecrutement", href: "/ministere/carrieres" },
    ],
  },
];

/**
 * Main navigation of the Government Header of the Ministry of Foreign Affairs
 * of the Republic of Astoria — the permanent information architecture of the
 * application, organised in six subjects built around the reference data of
 * the foreign policy of the Republic:
 *
 *   Relations extérieures  → Comprendre : avec qui Astoria entretient-elle des relations ?
 *   Pays & territoires     → Explorer : comment consulter les fiches du monde ?
 *   Accords & engagements  → Consulter : quels traités et engagements ont été conclus ?
 *   Politique étrangère    → Découvrir : quelles sont les positions officielles d'Astoria ?
 *   Activité diplomatique  → Suivre : que fait la diplomatie astorienne actuellement ?
 *   Le Ministère           → Connaître : comment fonctionne le Ministère et son réseau ?
 *
 * Each subject opens a mega-menu panel with a leader band and four theme
 * columns; the panel is not the sitemap of the portal — it prepares the
 * diplomacy information graph (countries, treaties, visits, positions)
 * without overloading the header. The structure is configuration-driven: the
 * same architecture can be reused by another institution by providing a
 * different `primaryNavigation`.
 *
 * Hrefs follow the URL plan of the diplomacy portal; a few point to pages
 * being published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<PrimaryNavItem> = [
  {
    type: "megaMenu",
    labelKey: "relationsExterieures",
    href: sectionPaths.relationsExterieures,
    leader: {
      titleKey: "relationsTitle",
      paragraphKey: "relationsText",
      link: { labelKey: "relationsAllLink", href: sectionPaths.relationsExterieures },
    },
    categories: [
      {
        // RELATIONS BILATÉRALES
        mainLink: { labelKey: "relationsBilaterales", href: "/relations-exterieures/bilaterales" },
        links: [
          {
            labelKey: "relationsBilateralesEtatsPartenaires",
            href: "/relations-exterieures/bilaterales/etats-partenaires",
          },
          {
            labelKey: "relationsBilateralesNiveauRelations",
            href: "/relations-exterieures/bilaterales/niveau-des-relations",
          },
        ],
      },
      {
        // RELATIONS RÉGIONALES
        mainLink: { labelKey: "relationsRegionales", href: "/relations-exterieures/regionales" },
        links: [
          {
            labelKey: "relationsRegionalesZones",
            href: "/relations-exterieures/regionales/zones-geographiques",
          },
          {
            labelKey: "relationsRegionalesInitiatives",
            href: "/relations-exterieures/regionales/initiatives",
          },
        ],
      },
      {
        // ORGANISATIONS INTERNATIONALES
        mainLink: {
          labelKey: "relationsOrganisationsInternationales",
          href: "/relations-exterieures/organisations-internationales",
        },
        links: [
          {
            labelKey: "relationsOrganisationsMondiales",
            href: "/relations-exterieures/organisations-internationales/mondiales",
          },
          {
            labelKey: "relationsOrganisationsParticipation",
            href: "/relations-exterieures/organisations-internationales/participation",
          },
        ],
      },
      {
        // PARTENARIATS STRATÉGIQUES
        mainLink: {
          labelKey: "relationsPartenariatsStrategiques",
          href: "/relations-exterieures/partenariats-strategiques",
        },
        links: [
          {
            labelKey: "relationsPartenariatsPartenairesPrivilegies",
            href: "/relations-exterieures/partenariats-strategiques/partenaires-privilegies",
          },
          {
            labelKey: "relationsPartenariatsCooperationsSectorielles",
            href: "/relations-exterieures/partenariats-strategiques/cooperations-sectorielles",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "paysTerritoires",
    href: sectionPaths.pays,
    leader: {
      titleKey: "paysTitle",
      paragraphKey: "paysText",
      link: { labelKey: "paysAllLink", href: sectionPaths.pays },
    },
    categories: [
      {
        // TOUS LES PAYS
        mainLink: { labelKey: "paysTousLesPays", href: "/pays" },
        links: [
          { labelKey: "paysRepertoire", href: "/pays/repertoire" },
          { labelKey: "paysParRegion", href: "/pays/par-region" },
        ],
      },
      {
        // FICHES PAYS
        mainLink: { labelKey: "paysFiches", href: "/pays/fiches" },
        links: [
          {
            labelKey: "paysFichesRelationsBilaterales",
            href: "/pays/fiches/relations-bilaterales",
          },
          { labelKey: "paysFichesAccords", href: "/pays/fiches/accords" },
        ],
      },
      {
        // REPRÉSENTATIONS DIPLOMATIQUES
        mainLink: { labelKey: "paysRepresentationsDiplomatiques", href: "/pays/representations" },
        links: [
          { labelKey: "paysRepresentationsAmbassades", href: "/pays/representations/ambassades" },
          { labelKey: "paysRepresentationsConsulats", href: "/pays/representations/consulats" },
        ],
      },
      {
        // RELATIONS AVEC ASTORIA
        mainLink: { labelKey: "paysRelationsAvecAstoria", href: "/pays/relations-avec-astoria" },
        links: [
          { labelKey: "paysRelationsNiveaux", href: "/pays/relations-avec-astoria/niveaux" },
          { labelKey: "paysRelationsNouveautes", href: "/pays/relations-avec-astoria/nouveautes" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "accordsEngagements",
    href: sectionPaths.accords,
    leader: {
      titleKey: "accordsTitle",
      paragraphKey: "accordsText",
      link: { labelKey: "accordsAllLink", href: sectionPaths.accords },
    },
    categories: [
      {
        // TRAITÉS INTERNATIONAUX
        mainLink: {
          labelKey: "accordsTraitesInternationaux",
          href: "/accords/traites-internationaux",
        },
        links: [
          {
            labelKey: "accordsTraitesMultilateraux",
            href: "/accords/traites-internationaux/multilateraux",
          },
          {
            labelKey: "accordsTraitesRatifications",
            href: "/accords/traites-internationaux/ratifications",
          },
        ],
      },
      {
        // ACCORDS BILATÉRAUX
        mainLink: { labelKey: "accordsBilateraux", href: "/accords/bilateraux" },
        links: [
          { labelKey: "accordsBilaterauxParPays", href: "/accords/bilateraux/par-pays" },
          { labelKey: "accordsBilaterauxEnVigueur", href: "/accords/bilateraux/en-vigueur" },
        ],
      },
      {
        // CONVENTIONS
        mainLink: { labelKey: "accordsConventions", href: "/accords/conventions" },
        links: [
          {
            labelKey: "accordsConventionsMultilaterales",
            href: "/accords/conventions/multilaterales",
          },
          {
            labelKey: "accordsConventionsCooperation",
            href: "/accords/conventions/cooperation",
          },
        ],
      },
      {
        // ENGAGEMENTS INTERNATIONAUX
        mainLink: {
          labelKey: "accordsEngagementsInternationaux",
          href: "/accords/engagements",
        },
        links: [
          {
            labelKey: "accordsEngagementsMultilateraux",
            href: "/accords/engagements/multilateraux",
          },
          { labelKey: "accordsEngagementsSuivi", href: "/accords/engagements/suivi" },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "politiqueEtrangere",
    href: sectionPaths.politiqueEtrangere,
    leader: {
      titleKey: "politiqueTitle",
      paragraphKey: "politiqueText",
      link: { labelKey: "politiqueAllLink", href: sectionPaths.politiqueEtrangere },
    },
    categories: [
      {
        // PRIORITÉS DIPLOMATIQUES
        mainLink: {
          labelKey: "politiquePrioritesDiplomatiques",
          href: "/politique-etrangere/priorites",
        },
        links: [
          { labelKey: "politiquePrioritesAxes", href: "/politique-etrangere/priorites/axes" },
          {
            labelKey: "politiquePrioritesFeuilleDeRoute",
            href: "/politique-etrangere/priorites/feuille-de-route",
          },
        ],
      },
      {
        // POSITIONS OFFICIELLES
        mainLink: {
          labelKey: "politiquePositionsOfficielles",
          href: "/politique-etrangere/positions-officielles",
        },
        links: [
          {
            labelKey: "politiquePositionsDeclarations",
            href: "/politique-etrangere/positions-officielles/declarations",
          },
          {
            labelKey: "politiquePositionsPrisesDePosition",
            href: "/politique-etrangere/positions-officielles/prises-de-position",
          },
        ],
      },
      {
        // COOPÉRATION INTERNATIONALE
        mainLink: {
          labelKey: "politiqueCooperationInternationale",
          href: "/politique-etrangere/cooperation",
        },
        links: [
          {
            labelKey: "politiqueCooperationDeveloppement",
            href: "/politique-etrangere/cooperation/developpement",
          },
          {
            labelKey: "politiqueCooperationHumanitaire",
            href: "/politique-etrangere/cooperation/humanitaire",
          },
        ],
      },
      {
        // DIPLOMATIE ÉCONOMIQUE
        mainLink: {
          labelKey: "politiqueDiplomatieEconomique",
          href: "/politique-etrangere/diplomatie-economique",
        },
        links: [
          {
            labelKey: "politiqueEconomiqueInvestissements",
            href: "/politique-etrangere/diplomatie-economique/investissements",
          },
          {
            labelKey: "politiqueEconomiqueEntreprises",
            href: "/politique-etrangere/diplomatie-economique/entreprises",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "activiteDiplomatique",
    href: sectionPaths.activiteDiplomatique,
    leader: {
      titleKey: "activiteTitle",
      paragraphKey: "activiteText",
      link: { labelKey: "activiteAllLink", href: sectionPaths.activiteDiplomatique },
    },
    categories: [
      {
        // ACTUALITÉS
        mainLink: { labelKey: "activiteActualites", href: "/activite-diplomatique/actualites" },
        links: [
          {
            labelKey: "activiteActualitesCommuniques",
            href: "/activite-diplomatique/actualites/communiques",
          },
          {
            labelKey: "activiteActualitesCalendrier",
            href: "/activite-diplomatique/actualites/calendrier",
          },
        ],
      },
      {
        // VISITES OFFICIELLES
        mainLink: {
          labelKey: "activiteVisitesOfficielles",
          href: "/activite-diplomatique/visites-officielles",
        },
        links: [
          {
            labelKey: "activiteVisitesEtranger",
            href: "/activite-diplomatique/visites-officielles/a-l-etranger",
          },
          {
            labelKey: "activiteVisitesEnAstoria",
            href: "/activite-diplomatique/visites-officielles/en-astoria",
          },
        ],
      },
      {
        // RENCONTRES DIPLOMATIQUES
        mainLink: {
          labelKey: "activiteRencontresDiplomatiques",
          href: "/activite-diplomatique/rencontres",
        },
        links: [
          {
            labelKey: "activiteRencontresBilaterales",
            href: "/activite-diplomatique/rencontres/bilaterales",
          },
          {
            labelKey: "activiteRencontresMultilaterales",
            href: "/activite-diplomatique/rencontres/multilaterales",
          },
        ],
      },
      {
        // DÉCLARATIONS
        mainLink: { labelKey: "activiteDeclarations", href: "/activite-diplomatique/declarations" },
        links: [
          {
            labelKey: "activiteDeclarationsMinistre",
            href: "/activite-diplomatique/declarations/ministre",
          },
          {
            labelKey: "activiteDeclarationsConjointes",
            href: "/activite-diplomatique/declarations/conjointes",
          },
        ],
      },
    ],
  },
  {
    type: "megaMenu",
    labelKey: "leMinistere",
    href: sectionPaths.ministere,
    leader: {
      titleKey: "ministereTitle",
      paragraphKey: "ministereText",
      link: { labelKey: "ministereAllLink", href: sectionPaths.ministere },
    },
    categories: [
      {
        // MINISTRE & CABINET
        mainLink: { labelKey: "ministereMinistreCabinet", href: "/ministere/ministre" },
        links: [
          { labelKey: "ministereMinistre", href: "/ministere/ministre/ministre" },
          { labelKey: "ministereMinistreAgenda", href: "/ministere/ministre/agenda" },
        ],
      },
      {
        // ORGANISATION
        mainLink: { labelKey: "ministereOrganisation", href: "/ministere/organisation" },
        links: [
          { labelKey: "ministereOrganisationDirections", href: "/ministere/organisation/directions" },
          { labelKey: "ministereOrganisationMissions", href: "/ministere/organisation/missions" },
        ],
      },
      {
        // AMBASSADES & CONSULATS
        mainLink: {
          labelKey: "ministereAmbassadesConsulats",
          href: "/ministere/ambassades-consulats",
        },
        links: [
          {
            labelKey: "ministereReseauDiplomatique",
            href: "/ministere/ambassades-consulats/reseau",
          },
          { labelKey: "ministereAmbassades", href: "/ministere/ambassades-consulats/ambassades" },
        ],
      },
      {
        // CARRIÈRES & RECRUTEMENT
        mainLink: {
          labelKey: "ministereCarrieresRecrutement",
          href: "/ministere/carrieres",
        },
        links: [
          { labelKey: "ministereCarrieresConcours", href: "/ministere/carrieres/concours" },
          { labelKey: "ministereCarrieresMetiers", href: "/ministere/carrieres/metiers" },
        ],
      },
    ],
  },
];