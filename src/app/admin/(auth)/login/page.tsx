import { LoginForm } from "./LoginForm";

export const metadata = { title: "Вхід — RAKURS TRADE" };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-4">
      <LoginForm />
    </div>
  );
}
