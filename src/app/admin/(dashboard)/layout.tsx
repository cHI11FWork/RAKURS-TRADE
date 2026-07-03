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
      <main className="flex-1 px-5 py-8 lg:px-10 lg:py-10">
        <div className="mx-auto max-w-4xl">{children}</div>
      </main>
    </div>
  );
}
