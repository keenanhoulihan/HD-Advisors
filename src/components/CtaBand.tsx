import { cta } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Monogram } from "./Monogram";
import { ResolutionLine } from "./ResolutionLine";
import { Section } from "./Section";
import { SectionHeader } from "./SectionHeader";

/**
 * Closing call to action on lavender tint (Tint colorway). Backgrounds stay
 * light. Always the last band, so it blends into the offwhite footer.
 */
export function CtaBand() {
  return (
    <Section bg="lavender-tint" blendTo="offwhite" padding="pt-16 sm:pt-20">
      <ResolutionLine variant="partial" resolve={0.85} />
      <div className="page-wrap pt-14 pb-20 text-center sm:pt-16 sm:pb-24">
        <Monogram className="mx-auto mb-10 h-10 w-auto text-purple" />
        <SectionHeader align="center" label={cta.label} title={cta.title} intro={cta.body} />
        <ButtonLink href="/contact" className="mt-10">
          {cta.button}
        </ButtonLink>
      </div>
    </Section>
  );
}
