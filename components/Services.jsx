"use client";

import Image from "next/image";

const services = [
  {
    title: "Manufaktur & Industri",
    desc: "Mengelola dan mengembangkan unit usaha di bidang manufaktur dengan standar kualitas tinggi.",
    img: "/assets/service1.png",
  },
  {
    title: "Distribusi & Logistik",
    desc: "Menyediakan solusi distribusi dan logistik yang efisien, terintegrasi, dan terpercaya.",
    img: "/assets/service2.png",
  },
  {
    title: "Jasa & Pengembangan Bisnis",
    desc: "Mendukung pertumbuhan bisnis melalui layanan profesional dan strategi berkelanjutan.",
    img: "/assets/service3.png",
  },
];

const Services = () => {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto px-4">
        {/* Judul & deskripsi */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-white mb-4">
            Layanan Kami
          </h2>
          <p className="text-white/80 leading-relaxed">
            Beragam lini usaha yang dikelola secara profesional untuk memberikan
            nilai tambah dan solusi terbaik bagi mitra kami.
          </p>
        </div>

        {/* Kotak layanan */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-custom hover:-translate-y-2 transition-transform duration-300"
            >
              <div className="relative w-full h-[200px]">
                <Image
                  src={service.img}
                  alt={service.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-primary mb-3">
                  {service.title}
                </h3>
                <p className="text-secondary text-sm leading-relaxed">
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
