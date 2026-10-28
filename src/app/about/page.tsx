import type { Metadata } from "next";
import { founder } from "@/content/about";
import { AboutView } from "@/views/AboutView";
import about from "../../../content/pages/about.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Kate",
    description: `${founder.name}, ${founder.role}. More than 15 years of organizational growth, philanthropic strategy, and external relations, from grassroots organizing to the Smithsonian Tropical Research Institute, Fulbright Colombia, and the Griffin Museum of Science and Industry.`,
  };
}

export default function AboutPage() {
  return <AboutView data={{ about }} />;
}
