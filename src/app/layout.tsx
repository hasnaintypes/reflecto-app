import "@/styles/globals.css";

import { type Metadata } from "next";
import { DM_Sans, Playfair_Display, JetBrains_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { TRPCReactProvider } from "@/trpc/react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/providers";
import { PreferencesProvider } from "@/components/providers/preferences-provider";
import { ThemeApplier } from "@/components/providers/theme-applier";

export const metadata: Metadata = {
  title: "Reflecto App",
  description: "A journaling app to reflect on your day",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${playfair.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <SessionProvider>
          <TRPCReactProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              enableSystem
              disableTransitionOnChange
            >
              <PreferencesProvider>
                <ThemeApplier />
                {children}
              </PreferencesProvider>
            </ThemeProvider>
          </TRPCReactProvider>
        </SessionProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
