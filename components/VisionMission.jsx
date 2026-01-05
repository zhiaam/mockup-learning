"use client";

import Image from "next/image";

const VisionMission = () => {
  return (
    <section className="py-20 bg-gray-50 text-primary">
      <div className="container mx-auto px-4">
        {/* Visi & Misi */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Visi */}
          <div className="bg-white p-8 rounded-xl shadow-custom">
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">
              Visi
            </h3>
            <p className="text-secondary leading-relaxed">
              Menjadi grup perusahaan terpercaya yang unggul dalam inovasi,
              kualitas, dan keberlanjutan, serta memberikan kontribusi positif
              bagi masyarakat dan mitra usaha.
            </p>
          </div>

          {/* Misi */}
          <div className="bg-white p-8 rounded-xl shadow-custom">
            <h3 className="text-2xl font-bold text-primary mb-4 uppercase">
              Misi
            </h3>
            <p className="text-secondary leading-relaxed">
              Mengembangkan bisnis secara profesional, membangun hubungan jangka
              panjang dengan klien, serta menghadirkan layanan dan produk yang
              bernilai tinggi dan berorientasi pada kepuasan pelanggan.
            </p>
          </div>
        </div>

        {/* Gambar bawah */}
        <div className="w-full flex justify-center">
          <div className="relative w-full md:w-[70%] h-[300px] md:h-[420px] rounded-xl overflow-hidden shadow-custom">
            <Image
              src="/assets/visimisi.png"
              alt="Visi dan Misi Benny Group"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
