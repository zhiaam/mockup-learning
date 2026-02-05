export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800">
      {/* HERO */}
      <section className="bg-sky-50 py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-sky-800 mb-6">
            Tentang Platform Kami
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Platform e-learning yang dirancang untuk membantu proses belajar
            menjadi lebih terstruktur, fleksibel, dan mudah diakses oleh siapa saja.
          </p>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold text-sky-800 mb-4">
              Visi
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Menjadi platform pembelajaran digital yang mendorong pemerataan
              akses pendidikan serta peningkatan kualitas pembelajaran berbasis teknologi.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-sky-800 mb-4">
              Misi
            </h2>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Menyediakan materi pembelajaran yang relevan dan terstruktur</li>
              <li>Mendukung proses belajar mandiri dan kolaboratif</li>
              <li>Memanfaatkan teknologi untuk pengalaman belajar yang efektif</li>
              <li>Memberikan kemudahan akses bagi pelajar dan pengajar</li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-800 mb-4">
              Mengapa Platform Ini?
            </h2>
            <p className="text-gray-600">
              Kami fokus pada kebutuhan nyata dalam proses belajar,
              bukan sekadar menyediakan video atau materi.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                title: "Terstruktur",
                desc: "Materi disusun secara sistematis agar mudah dipahami dan diikuti."
              },
              {
                title: "Fleksibel",
                desc: "Belajar kapan saja dan di mana saja sesuai ritme masing-masing."
              },
              {
                title: "Berorientasi Progres",
                desc: "Membantu pengguna memantau perkembangan belajar secara jelas."
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm border"
              >
                <h3 className="text-xl font-semibold text-sky-700 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET USER */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-sky-800 mb-4">
              Untuk Siapa Platform Ini?
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Platform ini dirancang untuk mendukung berbagai peran dalam
              ekosistem pembelajaran digital.
            </p>
            <ul className="space-y-3 text-gray-600 list-disc list-inside">
              <li>Pelajar dan mahasiswa</li>
              <li>Pengajar dan instruktur</li>
              <li>Lembaga pendidikan</li>
              <li>Individu yang ingin belajar mandiri</li>
            </ul>
          </div>

          <div className="bg-sky-50 rounded-xl p-8">
            <p className="text-gray-700 italic leading-relaxed">
              “Belajar bukan soal seberapa cepat, tapi seberapa konsisten
              dan terarah.”
            </p>
          </div>
        </div>
      </section>

    </main>
  );
}
