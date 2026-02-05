"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function HomeHero() {
  const router = useRouter();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 to-amber-50">
      <div className="max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-12 items-center">
        {/* LEFT - TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block mb-4 px-4 py-1 text-sm rounded-full bg-sky-100 text-sky-700">
            Platform E-Learning Modern
          </span>

          <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight text-gray-900">
            Belajar Skill Digital <br />
            <span className="text-sky-600">Lebih Terarah & Efektif</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Tingkatkan kemampuanmu melalui course terstruktur, lesson berbasis
            video, dan progres belajar yang jelas. Cocok untuk mahasiswa &
            pemula yang ingin naik level.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => router.push("/auth/register")}
              className="bg-sky-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-sky-700 transition"
            >
              Mulai Belajar Gratis
            </button>

            <button
              onClick={() => router.push("/courses")}
              className="px-8 py-3 rounded-xl border border-sky-600 text-sky-600 font-medium hover:bg-sky-50 transition"
            >
              Lihat Course
            </button>
          </div>

          {/* TRUST */}
          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <div>🎓 Cocok untuk Mahasiswa</div>
            <div>📈 Progress Terpantau</div>
            <div>💡 Materi Praktis</div>
          </div>
        </motion.div>

        {/* RIGHT - ILLUSTRATION */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full h-[360px] md:h-[440px]"
        >
          {/* GANTI GAMBAR NANTI */}
          <Image
            src="/assets/front.png"
            alt="E-learning illustration"
            fill
            className="object-contain"
            priority
          />
        </motion.div>
      </div>

      {/* DECORATIVE BLUR */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 -right-24 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl" />
    </section>
  );
}
