"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AdminLayout({ children }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // sama seperti layout user → diam jika belum login
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, role")
        .eq("id", user.id)
        .maybeSingle();

      // kalau bukan admin → lempar ke dashboard user
      if (data?.role !== "admin") {
        router.replace("/user/dashboard");
        return;
      }

      setProfile({
        name: data?.full_name || "Admin",
        email: user.email,
      });
    };

    init();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (!profile) return null;

  return (
    <div className="h-screen flex bg-[#f8f5ef] overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <aside
        className={`bg-white border-r flex flex-col transition-all duration-300 ${
          open ? "w-64" : "w-16"
        }`}
      >
        {/* TOGGLE */}
        <div className="p-4 border-b flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-500 text-lg"
          >
            ☰
          </button>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-2 flex flex-col gap-1 text-sm">
          <button
            onClick={() => router.push("/admin/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
          >
            <span className="text-lg">📊</span>
            {open && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => router.push("/admin/courses")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
          >
            <span className="text-lg">📚</span>
            {open && <span>Courses</span>}
          </button>

          <button
            onClick={() => router.push("/admin/users")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-purple-50 hover:text-purple-700 transition"
          >
            <span className="text-lg">👥</span>
            {open && <span>Users</span>}
          </button>
        </nav>

        {/* LOGOUT */}
        <div className="p-3 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition"
          >
            <span className="text-lg">⏻</span>
            {open && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* ================= MAIN ================= */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-6 flex items-center gap-4 border-b bg-[#f8f5ef]">
          <div className="w-12 h-12 rounded-full bg-purple-200 flex items-center justify-center font-bold text-purple-800">
            {profile.name[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium">{profile.name}</p>
            <p className="text-sm text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
