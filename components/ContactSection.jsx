"use client";

import { useState } from "react";

const ContactSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // sementara hanya dummy, nanti bisa dihubungkan ke API / email service
    setEmail("");
  };

  return (
    <section className="py-20 bg-white text-primary" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          {/* Judul */}
          <h2 className="text-4xl md:text-5xl font-black uppercase text-primary mb-4">
            Kontak Kami
          </h2>

          {/* Teks penjelasan */}
          <p className="text-secondary leading-relaxed mb-8">
            Untuk informasi lebih lanjut mengenai layanan dan kerja sama,
            silakan tinggalkan alamat email Anda. Tim kami akan menghubungi Anda
            secepatnya.
          </p>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4"
          >
            <input
              type="email"
              required
              placeholder="Alamat email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-5 py-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-primary text-white font-bold uppercase rounded-lg hover:bg-accent transition-colors duration-200"
            >
              Kirim
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
