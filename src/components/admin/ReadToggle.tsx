"use client";

import { useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";
import type { Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function ReadToggle({
  isRead,
  action,
  locale = "uk",
}: {
  isRead: boolean;
  action: (formData: FormData) => Promise<void>;
  locale?: Locale;
}) {
  const [isPending, startTransition] = useTransition();
  const dict = dictionaries[locale].admin.leads;

  return (
    <form action={(formData) => startTransition(() => action(formData))}>
      <button
        type="submit"
        disabled={isPending}
        title={isRead ? dict.markUnread : dict.markRead}
        className={`admin-icon-btn flex h-8 w-8 items-center justify-center rounded-none border disabled:opacity-50 ${
          isRead
            ? "border-white/10 text-white/30 hover:bg-white/5"
            : "border-brand/30 text-brand hover:bg-brand/10"
        }`}
      >
        {isRead ? <CheckCircle2 className="h-4 w-4" /> : <Circle className="h-4 w-4" />}
      </button>
    </form>
  );
}
