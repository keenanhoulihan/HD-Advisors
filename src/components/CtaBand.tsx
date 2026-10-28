"use client";

import { ButtonLink } from "./ButtonLink";
import { Monogram } from "./Monogram";
import { RevealGroup, RevealItem } from "./Reveal";
import { ResolutionLine } from "./ResolutionLine";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";
import { useSite } from "./SiteLive";
import { edit } from "@/lib/tina-live";

/**
 * Closing call to action on lavender tint (Tint colorway). Backgrounds stay
 * light. Always the last band, so it blends into the offwhite footer. Copy is
 * Site Settings in Tina.
 */
export function CtaBand() {
  const { cta } = useSite().site;
  return (
    <Section bg="lavender-tint" blendTo="offwhite" padding="pt-16 sm:pt-20">
      <ResolutionLine variant="partial" resolve={0.85} />
      <RevealGroup className="page-wrap pt-14 pb-20 text-center sm:pt-16 sm:pb-24">
        <RevealItem>
          <Monogram className="mx-auto mb-10 h-10 w-auto text-purple" />
        </RevealItem>
        <SectionHeader
          align="center"
          label={cta.label}
          title={cta.title}
          intro={cta.body}
          source={cta}
          fields={{ intro: "body" }}
        />
        <RevealItem className="mt-10" {...edit(cta, "button")}>
          <ButtonLink href="/contact">{cta.button}</ButtonLink>
        </RevealItem>
      </RevealGroup>
    </Section>
  );
}
