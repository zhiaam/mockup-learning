"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Apa itu platform ini?",
    answer:
      "Platform ini adalah layanan pembelajaran online yang dirancang untuk membantu pelajar dan mahasiswa mengembangkan skill yang relevan dengan kebutuhan industri melalui materi terstruktur dan mudah dipahami.",
  },
  {
    question: "Siapa saja yang bisa menggunakan platform ini?",
    answer:
      "Platform ini terbuka untuk umum, terutama pelajar SMA, mahasiswa, dan fresh graduate yang ingin meningkatkan kemampuan akademik maupun profesional.",
  },
  {
    question: "Apakah pendaftaran gratis?",
    answer:
      "Ya, pendaftaran akun sepenuhnya gratis. Beberapa materi lanjutan atau program khusus mungkin berbayar, namun selalu bersifat opsional.",
  },
  {
    question: "Bagaimana cara mendaftar?",
    answer:
      "Klik tombol Daftar di bagian atas website, isi data yang diperlukan, lalu verifikasi akun Anda untuk mulai belajar.",
  },
  {
    question: "Apakah bisa diakses lewat HP?",
    answer:
      "Bisa. Platform ini dirancang responsif sehingga nyaman digunakan baik melalui laptop, tablet, maupun smartphone.",
  },
  {
    question: "Apakah saya mendapat sertifikat?",
    answer:
      "Untuk course tertentu, peserta yang menyelesaikan seluruh materi dan evaluasi akan mendapatkan sertifikat digital.",
  },
];

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <main className="bg-white">
      {/* Header spacing */}
      <div className="h-[72px]" />

      <section className="max-w-4xl mx-auto px-4 py-20">
        {/* Title */}
        <div className="text-center mb-14">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Pertanyaan yang Sering Diajukan
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Temukan jawaban atas pertanyaan umum seputar platform pembelajaran
            kami sebelum memulai.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
              className="border border-border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex justify-between items-center text-left px-6 py-5 bg-sky-50 hover:bg-sky-100 transition"
              >
                <span className="font-medium text-sky-800">
                  {item.question}
                </span>
                <span
                  className={`transition-transform duration-300 text-sky-700 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  activeIndex === index
                    ? "max-h-40 py-4 opacity-100"
                    : "max-h-0 py-0 opacity-0"
                }`}
              >
                <p className="text-secondary text-sm leading-relaxed">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
