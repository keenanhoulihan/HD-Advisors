"use client";

import { CtaBand } from "@/components/CtaBand";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { DrawRule, RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import type { AboutContent, CareerEntry } from "@/content/about";
import type { SiteContent } from "@/content/site";
import { CARD_STAGGER } from "@/lib/motion";
import { liveQueries, useLive } from "@/lib/tina-live";

type AboutData = { about: AboutContent; site: SiteContent };

export function AboutView(props: AboutData) {
  const { about, site } = useLive(liveQueries.about, props);
  const { aboutIntro, careerIntro, founder, philosophy, philosophyIntro, workedAt } = about;
  const career: CareerEntry[] = about.career;
  return (
    <>
      <PageHeader {...aboutIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap">
          <RevealGroup className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
            <RevealItem className="shrink-0">
              <KateHeadshot size="large" src={founder.headshot} alt={founder.headshotAlt} />
            </RevealItem>
            <SectionHeader label={founder.role} title={founder.name} />
          </RevealGroup>
          <RevealGroup className="mt-12 max-w-3xl">
            <RevealGroup className="space-y-5 text-charcoal">
              {founder.bio.map((paragraph, i) => (
                <RevealItem as="p" key={i}>
                  {paragraph}
                </RevealItem>
              ))}
            </RevealGroup>
            <RevealItem className="mt-10">
              <dl className="grid gap-6 border-t border-lavender pt-8 sm:grid-cols-2">
                {founder.facts.map((fact, i) => (
                  <div key={i}>
                    <dt className="eyebrow text-purple">{fact.label}</dt>
                    <dd className="mt-2 text-charcoal">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={about.mottos[0]} bg="offwhite" blendTo="lavender-tint" />

      {/* Extra bottom padding keeps the blend below "Where she's worked", so it reads as part of this area. */}
      <Section bg="lavender-tint" blendTo="offwhite" padding="pt-20 pb-36 sm:pt-28 sm:pb-44">
        <div className="page-wrap">
          <SectionHeader {...careerIntro} />
          <RevealGroup as="ol" stagger={CARD_STAGGER} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {career.map((item, i) => {
              const latest = i === career.length - 1;
              return (
                <RevealItem as="li" key={i} className="flex flex-col bg-offwhite p-6 sm:p-8">
                  {/* Calmer left to right: organizing roots ripple, the latest role resolves. */}
                  <ResolutionLine
                    variant="partial"
                    compact
                    resolve={(i + 1) / career.length}
                    tone={latest ? "aqua" : "purple"}
                  />
                  <p className="eyebrow mt-6 text-purple">{item.years}</p>
                  <h3 className="mt-3 text-h3 text-charcoal">{item.role}</h3>
                  <p className="mt-2 font-medium text-charcoal">{item.organization}</p>
                  <p className="mt-1 text-sm text-slate">{item.location}</p>
                  <p className="mt-4 text-slate">{item.line}</p>
                  {item.lenses && (
                    <ul aria-label="Lenses" className="mt-auto flex flex-wrap gap-2 pt-6">
                      {item.lenses.map((lens) => (
                        <li
                          key={lens}
                          className="rounded-full border border-purple px-3 py-1 text-xs font-medium tracking-wide text-purple"
                        >
                          {lens}
                        </li>
                      ))}
                    </ul>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>

          {/* Same background as the timeline: transparent cells, inner rules only. */}
          <RevealGroup className="mt-20">
            <RevealItem as="h3" className="eyebrow text-center text-purple">
              {workedAt.label}
            </RevealItem>
            <DrawRule className="mx-auto mt-5 text-purple" />
            <RevealItem as="ul" className="mt-10 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
              {workedAt.organizations.map((name, i) => (
                <li
                  key={i}
                  className="-mt-px -ml-px flex min-h-28 items-center justify-center border-t border-l border-lavender px-6 py-8 text-center text-xl leading-snug font-semibold text-charcoal"
                >
                  {name}
                </li>
              ))}
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={about.mottos[1]} bg="offwhite" blendTo="stone" />

      <Section bg="stone" blendTo="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...philosophyIntro} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-20">
            {philosophy.map((item, i) => (
              <RevealItem key={i} className="border-l-[1.5px] border-purple pl-6 sm:pl-8">
                <h3 className="text-h3 text-charcoal">{item.title}</h3>
                <p className="mt-4 text-slate">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand cta={site.cta} />
    </>
  );
}
