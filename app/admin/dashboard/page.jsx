"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminDashboard() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    users: 0,
    courses: 0,
    enrollments: 0,
  });

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      const { count: users } = await supabase
        .from("profiles")
        .select("*", { count: "exact", head: true });

      const { count: courses } = await supabase
        .from("courses")
        .select("*", { count: "exact", head: true });

      const { count: enrollments } = await supabase
        .from("enrollments")
        .select("*", { count: "exact", head: true });

      if (isMounted) {
        setStats({
          users: users || 0,
          courses: courses || 0,
          enrollments: enrollments || 0,
        });

        setLoading(false);
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);


  if (loading) return null;

  // kalkulasi kasar buat progress bar (visual saja)
  const activityRate =
    stats.users === 0
      ? 0
      : Math.min(
          Math.round((stats.enrollments / stats.users) * 100),
          100
        );

  return (
    <div className="space-y-12">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          📊 Admin Dashboard
        </h1>
        <p className="text-gray-600">
          Ringkasan aktivitas platform
        </p>
      </div>

      {/* ================= STATS ================= */}
      <section className="grid md:grid-cols-3 gap-6">
        {/* USERS */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            Total Pengguna
          </p>
          <h2 className="text-3xl font-semibold">
            👥 {stats.users}
          </h2>
        </div>

        {/* COURSES */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-1">
            Total Course
          </p>
          <h2 className="text-3xl font-semibold">
            📚 {stats.courses}
          </h2>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white border rounded-xl p-6">
          <p className="text-sm text-gray-500 mb-2">
            Aktivitas Pengguna
          </p>

          <div className="w-full bg-gray-200 h-2 rounded">
            <div
              className="bg-sky-600 h-2 rounded"
              style={{ width: `${activityRate}%` }}
            />
          </div>

          <p className="text-xs text-gray-500 mt-2">
            {activityRate}% pengguna mengambil course
          </p>
        </div>
      </section>

      {/* ================= QUICK ACTION ================= */}
      <section className="grid md:grid-cols-2 gap-6">
        {/* COURSE */}
        <div className="bg-white border rounded-xl p-6 hover:shadow transition">
          <h2 className="font-semibold mb-2">
            🎓 Atur Course
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Tambah, edit, dan kelola course pembelajaran
          </p>
          <button
            onClick={() => router.push("/admin/courses")}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm"
          >
            Kelola Course
          </button>
        </div>

        {/* USERS */}
        <div className="bg-white border rounded-xl p-6 hover:shadow transition">
          <h2 className="font-semibold mb-2">
            👤 Atur User
          </h2>
          <p className="text-sm text-gray-600 mb-4">
            Lihat dan kelola akun pengguna
          </p>
          <button
            onClick={() => router.push("/admin/users")}
            className="bg-black text-white px-5 py-2 rounded-lg text-sm"
          >
            Kelola User
          </button>
        </div>
      </section>
    </div>
  );
}
