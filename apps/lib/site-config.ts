/**
 * Site-specific configuration.
 *
 * This file defines the account menu items that appear in the header when
 * a user is logged in. Each site deploying this portal can override the
 * configuration to present a different account interface.
 *
 * The `accountMenu` array controls what links appear in the dropdown.
 * Each item carries a message key (resolved from `header.account.*` in
 * the message catalogs) and an href.
 *
 * To customise for a new site:
 *   1. Override `accountMenu` with the links relevant to that site.
 *   2. Add corresponding message keys under `header.account.*`.
 *   3. Optionally override `accountLabel` and `logoutLabel` message keys.
 */

export type AccountMenuItem = {
  /** Message key under `header.account.*` for the label. */
  labelKey: string;
  /** Destination href. */
  href: string;
  /** Icon class (ADS fr-icon-*) — optional. */
  iconId?: string;
  /** Set to `true` for destructive actions (e.g. logout). */
  destructive?: boolean;
};

export type SiteAccountConfig = {
  /**
   * Whether the account menu is enabled. Set to `false` on sites that
   * do not support authentication.
   */
  enabled: boolean;

  /** Message key for the button label when logged in. Default: `header.accountLabel`. */
  labelKey: string;

  /** Message key for the logout action. Default: `header.logoutLink`. */
  logoutLabelKey: string;

  /** Menu items shown in the account dropdown. */
  items: AccountMenuItem[];
};

/**
 * Default site configuration for the Parliament of the Republic of Astoria.
 * Override this in site-specific configurations.
 *
 * The account menu follows the MyGouv personal-participation model: the
 * citizen reaches their participations, consultations, petitions, candidacies
 * and notifications through a single entry point. MyGouv remains the identity
 * and authentication layer — the Parliament application integrates with it
 * rather than duplicating it.
 */
export const siteAccountConfig: SiteAccountConfig = {
  enabled: true,
  labelKey: "header.accountLabel",
  logoutLabelKey: "header.logoutLink",
  items: [
    {
      labelKey: "header.account.participations",
      href: "/mon-espace/participations",
      iconId: "fr-icon-checkbox-circle-line",
    },
    {
      labelKey: "header.account.consultations",
      href: "/mon-espace/consultations",
      iconId: "fr-icon-chat-3-line",
    },
    {
      labelKey: "header.account.petitions",
      href: "/mon-espace/petitions",
      iconId: "fr-icon-edit-line",
    },
    {
      labelKey: "header.account.candidatures",
      href: "/mon-espace/candidatures",
      iconId: "fr-icon-user-add-line",
    },
    {
      labelKey: "header.account.notifications",
      href: "/mon-espace/notifications",
      iconId: "fr-icon-notification-3-line",
    },
    {
      labelKey: "header.account.profile",
      href: "/profile",
      iconId: "fr-icon-user-line",
    },
    {
      labelKey: "header.account.settings",
      href: "/settings",
      iconId: "fr-icon-settings-5-line",
    },
  ],
};
