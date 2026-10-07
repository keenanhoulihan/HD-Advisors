import { DrawRule, RevealGroup, RevealItem } from "./Reveal";
import { ResolutionLine } from "./ResolutionLine";
import { Section, type SectionBg } from "./Section";

type PageHeaderProps = {
  label: string;
  title: string;
  intro: string;
  /** Background of the first section below. */
  blendTo: SectionBg;
};

export function PageHeader({ label, title, intro, blendTo }: PageHeaderProps) {
  return (
    <Section bg="offwhite" blendTo={blendTo} padding="pt-16 sm:pt-24">
      <div className="page-wrap">
        <RevealGroup className="max-w-4xl">
          <RevealItem as="p" className="eyebrow text-purple">
            {label}
          </RevealItem>
          <RevealItem as="h1" className="mt-5 text-display text-charcoal">
            {title}
          </RevealItem>
          <DrawRule className="mt-8 text-purple" />
          <RevealItem as="p" className="mt-8 max-w-2xl text-slate">
            {intro}
          </RevealItem>
        </RevealGroup>
      </div>
      <ResolutionLine variant="partial" resolve={0.45} className="mt-14 sm:mt-20" />
    </Section>
  );
}
