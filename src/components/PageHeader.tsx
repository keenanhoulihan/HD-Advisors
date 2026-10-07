import { ResolutionLine } from "./ResolutionLine";

type PageHeaderProps = {
  label: string;
  title: string;
  intro: string;
};

export function PageHeader({ label, title, intro }: PageHeaderProps) {
  return (
    <section className="bg-offwhite pt-16 sm:pt-24">
      <div className="page-wrap">
        <div className="max-w-4xl">
          <p className="eyebrow text-purple">{label}</p>
          <h1 className="mt-5 text-display text-charcoal">{title}</h1>
          <ResolutionLine variant="rule" className="mt-8" />
          <p className="mt-8 max-w-2xl text-slate">{intro}</p>
        </div>
      </div>
      <ResolutionLine variant="partial" resolve={0.45} className="mt-14 sm:mt-20" />
    </section>
  );
}
