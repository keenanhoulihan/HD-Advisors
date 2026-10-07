import type { Metadata } from "next";
import { MonogramLockup, MonogramMark, type MonogramVariant } from "@/components/brand/Monogram";
import { cn } from "@/lib/cn";

/*
 * Temporary comparison page for the compact HD monogram options. Not linked
 * from the site and not indexed. Delete once a monogram is chosen.
 */

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Monogram lab", robots: { index: false, follow: false } };
}

const OPTIONS: Array<{ variant: MonogramVariant; name: string; note: string }> = [
  {
    variant: "a",
    name: "A. Shared stem",
    note: "Bold H and D share one stem, the crossbar reaches into the D's bowl, and three carved gaps ripple on the left of the H and straighten by the D.",
  },
  {
    variant: "b",
    name: "B. Monoline in a circle",
    note: "One thin stroke throughout. The H crossbar runs on through the D and out of the circle on the right.",
  },
  {
    variant: "c",
    name: "C. Broken square",
    note: "The frame opens on the left, where rippled lines enter and converge into the H crossbar: complex to clear in one badge.",
  },
  {
    variant: "d",
    name: "D. Flowing ligature",
    note: "H and D share a stem; the D's lower curve sweeps out into a gentle wave that settles into a straight line.",
  },
];

const BACKGROUNDS = ["offwhite", "lavender-tint"] as const;

function Panel({ bg, label, children }: { bg: (typeof BACKGROUNDS)[number]; label: string; children: React.ReactNode }) {
  return (
    <div className={cn("border border-lavender-light p-6 sm:p-8", bg === "offwhite" ? "bg-offwhite" : "bg-lavender-tint")}>
      <p className="mb-5 text-xs font-medium tracking-wide text-slate">{label}</p>
      {children}
    </div>
  );
}

export default function MonogramLabPage() {
  return (
    <div className="page-wrap py-16 sm:py-20">
      <p className="eyebrow text-purple">Temporary lab</p>
      <h1 className="mt-4 text-h2 text-charcoal">Compact HD monograms</h1>
      <p className="mt-4 max-w-3xl text-slate">
        Four options at 32px (header and favicon), 64px, and 256px, plus each horizontal lockup, on offwhite and
        lavender tint. Line elements ripple once on load; hover a mark to replay. The live header is unchanged.
      </p>

      <div className="mt-14 space-y-20">
        {OPTIONS.map(({ variant, name, note }) => (
          <section key={variant} aria-labelledby={`option-${variant}`}>
            <h2 id={`option-${variant}`} className="text-h3 text-charcoal">
              {name}
            </h2>
            <p className="mt-2 max-w-3xl text-slate">{note}</p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {BACKGROUNDS.map((bg) => (
                <Panel key={bg} bg={bg} label={`${bg}: 32px, 64px, 256px`}>
                  <div className="flex flex-wrap items-end gap-8">
                    <MonogramMark variant={variant} size={32} />
                    <MonogramMark variant={variant} size={64} />
                    <MonogramMark variant={variant} size={256} />
                  </div>
                </Panel>
              ))}
            </div>

            <div className="mt-4 grid gap-4">
              {BACKGROUNDS.map((bg) => (
                <Panel key={bg} bg={bg} label={`${bg}: lockup at 40px (header) and 96px`}>
                  <div className="flex flex-col items-start gap-8 overflow-x-auto pb-2">
                    <MonogramLockup variant={variant} height={40} href="/lab/monograms" />
                    <MonogramLockup variant={variant} height={96} href="/lab/monograms" />
                  </div>
                </Panel>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
