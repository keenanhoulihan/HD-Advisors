import type { Metadata } from "next";
import { founder } from "@/content/about";
import { AboutView } from "@/views/AboutView";
import about from "../../../content/about.json";
import site from "../../../content/site.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About",
    description: `${founder.name}, ${founder.role}. From grassroots organizing to the Smithsonian Tropical Research Institute, Fulbright Colombia, and the Griffin Museum of Science and Industry.`,
  };
}

export default function AboutPage() {
  return <AboutView about={about} site={site} />;
}
