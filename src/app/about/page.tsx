import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import {
  aboutIntro,
  career,
  careerIntro,
  founder,
  philosophy,
  philosophyIntro,
  workedAt,
} from "@/content/about";
import { pageMottos } from "@/content/mottos";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: `${founder.name}, ${founder.role}. From grassroots organizing to the Smithsonian Tropical Research Institute, Fulbright Colombia, and the Griffin Museum of Science and Industry.`,
  };
}

export default function AboutPage() {
  return (
    <>
      <PageHeader {...aboutIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap grid items-start gap-12 md:grid-cols-[18rem_minmax(0,1fr)] lg:gap-20">
          <KateHeadshot size="large" className="md:mt-2" />
          <div>
            <SectionHeader label={founder.role} title={founder.name} />
            <div className="mt-8 space-y-5 text-charcoal">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <dl className="mt-10 grid gap-6 border-t border-lavender pt-8 sm:grid-cols-2">
              {founder.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="eyebrow text-purple">{fact.label}</dt>
                  <dd className="mt-2 text-charcoal">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[0]} bg="offwhite" blendTo="lavender-tint" />

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...careerIntro} />
          <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {career.map((item, i) => {
              const latest = i === career.length - 1;
              return (
                <li key={item.organization} className="flex flex-col bg-offwhite p-6 sm:p-8">
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
                </li>
              );
            })}
          </ol>

          <div className="mt-20">
            <h3 className="eyebrow text-center text-purple">{workedAt.label}</h3>
            <ResolutionLine variant="rule" className="mx-auto mt-5" />
            <ul className="mt-10 grid gap-px bg-lavender sm:grid-cols-2 lg:grid-cols-3">
              {workedAt.organizations.map((name) => (
                <li
                  key={name}
                  className="flex min-h-28 items-center justify-center bg-lavender-tint px-6 py-8 text-center text-xl leading-snug font-semibold text-charcoal"
                >
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[1]} bg="offwhite" blendTo="stone" />

      <Section bg="stone" blendTo="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...philosophyIntro} />
          <div className="mt-14 grid gap-12 md:grid-cols-2 lg:gap-20">
            {philosophy.map((item) => (
              <div key={item.title} className="border-l-[1.5px] border-purple pl-6 sm:pl-8">
                <h3 className="text-h3 text-charcoal">{item.title}</h3>
                <p className="mt-4 text-slate">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
