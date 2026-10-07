/** Hidden from people; bots that fill every field reveal themselves here. */
export const HONEYPOT_FIELD = "referral_code";

export type ContactField = "name" | "email" | "organization" | "message" | "timeline" | "budget";

export type ContactState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<ContactField, string[]>>;
  /** Echoed back on error so the form keeps what the visitor typed. */
  values?: Partial<Record<ContactField, string>>;
};
