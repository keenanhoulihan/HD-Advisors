"use client";

import type aboutJson from "../../content/pages/about.json";
import { CtaBand } from "@/components/CtaBand";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { DrawRule, RevealGroup, RevealItem } from "@/components/Reveal";
import { ResumeTabs } from "@/components/ResumeTabs";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMottos } from "@/content/mottos";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

export function AboutView({ data }: { data: { about: typeof aboutJson } }) {
  const { about } = useLive(liveQueries.about, data, "pages/about");
  const { intro, founder, competenciesIntro, resume, workedAt, philosophyIntro } = about;

  return (
    <>
      <PageHeader {...intro} source={intro} blendTo="stone" />

      <Section bg="stone" blendTo="aqua-light">
        <div className="page-wrap">
          <RevealGroup className="flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
            <RevealItem className="shrink-0" {...edit(founder, "photo")}>
              <KateHeadshot size="large" src={founder.photo} alt={founder.photoAlt} />
            </RevealItem>
            <SectionHeader label={founder.role} title={founder.name} source={founder} fields={{ label: "role", title: "name" }} />
          </RevealGroup>
          <RevealGroup className="mt-12 max-w-3xl">
            <RevealGroup className="space-y-5 text-charcoal" {...edit(founder, "bio")}>
              {toParagraphs(founder.bio).map((paragraph, i) => (
                <RevealItem as="p" key={i}>
                  {paragraph}
                </RevealItem>
              ))}
            </RevealGroup>
            <RevealItem className="mt-10">
              <dl className="grid gap-6 border-t border-lavender pt-8 sm:grid-cols-3">
                {list(founder.facts).map((fact, i) => (
                  <div key={i}>
                    <dt className="eyebrow text-purple" {...edit(fact, "label")}>
                      {fact.label}
                    </dt>
                    <dd className="mt-2 text-charcoal" {...edit(fact, "value")}>
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section bg="aqua-light" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...competenciesIntro} source={competenciesIntro} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-12 md:grid-cols-3 md:gap-10">
            {list(about.competencies).map((column, i) => (
              <RevealItem key={i} className="border-t-[1.5px] border-purple pt-6">
                <h3 className="text-h3 text-charcoal" {...edit(column, "title")}>
                  {column.title}
                </h3>
                <ul className="mt-6 space-y-4">
                  {list(column.items).map((item, j) => (
                    <li key={j} className="flex gap-4 text-charcoal" {...edit(column, "items", j)}>
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
          <SectionHeader label={resume.label} title={resume.title} intro={resume.intro} source={resume} />
          <RevealGroup className="mt-14">
            <RevealItem>
              <ResumeTabs resume={resume} />
            </RevealItem>
          </RevealGroup>

          {/* Same background as the tabs area: transparent cells, inner rules only. */}
          <RevealGroup className="mt-20">
            <RevealItem as="h3" className="eyebrow text-center text-purple" {...edit(workedAt, "label")}>
              {workedAt.label}
            </RevealItem>
            <DrawRule className="mx-auto mt-5 text-purple" />
            <RevealItem as="ul" className="mt-10 grid overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
              {list(workedAt.organizations).map((name, i) => (
                <li
                  key={i}
                  className="-mt-px -ml-px flex min-h-28 items-center justify-center border-t border-l border-lavender px-6 py-8 text-center text-xl leading-snug font-semibold text-charcoal"
                  {...edit(workedAt, "organizations", i)}
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
          <SectionHeader {...philosophyIntro} source={philosophyIntro} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-20">
            {list(about.philosophy).map((item, i) => (
              <RevealItem key={i} className="border-l-[1.5px] border-purple pl-6 sm:pl-8">
                <h3 className="text-h3 text-charcoal" {...edit(item, "title")}>
                  {item.title}
                </h3>
                <p className="mt-4 text-slate" {...edit(item, "body")}>
                  {item.body}
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
