"use client";

import Image from "next/image";

const services = [
  {
    title: "Kelas Terstruktur",
    desc: "Materi disusun bertahap dari dasar hingga lanjutan agar mudah dipahami dan diikuti oleh mahasiswa.",
    img: "/assets/service1.png",
  },
  {
    title: "Belajar Fleksibel",
    desc: "Akses materi kapan saja dan di mana saja sesuai ritme belajarmu tanpa tekanan.",
    img: "/assets/service2.png",
  },
  {
    title: "Skill Siap Industri",
    desc: "Fokus pada skill digital yang relevan dengan kebutuhan dunia kerja dan industri saat ini.",
    img: "/assets/service3.png",
  },
];

const Services = () => {
  return (
    <section className="py-4 bg-sky-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Judul & deskripsi */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-sky-800 mb-4">
            Apa yang Kamu Dapatkan
          </h2>
          <p className="text-gray-600 leading-relaxed">
            Semua yang kamu butuhkan untuk mulai belajar skill digital dengan
            cara yang lebih efektif dan relevan.
          </p>
        </div>

        {/* Card layanan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="relative w-full h-[180px]">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-8 text-center">
                <h3 className="text-xl font-semibold text-sky-700 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
