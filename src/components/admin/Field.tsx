export function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-white/60">
        {label}
      </span>
      {children}
      {hint && <span className="mt-1 block text-xs text-white/35">{hint}</span>}
    </label>
  );
}

export const inputClass =
  "w-full rounded-none border border-ink-border bg-ink-soft px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none focus:border-brand";
