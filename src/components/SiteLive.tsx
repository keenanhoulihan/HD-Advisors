"use client";

import { createContext, useContext } from "react";
import type mottosJson from "../../content/settings/mottos.json";
import type siteJson from "../../content/settings/site.json";
import { liveQueries, useLive } from "@/lib/tina-live";

export type SiteData = { site: typeof siteJson; mottos: typeof mottosJson };

const SiteContext = createContext<SiteData | null>(null);

/**
 * Site Settings and Mottos for everything outside a page's own content: the
 * header, footer, hero sentence, mottos, and closing CTA. One live query in
 * the layout, so Kate's edits there update on every page while she types.
 */
export function SiteLive({ data, children }: { data: SiteData; children: React.ReactNode }) {
  const live = useLive(liveQueries.site, data);
  return <SiteContext value={live}>{children}</SiteContext>;
}

export function useSite(): SiteData {
  const value = useContext(SiteContext);
  if (!value) throw new Error("useSite must be used inside <SiteLive>");
  return value;
}

const PAGES = ["about", "approach", "offerings", "endorsements", "contact"] as const;

/** Header and footer links. Endorsements stays out until Kate turns it on. */
export function navItems({ site }: SiteData) {
  return PAGES.filter((page) => page !== "endorsements" || site.showEndorsements).map((page) => ({
    href: `/${page}`,
    label: site.nav[page],
    field: page,
  }));
}
