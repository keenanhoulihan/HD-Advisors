import type { Metadata } from "next";
import { AltLogo, type AltLogoVariant } from "@/components/brand/AltLogo";
import { ADVISORS_EM, ALT_LOGO_HEIGHT_EM } from "@/components/brand/alt-logo-sizes";
import { cn } from "@/lib/cn";

/*
 * Temporary comparison page for the alternate header logos. Not linked from
 * the site and not indexed. Delete once a logo is chosen.
 */

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Logo lab", robots: { index: false, follow: false } };
}

const OPTIONS: Array<{ variant: AltLogoVariant; name: string; note: string }> = [
  {
    variant: "a",
    name: "A. Underline resolve",
    note: "Four lines ripple on the left and converge early into the rule ADVISORS sits under.",
  },
  {
    variant: "b",
    name: "B. Lead-in waves",
    note: "A short stack on the left converges into one line pointing into the wordmark, like the business card.",
  },
  {
    variant: "c",
    name: "C. Waves between",
    note: "A thin band of three lines between the rows, resolving into one line by the right edge of the text.",
  },
  {
    variant: "d",
    name: "D. Run-through",
    note: "One resolved line runs through the gap between the rows, with faint lines trailing off to the left.",
  },
];

const SIZES = { desktop: 40, mobile: 30, large: 120 };

const advisorsPx = (variant: AltLogoVariant, height: number) =>
  ((height / ALT_LOGO_HEIGHT_EM[variant]) * ADVISORS_EM).toFixed(1);

function Panel({ bg, label, children }: { bg: "offwhite" | "lavender-tint"; label: string; children: React.ReactNode }) {
  return (
    <div className={cn("border border-lavender-light p-6 sm:p-8", bg === "offwhite" ? "bg-offwhite" : "bg-lavender-tint")}>
      <p className="mb-5 text-xs font-medium tracking-wide text-slate">{label}</p>
      {children}
    </div>
  );
}

/** A stand-in header bar, to judge the logo next to the nav. */
function MockHeader({ variant, height, width }: { variant: AltLogoVariant; height: number; width?: number }) {
  return (
    <div
      className="flex h-20 items-center justify-between gap-4 border-b border-lavender-light px-5"
      style={width ? { width } : undefined}
    >
      <AltLogo variant={variant} height={height} href="/lab/logos" />
      <span className="flex shrink-0 gap-5 text-[0.95rem] font-medium text-charcoal">
        <span>About</span>
        <span>Approach</span>
        <span>Contact</span>
      </span>
    </div>
  );
}

export default function LogoLabPage() {
  return (
    <div className="page-wrap py-16 sm:py-20">
      <p className="eyebrow text-purple">Temporary lab</p>
      <h1 className="mt-4 text-h2 text-charcoal">Alternate header logos</h1>
      <p className="mt-4 max-w-3xl text-slate">
        Four options at header size (40px desktop, 30px mobile) and at 3x, on offwhite and lavender tint. Each ripples
        on load; hover or tab to a logo to replay it. The live header is unchanged.
      </p>

      <div className="mt-14 space-y-20">
        {OPTIONS.map(({ variant, name, note }) => (
          <section key={variant} aria-labelledby={`option-${variant}`}>
            <h2 id={`option-${variant}`} className="text-h3 text-charcoal">
              {name}
            </h2>
            <p className="mt-2 max-w-3xl text-slate">{note}</p>

            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {(["offwhite", "lavender-tint"] as const).map((bg) => (
                <Panel
                  key={bg}
                  bg={bg}
                  label={`${bg}: header size ${SIZES.desktop}px and ${SIZES.mobile}px (ADVISORS ${advisorsPx(variant, SIZES.desktop)}px / ${advisorsPx(variant, SIZES.mobile)}px)`}
                >
                  <div className="flex flex-wrap items-end gap-10">
                    <AltLogo variant={variant} height={SIZES.desktop} href="/lab/logos" />
                    <AltLogo variant={variant} height={SIZES.mobile} href="/lab/logos" />
                  </div>
                </Panel>
              ))}
            </div>

            <div className="mt-4 overflow-x-auto">
              <Panel bg="offwhite" label="In a header: desktop width, then a 360px phone">
                <div className="space-y-6">
                  <MockHeader variant={variant} height={SIZES.desktop} />
                  <MockHeader variant={variant} height={SIZES.mobile} width={360} />
                </div>
              </Panel>
            </div>

            <div className="mt-4 grid gap-4">
              {(["offwhite", "lavender-tint"] as const).map((bg) => (
                <Panel key={bg} bg={bg} label={`${bg}: 3x (${SIZES.large}px)`}>
                  <div className="overflow-x-auto pb-2">
                    <AltLogo variant={variant} height={SIZES.large} href="/lab/logos" />
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
