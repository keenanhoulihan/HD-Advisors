import { ResolutionLine } from "./ResolutionLine";
import { Section, type SectionBg } from "./Section";

/** A motto set between major sections: amplified, not giant. */
export function MottoStatement({ motto, bg }: { motto: string; bg: SectionBg }) {
  return (
    <Section bg={bg} padding="py-16 sm:py-20">
      <div className="page-wrap text-center">
        <p className="mx-auto max-w-4xl text-motto text-charcoal">{motto}</p>
        <ResolutionLine variant="rule" className="mx-auto mt-6" />
      </div>
    </Section>
  );
}
