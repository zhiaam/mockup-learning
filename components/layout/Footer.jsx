"use client";

import { Mail, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F6F8FC] border-t">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-12 md:grid-cols-3">
        {/* KIRI */}
        <div>
          <h3 className="text-lg font-semibold text-sky-700 mb-3">
            Hubungi Kami
          </h3>
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            Platform pembelajaran modern untuk mahasiswa dan
            pembelajar mandiri. Tingkatkan skill dan kariermu
            bersama kami.
          </p>

          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-gray-500 hover:text-sky-600 transition"
            >
              <Instagram size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-sky-600 transition"
            >
              <Twitter size={20} />
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-sky-600 transition"
            >
              <Linkedin size={20} />
            </a>
          </div>
        </div>

        {/* TENGAH */}
        <div>
          <h3 className="text-lg font-semibold text-sky-700 mb-3">
            Kontak
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li>Email: support@learnify.id</li>
            <li>WhatsApp: +62 812-3456-7890</li>
            <li>Jam Operasional: 09.00 – 17.00 WIB</li>
          </ul>
        </div>

        {/* KANAN */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-sky-700 mb-3">
            Berlangganan
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Dapatkan update course terbaru dan promo eksklusif.
          </p>

          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Email kamu"
              className="flex-1 px-4 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
            <button
              type="submit"
              className="bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700 transition"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Learnify. All rights reserved.
      </div>
    </footer>
  );
}
