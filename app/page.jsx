import HomeHero from "@/components/landing/HomeHero";
import AboutSection from "@/components/landing/AboutSection";
import Services from "@/components/landing/Services";
import Testimony from "@/components/landing/Testimony";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-[#f8f5ef]">
      <div />

      {/* HERO */}
      <section id="home">
        <HomeHero />
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 bg-white">
        <AboutSection />
      </section>

      {/* SERVICES / FEATURES */}
      <section id="services" className="py-24 bg-sky-50">
        <Services />
      </section>

      {/* TESTIMONY */}
      <section id="testimony" className="py-24 bg-white">
        <Testimony />
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-sky-600 text-white">
        <h3 className="text-3xl font-semibold mb-4 text-white">
          Siap Mulai Belajar?
        </h3>
        <p className="text-sky-100 mb-8 max-w-xl mx-auto">
          Daftar gratis dan mulai perjalanan belajarmu hari ini bersama
          platform pembelajaran modern untuk mahasiswa.
        </p>
        <Link
          href="/auth/register"
          className="inline-block px-8 py-3 rounded-xl bg-primary text-white hover:bg-sky-300 transition"
        >
          Daftar Gratis Sekarang
        </Link>

      </section>
    </main>
  );
}
