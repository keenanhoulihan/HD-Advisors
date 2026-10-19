import about from "../../content/about.json";
import approach from "../../content/approach.json";
import home from "../../content/home.json";

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

/*
 * The two motto statements on each page are edited per page in Tina (the
 * "mottos" field in content/<page>.json). Each page uses different mottos.
 */

export const pageMottos = {
  home: home.mottos,
  about: about.mottos,
  approach: approach.mottos,
};
