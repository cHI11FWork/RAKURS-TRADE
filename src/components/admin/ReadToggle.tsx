"use client";

import { useTransition } from "react";
import { CheckCircle2, Circle } from "lucide-react";

export function ReadToggle({
  isRead,
  action,
}: {
  isRead: boolean;
  action: (formData: FormData) => Promise<void>;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <form action={(formData) => startTransition(() => action(formData))}>
      <button
        type="submit"
        disabled={isPending}
        title={isRead ? "Позначити як непрочитане" : "Позначити як прочитане"}
        className={`flex h-8 w-8 items-center justify-center rounded-none border transition-colors disabled:opacity-50 ${
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
