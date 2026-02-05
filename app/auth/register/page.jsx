"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function RegisterPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // 1️⃣ Register ke Supabase Auth
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setError(signUpError.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // 2️⃣ Update profile (row sudah dibuat otomatis oleh trigger)
    if (user) {
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);

      if (updateError) {
        setError("Registrasi berhasil, tapi gagal menyimpan profil");
        setLoading(false);
        return;
      }
    }

    // 3️⃣ Redirect ke login
    router.replace("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ef] px-4">
      <form
        onSubmit={handleRegister}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8"
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          Buat Akun Baru
        </h1>
        <p className="text-sm text-secondary mb-6">
          Daftar untuk mulai belajar
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nama Lengkap"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (min. 6 karakter)"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-sky-500 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-sky-600 text-white py-3 rounded-xl font-medium hover:bg-sky-700 transition disabled:opacity-60"
        >
          {loading ? "Mendaftar..." : "Daftar"}
        </button>

        <p className="text-sm text-center text-secondary mt-6">
          Sudah punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/login")}
            className="text-sky-700 font-medium hover:underline"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}
