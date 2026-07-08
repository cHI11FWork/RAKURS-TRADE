"use client";

import { useFormStatus } from "react-dom";

export function ConfirmSubmitButton({
  label,
  confirmText,
  className,
}: {
  label: React.ReactNode;
  confirmText: string;
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(e) => {
        if (!confirm(confirmText)) e.preventDefault();
      }}
      className={`admin-icon-btn ${
        className ??
        "inline-flex items-center gap-1.5 rounded-none border border-red-500/30 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-400 hover:bg-red-500/10 disabled:opacity-50"
      }`}
    >
      {pending ? "..." : label}
    </button>
  );
}
