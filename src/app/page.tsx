import { Header } from "@/components/site/Header";
import { Hero } from "@/components/site/Hero";
import { Directions } from "@/components/site/Directions";
import { About } from "@/components/site/About";
import { ContactSection } from "@/components/site/ContactSection";
import { Footer } from "@/components/site/Footer";
import {
  getAboutContent,
  getAboutStats,
  getDirections,
  getHero,
  getHeroFeatures,
  getSiteSettings,
} from "@/lib/data";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export default async function Home() {
  const [hero, heroFeatures, directions, about, aboutStats, settings] = await Promise.all([
    getHero(),
    getHeroFeatures(),
    getDirections(),
    getAboutContent(),
    getAboutStats(),
    getSiteSettings(),
  ]);

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/apple-icon`,
    image: `${SITE_URL}/opengraph-image`,
    telephone: settings?.phone || undefined,
    email: settings?.email || undefined,
    address: settings?.address || undefined,
    sameAs: [settings?.telegram_url, settings?.whatsapp_url, settings?.linkedin_url].filter(
      (url): url is string => Boolean(url)
    ),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
      />
      <Header />
      <main className="flex-1">
        <Hero hero={hero} features={heroFeatures} />
        <Directions directions={directions} />
        <About about={about} stats={aboutStats} />
        <ContactSection settings={settings} />
      </main>
      <Footer settings={settings} />
    </>
  );
}
