"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const testimonies = [
  {
    name: "Orang Satu",
    role: "Mahasiswa Informatika",
    text: "Materinya mudah dipahami dan runtut. Cocok banget buat mahasiswa yang baru mulai belajar skill digital.",
    image: "/assets/about-1.png",
  },
  {
    name: "Orang Dua",
    role: "Mahasiswi Sistem Informasi",
    text: "Belajarnya fleksibel, bisa sambil kuliah. Penjelasannya juga relevan dengan kebutuhan industri.",
    image: "/assets/about-2.png",
  },
  {
    name: "Orang Tiga",
    role: "Fresh Graduate",
    text: "Platform ini bantu saya upgrade skill sebelum masuk dunia kerja. Sangat recommended.",
    image: "/assets/about-3.png",
  },
  {
    name: "Lu Saha",
    role: "Mahasiswi Desain",
    text: "Tampilan clean dan materinya nggak ngebosenin. Enak dipelajari pelan-pelan.",
    image: "/assets/about-2.png",
  },
  {
    name: "Dimas",
    role: "Mahasiswa Teknik",
    text: "Struktur belajarnya jelas, jadi tahu harus mulai dari mana dan lanjut ke mana.",
    image: "/assets/about-1.png",
  },
  {
    name: "Template",
    role: "Mahasiswi Manajemen",
    text: "Cocok buat yang pengen nambah skill di luar kampus tanpa ribet.",
    image: "/assets/about-3.png",
  },
];

const Testimony = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 3;
  const totalSlides = Math.ceil(testimonies.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  return (
    <section className="py-4 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-bold text-sky-800 mb-4">
            Apa Kata Mereka
          </h2>
          <p className="text-gray-600">
            Pengalaman mahasiswa dan lulusan yang sudah belajar bersama kami.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${totalSlides * 100}%`,
                transform: `translateX(-${(currentSlide * 100) / totalSlides}%)`,
              }}
            >
              {Array.from({ length: totalSlides }).map((_, slideIndex) => {
                const start = slideIndex * itemsPerSlide;
                const slice = testimonies.slice(start, start + itemsPerSlide);

                return (
                  <div
                    key={slideIndex}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 px-2"
                    style={{ width: `${100 / totalSlides}%` }}
                  >
                    {slice.map((item, index) => (
                      <div
                        key={index}
                        className="bg-sky-50 rounded-2xl p-8 shadow-sm hover:shadow-md transition"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sky-800">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {item.role}
                            </p>
                          </div>
                        </div>

                        <p className="text-gray-600 text-sm leading-relaxed">
                          “{item.text}”
                        </p>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevSlide}
            className="absolute top-1/2 -translate-y-1/2 -left-6 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-100"
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 -translate-y-1/2 -right-6 bg-white border rounded-full w-10 h-10 flex items-center justify-center shadow hover:bg-gray-100"
            aria-label="Next"
          >
            ›
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimony;
