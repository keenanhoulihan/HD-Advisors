import raw from "../../content/pages/approach.json";

export type Audience = { name: string; body: string };

/* Tina drops a list from the JSON when every item is deleted, so treat it as optional. */
const data = raw as typeof raw & { audiences?: Audience[] };

/* Approach page copy. Edited in TinaCMS (content/pages/approach.json). */
export const {
  approachIntro,
  lensesIntro,
  lenses,
  integratedPlan,
  roadmapIntro,
  phases,
  audiencesIntro,
  audiences = [],
} = data;
