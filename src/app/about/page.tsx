import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { KateHeadshot } from "@/components/KateHeadshot";
import { lensIllustrations } from "@/components/LensIllustrations";
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
  lensProof,
  lensProofIntro,
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
      <PageHeader {...aboutIntro} />

      <Section bg="stone">
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

      <MottoStatement motto={pageMottos.about[0]} bg="offwhite" />

      <Section bg="lavender-tint">
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
                </li>
              );
            })}
          </ol>

          <div className="mt-16 border-t border-lavender pt-10">
            <h3 className="eyebrow text-purple">{workedAt.label}</h3>
            <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
              {workedAt.organizations.map((name) => (
                <li key={name} className="font-medium text-charcoal">
                  {name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section bg="aqua-light">
        <div className="page-wrap">
          <SectionHeader {...lensProofIntro} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lensProof.map((item, i) => {
              const Illustration = lensIllustrations[i];
              return (
                <li key={item.lens} className="flex flex-col bg-offwhite p-6 sm:p-8">
                  <Illustration className="h-auto w-full" />
                  <p className="eyebrow mt-6 text-purple">Lens {String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 text-h3 text-charcoal">{item.lens}</h3>
                  <p className="mt-3 text-sm font-medium text-charcoal">{item.where}</p>
                  <p className="mt-3 text-slate">{item.line}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[1]} bg="offwhite" />

      <Section bg="stone">
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
