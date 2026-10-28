"use client";

import type approachJson from "../../content/pages/approach.json";
import { CtaBand } from "@/components/CtaBand";
import { LensDiagram } from "@/components/LensDiagram";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMottos } from "@/content/mottos";
import { cn } from "@/lib/cn";
import { CARD_STAGGER } from "@/lib/motion";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

export function ApproachView({ data }: { data: { approach: typeof approachJson } }) {
  const { approach } = useLive(liveQueries.approach, data, "pages/approach");
  const { approachIntro, lensesIntro, roadmapIntro, audiencesIntro } = approach;
  const phases = list(approach.phases);

  return (
    <>
      <PageHeader {...approachIntro} source={approachIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader label={lensesIntro.label} title={lensesIntro.title} source={lensesIntro} />

          <p className="mt-8 max-w-2xl text-slate" {...edit(lensesIntro, "hint")}>
            {lensesIntro.hint}
          </p>

          <div className="mt-10">
            <LensDiagram lenses={approach.lenses} integratedPlan={approach.integratedPlan} />
          </div>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.approach[0]} bg="offwhite" blendTo="lavender-tint" />

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...roadmapIntro} source={roadmapIntro} />
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
                  <p className={cn("mt-6 text-h3", final ? "text-aqua" : "text-purple")} {...edit(phase, "number")}>
                    {phase.number}
                  </p>
                  <h3 className="mt-2 text-h3 text-charcoal" {...edit(phase, "title")}>
                    {phase.title}
                  </h3>
                  <p className="eyebrow mt-3 text-purple" {...edit(phase, "timeframe")}>
                    {phase.timeframe}
                  </p>
                  <p className="mt-4 text-slate" {...edit(phase, "body")}>
                    {phase.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.approach[1]} bg="offwhite" blendTo="aqua-light" />

      <Section bg="aqua-light" blendTo="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...audiencesIntro} source={audiencesIntro} />
          <RevealGroup as="ul" className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {list(approach.audiences).map((audience, i) => (
              <RevealItem as="li" key={i} className="border-t border-lavender-light pt-6">
                <h3 className="text-h3 text-charcoal" {...edit(audience, "name")}>
                  {audience.name}
                </h3>
                <p className="mt-3 text-slate" {...edit(audience, "body")}>
                  {audience.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
