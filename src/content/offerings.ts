import data from "../../content/pages/offerings.json";

/* Consulting Offerings copy. Edited in TinaCMS (content/pages/offerings.json). */
export const offeringsIntro = data.intro;

export const { available: availableIntro, comingSoon: comingSoonIntro } = data;

export const availableOfferings = data.offerings.filter((offering) => offering.availableNow);
export const comingSoonOfferings = data.offerings.filter((offering) => !offering.availableNow);
