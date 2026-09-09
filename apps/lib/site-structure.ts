/**
 * URL structure of the public portal.
 *
 * Hrefs are locale-agnostic pathnames: the next-intl Link (registered as the
 * ADS link renderer) prefixes the active locale automatically. Labels are
 * never stored here — they come from the message catalogs through the key
 * provided by each entry.
 */
export const PORTAL_HOME = "/";

/** The six subjects of the portal — both `nav.primary` and `footer.columns` keys. */
export type PrimaryNavKey =
  | "relationsExterieures"
  | "paysTerritoires"
  | "accordsEngagements"
  | "politiqueEtrangere"
  | "activiteDiplomatique"
  | "leMinistere";

/** A destination inside a mega-menu panel; its label is a `nav.panel` message key. */
export type NavigationLink = {
  labelKey: string;
  href: string;
};

/**
 * A theme of a navigation section. It heads its own group in the mega-menu
 * panel and is followed by its related destinations. Each theme carries four
 * links: the theme itself (heading) plus its `links`.
 */
export type NavigationItem = NavigationLink & {
  /** Related destinations nested under this theme. */
  links: ReadonlyArray<NavigationLink>;
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
 *    section action (“Voir toutes les relations”, …),
 *  - four themes, each headed by its main destination and followed by three
 *    related destinations — four links per theme, immediately visible.
 *
 * The panel is not the sitemap of the portal: only the destinations that
 * matter to the visitor journey. Top-level labels resolve under
 * `nav.primary` (`labelKey`), panel content under `nav.panel` (`titleKey`,
 * `paragraphKey` and nested `labelKey`s).
 */
export type NavigationSection = {
  type: "megaMenu";
  /** Message key (`nav.primary`) of the top-level tab. */
  labelKey: PrimaryNavKey;
  /** Landing page of the section, used by the tab and the leader action. */
  href: string;
  /** Leader band shown on top of the panel. */
  leader: {
    titleKey: string;
    paragraphKey: string;
    link: NavigationLink;
  };
  /** The four themes of the section, each with its four links. */
  primaryItems: ReadonlyArray<NavigationItem>;
};

export type FooterColumn = {
  /** Message key (`footer.columns`) of the column heading. */
  columnKey: string;
  links: ReadonlyArray<NavigationLink>;
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
 * Each subject opens a mega-menu panel with a leader band and four themes —
 * each theme headed by its main destination and followed by three related
 * destinations (four links per theme). The panel is not the sitemap of the
 * portal — it prepares the diplomacy information graph (countries, treaties,
 * visits, positions) without overloading the header. The structure is
 * configuration-driven: the same architecture can be reused by another
 * institution by providing a different `primaryNavigation`.
 *
 * Hrefs follow the URL plan of the diplomacy portal; a few point to pages
 * being published and will resolve as soon as those sections ship.
 */
export const primaryNavigation: ReadonlyArray<NavigationSection> = [
  {
    type: "megaMenu",
    labelKey: "relationsExterieures",
    href: sectionPaths.relationsExterieures,
    leader: {
      titleKey: "relationsTitle",
      paragraphKey: "relationsText",
      link: { labelKey: "relationsAllLink", href: sectionPaths.relationsExterieures },
    },
    primaryItems: [
      {
        labelKey: "relationsBilaterales",
        href: "/relations-exterieures/bilaterales",
        links: [
          {
            labelKey: "relationsBilateralesEtatsPartenaires",
            href: "/relations-exterieures/bilaterales/etats-partenaires",
          },
          {
            labelKey: "relationsBilateralesNiveauRelations",
            href: "/relations-exterieures/bilaterales/niveau-des-relations",
          },
          {
            labelKey: "relationsBilateralesChronologie",
            href: "/relations-exterieures/bilaterales/chronologie",
          },
        
            { labelKey: "relationsBilateralesAccords", href: "/relations-exterieures/bilaterales/accords" },],
      },
      {
        labelKey: "relationsRegionales",
        href: "/relations-exterieures/regionales",
        links: [
          {
            labelKey: "relationsRegionalesZones",
            href: "/relations-exterieures/regionales/zones-geographiques",
          },
          {
            labelKey: "relationsRegionalesInitiatives",
            href: "/relations-exterieures/regionales/initiatives",
          },
          {
            labelKey: "relationsRegionalesCadres",
            href: "/relations-exterieures/regionales/cadres",
          },
        
            { labelKey: "relationsRegionalesDialogue", href: "/relations-exterieures/regionales/dialogue" },],
      },
      {
        labelKey: "relationsOrganisationsInternationales",
        href: "/relations-exterieures/organisations-internationales",
        links: [
          {
            labelKey: "relationsOrganisationsMondiales",
            href: "/relations-exterieures/organisations-internationales/mondiales",
          },
          {
            labelKey: "relationsOrganisationsParticipation",
            href: "/relations-exterieures/organisations-internationales/participation",
          },
          {
            labelKey: "relationsMultilaterales",
            href: "/relations-exterieures/multilaterales",
          },
        
            { labelKey: "relationsOrganisationsRegionales", href: "/relations-exterieures/organisations-internationales/regionales" },],
      },
      {
        labelKey: "relationsPartenariatsStrategiques",
        href: "/relations-exterieures/partenariats-strategiques",
        links: [
          {
            labelKey: "relationsPartenariatsPartenairesPrivilegies",
            href: "/relations-exterieures/partenariats-strategiques/partenaires-privilegies",
          },
          {
            labelKey: "relationsPartenariatsCooperationsSectorielles",
            href: "/relations-exterieures/partenariats-strategiques/cooperations-sectorielles",
          },
          {
            labelKey: "relationsCooperationDiplomatique",
            href: "/relations-exterieures/cooperation-diplomatique",
          },
        
            { labelKey: "relationsPartenariatsDialogue", href: "/relations-exterieures/partenariats-strategiques/dialogue" },],
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
    primaryItems: [
      {
        labelKey: "paysTousLesPays",
        href: "/pays",
        links: [
          { labelKey: "paysRepertoire", href: "/pays/repertoire" },
          { labelKey: "paysParRegion", href: "/pays/par-region" },
          { labelKey: "paysCartes", href: "/pays/cartes" },
        
            { labelKey: "paysTerritoiresNonSouverains", href: "/pays/territoires-non-souverains" },],
      },
      {
        labelKey: "paysFiches",
        href: "/pays/fiches",
        links: [
          {
            labelKey: "paysFichesRelationsBilaterales",
            href: "/pays/fiches/relations-bilaterales",
          },
          { labelKey: "paysFichesAccords", href: "/pays/fiches/accords" },
          {
            labelKey: "paysFichesRepresentations",
            href: "/pays/fiches/representations",
          },
        
            { labelKey: "paysFichesChiffresCles", href: "/pays/fiches/chiffres-cles" },],
      },
      {
        labelKey: "paysRepresentationsDiplomatiques",
        href: "/pays/representations",
        links: [
          { labelKey: "paysRepresentationsAmbassades", href: "/pays/representations/ambassades" },
          { labelKey: "paysRepresentationsConsulats", href: "/pays/representations/consulats" },
          {
            labelKey: "paysRepresentationsMissionsPermanentes",
            href: "/pays/representations/missions-permanentes",
          },
        
            { labelKey: "paysRepresentationsReseauConsulaire", href: "/pays/representations/reseau-consulaire" },],
      },
      {
        labelKey: "paysRelationsAvecAstoria",
        href: "/pays/relations-avec-astoria",
        links: [
          { labelKey: "paysRelationsNiveaux", href: "/pays/relations-avec-astoria/niveaux" },
          { labelKey: "paysRelationsNouveautes", href: "/pays/relations-avec-astoria/nouveautes" },
          { labelKey: "paysRelationsChronologie", href: "/pays/relations-avec-astoria/chronologie" },
        
            { labelKey: "paysRelationsReciprocite", href: "/pays/relations-avec-astoria/reciprocite" },],
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
    primaryItems: [
      {
        labelKey: "accordsTraitesInternationaux",
        href: "/accords/traites-internationaux",
        links: [
          {
            labelKey: "accordsTraitesMultilateraux",
            href: "/accords/traites-internationaux/multilateraux",
          },
          {
            labelKey: "accordsTraitesRatifications",
            href: "/accords/traites-internationaux/ratifications",
          },
          {
            labelKey: "accordsTraitesTextes",
            href: "/accords/traites-internationaux/textes",
          },
        
            { labelKey: "accordsTraitesListe", href: "/accords/traites-internationaux/liste" },],
      },
      {
        labelKey: "accordsBilateraux",
        href: "/accords/bilateraux",
        links: [
          { labelKey: "accordsBilaterauxParPays", href: "/accords/bilateraux/par-pays" },
          { labelKey: "accordsBilaterauxEnVigueur", href: "/accords/bilateraux/en-vigueur" },
          { labelKey: "accordsEnNegociation", href: "/accords/en-negociation" },
        
            { labelKey: "accordsBilaterauxSignes", href: "/accords/bilateraux/signes" },],
      },
      {
        labelKey: "accordsConventions",
        href: "/accords/conventions",
        links: [
          {
            labelKey: "accordsConventionsMultilaterales",
            href: "/accords/conventions/multilaterales",
          },
          {
            labelKey: "accordsConventionsCooperation",
            href: "/accords/conventions/cooperation",
          },
          {
            labelKey: "accordsConventionsSectorielles",
            href: "/accords/conventions/sectorielles",
          },
        
            { labelKey: "accordsConventionsEnVigueur", href: "/accords/conventions/en-vigueur" },],
      },
      {
        labelKey: "accordsEngagementsInternationaux",
        href: "/accords/engagements",
        links: [
          {
            labelKey: "accordsEngagementsMultilateraux",
            href: "/accords/engagements/multilateraux",
          },
          { labelKey: "accordsEngagementsSuivi", href: "/accords/engagements/suivi" },
          { labelKey: "accordsEnVigueur", href: "/accords/en-vigueur" },
        
            { labelKey: "accordsEngagementsObjectifs", href: "/accords/engagements/objectifs" },],
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
    primaryItems: [
      {
        labelKey: "politiquePrioritesDiplomatiques",
        href: "/politique-etrangere/priorites",
        links: [
          { labelKey: "politiquePrioritesAxes", href: "/politique-etrangere/priorites/axes" },
          {
            labelKey: "politiquePrioritesFeuilleDeRoute",
            href: "/politique-etrangere/priorites/feuille-de-route",
          },
          {
            labelKey: "politiquePrioritesRapports",
            href: "/politique-etrangere/priorites/rapports",
          },
        
            { labelKey: "politiquePrioritesStrategie2030", href: "/politique-etrangere/priorites/strategie-2030" },],
      },
      {
        labelKey: "politiquePositionsOfficielles",
        href: "/politique-etrangere/positions-officielles",
        links: [
          {
            labelKey: "politiquePositionsDeclarations",
            href: "/politique-etrangere/positions-officielles/declarations",
          },
          {
            labelKey: "politiquePositionsPrisesDePosition",
            href: "/politique-etrangere/positions-officielles/prises-de-position",
          },
          {
            labelKey: "politiquePositionsDocuments",
            href: "/politique-etrangere/positions-officielles/documents",
          },
        
            { labelKey: "politiquePositionsThemes", href: "/politique-etrangere/positions-officielles/themes" },],
      },
      {
        labelKey: "politiqueCooperationInternationale",
        href: "/politique-etrangere/cooperation",
        links: [
          {
            labelKey: "politiqueCooperationDeveloppement",
            href: "/politique-etrangere/cooperation/developpement",
          },
          {
            labelKey: "politiqueCooperationHumanitaire",
            href: "/politique-etrangere/cooperation/humanitaire",
          },
          {
            labelKey: "politiqueCooperationApd",
            href: "/politique-etrangere/cooperation/apd",
          },
        
            { labelKey: "politiqueCooperationPartenaires", href: "/politique-etrangere/cooperation/partenaires" },],
      },
      {
        labelKey: "politiqueDiplomatieEconomique",
        href: "/politique-etrangere/diplomatie-economique",
        links: [
          {
            labelKey: "politiqueEconomiqueInvestissements",
            href: "/politique-etrangere/diplomatie-economique/investissements",
          },
          {
            labelKey: "politiqueEconomiqueEntreprises",
            href: "/politique-etrangere/diplomatie-economique/entreprises",
          },
          {
            labelKey: "politiqueEconomiqueAmbassadeurs",
            href: "/politique-etrangere/diplomatie-economique/ambassadeurs",
          },
        
            { labelKey: "politiqueEconomiqueFilieres", href: "/politique-etrangere/diplomatie-economique/filieres" },],
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
    primaryItems: [
      {
        labelKey: "activiteActualites",
        href: "/activite-diplomatique/actualites",
        links: [
          {
            labelKey: "activiteActualitesCommuniques",
            href: "/activite-diplomatique/actualites/communiques",
          },
          {
            labelKey: "activiteActualitesCalendrier",
            href: "/activite-diplomatique/actualites/calendrier",
          },
          {
            labelKey: "activiteActualitesRevuePresse",
            href: "/activite-diplomatique/actualites/revue-de-presse",
          },
        
            { labelKey: "activiteActualitesBreves", href: "/activite-diplomatique/actualites/breves" },],
      },
      {
        labelKey: "activiteVisitesOfficielles",
        href: "/activite-diplomatique/visites-officielles",
        links: [
          {
            labelKey: "activiteVisitesEtranger",
            href: "/activite-diplomatique/visites-officielles/a-l-etranger",
          },
          {
            labelKey: "activiteVisitesEnAstoria",
            href: "/activite-diplomatique/visites-officielles/en-astoria",
          },
          {
            labelKey: "activiteVisitesArchives",
            href: "/activite-diplomatique/visites-officielles/archives",
          },
        
            { labelKey: "activiteVisitesAVenir", href: "/activite-diplomatique/visites-officielles/a-venir" },],
      },
      {
        labelKey: "activiteRencontresDiplomatiques",
        href: "/activite-diplomatique/rencontres",
        links: [
          {
            labelKey: "activiteRencontresBilaterales",
            href: "/activite-diplomatique/rencontres/bilaterales",
          },
          {
            labelKey: "activiteRencontresMultilaterales",
            href: "/activite-diplomatique/rencontres/multilaterales",
          },
          {
            labelKey: "activiteRencontresConseils",
            href: "/activite-diplomatique/rencontres/conseils",
          },
        
            { labelKey: "activiteRencontresSommets", href: "/activite-diplomatique/rencontres/sommets" },],
      },
      {
        labelKey: "activiteDeclarations",
        href: "/activite-diplomatique/declarations",
        links: [
          {
            labelKey: "activiteDeclarationsMinistre",
            href: "/activite-diplomatique/declarations/ministre",
          },
          {
            labelKey: "activiteDeclarationsConjointes",
            href: "/activite-diplomatique/declarations/conjointes",
          },
          { labelKey: "activiteDiscours", href: "/activite-diplomatique/discours" },
        
            { labelKey: "activiteDeclarationsPorteParole", href: "/activite-diplomatique/declarations/porte-parole" },],
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
    primaryItems: [
      {
        labelKey: "ministereMinistreCabinet",
        href: "/ministere/ministre",
        links: [
          { labelKey: "ministereMinistre", href: "/ministere/ministre/ministre" },
          { labelKey: "ministereMinistreAgenda", href: "/ministere/ministre/agenda" },
          { labelKey: "ministereMinistreEquipe", href: "/ministere/ministre/equipe" },
        
            { labelKey: "ministereMinistreDiscours", href: "/ministere/ministre/discours" },],
      },
      {
        labelKey: "ministereOrganisation",
        href: "/ministere/organisation",
        links: [
          { labelKey: "ministereOrganisationDirections", href: "/ministere/organisation/directions" },
          { labelKey: "ministereOrganisationMissions", href: "/ministere/organisation/missions" },
          { labelKey: "ministereOrganisationInstances", href: "/ministere/organisation/instances" },
        
            { labelKey: "ministereOrganisationOrganigramme", href: "/ministere/organisation/organigramme" },],
      },
      {
        labelKey: "ministereAmbassadesConsulats",
        href: "/ministere/ambassades-consulats",
        links: [
          {
            labelKey: "ministereReseauDiplomatique",
            href: "/ministere/ambassades-consulats/reseau",
          },
          { labelKey: "ministereAmbassades", href: "/ministere/ambassades-consulats/ambassades" },
          { labelKey: "ministereConsulats", href: "/ministere/ambassades-consulats/consulats" },
        
            { labelKey: "ministereCirconscriptionsConsulaires", href: "/ministere/ambassades-consulats/circonscriptions" },],
      },
      {
        labelKey: "ministereMissionsPermanentes",
        href: "/ministere/missions-permanentes",
        links: [
          {
            labelKey: "ministereMissionsRepresentations",
            href: "/ministere/missions-permanentes/representations",
          },
          {
            labelKey: "ministereMissionsDelegations",
            href: "/ministere/missions-permanentes/delegations",
          },
          {
            labelKey: "ministereMissionsParticipation",
            href: "/ministere/missions-permanentes/participation",
          },
        
            { labelKey: "ministereMissionsUE", href: "/ministere/missions-permanentes/union-europeenne" },],
      },
    ],
  },
];

/**
 * Secondary navigation zone of the site footer, distinct from the main
 * navigation of the header. Organised like an institutional footer, it
 * mirrors the six subjects of the header navigation and derives its links
 * from the themes of each section — so the footer and the header can never
 * drift apart.
 *
 * Column titles resolve under `footer.columns`, links under `nav.panel`.
 */
export const footerNavigation: ReadonlyArray<FooterColumn> = primaryNavigation.map(
  (section) => ({
    columnKey: section.labelKey,
    links: section.primaryItems,
  })
);