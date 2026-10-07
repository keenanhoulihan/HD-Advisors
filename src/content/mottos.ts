export const mottos = {
  primary: "Clarity for Complex Growth",
  lenses: "Four Lenses, One Roadmap",
  shift: "From Reactive to Intentional",
  design: "Growing by design, not by opportunity",
  longHaul: "Built for the long haul, not the quick win",
  custom: "Never cookie-cutter",
  secondary: "Clear Strategy. Sustainable Impact.",
  scaling: "Scaling Missions, Sustainably.",
} as const;

/** Adds a period unless the motto already ends with punctuation. */
const statement = (motto: string) => (/[.!?]$/.test(motto) ? motto : `${motto}.`);

/*
 * Motto statements shown between major sections. Each page uses different
 * mottos; check the page's other headings so a motto never repeats on a page.
 */
export const pageMottos = {
  home: [statement(mottos.design), statement(mottos.custom)],
  about: [statement(mottos.longHaul), statement(mottos.secondary)],
  approach: [statement(mottos.shift), statement(mottos.scaling)],
} as const;
