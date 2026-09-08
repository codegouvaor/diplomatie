import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { AdsProvider } from "@/components/public/ads/ads-provider";
import LoginForm from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login — Official Portal",
  description:
    "Sign in to your personal space on the official portal of the Republic of Astoria.",
};

/* Centered auth shell built on the ADS design tokens (`var(--ads-*)` from
 * `@codegouvaor/react-ads/main.css`) — no local stylesheet. */

const rootStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "2rem 1rem",
  background: "var(--ads-color-surface-muted)",
};

const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "26rem",
  display: "flex",
  flexDirection: "column",
  gap: "1.5rem",
};

const cardStyle: CSSProperties = {
  background: "var(--ads-color-background)",
  border: "1px solid var(--ads-color-border)",
  boxShadow: "0 4px 12px rgba(28, 35, 43, 0.12)",
};

export default function LoginPage() {
  return (
    <AdsProvider lang="en">
      <div style={rootStyle}>
        <div style={containerStyle}>
          {/* Header — Republic branding */}
          <div style={{ textAlign: "center" }}>
            <a
              href="/"
              title="Back to homepage"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.75rem",
                textDecoration: "none",
              }}
            >
              <img
                src="/astoria-gouv.png"
                alt="Republic of Astoria"
                width={56}
                height={56}
                style={{ objectFit: "contain" }}
              />
              <span
                style={{
                  display: "flex",
                  flexDirection: "column",
                  textAlign: "left",
                  lineHeight: 1.25,
                }}
              >
                <strong>Official Portal</strong>
                <small style={{ color: "var(--ads-color-text-muted)" }}>
                  Republic of Astoria
                </small>
              </span>
            </a>
          </div>

          {/* Login card */}
          <div style={cardStyle}>
            <div style={{ padding: "1.5rem" }}>
              <h1 style={{ margin: "0 0 0.375rem", fontSize: "1.5rem" }}>Sign in</h1>
              <p style={{ margin: "0 0 1.25rem", fontSize: "0.9375rem", lineHeight: 1.6 }}>
                Access your personal space to manage your services and documents.
              </p>
              <LoginForm />
            </div>
          </div>

          {/* Footer links */}
          <div style={{ textAlign: "center" }}>
            <p
              style={{
                margin: "0 0 0.75rem",
                maxWidth: "24rem",
                marginInline: "auto",
                fontSize: "0.8125rem",
                lineHeight: 1.6,
                color: "var(--ads-color-text-muted)",
              }}
            >
              This site is protected by an authentication system. Any unauthorised
              access attempt may be subject to criminal prosecution.
            </p>
            <ul
              role="list"
              style={{
                listStyle: "none",
                margin: "0",
                padding: "0",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: "0.5rem 1.25rem",
              }}
            >
              <li>
                <a href="/legal/accessibility" style={{ fontSize: "0.8125rem" }}>
                  Accessibility
                </a>
              </li>
              <li>
                <a href="/legal/mentions-legales" style={{ fontSize: "0.8125rem" }}>
                  Legal notices
                </a>
              </li>
              <li>
                <a href="/legal/donnees-personnelles" style={{ fontSize: "0.8125rem" }}>
                  Personal data
                </a>
              </li>
              <li>
                <a href="/legal/cookies" style={{ fontSize: "0.8125rem" }}>
                  Cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </AdsProvider>
  );
}
