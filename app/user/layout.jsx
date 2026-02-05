"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UserLayout({ children }) {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .maybeSingle();

      setProfile({
        name: data?.full_name || "User",
        email: user.email,
      });
    };

    init();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    // FIX: h-screen + overflow-hidden
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
            title="Toggle menu"
          >
            ☰
          </button>
        </div>

        {/* MENU */}
        {/* FIX: hapus space-y, pakai gap kecil + items rapat */}
        <nav className="flex-1 p-2 flex flex-col gap-1 text-sm">
          <button
            onClick={() => router.push("/user/dashboard")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <span className="text-lg">🏠</span>
            {open && <span>Dashboard</span>}
          </button>

          <button
            onClick={() => router.push("/user/courses")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <span className="text-lg">📚</span>
            {open && <span>Courses</span>}
          </button>

          <button
            onClick={() => router.push("/user/settings")}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-sky-50 hover:text-sky-700 transition"
          >
            <span className="text-lg">⚙️</span>
            {open && <span>Pengaturan</span>}
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
      {/* FIX: main bisa scroll sendiri */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="p-6 flex items-center gap-4 border-b bg-[#f8f5ef]">
          <div className="w-12 h-12 rounded-full bg-sky-200 flex items-center justify-center font-bold text-sky-800">
            {profile?.name?.[0]?.toUpperCase() || "U"}
          </div>
          <div>
            <p className="font-medium">{profile?.name}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>
        </div>

        {/* CONTENT */}
        {/* FIX: scroll hanya di sini */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
