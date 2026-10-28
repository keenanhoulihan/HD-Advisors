import type { Metadata } from "next";
import { ContactView } from "@/views/ContactView";
import contact from "../../../content/pages/contact.json";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Contact",
    description: "Start a conversation with High Definition Advisors about clarity for your organization's growth.",
  };
}

export default function ContactPage() {
  return <ContactView data={{ contact }} />;
}
