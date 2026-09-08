"use client";

import { Footer } from "@codegouvaor/react-ads/Footer";
import type { FooterProps } from "@codegouvaor/react-ads/Footer";
import { useTranslations } from "next-intl";
import { footerNavigation, legalPaths, pageAnchors } from "@/lib/site-structure";
import { StayInTouch } from "./stay-in-touch";

const HOME_PATH = "/";

/** Official portal domains of the Republic of Astoria, shown in the footer. */
const OFFICIAL_DOMAINS: string[] = ["code.gouv.aor", "service-public.gouv.aor", "data.gouv.aor"];

/**
 * Government Footer of the Astoria portal — secondary navigation zone of the
 * site, distinct from the main header navigation:
 *  - brand block + “managed by” line,
 *  - link columns (Rubriques, Vous êtes, Presse & portail, Autres
 *    ressources) fed by the centralized `site-structure` configuration,
 *  - official portal domains,
 *  - bottom bar: Contact, Plan du portail, Documents opposables and the
 *    legal links.
 *
 * ADS provides the markup (columns, accessibility line, bottom bar) and the
 * responsive behaviour. This component only decides *what* is shown — from
 * the centralized `site-structure` configuration and the message catalogs.
 */
export function GovernmentFooter() {
  const t = useTranslations();
  const tNavPanel = useTranslations("nav.panel");
  const tBrand = useTranslations("brand");

  const linkList = footerNavigation.map((column) => ({
    categoryName: t(`footer.columns.${column.columnKey}.title`),
    links: column.links.map(({ labelKey, href }) => ({
      text: tNavPanel(labelKey),
      linkProps: { href },
    })),
  })) as FooterProps.LinkList.List;

  return (
    <>
      {/* Newsletter and social accounts: a secondary “stay in touch” zone,
          kept out of the homepage so they never compete with the public
          services presented there. */}
      <StayInTouch />
      <Footer
        id={pageAnchors.footer}
        className="gov-footer"
        accessibility="partially compliant"
        identity={{
          imgUrl: "/astoria-gouv.png",
          alt: tBrand("republicName"),
          // The lockup artwork already carries the full wordmark, so no
          // institution line is displayed under the image. ADS requires the
          // field, hence the empty string.
          institution: "",
        }}
        homeLinkProps={{
          href: HOME_PATH,
          title: t("header.homeTitle"),
        }}
        contentDescription={t("footer.contentDescription")}
        domains={OFFICIAL_DOMAINS}
        accessibilityLinkProps={{ href: legalPaths.accessibility }}
        termsLinkProps={{ href: legalPaths.terms }}
        bottomItems={[
          {
            text: t("footer.bottom.contact"),
            linkProps: { href: "/contact" },
          },
          {
            text: t("footer.bottom.planDuPortail"),
            linkProps: { href: legalPaths.sitemap },
          },
          {
            text: t("footer.bottom.documentsOpposables"),
            linkProps: { href: "/documents-opposables" },
          },
          {
            text: t("footer.bottom.privacy"),
            linkProps: { href: legalPaths.privacy },
          },
          {
            text: t("footer.bottom.cookies"),
            linkProps: { href: legalPaths.cookies },
          },
          {
            text: t("footer.bottom.publications"),
            linkProps: { href: "/publications-officielles" },
          },
        ]}
        license={t.rich("footer.license", {
          link: (chunks) => (
            <a href="https://code.gouv.aor/" target="_blank" rel="noopener noreferrer">
              {chunks}
            </a>
          ),
        })}
        linkList={linkList}
      />
    </>
  );
}
