import { edit } from "@/lib/tina-live";
import { DrawRule, RevealGroup, RevealItem } from "./Reveal";
import { ResolutionLine } from "./ResolutionLine";
import { Section, type SectionBg } from "./Section";

type PageHeaderProps = {
  label: string;
  title: string;
  intro: string;
  /** Set after the title, e.g. the season on /offerings: "Consulting Offerings | Fall 2026". */
  titleAside?: string;
  /** Background of the first section below. */
  blendTo: SectionBg;
  /** The content object the text came from, so Kate can click it to edit in Tina. */
  source?: object | null;
};

export function PageHeader({ label, title, intro, titleAside, blendTo, source }: PageHeaderProps) {
  return (
    <Section bg="offwhite" blendTo={blendTo} padding="pt-16 sm:pt-24">
      <div className="page-wrap">
        <RevealGroup className="max-w-4xl">
          <RevealItem as="p" className="eyebrow text-purple" {...edit(source, "label")}>
            {label}
          </RevealItem>
          <RevealItem as="h1" className="mt-5 text-display text-charcoal">
            <span {...edit(source, "title")}>{title}</span>
            {titleAside && (
              <>
                <span className="sr-only">, </span>
                {/* On phones the aside drops to its own line and the divider goes away. */}
                <span aria-hidden="true" className="hidden px-[0.3em] font-normal text-lavender sm:inline">
                  |
                </span>
                <span className="block text-purple sm:inline" {...edit(source, "season")}>
                  {titleAside}
                </span>
              </>
            )}
          </RevealItem>
          <DrawRule className="mt-8 text-purple" />
          <RevealItem as="p" className="mt-8 max-w-2xl text-slate" {...edit(source, "intro")}>
            {intro}
          </RevealItem>
        </RevealGroup>
      </div>
      <ResolutionLine variant="partial" resolve={0.45} className="mt-14 sm:mt-20" />
    </Section>
  );
}
