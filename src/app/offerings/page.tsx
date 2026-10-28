import type { Metadata } from "next";
import { availableOfferings, offeringsIntro } from "@/content/offerings";
import { OfferingsView } from "@/views/OfferingsView";
import offerings from "../../../content/pages/offerings.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `${offeringsIntro.title}, ${offeringsIntro.season}`,
    description: `Consulting offerings from Kate Hibbs Davis: ${availableOfferings.map((offering) => offering.title).join("; ")}.`,
  };
}

export default function OfferingsPage() {
  return <OfferingsView data={{ offerings }} />;
}
