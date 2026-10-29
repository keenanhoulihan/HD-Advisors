import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { HorizontalLogo } from "@/components/HorizontalLogo";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteLive } from "@/components/SiteLive";
import { site } from "@/content/site";
import mottosJson from "../../content/settings/mottos.json";
import siteJson from "../../content/settings/site.json";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    type: "website",
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The inline script adds "js" before first paint, so the hero logo can start in its unresolved state
    // without a flash; without JavaScript it shows finished. suppressHydrationWarning covers that class.
    <html lang="en" className={`${poppins.variable} h-full`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-purple focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <SiteLive data={{ site: siteJson, mottos: mottosJson }}>
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter logo={<HorizontalLogo className="h-10 w-auto max-w-full sm:h-12" />} />
        </SiteLive>
      </body>
    </html>
  );
}
