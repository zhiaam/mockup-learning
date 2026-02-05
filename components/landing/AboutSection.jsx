"use client";

import CountUp from "react-countup";

const AboutSection = () => {
  return (
    <section className="py-14 bg-white text-gray-700" id="about">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-14 items-center px-4">
        {/* Kiri: Judul */}
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-sky-800 mb-6 leading-tight">
            Belajar Skill Digital <br className="hidden md:block" />
            dengan Cara yang Relevan
          </h2>
          <p className="text-gray-500 max-w-md">
            Dirancang untuk mahasiswa dan generasi muda yang ingin berkembang
            tanpa ribet.
          </p>
        </div>

        {/* Kanan: Deskripsi + Statistik */}
        <div>
          <p className="leading-relaxed mb-12">
            Kami adalah platform pembelajaran modern yang membantu mahasiswa
            dan pelajar mempelajari skill digital secara terstruktur, praktis,
            dan sesuai kebutuhan industri. Materi disusun oleh praktisi,
            progres belajar jelas, dan bisa diakses kapan saja.
          </p>

          <div className="flex flex-col sm:flex-row gap-10">
            {/* Counter 1 */}
            <div className="text-center flex-1">
              <h3 className="text-5xl md:text-6xl font-bold text-sky-700 mb-2">
                <CountUp start={0} end={50} duration={3} />+
              </h3>
              <p className="text-gray-500 text-sm tracking-wide uppercase">
                Materi & Modul Belajar
              </p>
            </div>

            {/* Counter 2 */}
            <div className="text-center flex-1">
              <h3 className="text-5xl md:text-6xl font-bold text-sky-700 mb-2">
                <CountUp start={0} end={1000} duration={3} />+
              </h3>
              <p className="text-gray-500 text-sm tracking-wide uppercase">
                Pelajar Aktif
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
