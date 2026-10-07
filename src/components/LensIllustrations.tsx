import { cn } from "@/lib/cn";

/*
 * Thin-line lens illustrations (CLAUDE.md "Four lenses"). Flat, unfilled, one
 * stroke weight matching the resolution line, purple with at most one aqua
 * accent. Each sits on a resolved baseline so they read as one line family.
 */

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  vectorEffect: "non-scaling-stroke",
} as const;

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 160 100"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("text-purple", className)}
      aria-hidden="true"
      focusable="false"
    >
      {children}
      <path d="M4 93H156" {...stroke} />
    </svg>
  );
}

/** Programs: people gathered around a table, working. */
export function ProgramsIllustration({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <circle cx="50" cy="30" r="7" {...stroke} />
      <circle cx="80" cy="26" r="7" {...stroke} />
      <circle cx="110" cy="30" r="7" {...stroke} />
      <path d="M38 57C38 45 62 45 62 57M68 53C68 41 92 41 92 53M98 57C98 45 122 45 122 57" {...stroke} />
      <path d="M30 59H130L142 71H18Z" {...stroke} />
      <path d="M26 71V87M134 71V87" {...stroke} />
      <path d="M68 62H91L94 68H71Z" {...stroke} className="text-aqua" />
    </Frame>
  );
}

/** Revenue: one hand passing something to another. */
export function RevenueIllustration({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      {/* Open hand, palm up, from the left. */}
      <path d="M6 66H34M6 80H34M34 63V83" {...stroke} />
      <path d="M34 66C48 63 62 62 72 65C78 67 77 72 71 72H58M34 80C50 82 64 79 70 73M50 65C52 58 60 57 62 61" {...stroke} />
      {/* Giving hand from the right, thumb and fingers pinching the coin. */}
      <path d="M154 28H124M154 42H124M124 25V45" {...stroke} />
      <path d="M124 28C110 27 100 30 95 35C91 39 90 44 92 48M124 42C115 43 108 43 102 41M106 42C103 47 99 51 93 52M101 33C98 37 97 41 98 44" {...stroke} />
      <circle cx="86" cy="55" r="6" {...stroke} className="text-aqua" />
    </Frame>
  );
}

/** Administration: building blocks assembling into a simple org structure. */
export function AdministrationIllustration({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <rect x="66" y="8" width="28" height="16" rx="1" {...stroke} />
      <path d="M80 24V34M38 34H122M38 34V44M80 34V44M122 34V44" {...stroke} />
      <rect x="24" y="44" width="28" height="16" rx="1" {...stroke} />
      <rect x="66" y="44" width="28" height="16" rx="1" {...stroke} />
      <rect x="108" y="44" width="28" height="16" rx="1" strokeDasharray="3 4" {...stroke} />
      <path d="M122 70V65M118.5 68L122 64.5L125.5 68" {...stroke} />
      <rect x="108" y="73" width="28" height="15" rx="1" {...stroke} className="text-aqua" />
    </Frame>
  );
}

/** External Affairs: a figure speaking to a small group. */
export function ExternalAffairsIllustration({ className }: { className?: string }) {
  return (
    <Frame className={className}>
      <circle cx="34" cy="24" r="7" {...stroke} />
      <path d="M34 31V62M34 62L27 87M34 62L41 87M34 41L48 32M34 41L25 53" {...stroke} />
      <path d="M57 27C61 31 61 37 57 41M64 22C70 29 70 39 64 46" {...stroke} className="text-aqua" />
      <circle cx="96" cy="54" r="6" {...stroke} />
      <circle cx="118" cy="50" r="6" {...stroke} />
      <circle cx="140" cy="54" r="6" {...stroke} />
      <path d="M86 74C86 64 106 64 106 74M108 70C108 60 128 60 128 70M130 74C130 64 150 64 150 74" {...stroke} />
    </Frame>
  );
}

export const lensIllustrations = [
  ProgramsIllustration,
  RevenueIllustration,
  AdministrationIllustration,
  ExternalAffairsIllustration,
];
