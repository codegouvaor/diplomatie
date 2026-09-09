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
import {
  pageAnchors,
  primaryNavigation,
  searchPath,
  type NavigationSection,
} from "@/lib/site-structure";
import { useAuth } from "@/context/AuthContext";
import { UserAccountMenu } from "@/components/public/header/user-account-menu";
import { siteAccountConfig } from "@/lib/site-config";

/** Whether the current pathname corresponds to a navigation href. */
const isNavItemActive = (href: string, pathname: string): boolean =>
  href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

/**
 * Collect every href reachable from a navigation section (leader action,
 * primary destinations, secondary destinations) so the parent tab can be
 * marked active when the user lands on any child page — even if the child
 * href lives outside the parent's own path tree (e.g. /contact under
 * “Le Ministère”).
 */
function collectChildHrefs(section: NavigationSection): string[] {
  const hrefs: string[] = [section.leader.link.href];
  for (const item of section.primaryItems) {
    hrefs.push(item.href);
    for (const link of item.links) hrefs.push(link.href);
  }
  return hrefs;
}

/**
 * Government Header of the Ministry of Foreign Affairs of the Republic of
 * Astoria.
 *
 * Main navigation — the permanent information architecture of the diplomacy
 * portal, organised around the reference data of the foreign policy of the
 * Republic rather than generic website categories:
 *
 *   Relations extérieures  -> Comprendre : avec qui Astoria entretient-elle des relations ?
 *   Pays & territoires     -> Explorer : comment consulter les fiches du monde ?
 *   Accords & engagements  -> Consulter : quels traités et engagements ont été conclus ?
 *   Politique étrangère    -> Découvrir : quelles sont les positions officielles d'Astoria ?
 *   Activité diplomatique  -> Suivre : que fait la diplomatie astorienne actuellement ?
 *   Le Ministère           -> Connaître : comment fonctionne le Ministère et son réseau ?
 *
 * Each subject opens an institutional mega-menu (leader band with the section
 * description and its main action, plus four theme columns) that prepares the
 * diplomacy information graph — countries, treaties, visits, positions —
 * without overloading the header. MyGouv is not a seventh subject: it is the
 * citizen's authenticated identity and stays visually separated on the right
 * of the header as a distinct action.
 *
 * When the user is authenticated, the "MyGouv" link in the quick-access
 * toolbar is hidden and a custom account menu (`UserAccountMenu`) is
 * rendered instead. The menu content is driven by `siteAccountConfig` so each
 * site can present a different account interface without touching this
 * component. MyGouv remains the identity and authentication layer — the
 * diplomacy portal never duplicates it.
 */
export function GovernmentHeader() {
  const t = useTranslations();
  const tPrimaryNav = useTranslations("nav.primary");
  const tNavPanel = useTranslations("nav.panel");
  const tBrand = useTranslations("brand");
  const pathname = usePathname();
  const router = useRouter();

  const navigationItems: MainNavigationProps.Item[] = primaryNavigation.map((section) => {
    const childHrefs = collectChildHrefs(section);
    const isActive =
      isNavItemActive(section.href, pathname) ||
      childHrefs.some((href) => isNavItemActive(href, pathname));

    // The four themes of the section are the pillars of its panel: each one is
    // headed by its title (plain text, not navigable) and followed by its four
    // links, so the destinations are immediately visible and reachable.
    const categories: MegaMenuProps.Category[] = section.primaryItems.map(
      (item): MegaMenuProps.Category => ({
        categoryMainText: tNavPanel(item.labelKey),
        links: item.links.map((link) => ({
          text: tNavPanel(link.labelKey),
          linkProps: { href: link.href },
          isActive: isNavItemActive(link.href, pathname),
        })),
      })
    );

    return {
      isActive,
      text: tPrimaryNav(section.labelKey),
      megaMenu: {
        leader: {
          title: tNavPanel(section.leader.titleKey),
          paragraph: tNavPanel(section.leader.paragraphKey),
          link: {
            text: tNavPanel(section.leader.link.labelKey),
            linkProps: { href: section.leader.link.href },
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
          // The lockup artwork already carries the full wordmark, so no
          // institution line is displayed under the image. ADS requires the
          // field, hence the empty string.
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
