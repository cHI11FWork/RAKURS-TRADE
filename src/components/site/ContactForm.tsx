"use client";

import { useActionState } from "react";
import { Send } from "lucide-react";
import { submitLead, type LeadFormState } from "@/app/actions";

const initialState: LeadFormState = { status: "idle", message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitLead, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          name="name"
          required
          placeholder="Ім'я*"
          className="rounded-lg border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="phone"
          required
          placeholder="Телефон*"
          className="rounded-lg border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="company"
          placeholder="Компанія (необов'язково)"
          className="rounded-lg border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
        <input
          name="email"
          type="email"
          placeholder="Email (необов'язково)"
          className="rounded-lg border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
        />
      </div>

      <textarea
        name="message"
        required
        rows={4}
        placeholder="Короткий опис задачі*"
        className="w-full resize-none rounded-lg border border-ink-border bg-ink-soft px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-brand"
      />

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {pending ? "Надсилаємо..." : "Надіслати запит"}
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
