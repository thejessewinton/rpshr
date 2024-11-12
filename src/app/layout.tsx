import "~/styles/globals.css";

import { type ReactNode } from "react";
import { type Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { env } from "~/env";
import { SessionProvider } from "~/providers/session";
import { ThemeProvider } from "~/providers/theme";
import { Toaster } from "~/providers/toaster";
import { TRPCReactProvider } from "~/trpc/react";
import { cn } from "~/utils/core";
import { Hotkeys } from "~/providers/hotkeys";
import { Header } from "~/components/ui/header";

export const metadata: Metadata = {
  title: {
    template: "%s — notes",
    default: "notes",
  },
  description: "Simple notes.",
  metadataBase: new URL(env.APP_URL),
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "bg-neutral-50 font-sans tracking-wide antialiased dark:bg-neutral-900",
          GeistSans.variable,
          GeistMono.variable,
        )}
      >
        <SessionProvider>
          <ThemeProvider attribute="class">
            <TRPCReactProvider>
              <Header />
              <main className="min-w-screen mx-auto flex w-full max-w-3xl flex-col justify-center">
                {children}
              </main>
              <Toaster />
              <Hotkeys />
            </TRPCReactProvider>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
