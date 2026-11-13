"use client";

import { ButtonLink } from "@/components/ButtonLink";
import { ResolutionLine } from "@/components/ResolutionLine";
import { Section } from "@/components/Section";
import { useSite } from "@/components/SiteLive";
import { edit } from "@/lib/tina-live";

/*
 * Español: a placeholder until Kate builds the site in Spanish. Copy lives in
 * Site Settings ("Spanish page"), so it previews live from any page.
 */
export function EspanolView() {
  const { site } = useSite();
  const page = site.espanolPage;

  return (
    <Section bg="offwhite" blendTo="lavender-tint" padding="py-24 sm:py-32">
      <div lang="es" className="page-wrap max-w-3xl">
        <p className="eyebrow text-purple" {...edit(site.nav, "espanol")}>
          {site.nav.espanol}
        </p>
        <h1 className="mt-5 text-display text-charcoal" {...edit(page, "title")}>
          {page.title}
        </h1>
        {/* Still coming into focus: an unresolved line stack. */}
        <ResolutionLine variant="partial" compact resolve={0.2} className="mt-10 max-w-md" />
        <p className="mt-8 text-slate" {...edit(page, "body")}>
          {page.body}
        </p>
        <div className="mt-10" {...edit(page, "button")}>
          <ButtonLink href="/">{page.button}</ButtonLink>
        </div>
      </div>
    </Section>
  );
}
