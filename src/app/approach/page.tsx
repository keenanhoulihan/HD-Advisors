import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { LensDiagram } from "@/components/LensDiagram";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import {
  approachIntro,
  audiences,
  audiencesIntro,
  phases,
  roadmapIntro,
} from "@/content/approach";
import { pageMottos } from "@/content/mottos";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Approach",
    description:
      "Four Lenses, One Roadmap: programs, revenue, administration, and external affairs, brought together in one phased plan for sustainable growth.",
  };
}

export default function ApproachPage() {
  return (
    <>
      <PageHeader {...approachIntro} />

      <Section bg="stone">
        <div className="page-wrap">
          <SectionHeader label="The four lenses" title="Every part of the organization, in one view." />

          <p className="mt-8 max-w-2xl text-slate">Hover, tap, or tab through each lens to see how it feeds the plan.</p>

          <div className="mt-10">
            <LensDiagram />
          </div>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.approach[0]} bg="offwhite" />

      <Section bg="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...roadmapIntro} />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {phases.map((phase, i) => {
              const final = i === phases.length - 1;
              return (
                <li key={phase.number} className="flex flex-col bg-offwhite p-6 sm:p-8">
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
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.approach[1]} bg="offwhite" />

      <Section bg="aqua-light">
        <div className="page-wrap">
          <SectionHeader {...audiencesIntro} />
          <ul className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {audiences.map((audience) => (
              <li key={audience.name} className="border-t border-lavender-light pt-6">
                <h3 className="text-h3 text-charcoal">{audience.name}</h3>
                <p className="mt-3 text-slate">{audience.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
