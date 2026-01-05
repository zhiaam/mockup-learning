"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// gambar bisa kamu ganti di public/assets/hero1.jpg, hero2.jpg, hero3.jpg
const slides = [
  { src: "/assets/hero1.png", alt: "Aktivitas perusahaan 1" },
  { src: "/assets/hero2.png", alt: "Aktivitas perusahaan 2" },
  { src: "/assets/hero3.png", alt: "Aktivitas perusahaan 3" },
];

const advantages = [
  "Pelayanan Profesional",
  "Jaringan Luas & Terpercaya",
  "Komitmen terhadap Kualitas",
];

const HeroCarousel = () => {
  const [current, setCurrent] = useState(0);

  // ganti slide tiap 5 detik
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* background carousel */}
      {slides.map((slide, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === current ? 1 : 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
        >
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            className="object-cover brightness-50 transition-all duration-1000"
            priority={index === 0}
          />
        </motion.div>
      ))}

      {/* teks utama */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10 px-4">
        <h1 className="text-4xl md:text-6xl font-black uppercase drop-shadow-lg">
          BENNY GROUP
        </h1>
        <p className="mt-4 text-lg md:text-2xl font-light tracking-wide max-w-2xl">
          Membangun Kepercayaan dan Kualitas di Setiap Langkah
        </p>
      </div>

      {/* tiga kotak keunggulan */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col md:flex-row gap-4 z-10 px-4">
        {advantages.map((item, index) => (
          <div
            key={index}
            className="bg-white/15 text-white px-6 py-4 md:w-60 rounded-xl border border-white/20 text-center backdrop-blur-sm"
          >
            <p className="text-sm md:text-base font-medium">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
