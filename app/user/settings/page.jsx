"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [changing, setChanging] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const init = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      setUser(user);
      setEmail(user.email);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle();

      setName(profile?.full_name || "");
    };

    init();
  }, []);

  /* ================= SAVE PROFILE ================= */
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: name,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      alert(`❌ ${error.message}`);
    } else {
      alert("✅ Profil berhasil diperbarui");
    }
  };




  /* ================= CHANGE PASSWORD ================= */
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }

    setChanging(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    setChanging(false);

    if (error) {
      alert("❌ Gagal mengganti password");
    } else {
      setPassword("");
      alert("🔐 Password berhasil diganti");
    }
  };

  /* ================= DELETE ACCOUNT ================= */
  const handleDeleteAccount = async () => {
    const confirm = window.confirm(
      "Akun akan dinonaktifkan dan kamu akan logout. Lanjutkan?"
    );

    if (!confirm) return;

    setDeleting(true);

    // soft delete profile
    await supabase.from("profiles").update({
      deleted_at: new Date(),
    }).eq("id", user.id);

    await supabase.auth.signOut();
    router.replace("/");

    setDeleting(false);
  };

  if (!user) return null;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-semibold mb-2">
          ⚙️ Pengaturan Akun
        </h1>
        <p className="text-gray-600">
          Kelola informasi akun dan keamanan
        </p>
      </div>

      {/* ================= PROFILE ================= */}
      <form
        onSubmit={handleSave}
        className="bg-white border rounded-xl p-6 space-y-6"
      >
        <h2 className="font-semibold text-lg flex items-center gap-2">
          👤 Profil
        </h2>

        <div>
          <label className="text-sm">Nama Lengkap</label>
          <input
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="text-sm">Email</label>
          <input
            disabled
            className="w-full border rounded-lg px-3 py-2 mt-1 bg-gray-100 text-gray-500"
            value={email}
          />
        </div>

        <button
          disabled={saving}
          className="bg-black text-white px-6 py-2 rounded-lg text-sm"
        >
          💾 {saving ? "Menyimpan..." : "Simpan Profil"}
        </button>
      </form>

      {/* ================= PASSWORD ================= */}
      <form
        onSubmit={handleChangePassword}
        className="bg-white border rounded-xl p-6 space-y-6"
      >
        <h2 className="font-semibold text-lg flex items-center gap-2">
          🔐 Keamanan
        </h2>

        <div>
          <label className="text-sm">Password Baru</label>
          <input
            type="password"
            className="w-full border rounded-lg px-3 py-2 mt-1"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          disabled={changing}
          className="bg-sky-600 text-white px-6 py-2 rounded-lg text-sm"
        >
          🔄 {changing ? "Memproses..." : "Ganti Password"}
        </button>
      </form>

      {/* ================= DELETE ================= */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h2 className="font-semibold text-lg text-red-700 flex items-center gap-2">
          ⚠️ Zona Berbahaya
        </h2>
        <p className="text-sm text-red-600 mb-4">
          Menghapus akun akan menonaktifkan akses secara permanen.
        </p>

        <button
          onClick={handleDeleteAccount}
          disabled={deleting}
          className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm"
        >
          🗑️ {deleting ? "Menghapus..." : "Hapus Akun"}
        </button>
      </div>
    </div>
  );
}
