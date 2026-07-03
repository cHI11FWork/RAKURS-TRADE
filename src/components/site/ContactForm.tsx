"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions";
import { useLocale } from "@/lib/i18n/LocaleContext";

const initialState: LeadFormState = { status: "idle", message: "" };

export function ContactForm() {
  const { locale, dict } = useLocale();
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="locale" value={locale} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder={dict.site.contact.namePlaceholder}
          className="rounded-none border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="phone"
          required
          placeholder={dict.site.contact.phonePlaceholder}
          className="rounded-none border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="company"
          placeholder={dict.site.contact.companyPlaceholder}
          className="rounded-none border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="email"
          type="email"
          placeholder={dict.site.contact.emailPlaceholder}
          className="rounded-none border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
      </div>

      <textarea
        name="message"
        required
        rows={4}
        placeholder={dict.site.contact.messagePlaceholder}
        className="w-full resize-none rounded-none border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-none bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? dict.site.contact.sending : dict.site.contact.submit}
        <Send className="h-4 w-4" />
      </button>

      {state.status !== "idle" && (
        <p
          role="status"
          className={`text-sm ${state.status === "success" ? "text-brand" : "text-red-400"}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
