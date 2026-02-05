"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 1️⃣ Login ke Supabase Auth
      const { data, error: loginError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });

      if (loginError) throw loginError;
      if (!data?.user) throw new Error("User tidak ditemukan");

      // 2️⃣ Ambil role dari tabel profiles
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      console.log("PROFILE:", profile);

      const role = profile?.role;

      if (role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/user/dashboard");
      }


    } catch (err) {
      setError(err?.message || "Login gagal");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f5ef] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white rounded-2xl shadow-sm p-8"
      >
        <h1 className="text-2xl font-bold text-sky-800 mb-2">
          Selamat Datang Kembali
        </h1>
        <p className="text-sm text-secondary mb-6">
          Login untuk melanjutkan belajar
        </p>

        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-50 px-4 py-2 rounded">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-6 bg-sky-600 text-white py-3 rounded-xl font-medium hover:bg-sky-700 transition disabled:opacity-60"
        >
          {loading ? "Memproses..." : "Login"}
        </button>

        <p className="text-sm text-center text-secondary mt-6">
          Belum punya akun?{" "}
          <button
            type="button"
            onClick={() => router.push("/auth/register")}
            className="text-sky-700 font-medium hover:underline"
          >
            Daftar sekarang
          </button>
        </p>
      </form>
    </div>
  );
}
