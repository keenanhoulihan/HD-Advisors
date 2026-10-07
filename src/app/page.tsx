import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { ResolutionLine } from "@/components/ResolutionLine";
import { HeroResolve } from "@/components/HeroResolve";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { lenses } from "@/content/approach";
import { challenges, challengesIntro, founderIntro, lensesTeaser, shift } from "@/content/home";
import { mottos, pageMottos } from "@/content/mottos";
import { site } from "@/content/site";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: `${site.name} | ${site.tagline}` },
    description: site.description,
  };
}

export default function HomePage() {
  return (
    <>
      <HeroResolve blendTo="lavender-tint">
        <div className="page-wrap text-center">
          <p className="eyebrow text-purple">{site.name}</p>
          <h1 className="mx-auto mt-5 max-w-6xl text-display text-charcoal">{site.tagline}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-slate">{site.positioning}</p>
          <ButtonLink href="/contact" className="mt-8">
            Start a conversation
          </ButtonLink>
        </div>
      </HeroResolve>

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...challengesIntro} />
          <ol className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map((item, i) => (
              <li key={item.title} className="border-t border-lavender pt-6">
                <p className="eyebrow text-purple">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 text-charcoal">{item.title}</h3>
                <p className="mt-3 text-slate">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.home[0]} bg="offwhite" blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader label={mottos.shift} title={shift.title} />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <ShiftPanel {...shift.reactive} className="bg-offwhite" titleClass="text-charcoal" markerClass="bg-slate" />
            <ShiftPanel {...shift.intentional} className="bg-aqua-light" titleClass="text-aqua" markerClass="bg-purple" />
          </div>
        </div>
      </Section>

      <Section bg="offwhite" blendTo="aqua-light">
        <div className="page-wrap flex flex-col items-start gap-10 md:flex-row md:items-center md:gap-14">
          <KateHeadshot size="small" className="shrink-0" />
          <div className="max-w-2xl">
            <SectionHeader label={founderIntro.label} title={founderIntro.title} intro={founderIntro.body} />
            <Link
              href="/about"
              className="mt-6 inline-block font-medium text-purple underline-offset-[0.4em] decoration-[1.5px] hover:underline"
            >
              {founderIntro.link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
      </Section>

      <Section bg="aqua-light" blendTo="offwhite" padding="pt-16 pb-20 sm:pt-20 sm:pb-28">
        <ResolutionLine variant="partial" />
        <div className="page-wrap mt-16 sm:mt-20">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader label={mottos.lenses} title={lensesTeaser.title} />
            <Link
              href="/approach"
              className="shrink-0 font-medium text-purple underline-offset-[0.4em] decoration-[1.5px] hover:underline"
            >
              {lensesTeaser.link} <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {lenses.map((lens, i) => (
              <li key={lens.name} className="bg-offwhite p-6 sm:p-8">
                <p className="eyebrow text-purple">Lens {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 text-charcoal">{lens.name}</h3>
                <p className="mt-3 text-slate">{lens.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.home[1]} bg="offwhite" blendTo="lavender-tint" />

      <CtaBand />
    </>
  );
}

function ShiftPanel({
  label,
  title,
  points,
  className,
  titleClass,
  markerClass,
}: {
  label: string;
  title: string;
  points: string[];
  className: string;
  titleClass: string;
  markerClass: string;
}) {
  return (
    <div className={`p-8 sm:p-10 ${className}`}>
      <p className="eyebrow text-slate">{label}</p>
      <h3 className={`mt-3 text-h3 ${titleClass}`}>{title}</h3>
      <ul className="mt-6 space-y-4">
        {points.map((point) => (
          <li key={point} className="flex gap-4 text-charcoal">
            <span aria-hidden="true" className={`mt-[0.75em] h-[1.5px] w-4 shrink-0 ${markerClass}`} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
