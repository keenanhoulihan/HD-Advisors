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
  intro: "Read left to right, her career looks a lot like the work: complex at the start, clearer with every step.",
};

/** Earliest first, so the line stacks calm from organizing roots to the most recent role. */
export const career = [
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
  },
  {
    role: "Major Gifts Officer",
    organization: "Smithsonian Tropical Research Institute",
    location: "Washington DC, Panama, and Chicago",
    years: "2017 to 2024",
    line: "Over $16 million secured across two capital campaigns for tropical science.",
  },
  {
    role: "Fulbright Specialist, Fundraising and NGO Organizational Management",
    organization: "Fulbright Colombia",
    location: "Bogotá",
    years: "2020 to 2023",
    line: "Pro bono fundraising strategy, revenue design, staff training, and a proposed structural redesign for Corporación Manos Visibles.",
  },
  {
    role: "Director of External Affairs",
    organization: "Griffin Museum of Science and Industry",
    location: "Chicago",
    years: "2024 to 2026",
    line: "Led external affairs for the Chicago museum.",
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

export const lensProofIntro = {
  label: "Four lenses, lived",
  title: "Her experience spans all four lenses.",
  intro: "The four lenses are not theory. Kate has done the work in each one.",
};

/** Same order as the lenses in src/content/approach.ts. */
export const lensProof = [
  {
    lens: "Programs",
    where: "Major Gifts Officer, Smithsonian Tropical Research Institute",
    line: "Integrated program development with revenue and institution-building, much of it supporting the careers of emerging tropical scientists from tropical nations.",
  },
  {
    lens: "Revenue",
    where: "League of Conservation Voters and Smithsonian Tropical Research Institute",
    line: "From development partnerships at LCV to over $16 million across two capital campaigns and hundreds of new donors at STRI.",
  },
  {
    lens: "Administration",
    where: "Fulbright Specialist, Fulbright Colombia",
    line: "Trained staff and proposed a structural redesign of Corporación Manos Visibles.",
  },
  {
    lens: "External Affairs",
    where: "Director of External Affairs, Griffin Museum of Science and Industry",
    line: "Led the museum's external affairs in Chicago.",
  },
];

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
