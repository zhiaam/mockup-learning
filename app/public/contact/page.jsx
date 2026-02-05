"use client";

export default function ContactPage() {
  return (
    <main className="bg-white">
      {/* Spacer header */}
      <div className="h-[72px]" />

      <section className="max-w-7xl mx-auto px-4 py-20">
        {/* Title */}
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Hubungi Kami
          </h1>
          <p className="text-secondary max-w-2xl mx-auto">
            Kami siap membantu pertanyaan seputar platform, pendaftaran, maupun
            kerja sama.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* LEFT: Contact Info */}
          <div className="space-y-8">
            {/* Kontak */}
            <div>
              <h3 className="text-xl font-semibold text-sky-800 mb-3">
                Kontak
              </h3>
              <ul className="space-y-2 text-secondary text-sm">
                <li>
                  <span className="font-medium text-sky-700">Email:</span>{" "}
                  support@elearning.com
                </li>
                <li>
                  <span className="font-medium text-sky-700">Telepon:</span>{" "}
                  +62 21 1234 5678
                </li>
                <li>
                  <span className="font-medium text-sky-700">WhatsApp:</span>{" "}
                  +62 812 3456 7890
                </li>
              </ul>
            </div>

            {/* Lokasi */}
            <div>
              <h3 className="text-xl font-semibold text-sky-800 mb-3">
                Lokasi Kantor
              </h3>
              <p className="text-secondary text-sm leading-relaxed">
                Jl. Jenderal Sudirman No. 123  
                <br />
                Jakarta Pusat, DKI Jakarta  
                <br />
                Indonesia
              </p>
            </div>

            {/* Jam Layanan */}
            <div>
              <h3 className="text-xl font-semibold text-sky-800 mb-3">
                Jam Layanan
              </h3>
              <p className="text-secondary text-sm">
                Senin – Jumat: 09.00 – 17.00 WIB  
                <br />
                Sabtu, Minggu & Hari Libur: Tutup
              </p>
            </div>
          </div>

          {/* RIGHT: Google Maps */}
          <div className="w-full h-[400px] rounded-xl overflow-hidden border">
            <iframe
              title="Google Maps Jakarta"
              src="https://www.google.com/maps?q=Jakarta%20Pusat&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
