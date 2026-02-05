"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email")
      .neq("role", "admin") // <-- filter admin
      .order("created_at", { ascending: false });

    if (error) {
      console.error("LOAD USER ERROR:", error);
      alert("Gagal mengambil data user");
      return;
    }

    setUsers(data || []);
    setLoading(false);
  };


  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirmDelete = confirm(
      "User akan dihapus. Lanjutkan?"
    );
    if (!confirmDelete) return;

    const { error } = await supabase
      .from("profiles")
      .delete()
      .eq("id", id);

    if (error) {
      console.error("DELETE USER ERROR:", error);
      alert("Gagal menghapus user");
      return;
    }

    loadUsers();
  };

  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-2xl font-semibold">
        Manajemen User
      </h1>

      <div className="bg-white border rounded-xl divide-y">
        {users.length === 0 && (
          <div className="p-6 text-gray-500 text-sm">
            Belum ada user
          </div>
        )}

        {users.map((u) => (
          <div
            key={u.id}
            className="p-4 flex justify-between items-center"
          >
            <div>
              <p className="font-medium">
                {u.full_name || "User"}
              </p>
              <p className="text-sm text-gray-600">
                {u.email}
              </p>
            </div>

            <button
              onClick={() => deleteUser(u.id)}
              className="text-sm px-3 py-1 border rounded text-red-600 hover:bg-red-50"
            >
              Hapus
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
