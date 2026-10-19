"use client";

import { CtaBand } from "@/components/CtaBand";
import { LensDiagram } from "@/components/LensDiagram";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import type { ApproachContent } from "@/content/approach";
import type { SiteContent } from "@/content/site";
import { cn } from "@/lib/cn";
import { CARD_STAGGER } from "@/lib/motion";
import { liveQueries, useLive } from "@/lib/tina-live";

type ApproachData = { approach: ApproachContent; site: SiteContent };

export function ApproachView(props: ApproachData) {
  const { approach, site } = useLive(liveQueries.approach, props);
  const { approachIntro, audiences, audiencesIntro, integratedPlan, lenses, phases, roadmapIntro } = approach;
  return (
    <>
      <PageHeader {...approachIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader label="The four lenses" title="Every part of the organization, in one view." />

          <p className="mt-8 max-w-2xl text-slate">Hover, tap, or tab through each lens to see how it feeds the plan.</p>

          <div className="mt-10">
            <LensDiagram lenses={lenses} integratedPlan={integratedPlan} />
          </div>
        </div>
      </Section>

      <MottoStatement motto={approach.mottos[0]} bg="offwhite" blendTo="lavender-tint" />

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...roadmapIntro} />
          <RevealGroup as="ol" stagger={CARD_STAGGER} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, i) => {
              const final = i === phases.length - 1;
              return (
                <RevealItem as="li" key={i} className="flex flex-col bg-offwhite p-6 sm:p-8">
                  {/* Calmer left to right: phase 01 ripples, phase 04 resolves. */}
                  <ResolutionLine
                    variant="partial"
                    compact
                    resolve={(i + 1) / phases.length}
                    tone={final ? "aqua" : "purple"}
                  />
                  <p className={cn("mt-6 text-h3", final ? "text-aqua" : "text-purple")}>{phase.number}</p>
                  <h3 className="mt-2 text-h3 text-charcoal">{phase.title}</h3>
                  <p className="eyebrow mt-3 text-purple">{phase.timeframe}</p>
                  <p className="mt-4 text-slate">{phase.body}</p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={approach.mottos[1]} bg="offwhite" blendTo="aqua-light" />

      <Section bg="aqua-light" blendTo="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...audiencesIntro} />
          <RevealGroup as="ul" className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {audiences.map((audience, i) => (
              <RevealItem as="li" key={i} className="border-t border-lavender-light pt-6">
                <h3 className="text-h3 text-charcoal">{audience.name}</h3>
                <p className="mt-3 text-slate">{audience.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand cta={site.cta} />
    </>
  );
}
