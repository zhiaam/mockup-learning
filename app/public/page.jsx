export default function HomePage() {
  return (
    <main>
      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 py-24 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-semibold leading-tight mb-6">
            Belajar Skill Digital  
            <span className="text-[#4F9CF9]"> Lebih Mudah & Terarah</span>
          </h1>

          <p className="text-gray-600 mb-8">
            Platform pembelajaran online untuk mahasiswa dan pemula
            yang ingin siap menghadapi dunia kerja digital.
          </p>

          <div className="flex gap-4">
            <a
              href="/auth/register"
              className="bg-[#4F9CF9] text-white px-6 py-3 rounded-xl text-sm hover:opacity-90"
            >
              Mulai Belajar
            </a>
            <a
              href="/about"
              className="px-6 py-3 rounded-xl text-sm border border-[#4F9CF9] text-[#4F9CF9]"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>

        <div className="bg-[#EAF2FF] rounded-3xl h-72 flex items-center justify-center text-[#4F9CF9] text-lg font-medium">
          Ilustrasi / Image di sini
        </div>
      </section>
    </main>
  );
}
