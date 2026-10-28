import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMottos } from "@/content/mottos";
import {
  availableIntro,
  availableOfferings,
  comingSoonIntro,
  comingSoonOfferings,
  offeringsIntro,
} from "@/content/offerings";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${offeringsIntro.title}, ${offeringsIntro.season}`,
    description: `Consulting offerings from Kate Hibbs Davis: ${availableOfferings.map((offering) => offering.title).join("; ")}.`,
  };
}

export default function OfferingsPage() {
  return (
    <>
      <PageHeader
        label={offeringsIntro.label}
        title={offeringsIntro.title}
        titleAside={offeringsIntro.season}
        intro={offeringsIntro.intro}
        blendTo="lavender-tint"
      />

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader label={availableIntro.label} title={availableIntro.title} />
          <RevealGroup as="ol" stagger={CARD_STAGGER} className="mt-14 grid gap-4 md:grid-cols-2">
            {availableOfferings.map((offering, i) => (
              <RevealItem as="li" key={offering.title} className="flex flex-col bg-offwhite p-6 sm:p-10">
                {/* Calmer card by card, like the phased roadmap. */}
                <ResolutionLine variant="partial" compact resolve={(i + 1) / availableOfferings.length} />
                <p className="mt-6 text-h3 text-purple">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-h3 text-charcoal">{offering.title}</h3>
                <div className="mt-5 space-y-4 text-slate">
                  {toParagraphs(offering.body).map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement
        motto={pageMottos.offerings[0]}
        bg="offwhite"
        blendTo={comingSoonOfferings.length > 0 ? "stone" : "lavender-tint"}
      />

      {comingSoonOfferings.length > 0 && (
        <Section bg="stone" blendTo="lavender-tint">
          <div className="page-wrap">
            <SectionHeader label={comingSoonIntro.label} title={comingSoonIntro.title} intro={comingSoonIntro.intro} />
            <RevealGroup as="ul" stagger={CARD_STAGGER} className="mt-14 grid gap-4 md:grid-cols-2">
              {comingSoonOfferings.map((offering) => (
                <RevealItem as="li" key={offering.title} className="border-[1.5px] border-lavender p-6 sm:p-10">
                  <p className="eyebrow text-purple">{comingSoonIntro.label}</p>
                  <h3 className="mt-3 text-h3 text-charcoal">{offering.title}</h3>
                  {toParagraphs(offering.body).map((paragraph) => (
                    <p key={paragraph} className="mt-4 text-slate">
                      {paragraph}
                    </p>
                  ))}
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
