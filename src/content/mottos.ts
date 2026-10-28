import data from "../../content/settings/mottos.json";

/* Brand mottos. Copy is edited in TinaCMS (content/settings/mottos.json). */
export const mottos = data;

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
  offerings: [statement(mottos.design)],
} as const;
