import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { SectionHeader } from "@/components/SectionHeader";
import {
  approachIntro,
  audiences,
  audiencesIntro,
  integratedPlan,
  lenses,
  phases,
  roadmapIntro,
} from "@/content/approach";
import { cn } from "@/lib/cn";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Approach",
    description:
      "Four Lenses, One Roadmap: programs, revenue, administration, and external affairs, brought together in one phased plan for sustainable growth.",
  };
}

// Card centers in a four-column row, as fractions of the diagram width.
const LENS_CENTERS = [0.125, 0.375, 0.625, 0.875];

export default function ApproachPage() {
  return (
    <>
      <PageHeader {...approachIntro} />

      <section className="py-20 sm:py-28">
        <div className="page-wrap">
          <SectionHeader label="The four lenses" title="Every part of the organization, in one view." />

          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lenses.map((lens, i) => (
              <li key={lens.name} className="border border-lavender-light bg-offwhite p-6 sm:p-8">
                <p className="eyebrow text-purple">Lens {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 text-charcoal">{lens.name}</h3>
                <p className="mt-3 font-medium text-charcoal">{lens.summary}</p>
                <p className="mt-3 text-slate">{lens.detail}</p>
              </li>
            ))}
          </ul>

          {/* The four lenses converge into one plan. */}
          <svg
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            fill="none"
            aria-hidden="true"
            focusable="false"
            className="hidden h-28 w-full text-purple lg:block"
          >
            {LENS_CENTERS.map((c) => {
              const x = c * 1000;
              return (
                <path
                  key={c}
                  d={`M${x} 0C${x} 70 500 50 500 120`}
                  stroke="currentColor"
                  strokeWidth={1.5}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          <div aria-hidden="true" className="flex justify-center lg:hidden">
            <span className="h-14 w-[1.5px] bg-purple" />
          </div>

          <div className="on-dark bg-purple px-8 py-10 text-center sm:px-12 sm:py-12">
            <p className="eyebrow text-lavender">{integratedPlan.label}</p>
            <h3 className="mt-3 text-h3 text-white">{integratedPlan.title}</h3>
            <p className="mx-auto mt-4 max-w-2xl text-lavender-light">{integratedPlan.body}</p>
          </div>
        </div>
      </section>

      <section className="bg-lavender-tint py-20 sm:py-28">
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
      </section>

      <section className="py-20 sm:py-28">
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
      </section>

      <CtaBand />
    </>
  );
}
