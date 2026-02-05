"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Logo from "@/components/Logo";

export default function Header() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const { data } = await supabase.auth.getUser();
      const currentUser = data?.user || null;
      setUser(currentUser);

      if (currentUser) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", currentUser.id)
          .single();

        setRole(profile?.role || "user");
      } else {
        setRole(null);
      }

      setLoading(false);
    };

    initAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (!session) setRole(null);
    });

    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);

    return () => {
      subscription.unsubscribe();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace("/");
  };

  if (loading) return null;

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-sky-600 shadow-md" : "bg-sky-100"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        <nav className="flex items-center gap-6 text-sm font-medium">
          {/* ================= PUBLIC ================= */}
          {!user && (
            <>
              {[
                { label: "Beranda", path: "/" },
                { label: "Tentang", path: "/public/about" },
                { label: "FAQ", path: "/public/faq" },
                { label: "Kontak", path: "/public/contact" },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => router.push(item.path)}
                  className={`transition-all hover:scale-[1.05] ${
                    scrolled
                      ? "text-white hover:text-sky-200"
                      : "text-sky-800 hover:text-sky-600"
                  }`}
                >
                  {item.label}
                </button>
              ))}

              <button
                onClick={() => router.push("/auth/login")}
                className={`transition-all hover:scale-[1.05] ${
                  scrolled
                    ? "text-white hover:text-sky-200"
                    : "text-sky-800 hover:text-sky-600"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => router.push("/auth/register")}
                className={`px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.05] ${
                  scrolled
                    ? "bg-white text-sky-700 hover:bg-sky-100"
                    : "bg-sky-700 text-white hover:bg-sky-800"
                }`}
              >
                Daftar
              </button>
            </>
          )}

          {/* ================= USER ================= */}
          {user && role === "user" && (
            <>
              <button
                onClick={() => router.push("/user/dashboard")}
                className={scrolled ? "text-white" : "text-sky-800"}
              >
                Dashboard
              </button>

              <button
                onClick={() => router.push("/user/courses")}
                className={scrolled ? "text-white" : "text-sky-800"}
              >
                Courses
              </button>

              {/* LOGOUT – dibuat menonjol */}
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.05] ${
                  scrolled
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Logout
              </button>
            </>
          )}

          {/* ================= ADMIN ================= */}
          {user && role === "admin" && (
            <>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className={scrolled ? "text-white" : "text-sky-800"}
              >
                Admin Panel
              </button>

              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-lg font-semibold transition-all hover:scale-[1.05] ${
                  scrolled
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
