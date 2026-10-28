"use client";

import type offeringsJson from "../../content/pages/offerings.json";
import { CtaBand } from "@/components/CtaBand";
import { MottoStatement } from "@/components/MottoStatement";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { pageMottos } from "@/content/mottos";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

export function OfferingsView({ data }: { data: { offerings: typeof offeringsJson } }) {
  const { offerings } = useLive(liveQueries.offerings, data, "pages/offerings");
  const { intro, available, comingSoon } = offerings;
  // The "Available now" toggle sorts each offering into its section as Kate flips it.
  const availableOfferings = list(offerings.offerings).filter((offering) => offering.availableNow);
  const comingSoonOfferings = list(offerings.offerings).filter((offering) => !offering.availableNow);

  return (
    <>
      <PageHeader
        label={intro.label}
        title={intro.title}
        titleAside={intro.season}
        intro={intro.intro}
        source={intro}
        blendTo="lavender-tint"
      />

      <Section bg="lavender-tint" blendTo="offwhite">
        <div className="page-wrap">
          <SectionHeader label={available.label} title={available.title} source={available} />
          <RevealGroup as="ol" stagger={CARD_STAGGER} className="mt-14 grid gap-4 md:grid-cols-2">
            {availableOfferings.map((offering, i) => (
              <RevealItem as="li" key={i} className="flex flex-col bg-offwhite p-6 sm:p-10">
                {/* Calmer card by card, like the phased roadmap. */}
                <ResolutionLine variant="partial" compact resolve={(i + 1) / availableOfferings.length} />
                <p className="mt-6 text-h3 text-purple">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-h3 text-charcoal" {...edit(offering, "title")}>
                  {offering.title}
                </h3>
                <div className="mt-5 space-y-4 text-slate" {...edit(offering, "body")}>
                  {toParagraphs(offering.body).map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <MottoStatement
        motto={pageMottos.offerings[0]}
        bg="offwhite"
        blendTo={comingSoonOfferings.length > 0 ? "stone" : "lavender-tint"}
      />

      {comingSoonOfferings.length > 0 && (
        <Section bg="stone" blendTo="lavender-tint">
          <div className="page-wrap">
            <SectionHeader label={comingSoon.label} title={comingSoon.title} intro={comingSoon.intro} source={comingSoon} />
            <RevealGroup as="ul" stagger={CARD_STAGGER} className="mt-14 grid gap-4 md:grid-cols-2">
              {comingSoonOfferings.map((offering, i) => (
                <RevealItem as="li" key={i} className="border-[1.5px] border-lavender p-6 sm:p-10">
                  <p className="eyebrow text-purple">{comingSoon.label}</p>
                  <h3 className="mt-3 text-h3 text-charcoal" {...edit(offering, "title")}>
                    {offering.title}
                  </h3>
                  <div {...edit(offering, "body")}>
                    {toParagraphs(offering.body).map((paragraph, j) => (
                      <p key={j} className="mt-4 text-slate">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
