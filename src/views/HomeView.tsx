"use client";

import Link from "next/link";
import type approachJson from "../../content/pages/approach.json";
import type homeJson from "../../content/pages/home.json";
import { ButtonLink } from "@/components/ButtonLink";
import { CtaBand } from "@/components/CtaBand";
import { HeroResolve } from "@/components/HeroResolve";
import { KateHeadshot } from "@/components/KateHeadshot";
import { MottoStatement } from "@/components/MottoStatement";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { useSite } from "@/components/SiteLive";
import { pageMottos } from "@/content/mottos";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

type HomeData = { home: typeof homeJson; approach: typeof approachJson };

export function HomeView({ data }: { data: HomeData }) {
  const { home, approach } = useLive(liveQueries.home, data, "pages/home");
  const { site, mottos } = useSite();
  const { founderIntro, challengesIntro, shift, lensesTeaser } = home;

  return (
    <>
      <HeroResolve blendTo="lavender-tint">
        <div className="page-wrap text-center">
          <RevealItem as="p" className="eyebrow text-purple">
            {site.name}
          </RevealItem>
          <RevealItem as="h1" className="mx-auto mt-5 max-w-6xl text-display text-charcoal" {...edit(mottos, "primary")}>
            {mottos.primary}
          </RevealItem>
          <RevealItem as="p" className="mx-auto mt-6 max-w-2xl text-slate" {...edit(site, "positioning")}>
            {site.positioning}
          </RevealItem>
          <RevealItem className="mt-8" {...edit(home, "heroButton")}>
            <ButtonLink href="/contact">{home.heroButton}</ButtonLink>
          </RevealItem>
        </div>
      </HeroResolve>

      {/* Kate first: right after the hero, so the first look is the person behind the work. */}
      <Section bg="lavender-tint" blendTo="stone">
        <RevealGroup className="page-wrap flex flex-col items-start gap-10 md:flex-row md:items-start md:gap-16">
          <RevealItem className="shrink-0" {...edit(founderIntro, "photo")}>
            <KateHeadshot
              size="small"
              src={founderIntro.photo}
              alt={founderIntro.photoAlt}
              className="border-[1.5px] border-purple"
            />
          </RevealItem>
          <div className="max-w-2xl">
            <SectionHeader label={founderIntro.label} title={founderIntro.title} source={founderIntro} />
            <div className="mt-6 space-y-5 text-charcoal" {...edit(founderIntro, "body")}>
              {toParagraphs(founderIntro.body).map((paragraph, i) => (
                <RevealItem as="p" key={i}>
                  {paragraph}
                </RevealItem>
              ))}
            </div>
            <RevealItem
              as="aside"
              aria-label={founderIntro.hdCallout.label}
              className="mt-8 border-l-[1.5px] border-purple bg-offwhite p-6 sm:p-7"
            >
              <p className="eyebrow text-purple" {...edit(founderIntro.hdCallout, "label")}>
                {founderIntro.hdCallout.label}
              </p>
              <p className="mt-3 text-charcoal" {...edit(founderIntro.hdCallout, "body")}>
                {founderIntro.hdCallout.body}
              </p>
            </RevealItem>
            <RevealItem className="mt-8">
              <Link
                href="/about"
                className="link-underline inline-block font-medium text-purple"
                {...edit(founderIntro, "link")}
              >
                {founderIntro.link} <span aria-hidden="true">&rarr;</span>
              </Link>
            </RevealItem>
          </div>
        </RevealGroup>
      </Section>

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader {...challengesIntro} source={challengesIntro} />
          <RevealGroup as="ol" className="mt-14 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {list(home.challenges).map((item, i) => (
              <RevealItem as="li" key={i} className="border-t border-lavender pt-6">
                <p className="eyebrow text-purple">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 text-charcoal" {...edit(item, "title")}>
                  {item.title}
                </h3>
                <p className="mt-3 text-slate" {...edit(item, "body")}>
                  {item.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.home[0]} bg="offwhite" blendTo="stone" />

      <Section bg="stone" blendTo="aqua-light">
        <div className="page-wrap">
          <SectionHeader label={mottos.shift} title={shift.title} source={shift} labelEdit={edit(mottos, "shift")} />
          <RevealGroup stagger={CARD_STAGGER} className="mt-14 grid gap-6 md:grid-cols-2">
            <RevealItem>
              <ShiftPanel panel={shift.reactive} className="bg-offwhite" titleClass="text-charcoal" markerClass="bg-slate" />
            </RevealItem>
            <RevealItem>
              <ShiftPanel panel={shift.intentional} className="bg-aqua-light" titleClass="text-aqua" markerClass="bg-purple" />
            </RevealItem>
          </RevealGroup>
        </div>
      </Section>

      <Section bg="aqua-light" blendTo="offwhite" padding="pt-16 pb-20 sm:pt-20 sm:pb-28">
        <ResolutionLine variant="partial" />
        <div className="page-wrap mt-16 sm:mt-20">
          <RevealGroup className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              label={mottos.lenses}
              title={lensesTeaser.title}
              source={lensesTeaser}
              labelEdit={edit(mottos, "lenses")}
            />
            <RevealItem className="shrink-0">
              <Link href="/approach" className="link-underline font-medium text-purple" {...edit(lensesTeaser, "link")}>
                {lensesTeaser.link} <span aria-hidden="true">&rarr;</span>
              </Link>
            </RevealItem>
          </RevealGroup>
          <RevealGroup as="ul" stagger={CARD_STAGGER} className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {list(approach.lenses).map((lens, i) => (
              <RevealItem as="li" key={i} className="bg-offwhite p-6 sm:p-8">
                <p className="eyebrow text-purple">Lens {String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 text-h3 text-charcoal" {...edit(lens, "name")}>
                  {lens.name}
                </h3>
                <p className="mt-3 text-slate" {...edit(lens, "summary")}>
                  {lens.summary}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement motto={pageMottos.home[1]} bg="offwhite" blendTo="lavender-tint" />

      <CtaBand />
    </>
  );
}

function ShiftPanel({
  panel,
  className,
  titleClass,
  markerClass,
}: {
  panel: HomeData["home"]["shift"]["reactive"];
  className: string;
  titleClass: string;
  markerClass: string;
}) {
  return (
    <div className={`h-full p-8 sm:p-10 ${className}`}>
      <p className="eyebrow text-slate" {...edit(panel, "label")}>
        {panel.label}
      </p>
      <h3 className={`mt-3 text-h3 ${titleClass}`} {...edit(panel, "title")}>
        {panel.title}
      </h3>
      <ul className="mt-6 space-y-4">
        {list(panel.points).map((point, i) => (
          <li key={i} className="flex gap-4 text-charcoal" {...edit(panel, "points", i)}>
            <span aria-hidden="true" className={`mt-[0.75em] h-[1.5px] w-4 shrink-0 ${markerClass}`} />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
