import HeroCarousel from "@/components/HeroCarousel";
import AboutSection from "@/components/AboutSection";
import VisionMission from "@/components/VisionMission";
import Gallery from "@/components/Gallery";
import Services from "@/components/Services";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      {/* Spacer untuk sticky header */}
      <div className="h-[72px]" />

      <section id="home">
        <HeroCarousel />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="vision">
        <VisionMission />
      </section>

      <section id="gallery">
        <Gallery />
      </section>

      <section id="services">
        <Services />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </main>
  );
}
