import { LoginForm } from "./LoginForm";
import { LoginBackground } from "@/components/admin/LoginBackground";

export const metadata = { title: "Вхід — RAKURS TRADE" };

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-ink px-4">
      <LoginBackground />
      <LoginForm />
    </div>
  );
}
