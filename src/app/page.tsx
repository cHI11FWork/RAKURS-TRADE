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

export default async function Home() {
  const [hero, heroFeatures, directions, about, aboutStats, settings] = await Promise.all([
    getHero(),
    getHeroFeatures(),
    getDirections(),
    getAboutContent(),
    getAboutStats(),
    getSiteSettings(),
  ]);

  return (
    <>
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
