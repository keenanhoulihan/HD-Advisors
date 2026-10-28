import type { Metadata } from "next";
import { clients, endorsements, endorsementsPage } from "@/content/endorsements";
import { site } from "@/content/site";
import { EndorsementsView } from "@/views/EndorsementsView";

/*
 * Endorsements + Clients. Kate is still gathering these, so the page ships
 * with a "coming soon" state and no sample content. It stays out of the menu
 * and out of search engines until "Show the Endorsements page in the menu"
 * is turned on in Tina (Site Settings).
 */

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: endorsementsPage.intro.label,
    description: endorsementsPage.intro.intro,
    robots: site.showEndorsements ? undefined : { index: false, follow: false },
  };
}

export default function EndorsementsPage() {
  return (
    <EndorsementsView data={{ endorsementsPage }} endorsements={endorsements} clients={clients} />
  );
}
