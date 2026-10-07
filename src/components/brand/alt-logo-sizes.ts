/*
 * Sizing for the alternate logos, in em of the "High Definition" size. Kept
 * out of AltLogo.tsx (a client module) so server components can read numbers.
 */
import type { AltLogoVariant } from "./AltLogo";

/** "ADVISORS" size relative to "High Definition". */
export const ADVISORS_EM = 0.48;

/** Total lockup height, used to size a logo from its `height` prop. */
export const ALT_LOGO_HEIGHT_EM: Record<AltLogoVariant, number> = {
  a: 1 + 0.65 + 0.15 + ADVISORS_EM,
  b: 1 + 0.16 + ADVISORS_EM,
  c: 1 + 0.08 + 0.6 + 0.08 + ADVISORS_EM,
  d: 1 + 0.6 + ADVISORS_EM,
};
