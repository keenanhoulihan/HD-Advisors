"use client";

import type { MottoKey } from "@/content/mottos";
import { statement } from "@/content/mottos";
import { edit } from "@/lib/tina-live";
import { DrawRule, RevealGroup, RevealItem } from "./Reveal";
import { Section, type SectionBg } from "./Section";
import { useSite } from "./SiteLive";

/** A motto set between major sections: amplified, not giant. Text comes from Mottos in Tina. */
export function MottoStatement({ motto, bg, blendTo }: { motto: MottoKey; bg: SectionBg; blendTo: SectionBg }) {
  const { mottos } = useSite();
  return (
    <Section bg={bg} blendTo={blendTo} padding="py-16 sm:py-20">
      <RevealGroup className="page-wrap text-center">
        <RevealItem as="p" className="mx-auto max-w-4xl text-motto text-charcoal" {...edit(mottos, motto)}>
          {statement(mottos[motto])}
        </RevealItem>
        <DrawRule className="mx-auto mt-6 text-purple" />
      </RevealGroup>
    </Section>
  );
}
