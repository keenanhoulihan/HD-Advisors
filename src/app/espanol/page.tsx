import type { Metadata } from "next";
import { EspanolView } from "@/views/EspanolView";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Español",
    // A placeholder until the Spanish site exists, so keep it out of search results.
    robots: { index: false, follow: true },
  };
}

export default function EspanolPage() {
  return <EspanolView />;
}
