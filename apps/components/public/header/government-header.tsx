"use client";

import * as React from "react";
import { Header } from "@codegouvaor/react-ads/Header";
import { SkipLinks } from "@codegouvaor/react-ads/SkipLinks";
import { headerFooterDisplayItem } from "@codegouvaor/react-ads/Display";
import type { HeaderProps } from "@codegouvaor/react-ads/Header";
import type { MainNavigationProps } from "@codegouvaor/react-ads/MainNavigation";
import type { MegaMenuProps } from "@codegouvaor/react-ads/MainNavigation/MegaMenu";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { getDomainUrl } from "@/lib/domains";
import { pageAnchors, primaryNavigation, searchPath } from "@/lib/site-structure";
import { useAuth } from "@/context/AuthContext";
import { UserAccountMenu } from "@/components/public/header/user-account-menu";
import { siteAccountConfig } from "@/lib/site-config";

/** Whether the current pathname corresponds to a navigation href. */
const isNavItemActive = (href: string, pathname: string): boolean =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Collect every href reachable from a mega-menu item (categories, featured
 * link, leader link) so the parent tab can be marked active when the user
 * lands on any child page — even if the child href lives outside the
 * parent's own path tree (e.g. /decryptages under Actualites -> /news).
 */
function collectChildHrefs(item: (typeof primaryNavigation)[number]): string[] {
  if (item.type === "link") return [];
  const hrefs: string[] = [item.leader.link.href];
  for (const cat of item.categories ?? []) {
    if (cat.mainLink) hrefs.push(cat.mainLink.href);
    for (const link of cat.links) hrefs.push(link.href);
  }
  return hrefs;
}

/**
 * Government Header of the Parliament of the Republic of Astoria.
 *
 * Main navigation — the permanent information architecture of the Parliament
 * application, organised around six question-oriented subjects rather than
 * generic website categories:
 *
 *   Le Parlement             -> Comprendre : qu'est-ce que le Parlement ?
 *   Législation              -> Suivre : qu'est-ce qui devient du droit ?
 *   Travaux parlementaires   -> Suivre : que fait le Parlement actuellement ?
 *   Participation            -> Agir : comment puis-je participer ?
 *   Parlementaires           -> Accéder : qui exerce le mandat parlementaire ?
 *   Recherche                -> Accéder : que puis-je retrouver ?
 *
 * The first four are the thematic pillars of the institution (comprendre,
 * suivre, agir); the last two are transversal access points. MyGouv is not a
 * seventh subject: it is the citizen's authenticated identity and personal
 * participation space, and stays visually separated on the right of the
 * header as a distinct action.
 *
 * When the user is authenticated, the "MyGouv" link in the quick-access
 * toolbar is hidden and a custom account menu (`UserAccountMenu`) is
 * rendered instead, presenting the personal-participation entries. The menu
 * content is driven by `siteAccountConfig` so each site can present a
 * different account interface without touching this component. MyGouv
 * remains the identity and authentication layer — the Parliament application
 * never duplicates it.
 */
export function GovernmentHeader() {
  const t = useTranslations();
  const tPrimaryNav = useTranslations("nav.primary");
  const tNavPanel = useTranslations("nav.panel");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems: MainNavigationProps.Item[] = primaryNavigation.map((item) => {
    const childHrefs = collectChildHrefs(item);
    const isActive =
      isNavItemActive(item.href, pathname) ||
      childHrefs.some((href) => isNavItemActive(href, pathname));

    const common = {
      isActive,
      text: tPrimaryNav(item.labelKey),
    };

    if (item.type === "link") {
      return { ...common, linkProps: { href: item.href } };
    }

    const categories: MegaMenuProps.Category[] = [
      ...(item.categories ?? []).map((category): MegaMenuProps.Category => {
        // Column headings are rendered as plain text (`categoryMainText`),
        // never as links: they introduce the links beneath them and are not
        // destinations themselves.
        const headingKey = category.mainLink ? category.mainLink.labelKey : category.titleKey;
        return {
          categoryMainText: tNavPanel(headingKey),
          links: category.links.map((link) => ({
            text: tNavPanel(link.labelKey),
            linkProps: { href: link.href },
            isActive: isNavItemActive(link.href, pathname),
          })),
        };
      }),
    ];

    return {
      ...common,
      megaMenu: {
        leader: {
          title: tNavPanel(item.leader.titleKey),
          paragraph: tNavPanel(item.leader.paragraphKey),
          link: {
            text: tNavPanel(item.leader.link.labelKey),
            linkProps: { href: item.leader.link.href },
          },
        },
        categories,
      },
    };
  });

  const handleSearch = (text: string) => {
    const query = text.trim();
    router.push(query ? `${searchPath}?q=${encodeURIComponent(query)}` : searchPath);
  };

  // Auth state for conditional account UI
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();

  // Quick-access items — “MyGouv” is a transversal action: it points to the
  // SSO identity layer when the user is not authenticated (the Parliament
  // application never duplicates MyGouv's identity functionality), and is
  // replaced by the account menu (with its personal-participation entries)
  // once the user is authenticated.
  const quickAccessItems = React.useMemo(() => {
    const items: HeaderProps.QuickAccessItem[] = [];

    if (!isAuthenticated || isAuthLoading) {
      items.push({
        iconId: "fr-icon-account-circle-line",
        text: t("header.myGouv"),
        linkProps: { href: getDomainUrl("sso", "/login") },
      });
    }

    items.push(headerFooterDisplayItem);
    return items;
  }, [isAuthenticated, isAuthLoading, t]);

  return (
    <>
      <SkipLinks
        links={[
          { label: t("common.skipToContent"), anchor: `#${pageAnchors.content}` },
          { label: t("common.skipToFooter"), anchor: `#${pageAnchors.footer}` },
        ]}
      />
      <Header
        className="gov-header"
        identity={{
          imgUrl: "/astoria-gouv.png",
          alt: tBrand("republicName"),
          institution: "",
        }}
        homeLinkProps={{
          href: "/",
          title: t("header.homeTitle"),
        }}
        serviceTitle={t("header.serviceTitle")}
        serviceTagline={t("header.serviceTagline")}
        navigation={navigationItems}
        quickAccessItems={quickAccessItems}
        renderSearchInput={(params) => (
          <input {...params} placeholder={t("meta.searchPlaceholder")} />
        )}
        onSearchButtonClick={handleSearch}
      />
      {/* Account menu — rendered outside the ADS Header so it can use
          its own dropdown positioning and auth state without conflicting
          with the ADS quick-access toolbar. */}
      {siteAccountConfig.enabled && <UserAccountMenu />}
    </>
  );
}
