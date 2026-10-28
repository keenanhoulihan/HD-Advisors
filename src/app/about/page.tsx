import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { DrawRule, RevealGroup, RevealItem } from "@/components/Reveal";
import { ResumeTabs } from "@/components/ResumeTabs";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import {
  aboutIntro,
  competencies,
  competenciesIntro,
  founder,
  philosophy,
  philosophyIntro,
  resume,
  workedAt,
} from "@/content/about";
import { pageMottos } from "@/content/mottos";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Kate",
    description: `${founder.name}, ${founder.role}. More than 15 years of organizational growth, philanthropic strategy, and external relations, from grassroots organizing to the Smithsonian Tropical Research Institute, Fulbright Colombia, and the Griffin Museum of Science and Industry.`,
  };
}

export default function AboutPage() {
  return (
    <>
      <PageHeader {...aboutIntro} blendTo="stone" />

      <Section bg="stone" blendTo="aqua-light">
        <div className="page-wrap">
          <RevealGroup className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
            <RevealItem className="shrink-0">
              <KateHeadshot size="large" src={founder.photo} alt={founder.photoAlt} />
            </RevealItem>
            <SectionHeader label={founder.role} title={founder.name} />
          </RevealGroup>
          <RevealGroup className="mt-12 max-w-3xl">
            <RevealGroup className="space-y-5 text-charcoal">
              {toParagraphs(founder.bio).map((paragraph) => (
                <RevealItem as="p" key={paragraph}>
                  {paragraph}
                </RevealItem>
              ))}
            </RevealGroup>
            <RevealItem className="mt-10">
              <dl className="grid gap-6 border-t border-lavender pt-8 sm:grid-cols-3">
                {founder.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="eyebrow text-purple">{fact.label}</dt>
                    <dd className="mt-2 text-charcoal">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section bg="aqua-light" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...competenciesIntro} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {competencies.map((column) => (
              <RevealItem key={column.title} className="border-t-[1.5px] border-purple pt-6">
                <h3 className="text-h3 text-charcoal">{column.title}</h3>
                <ul className="mt-6 space-y-4">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-4 text-charcoal">
                      <span aria-hidden="true" className="mt-[0.75em] h-[1.5px] w-4 shrink-0 bg-purple" />
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[0]} bg="offwhite" blendTo="lavender-tint" />

      {/* Extra bottom padding keeps the blend below "Where she's worked", so it reads as part of this area. */}
      <Section bg="lavender-tint" blendTo="offwhite" padding="pt-20 pb-36 sm:pt-28 sm:pb-44">
        <div className="page-wrap">
          <SectionHeader label={resume.label} title={resume.title} intro={resume.intro} />
          <RevealGroup className="mt-14">
            <RevealItem>
              <ResumeTabs resume={resume} />
            </RevealItem>
          </RevealGroup>

          {/* Same background as the tabs area: transparent cells, inner rules only. */}
          <RevealGroup className="mt-20">
            <RevealItem as="h3" className="eyebrow text-center text-purple">
              {workedAt.label}
            </RevealItem>
            <DrawRule className="mx-auto mt-5 text-purple" />
            <RevealItem as="ul" className="mt-10 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
              {workedAt.organizations.map((name) => (
                <li
                  key={name}
                  className="-mt-px -ml-px flex min-h-28 items-center justify-center border-t border-l border-lavender px-6 py-8 text-center text-xl leading-snug font-semibold text-charcoal"
                >
                  {name}
                </li>
              ))}
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[1]} bg="offwhite" blendTo="stone" />

      <Section bg="stone" blendTo="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...philosophyIntro} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-20">
            {philosophy.map((item) => (
              <RevealItem key={item.title} className="border-l-[1.5px] border-purple pl-6 sm:pl-8">
                <h3 className="text-h3 text-charcoal">{item.title}</h3>
                <p className="mt-4 text-slate">{item.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
