import { cta } from "@/content/site";
import { ButtonLink } from "./ButtonLink";
import { Monogram } from "./Monogram";
import { ResolutionLine } from "./ResolutionLine";
import { SectionHeader } from "./SectionHeader";

/** Closing call to action in the Reverse colorway: white monogram, lavender lines. */
export function CtaBand() {
  return (
    <section className="on-dark bg-purple pt-16 sm:pt-20">
      <ResolutionLine variant="partial" tone="lavender" resolve={0.85} />
      <div className="page-wrap pt-14 pb-20 text-center sm:pt-16 sm:pb-24">
        <Monogram className="mx-auto mb-10 h-10 w-auto text-white" />
        <SectionHeader tone="dark" align="center" label={cta.label} title={cta.title} intro={cta.body} />
        <ButtonLink href="/contact" variant="light" className="mt-10">
          {cta.button}
        </ButtonLink>
      </div>
    </section>
  );
}
