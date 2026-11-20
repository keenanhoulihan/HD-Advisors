"use client";

import Image from "next/image";
import type partnersJson from "../../content/pages/partners.json";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
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
                {/*
                 * The partner's own logo, in its own colors, linking to their site.
                 * Every logo fits one shared box (64px tall on phones, 80px from sm; 15rem
                 * wide, 18.75rem from lg), so a tall, chunky logo fills the height and a
                 * wide, thin wordmark fills the width: they read as the same size. The row
                 * keeps a fixed height so titles line up across the cards.
                 */}
                {project.badge && (
                  <div className="flex h-16 items-center sm:h-20">
                    <a
                      href={project.url || undefined}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                      {...edit(project, "badge")}
                    >
                      <Image
                        src={project.badge}
                        alt={`${project.name} logo`}
                        width={0}
                        height={0}
                        sizes="(min-width: 1024px) 300px, 240px"
                        className="h-auto max-h-16 w-auto max-w-60 sm:max-h-20 lg:max-w-75"
                      />
                      {project.url && <span className="sr-only"> (opens in a new tab)</span>}
                    </a>
                  </div>
                )}
                <h2 className={`${project.badge ? "mt-8" : ""} text-h3 text-charcoal`} {...edit(project, "name")}>
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
