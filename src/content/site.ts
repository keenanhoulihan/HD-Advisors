import data from "../../content/settings/site.json";
import { mottos } from "./mottos";

/* Site-wide settings. Copy is edited in TinaCMS (content/settings/site.json). */
export const site = {
  name: data.name,
  tagline: mottos.primary,
  description: data.description,
  positioning: data.positioning,
  contact: data.contact,
  /** Kate turns this on in Tina once endorsements are ready. Off: hidden from the menu and from search engines. */
  showEndorsements: data.showEndorsements,
};

const allNav = [
  { href: "/about", label: "About" },
  { href: "/approach", label: "Approach" },
  { href: "/offerings", label: "Offerings" },
  { href: "/endorsements", label: "Endorsements" },
  { href: "/contact", label: "Contact" },
];

export const nav = allNav.filter((item) => item.href !== "/endorsements" || site.showEndorsements);

export const cta = data.cta;
