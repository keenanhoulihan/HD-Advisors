"use server";

import { Resend } from "resend";
import { z } from "zod";
import { budgetOptions, contactCopy, timelineOptions } from "@/content/contact";
import { HONEYPOT_FIELD, type ContactField, type ContactState } from "./shared";

const optionalChoice = (options: readonly string[]) =>
  z.string().refine((value) => value === "" || options.includes(value), "Please choose one of the options.");

const contactSchema = z.object({
  name: z.string().trim().min(1, "Please share your name.").max(120, "Please keep your name under 120 characters."),
  email: z.string().trim().max(254).pipe(z.email("Please enter a valid email address.")),
  organization: z.string().trim().max(200, "Please keep this under 200 characters."),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more so we can be helpful.")
    .max(5000, "Please keep your note under 5,000 characters."),
  timeline: optionalChoice(timelineOptions),
  budget: optionalChoice(budgetOptions),
});

const FIELDS: ContactField[] = ["name", "email", "organization", "message", "timeline", "budget"];

export async function sendContact(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const read = (key: string) => {
    const value = formData.get(key);
    return typeof value === "string" ? value : "";
  };

  // Report success to bots so they move on without retrying.
  if (read(HONEYPOT_FIELD)) return { status: "success" };

  const values = Object.fromEntries(FIELDS.map((field) => [field, read(field)])) as Record<ContactField, string>;
  const parsed = contactSchema.safeParse(values);
  if (!parsed.success) {
    return {
      status: "error",
      message: contactCopy.invalid,
      errors: z.flattenError(parsed.error).fieldErrors,
      values,
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("[contact] RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
    return { status: "error", message: contactCopy.unavailable, values };
  }

  const { name, email, organization, message, timeline, budget } = parsed.data;
  const subject = `New inquiry from ${name}${organization ? `, ${organization}` : ""}`.replace(/\s+/g, " ");

  const { error } = await new Resend(apiKey).emails.send({
    from: process.env.CONTACT_FROM_EMAIL ?? "HD Advisors website <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject,
    text: [
      `Name: ${name}`,
      `Email: ${email}`,
      `Organization: ${organization || "Not provided"}`,
      `Timeline: ${timeline || "Not provided"}`,
      `Budget: ${budget || "Not provided"}`,
      "",
      "What's going on:",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("[contact] Resend failed", error);
    return { status: "error", message: contactCopy.unavailable, values };
  }

  return { status: "success" };
}
