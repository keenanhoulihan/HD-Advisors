"use client";

import type partnersJson from "../../content/pages/partners.json";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { ResolutionLine } from "@/components/ResolutionLine";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { CARD_STAGGER } from "@/lib/motion";
import { toParagraphs } from "@/lib/text";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

/*
 * Partner Projects: the collaborations Kate is part of beyond HD Advisors.
 * One card per partner, each linking out to the partner's own site.
 */
export function PartnersView({ data }: { data: { partners: typeof partnersJson } }) {
  const { partners } = useLive(liveQueries.partners, data, "pages/partners");
  const { intro } = partners;
  const projects = list(partners.projects);

  return (
    <>
      <PageHeader {...intro} source={intro} blendTo="stone" />

      <Section bg="stone" blendTo="lavender-tint">
        <div className="page-wrap">
          <RevealGroup as="ul" stagger={CARD_STAGGER} className="grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => (
              <RevealItem as="li" key={i} className="flex flex-col bg-offwhite p-6 sm:p-10">
                <ResolutionLine variant="partial" compact resolve={(i + 1) / projects.length} />
                <h2 className="mt-6 text-h3 text-charcoal" {...edit(project, "name")}>
                  {project.name}
                </h2>
                <div className="mt-4 flex-1 space-y-4 text-slate" {...edit(project, "body")}>
                  {toParagraphs(project.body).map((paragraph, j) => (
                    <p key={j}>{paragraph}</p>
                  ))}
                </div>
                {project.url && (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline mt-8 self-start font-medium text-purple"
                    {...edit(project, "linkLabel")}
                  >
                    {project.linkLabel || project.name}
                    <span aria-hidden="true"> &#8599;</span>
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                )}
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
