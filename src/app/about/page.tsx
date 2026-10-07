import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { aboutIntro, experience, experienceIntro, founder, philosophy, philosophyIntro } from "@/content/about";
import { pageMottos } from "@/content/mottos";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: `${founder.name}, ${founder.role}. From grassroots organizing campaigns to global institutions, across politics, advocacy, the arts, and international development.`,
  };
}

export default function AboutPage() {
  return (
    <>
      <PageHeader {...aboutIntro} />

      <Section bg="stone">
        <div className="page-wrap grid items-start gap-12 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:gap-20">
          <div className="flex aspect-[4/5] items-center justify-center bg-lavender-tint text-slate">
            {founder.headshot}
          </div>
          <div>
            <SectionHeader label={founder.role} title={founder.name} />
            <div className="mt-8 space-y-5 text-charcoal">
              {founder.bio.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.about[0]} bg="offwhite" />

      <Section bg="lavender-tint">
        <div className="page-wrap">
          <SectionHeader {...experienceIntro} />
          <ul className="mt-14 grid gap-4 sm:grid-cols-2">
            {experience.map((item) => (
              <li key={item.area} className="bg-offwhite p-8 sm:p-10">
                <h3 className="text-h3 text-charcoal">{item.area}</h3>
                <p className="mt-3 text-slate">{item.body}</p>
                <p className="mt-6 text-sm text-slate">{item.organizations}</p>
              </li>
            ))}
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
