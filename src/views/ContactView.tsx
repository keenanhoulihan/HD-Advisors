"use client";

import type contactJson from "../../content/pages/contact.json";
import { ContactForm } from "@/app/contact/ContactForm";
import { ContactLinks } from "@/components/ContactLinks";
import { PageHeader } from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import { edit, list, liveQueries, useLive } from "@/lib/tina-live";

export function ContactView({ data }: { data: { contact: typeof contactJson } }) {
  const { contact } = useLive(liveQueries.contact, data, "pages/contact");
  const { contactIntro, asideCopy } = contact;

  return (
    <>
      <PageHeader {...contactIntro} source={contactIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
          <ContactForm copy={contact} />

          <aside className="space-y-12">
            <div>
              <p className="eyebrow text-purple" {...edit(asideCopy, "nextStepsLabel")}>
                {asideCopy.nextStepsLabel}
              </p>
              <RevealGroup as="ol" className="mt-6 space-y-6">
                {list(contact.nextSteps).map((step, i) => (
                  <RevealItem as="li" key={i} className="flex gap-4">
                    <span className="font-semibold text-purple">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-medium text-charcoal" {...edit(step, "title")}>
                        {step.title}
                      </p>
                      <p className="mt-1 text-slate" {...edit(step, "body")}>
                        {step.body}
                      </p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="border-t border-lavender-light pt-10">
              <p className="eyebrow text-purple" {...edit(asideCopy, "otherWaysLabel")}>
                {asideCopy.otherWaysLabel}
              </p>
              <ul className="mt-6 space-y-3 text-charcoal">
                <ContactLinks />
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
