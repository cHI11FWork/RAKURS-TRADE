"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { inputClass } from "@/components/admin/Field";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function LoginForm() {
  const router = useRouter();
  const { dict } = useLocale();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(dict.admin.login.invalidCreds);
      setLoading(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative z-10 w-full max-w-sm space-y-4 border border-ink-border bg-ink-card/80 p-8 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)] backdrop-blur-sm"
    >
      <div className="mb-2 flex justify-center">
        <div className="logo-glow-pulse flex h-12 w-12 items-center justify-center rounded-none bg-brand/15 ring-1 ring-brand/30">
          <Lock className="h-5 w-5 text-brand" />
        </div>
      </div>
      <h1 className="text-center font-heading text-lg font-bold text-white">{dict.admin.login.title}</h1>
      <p className="text-center text-sm text-white/50">{dict.admin.login.subtitle}</p>

      <input
        type="email"
        required
        placeholder={dict.admin.login.emailPlaceholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className={inputClass}
        autoComplete="username"
      />
      <input
        type="password"
        required
        placeholder={dict.admin.login.passwordPlaceholder}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={inputClass}
        autoComplete="current-password"
      />

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={loading}
        className="flex w-full items-center justify-center gap-2 rounded-none bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {dict.admin.login.submit}
      </button>
    </form>
  );
}
