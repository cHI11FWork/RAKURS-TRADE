"use client";

import { useFormStatus } from "react-dom";
import type { Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function SaveButton({ label, locale = "uk" }: { label?: string; locale?: Locale }) {
  const { pending } = useFormStatus();
  const dict = dictionaries[locale];

  return (
    <button
      type="submit"
      disabled={pending}
      className="btn-shine btn-charge inline-flex items-center gap-2 rounded-none bg-brand px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? dict.admin.common.saving : (label ?? dict.admin.common.save)}
    </button>
  );
}
