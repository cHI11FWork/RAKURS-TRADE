"use client";

import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";
import type { Locale } from "@/lib/i18n/locale";
import { dictionaries } from "@/lib/i18n/dictionary";

export function VisibilityToggle({
  isVisible,
  action,
  locale = "uk",
}: {
  isVisible: boolean;
  action: (formData: FormData) => Promise<void>;
  locale?: Locale;
}) {
  const [isPending, startTransition] = useTransition();
  const dict = dictionaries[locale].admin.visibilityToggle;

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
    >
      <button
        type="submit"
        disabled={isPending}
        title={isVisible ? dict.hide : dict.show}
        className={`flex h-8 w-8 items-center justify-center rounded-none border transition-colors disabled:opacity-50 ${
          isVisible
            ? "border-brand/30 text-brand hover:bg-brand/10"
            : "border-white/10 text-white/30 hover:bg-white/5"
        }`}
      >
        {isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
      </button>
    </form>
  );
}
