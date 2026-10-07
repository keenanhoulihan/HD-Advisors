import { ButtonLink } from "@/components/ButtonLink";
import { ResolutionLine } from "@/components/ResolutionLine";

export default function NotFound() {
  return (
    <section className="bg-offwhite py-24 sm:py-32">
      <div className="page-wrap max-w-3xl">
        <p className="eyebrow text-purple">Page not found</p>
        <h1 className="mt-5 text-h2 text-charcoal">This page is a little out of focus.</h1>
        <ResolutionLine variant="rule" className="mt-6" />
        <p className="mt-6 text-slate">The page you are looking for has moved or does not exist.</p>
        <ButtonLink href="/" className="mt-10">
          Back to home
        </ButtonLink>
      </div>
    </section>
  );
}
