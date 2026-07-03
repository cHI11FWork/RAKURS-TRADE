import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "RAKURS TRADE — Інженерні рішення для енергозабезпечення та блискавозахисту",
  description:
    "Проєктуємо, постачаємо та впроваджуємо комплексні інженерні рішення для промисловості, телекомунікаційної галузі, паливно-енергетичного сектору, об'єктів критичної інфраструктури та Defense & Security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${inter.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-white font-body">{children}</body>
    </html>
  );
}
