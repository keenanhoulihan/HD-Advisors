"use client";

import { PageHeader } from "@/components/PageHeader";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { Section } from "@/components/Section";
import type { ContactContent } from "@/content/contact";
import type { SiteContent } from "@/content/site";
import { liveQueries, useLive } from "@/lib/tina-live";
import { ContactForm } from "../app/contact/ContactForm";

type ContactData = { contact: ContactContent; site: SiteContent };

export function ContactView(props: ContactData) {
  const { contact, site } = useLive(liveQueries.contact, props);
  const { contactIntro, nextSteps } = contact;
  return (
    <>
      <PageHeader {...contactIntro} blendTo="stone" />

      <Section bg="stone" blendTo="offwhite">
        <div className="page-wrap grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
          <ContactForm />

          <aside className="space-y-12">
            <div>
              <p className="eyebrow text-purple">What happens next</p>
              <RevealGroup as="ol" className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <RevealItem as="li" key={i} className="flex gap-4">
                    <span className="font-semibold text-purple">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-medium text-charcoal">{step.title}</p>
                      <p className="mt-1 text-slate">{step.body}</p>
                    </div>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <div className="border-t border-lavender-light pt-10">
              <p className="eyebrow text-purple">Other ways to reach us</p>
              <ul className="mt-6 space-y-3 text-charcoal">
                <li>{site.contact.email}</li>
                <li>{site.contact.phone}</li>
                <li>{site.contact.website}</li>
              </ul>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
