"use client";

import CountUp from "react-countup";

const AboutSection = () => {
  return (
    <section className="py-20 bg-white text-secondary" id="about">
      <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
        {/* Kiri: Judul besar */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black uppercase text-primary mb-6">
            Tentang Benny Group
          </h2>
        </div>

        {/* Kanan: Paragraf dan angka */}
        <div>
          <p className="text-secondary leading-relaxed mb-10">
            Benny Group merupakan grup perusahaan yang bergerak di berbagai
            bidang industri dengan fokus pada inovasi, kepercayaan, dan
            keberlanjutan. Kami berkomitmen menghadirkan solusi terbaik untuk
            mitra dan pelanggan melalui dedikasi serta profesionalisme.
          </p>

          <div className="flex flex-col sm:flex-row gap-10">
            {/* Counter 1 */}
            <div className="text-center flex-1">
              <h3 className="text-5xl md:text-6xl font-bold text-primary mb-2">
                <CountUp start={0} end={15} duration={3} />+
              </h3>
              <p className="text-secondary text-sm tracking-wide uppercase">
                Perusahaan di bawah naungan
              </p>
            </div>

            {/* Counter 2 */}
            <div className="text-center flex-1">
              <h3 className="text-5xl md:text-6xl font-bold text-primary mb-2">
                <CountUp start={0} end={120} duration={3} />+
              </h3>
              <p className="text-secondary text-sm tracking-wide uppercase">
                Klien keseluruhan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
