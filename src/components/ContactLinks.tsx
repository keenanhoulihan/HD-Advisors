"use client";

import { edit } from "@/lib/tina-live";
import { useSite } from "./SiteLive";

/** Phone as typed in Tina (773.405.0207) to a dialable link: tel:+17734050207. */
const telHref = (phone: string) => {
  const digits = phone.replace(/\D/g, "");
  return `tel:+${digits.length === 10 ? `1${digits}` : digits}`;
};

/** https://www.katehd.com/ shows as katehd.com. */
const displayUrl = (url: string) => url.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

const linkClass = "link-underline inline-block text-charcoal hover:text-purple";

/**
 * Kate's email, phone, and website from Site Settings, as tappable links.
 * Used in the footer ("Get in touch") and on the Contact page. A field left
 * empty or still a [placeholder] shows as plain text.
 */
export function ContactLinks() {
  const { contact } = useSite().site;
  const ready = (value: string | null | undefined): value is string => !!value && !value.startsWith("[");

  return (
    <>
      <li {...edit(contact, "email")}>
        {ready(contact.email) ? (
          <a href={`mailto:${contact.email}`} className={linkClass}>
            {contact.email}
          </a>
        ) : (
          contact.email
        )}
      </li>
      <li {...edit(contact, "phone")}>
        {ready(contact.phone) ? (
          <a href={telHref(contact.phone)} className={linkClass}>
            {contact.phone}
          </a>
        ) : (
          contact.phone
        )}
      </li>
      <li {...edit(contact, "website")}>
        {ready(contact.website) ? (
          <a href={contact.website} className={linkClass}>
            {displayUrl(contact.website)}
          </a>
        ) : (
          contact.website
        )}
      </li>
    </>
  );
}
