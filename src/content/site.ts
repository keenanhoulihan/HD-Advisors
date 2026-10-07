export const site = {
  name: "High Definition Advisors",
  tagline: "Clarity for Complex Growth",
  description:
    "High Definition Advisors helps mission-driven organizations move past uncertain phases of growth into real clarity, with one actionable roadmap built for sustainability.",
  positioning:
    "We help mission-driven organizations move past the fuzzy, uncertain phases of growth and into real clarity, with one roadmap built for the long haul.",
  contact: {
    email: "[email]",
    phone: "[phone]",
    website: "[website]",
  },
} as const;

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

export const nav = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;

export const cta = {
  label: mottos.longHaul,
  title: mottos.scaling,
  body: "Every engagement starts with listening. Tell us where things feel fuzzy, and we will take it from there.",
  button: "Start a conversation",
} as const;
