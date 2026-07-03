"use client";

import { useTransition } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

export function SortButtons({
  onUp,
  onDown,
  disableUp,
  disableDown,
}: {
  onUp: () => Promise<void>;
  onDown: () => Promise<void>;
  disableUp?: boolean;
  disableDown?: boolean;
}) {
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex flex-col">
      <button
        type="button"
        disabled={disableUp || isPending}
        onClick={() => startTransition(() => onUp())}
        className="flex h-5 w-6 items-center justify-center text-white/50 hover:text-brand disabled:opacity-20"
        aria-label="Пересунути вище"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
      <button
        type="button"
        disabled={disableDown || isPending}
        onClick={() => startTransition(() => onDown())}
        className="flex h-5 w-6 items-center justify-center text-white/50 hover:text-brand disabled:opacity-20"
        aria-label="Пересунути нижче"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
    </div>
  );
}
