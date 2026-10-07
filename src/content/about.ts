/*
 * Kate's background. Facts only, from CLAUDE.md "Kate's background": never
 * invent numbers, clients, or results.
 */

export const aboutIntro = {
  label: "Background",
  title: "Strategy built for the organization in front of you.",
  intro:
    "High Definition Advisors was founded on a simple idea: mission-driven organizations deserve strategy that is custom-built, not pulled off a shelf.",
};

export const founder = {
  role: "Founder & Principal",
  name: "Kate Hibbs Davis",
  headshotAlt: "Kate Hibbs Davis, Founder and Principal of High Definition Advisors",
  bio: [
    "Kate Hibbs Davis, known to many as Kate HD, founded High Definition Advisors to help mission-driven organizations find their footing during the most uncertain stretches of growth.",
    "Her career runs from grassroots organizing campaigns to global institutions, across politics, advocacy, the arts, and international development. Her roots are in organizing, as lead organizer with IMPACT in Charlottesville, Virginia.",
    "At the Smithsonian Tropical Research Institute, she led the integration of revenue generation, program development, and institution-building, and secured over $16 million in support across two capital campaigns. As a Fulbright Specialist in Bogotá, she helped Corporación Manos Visibles build a fundraising strategy, diversify its revenue, and rethink its structure. Most recently, she directed external affairs at the Griffin Museum of Science and Industry in Chicago.",
    "That range is her superpower. Kate sees across every part of an organization and turns it into one roadmap built for the long haul. She works in English and Spanish, and studied at William & Mary.",
  ],
  facts: [
    { label: "Languages", value: "English and Spanish" },
    { label: "Education", value: "William & Mary" },
  ],
};

export const careerIntro = {
  label: "Experience",
  title: "From grassroots campaigns to global institutions.",
  intro:
    "Read left to right, her career looks a lot like the work: complex at the start, clearer with every step. The tags show which of the four lenses each role put to work. Together they span all four.",
};

/** Earliest first, so the line stacks calm from organizing roots to the most recent role. */
export const career: Array<{
  role: string;
  organization: string;
  location: string;
  years: string;
  line: string;
  /** Which of the four lenses the role put to work. Facts only. */
  lenses?: string[];
}> = [
  {
    role: "Lead Organizer",
    organization: "IMPACT (Interfaith Movement Promoting Action by Congregations Together)",
    location: "Charlottesville, VA",
    years: "2010 to 2014",
    line: "Grassroots organizing with congregations across Charlottesville.",
  },
  {
    role: "Regional Organizer",
    organization: "National Community Reinvestment Coalition",
    location: "Washington DC",
    years: "2014 to 2015",
    line: "Regional organizing for community reinvestment.",
  },
  {
    role: "Director of Development Partnerships",
    organization: "League of Conservation Voters",
    location: "Washington DC",
    years: "2015 to 2017",
    line: "Development partnerships for environmental advocacy.",
    lenses: ["Revenue"],
  },
  {
    role: "Major Gifts Officer",
    organization: "Smithsonian Tropical Research Institute",
    location: "Washington DC, Panama, and Chicago",
    years: "2017 to 2024",
    line: "Integrated revenue, program development, and institution-building, securing over $16 million across two capital campaigns.",
    lenses: ["Programs", "Revenue"],
  },
  {
    role: "Fulbright Specialist, Fundraising and NGO Organizational Management",
    organization: "Fulbright Colombia",
    location: "Bogotá",
    years: "2020 to 2023",
    line: "Pro bono fundraising strategy, revenue design, staff training, and a proposed structural redesign for Corporación Manos Visibles.",
    lenses: ["Revenue", "Administration"],
  },
  {
    role: "Director of External Affairs",
    organization: "Griffin Museum of Science and Industry",
    location: "Chicago",
    years: "2024 to 2026",
    line: "Led external affairs for the Chicago museum.",
    lenses: ["External Affairs"],
  },
];

export const workedAt = {
  label: "Where she's worked",
  organizations: [
    "IMPACT",
    "National Community Reinvestment Coalition",
    "League of Conservation Voters",
    "Smithsonian Tropical Research Institute",
    "Fulbright Colombia",
    "Griffin Museum of Science and Industry",
  ],
};


export const philosophyIntro = {
  label: "Philosophy",
  title: "How Kate works",
};

export const philosophy = [
  {
    title: "Never cookie-cutter",
    body: "No two organizations grow the same way. Every engagement starts with listening, and every roadmap is a custom-built foundation to scale a mission with purpose and precision.",
  },
  {
    title: "Structure that lasts",
    body: "Quick wins fade. We focus on the structure underneath: the roles, systems, funding, and governance that let an organization keep growing without losing its footing.",
  },
];
