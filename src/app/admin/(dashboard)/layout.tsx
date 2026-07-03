import { Sidebar } from "@/components/admin/Sidebar";
import { getUnreadLeadsCount } from "@/lib/admin-data";
import { createClient } from "@/lib/supabase/server";
import { getServerLocale } from "@/lib/i18n/server";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const [{ data: userData }, unreadCount, locale] = await Promise.all([
    supabase.auth.getUser(),
    getUnreadLeadsCount(),
    getServerLocale(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-ink lg:flex-row">
      <Sidebar unreadCount={unreadCount} email={userData.user?.email ?? ""} locale={locale} />
      <main className="relative flex-1 px-5 py-8 lg:px-10 lg:py-10">
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="drift-slow absolute -left-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-brand/[0.08] blur-[110px]" />
          <div
            className="drift-slow absolute -right-40 top-1/3 h-[30rem] w-[30rem] rounded-full bg-brand/[0.05] blur-[130px]"
            style={{ animationDelay: "4s" }}
          />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
        </div>
        <div className="relative mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
