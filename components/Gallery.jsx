"use client";

import Image from "next/image";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const images = [
  "/assets/gallery1.png",
  "/assets/gallery2.png",
  "/assets/gallery3.png",
  "/assets/gallery4.png",
  "/assets/gallery5.png",
  "/assets/gallery6.png",
];

const Gallery = () => {
  return (
    <section className="py-20 bg-white text-primary">
      <div className="container mx-auto px-4">
        {/* Judul & deskripsi */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-4xl md:text-5xl font-black uppercase text-primary mb-4">
            Galeri
          </h2>
          <p className="text-secondary leading-relaxed">
            Dokumentasi berbagai aktivitas dan proyek yang mencerminkan
            profesionalisme serta komitmen Benny Group dalam menjalankan usaha.
          </p>
        </div>

        {/* Grid galeri */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, index) => (
            <Zoom key={index}>
              <div className="relative w-full h-[220px] md:h-[260px] rounded-xl overflow-hidden shadow-custom cursor-zoom-in">
                <Image
                  src={src}
                  alt={`Galeri Benny Group ${index + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </Zoom>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;
