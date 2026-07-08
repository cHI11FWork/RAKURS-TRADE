"use client";

import { useTransition } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function SortButtons({
  onUp,
  onDown,
  disableUp,
  disableDown,
  locale = "uk",
}: {
  onUp: () => Promise<void>;
  onDown: () => Promise<void>;
  disableUp?: boolean;
  disableDown?: boolean;
  locale?: Locale;
}) {
  const [isPending, startTransition] = useTransition();
  const dict = dictionaries[locale].admin.sortButtons;

  return (
    <div className="flex flex-col">
      <button
        type="button"
        disabled={disableUp || isPending}
        onClick={() => startTransition(() => onUp())}
        className="admin-icon-btn flex h-5 w-6 items-center justify-center text-white/50 hover:text-brand disabled:opacity-20"
        aria-label={dict.up}
      >
        <ChevronUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        disabled={disableDown || isPending}
        onClick={() => startTransition(() => onDown())}
        className="admin-icon-btn flex h-5 w-6 items-center justify-center text-white/50 hover:text-brand disabled:opacity-20"
        aria-label={dict.down}
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}
