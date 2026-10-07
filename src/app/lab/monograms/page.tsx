import type { Metadata } from "next";
import { MonogramLockup, MonogramMark, type MonogramVariant } from "@/components/brand/Monogram";
import { cn } from "@/lib/cn";

/*
 * Temporary comparison page for the monogram options. Not linked from the
 * site and not indexed. Delete once a monogram is chosen.
 */

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Monogram lab", robots: { index: false, follow: false } };
}

const OPTIONS: Array<{ variant: MonogramVariant; name: string; note: string }> = [
  { variant: "b", name: "B. Baseline", note: "Monoline HD in a circle; the crossbar runs on through the D and out of the circle." },
  { variant: "b1", name: "B1. Pill frame", note: "The same monoline HD in a tall pill. The crossbar continues as a hairline and breaks out on the right." },
  { variant: "b2", name: "B2. Loop into line", note: "The D's bowl runs past its stem into one loop that unwinds into a long hairline, tapering as one continuous stroke." },
  { variant: "b3", name: "B3. Contrast stroke", note: "Heavy verticals; the bowl and crossbar taper to hairlines, like an engraved letter. Thin circle." },
  { variant: "b4", name: "B4. Rising flourish", note: "Hairlines rise from the H, converge to one fine point, and curve down into the D." },
  { variant: "b5", name: "B5. Lead-in lines", note: "No frame. Three softly rippled hairlines converge into the crossbar of an italic, high-contrast HD with a shared stem." },
  { variant: "b6", name: "B6. Converging rays", note: "Fine lines of varying length point in from the left and resolve at the H, like light converging." },
];

const BACKGROUNDS = ["offwhite", "lavender-tint"] as const;
type Bg = (typeof BACKGROUNDS)[number];

const bgClass = (bg: Bg) => (bg === "offwhite" ? "bg-offwhite" : "bg-lavender-tint");

function Panel({ bg, label, children }: { bg: Bg; label: string; children: React.ReactNode }) {
  return (
    <div className={cn("border border-lavender-light p-6 sm:p-8", bgClass(bg))}>
      <p className="mb-6 text-xs font-medium tracking-wide text-slate">{label}</p>
      {children}
    </div>
  );
}

/** All seven side by side at one size. */
function SizeRow({ bg, size }: { bg: Bg; size: number }) {
  return (
    <Panel bg={bg} label={`${bg}: ${size}px${size <= 40 ? " (simplified drawing)" : ""}`}>
      <ul className={cn("grid gap-6", size >= 256 ? "sm:grid-cols-2 xl:grid-cols-3" : "grid-cols-4 sm:grid-cols-7")}>
        {OPTIONS.map(({ variant }) => (
          <li key={variant} className="flex flex-col items-center gap-3">
            <MonogramMark variant={variant} size={size} />
            <span className="text-xs font-medium text-slate">{variant.toUpperCase()}</span>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

export default function MonogramLabPage() {
  return (
    <div className="page-wrap py-16 sm:py-20">
      <p className="eyebrow text-purple">Temporary lab</p>
      <h1 className="mt-4 text-h2 text-charcoal">HD monogram: B and refinements</h1>
      <p className="mt-4 max-w-3xl text-slate">
        B (the baseline) and six editorial variations, side by side at 32px, 64px, and 256px, then each with its
        horizontal and stacked lockups, on offwhite and lavender tint. Marks at 40px and below use a simplified drawing
        so hairlines never disappear. Line elements ripple once on load; hover to replay. The live header is unchanged.
      </p>

      <h2 className="mt-14 text-h3 text-charcoal">Side by side</h2>
      <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-slate sm:grid-cols-2">
        {OPTIONS.map(({ variant, name, note }) => (
          <li key={variant}>
            <span className="font-medium text-charcoal">{name}</span> {note}
          </li>
        ))}
      </ul>
      <div className="mt-8 space-y-4">
        {[32, 64, 256].map((size) =>
          BACKGROUNDS.map((bg) => <SizeRow key={`${size}-${bg}`} bg={bg} size={size} />),
        )}
      </div>

      <h2 className="mt-20 text-h3 text-charcoal">Lockups</h2>
      <div className="mt-8 space-y-16">
        {OPTIONS.map(({ variant, name }) => (
          <section key={variant} aria-labelledby={`lockup-${variant}`}>
            <h3 id={`lockup-${variant}`} className="font-medium text-charcoal">
              {name}
            </h3>
            <div className="mt-4 grid gap-4 lg:grid-cols-2">
              {BACKGROUNDS.map((bg) => (
                <Panel key={bg} bg={bg} label={`${bg}: horizontal at 40px and 80px, stacked at 160px`}>
                  <div className="flex flex-col items-start gap-8 overflow-x-auto pb-2">
                    <MonogramLockup variant={variant} height={40} href="/lab/monograms" />
                    <MonogramLockup variant={variant} height={80} href="/lab/monograms" />
                    <div className="self-center">
                      <MonogramLockup variant={variant} layout="stacked" height={160} href="/lab/monograms" />
                    </div>
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
