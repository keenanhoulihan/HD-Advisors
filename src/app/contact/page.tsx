import type { Metadata } from "next";
import { PageHeader } from "@/components/PageHeader";
import { contactIntro, nextSteps } from "@/content/contact";
import { site } from "@/content/site";
import { ContactForm } from "./ContactForm";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact",
    description: "Start a conversation with High Definition Advisors about clarity for your organization's growth.",
  };
}

export default function ContactPage() {
  return (
    <>
      <PageHeader {...contactIntro} />

      <section className="py-20 sm:py-28">
        <div className="page-wrap grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-24">
          <ContactForm />

          <aside className="space-y-12">
            <div>
              <p className="eyebrow text-purple">What happens next</p>
              <ol className="mt-6 space-y-6">
                {nextSteps.map((step, i) => (
                  <li key={step.title} className="flex gap-4">
                    <span className="font-semibold text-purple">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <p className="font-medium text-charcoal">{step.title}</p>
                      <p className="mt-1 text-slate">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
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
      </section>
    </>
  );
}
