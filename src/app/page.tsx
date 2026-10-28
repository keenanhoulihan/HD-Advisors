import type { Metadata } from "next";
import { site } from "@/content/site";
import { HomeView } from "@/views/HomeView";
import approach from "../../content/pages/approach.json";
import home from "../../content/pages/home.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: `${site.name} | ${site.tagline}` },
    description: site.description,
  };
}

export default function HomePage() {
  return <HomeView data={{ home, approach }} />;
}
