import { DrawRule, RevealGroup, RevealItem } from "./Reveal";
import { Section, type SectionBg } from "./Section";

/** A motto set between major sections: amplified, not giant. */
export function MottoStatement({ motto, bg, blendTo }: { motto: string; bg: SectionBg; blendTo: SectionBg }) {
  return (
    <Section bg={bg} blendTo={blendTo} padding="py-16 sm:py-20">
      <RevealGroup className="page-wrap text-center">
        <RevealItem as="p" className="mx-auto max-w-4xl text-motto text-charcoal">
          {motto}
        </RevealItem>
        <DrawRule className="mx-auto mt-6 text-purple" />
      </RevealGroup>
    </Section>
  );
}
