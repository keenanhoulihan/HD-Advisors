import type { Metadata } from "next";
import Image from "next/image";
import { CtaBand } from "@/components/CtaBand";
import { PageHeader } from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section, type SectionBg } from "@/components/Section";
import { SectionHeader } from "@/components/SectionHeader";
import { clients, endorsements, endorsementsPage } from "@/content/endorsements";
import { site } from "@/content/site";
import { CARD_STAGGER } from "@/lib/motion";

/*
 * Endorsements + Clients. Kate is still gathering these, so the page ships
 * with a "coming soon" state and no sample content. It stays out of the menu
 * and out of search engines until "Show the Endorsements page in the menu"
 * is turned on in Tina (Site Settings).
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: endorsementsPage.intro.label,
    description: endorsementsPage.intro.intro,
    robots: site.showEndorsements ? undefined : { index: false, follow: false },
  };
}

export default function EndorsementsPage() {
  const hasEndorsements = endorsements.length > 0;
  const hasClients = clients.length > 0;
  const empty = !hasEndorsements && !hasClients;

  // Band order, so each band blends into the one below it (the CtaBand is lavender tint).
  const firstBg: SectionBg = hasEndorsements || empty ? "stone" : "aqua-light";
  const afterEndorsements: SectionBg = hasClients ? "aqua-light" : "lavender-tint";

  return (
    <>
      <PageHeader {...endorsementsPage.intro} blendTo={firstBg} />

      {empty && (
        <Section bg="stone" blendTo="lavender-tint" padding="pt-16 pb-28 sm:pt-20 sm:pb-36">
          <div className="page-wrap">
            <SectionHeader
              align="center"
              label={endorsementsPage.endorsementsLabel}
              title={endorsementsPage.comingSoon.title}
              intro={endorsementsPage.comingSoon.body}
            />
          </div>
        </Section>
      )}

      {hasEndorsements && (
        <Section bg="stone" blendTo={afterEndorsements}>
          <div className="page-wrap">
            <SectionHeader label={endorsementsPage.endorsementsLabel} title={endorsementsPage.intro.title} />
            <RevealGroup as="ul" stagger={CARD_STAGGER} className="mt-14 grid gap-4 md:grid-cols-2">
              {endorsements.map((item) => (
                <RevealItem as="li" key={`${item.name}-${item.quote.slice(0, 24)}`} className="bg-offwhite p-6 sm:p-10">
                  <figure className="flex h-full flex-col">
                    <blockquote className="text-lg text-charcoal sm:text-xl">
                      <p>&ldquo;{item.quote}&rdquo;</p>
                    </blockquote>
                    <figcaption className="mt-auto flex items-center gap-4 pt-8">
                      {item.photo && (
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-full bg-lavender-tint">
                          <Image src={item.photo} alt="" fill sizes="56px" className="object-cover" />
                        </span>
                      )}
                      <span>
                        <span className="block font-semibold text-charcoal">{item.name}</span>
                        {(item.title || item.organization) && (
                          <span className="block text-sm text-slate">
                            {[item.title, item.organization].filter(Boolean).join(", ")}
                          </span>
                        )}
                      </span>
                    </figcaption>
                  </figure>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </Section>
      )}

      {hasClients && (
        <Section bg="aqua-light" blendTo="lavender-tint">
          <div className="page-wrap">
            <SectionHeader label={endorsementsPage.clientsLabel} title={endorsementsPage.clientsLabel} />
            {/* Transparent cells with inner rules only, like "Where she's worked". */}
            <RevealGroup as="ul" className="mt-14 grid grid-cols-2 overflow-hidden lg:grid-cols-4">
              {clients.map((item) => {
                const content = item.logo ? (
                  <span className="relative block h-16 w-full">
                    <Image src={item.logo} alt={item.name} fill sizes="200px" className="object-contain" />
                  </span>
                ) : (
                  <span className="text-lg leading-snug font-semibold text-charcoal">{item.name}</span>
                );
                return (
                  <RevealItem
                    as="li"
                    key={item.name}
                    className="-mt-px -ml-px flex min-h-32 items-center justify-center border-t border-l border-lavender px-6 py-8 text-center"
                  >
                    {item.url ? (
                      <a href={item.url} className="block w-full" target="_blank" rel="noopener noreferrer">
                        {content}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    ) : (
                      content
                    )}
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </Section>
      )}

      <CtaBand />
    </>
  );
}
