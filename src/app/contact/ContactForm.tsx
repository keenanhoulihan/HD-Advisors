"use client";

import { useActionState } from "react";
import { ResolutionLine } from "@/components/ResolutionLine";
import { budgetOptions, contactCopy, timelineOptions } from "@/content/contact";
import { cn } from "@/lib/cn";
import { sendContact } from "./actions";
import { HONEYPOT_FIELD, type ContactField, type ContactState } from "./shared";

const initialState: ContactState = { status: "idle" };

const controlClass =
  "mt-2 block w-full rounded-sm border border-lavender bg-white px-4 py-3 text-charcoal transition-colors focus:border-purple aria-invalid:border-purple";

export function ContactForm() {
  const [state, formAction, pending] = useActionState(sendContact, initialState);

  if (state.status === "success") {
    return (
      <div role="status" className="bg-aqua-light p-8 sm:p-12">
        <ResolutionLine variant="rule" />
        <h2 className="mt-6 text-h3 text-charcoal">{contactCopy.successTitle}</h2>
        <p className="mt-4 text-slate">{contactCopy.successBody}</p>
      </div>
    );
  }

  const field = (name: ContactField) => {
    const error = state.errors?.[name]?.[0];
    return {
      id: name,
      name,
      defaultValue: state.values?.[name] ?? "",
      "aria-invalid": error ? true : undefined,
      "aria-describedby": error ? `${name}-error` : undefined,
    };
  };

  return (
    <form action={formAction} className="space-y-7">
      {state.status === "error" && state.message && (
        <p role="alert" className="border-l-[1.5px] border-purple bg-lavender-tint px-5 py-4 text-charcoal">
          {state.message}
        </p>
      )}

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Name" htmlFor="name" error={state.errors?.name?.[0]}>
          <input {...field("name")} type="text" autoComplete="name" required className={controlClass} />
        </Field>
        <Field label="Email" htmlFor="email" error={state.errors?.email?.[0]}>
          <input {...field("email")} type="email" autoComplete="email" required className={controlClass} />
        </Field>
      </div>

      <Field label="Organization" htmlFor="organization" optional error={state.errors?.organization?.[0]}>
        <input {...field("organization")} type="text" autoComplete="organization" className={controlClass} />
      </Field>

      <Field label="What's going on?" htmlFor="message" error={state.errors?.message?.[0]}>
        <textarea {...field("message")} rows={6} required className={cn(controlClass, "resize-y")} />
      </Field>

      <div className="grid gap-7 sm:grid-cols-2">
        <Field label="Timeline" htmlFor="timeline" optional error={state.errors?.timeline?.[0]}>
          <select {...field("timeline")} className={controlClass}>
            <option value="">Select a timeline</option>
            {timelineOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
        <Field label="Budget" htmlFor="budget" optional error={state.errors?.budget?.[0]}>
          <select {...field("budget")} className={controlClass}>
            <option value="">Select a range</option>
            {budgetOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </Field>
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT_FIELD}>Leave this field empty</label>
        <input id={HONEYPOT_FIELD} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center gap-3 rounded-sm bg-purple px-7 py-3.5 text-base font-medium text-white transition-colors hover:bg-charcoal disabled:cursor-wait disabled:opacity-70"
      >
        {pending ? "Sending..." : "Send message"}
        {!pending && <span aria-hidden="true">&rarr;</span>}
      </button>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  optional,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  optional?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="font-medium text-charcoal">
        {label}
        {optional && <span className="ml-2 text-sm font-normal text-slate">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-2 text-sm font-medium text-purple">
          {error}
        </p>
      )}
    </div>
  );
}
