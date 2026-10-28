import data from "../../content/pages/about.json";

/*
 * Kate's background, edited in TinaCMS (content/pages/about.json). Facts
 * only, from CLAUDE.md "Kate's background": never invent numbers, clients,
 * or results.
 */
export const {
  intro: aboutIntro,
  founder,
  competenciesIntro,
  competencies,
  resume,
  workedAt,
  philosophyIntro,
  philosophy,
} = data;

export type MapPin = (typeof resume.places.pins)[number];
export type TimelineEntry = (typeof resume.timeline.entries)[number];
