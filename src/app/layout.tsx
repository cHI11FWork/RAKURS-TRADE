import type { Metadata } from "next";
import { Inter, Unbounded } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/lib/i18n/LocaleContext";
import { getServerLocale } from "@/lib/i18n/server";
import { dictionaries } from "@/lib/i18n/dictionary";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const unbounded = Unbounded({
  variable: "--font-heading",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale();
  const dict = dictionaries[locale];
  return {
    title: dict.meta.title,
    description: dict.meta.description,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getServerLocale();

  return (
    <html lang={locale} className={`${inter.variable} ${unbounded.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-ink text-white font-body">
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
