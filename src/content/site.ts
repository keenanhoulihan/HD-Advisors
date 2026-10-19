import data from "../../content/site.json";
import { mottos } from "./mottos";

/*
 * Name and tagline are the brand and stay in code. The description, hero
 * sentence, contact details, and closing CTA live in content/site.json so
 * Kate can edit them in Tina.
 */
export const site = {
  name: "High Definition Advisors",
  tagline: mottos.primary,
  description: data.description,
  positioning: data.positioning,
  contact: data.contact,
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/contact", label: "Contact" },
] as const;

export const cta = data.cta;
export type SiteContent = typeof data;
