import type { Metadata } from "next";
import { intro } from "@/content/partners";
import { PartnersView } from "@/views/PartnersView";
import partners from "../../../content/pages/partners.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: intro.label,
    description: intro.intro,
  };
}

export default function PartnerProjectsPage() {
  return <PartnersView data={{ partners }} />;
}
