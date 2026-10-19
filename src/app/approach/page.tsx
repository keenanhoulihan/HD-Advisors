import type { Metadata } from "next";
import { ApproachView } from "@/views/ApproachView";
import approach from "../../../content/approach.json";
import site from "../../../content/site.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Approach",
    description:
      "Four Lenses, One Roadmap: programs, revenue, administration, and external affairs, brought together in one phased plan for sustainable growth.",
  };
}

export default function ApproachPage() {
  return <ApproachView approach={approach} site={site} />;
}
