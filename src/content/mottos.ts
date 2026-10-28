import data from "../../content/settings/mottos.json";

/* Brand mottos. Copy is edited in TinaCMS (content/settings/mottos.json). */
export const mottos = data;

export type MottoKey = keyof typeof data;

/** Adds a period unless the motto already ends with punctuation. */
export const statement = (motto: string | null | undefined) =>
  !motto || /[.!?]$/.test(motto) ? (motto ?? "") : `${motto}.`;

/*
 * Motto statements shown between major sections. Each page uses different
 * mottos; check the page's other headings so a motto never repeats on a page.
 */
export const pageMottos = {
  home: ["design", "custom"],
  about: ["longHaul", "secondary"],
  approach: ["shift", "scaling"],
  offerings: ["design"],
} as const satisfies Record<string, readonly MottoKey[]>;
