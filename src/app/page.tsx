import type { Metadata } from "next";
import { site } from "@/content/site";
import { HomeView } from "@/views/HomeView";
import home from "../../content/home.json";
import siteContent from "../../content/site.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: `${site.name} | ${site.tagline}` },
    description: site.description,
  };
}

export default function HomePage() {
  return <HomeView home={home} site={siteContent} />;
}
