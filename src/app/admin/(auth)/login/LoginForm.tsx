"use client";

import { Loader2 } from "lucide-react";
import { inputClass } from "@/components/admin/Field";
import { Logo } from "@/components/site/Logo";
import { LoginPhotoBackdrop } from "@/components/admin/login/LoginPhotoBackdrop";
import { useLoginForm } from "@/components/admin/login/useLoginForm";

export function LoginForm() {
  const { dict, email, setEmail, password, setPassword, error, loading, handleSubmit } = useLoginForm();

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink px-4 font-mono">
      <LoginPhotoBackdrop />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="terminal-scan-beam pointer-events-none absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-brand/10 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,var(--color-ink)_100%)]" />

      <form
        onSubmit={handleSubmit}
        className="login-card-in relative z-10 w-full max-w-sm space-y-4 border border-brand/30 bg-black/70 p-8 shadow-[0_0_50px_-10px_rgba(245,179,1,0.15)] backdrop-blur-sm"
      >
        <div className="mb-2 flex justify-center">
          <Logo />
        </div>
        <h1 className="terminal-title-reveal overflow-hidden whitespace-nowrap text-center font-heading text-lg font-bold text-brand">
          {dict.admin.login.title}
          <span className="terminal-cursor">_</span>
        </h1>
        <p
          className="overflow-hidden text-center text-sm text-white/50"
          style={{ animation: "terminal-reveal 0.9s steps(30, end) 0.3s both" }}
        >
          {dict.admin.login.subtitle}
        </p>

        <input
          type="email"
          required
          placeholder={dict.admin.login.emailPlaceholder}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ animation: "terminal-field-in 0.4s ease-out 0.5s both" }}
          className={`${inputClass} border-brand/20 bg-white/5 transition-shadow focus:shadow-[0_0_0_3px_rgba(245,179,1,0.15)]`}
          autoComplete="username"
        />
        <input
          type="password"
          required
          placeholder={dict.admin.login.passwordPlaceholder}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ animation: "terminal-field-in 0.4s ease-out 0.65s both" }}
          className={`${inputClass} border-brand/20 bg-white/5 transition-shadow focus:shadow-[0_0_0_3px_rgba(245,179,1,0.15)]`}
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          style={{ animation: "terminal-field-in 0.4s ease-out 0.8s both" }}
          className="btn-shine flex w-full items-center justify-center gap-2 rounded-none bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wide text-ink transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {dict.admin.login.submit}
        </button>
      </form>
    </div>
  );
}
