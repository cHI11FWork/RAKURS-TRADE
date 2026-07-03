"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useLocale } from "@/lib/i18n/LocaleContext";

export function useLoginForm() {
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

  return { dict, email, setEmail, password, setPassword, error, loading, handleSubmit };
}
