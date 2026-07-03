"use client";

import { useTransition } from "react";
import { Eye, EyeOff } from "lucide-react";

export function VisibilityToggle({
  isVisible,
  action,
}: {
  isVisible: boolean;
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form
      action={(formData) => startTransition(() => action(formData))}
    >
      <button
        type="submit"
        disabled={isPending}
        title={isVisible ? "Приховати з сайту" : "Показати на сайті"}
        className={`flex h-8 w-8 items-center justify-center rounded-lg border transition-colors disabled:opacity-50 ${
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
