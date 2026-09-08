import * as React from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AuthGuard } from "./AuthGuard";

// ADS stylesheet (tokens, base, layout shell, components) — same as the public
// layout, the single source of global CSS.
import "@codegouvaor/react-ads/main.css";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AuthProvider>
          <AuthGuard>{children}</AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
