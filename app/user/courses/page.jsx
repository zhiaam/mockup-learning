"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function CoursesPage() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [enrolled, setEnrolled] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      // 🔐 Ambil user TANPA redirect
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);

      // 📚 Ambil semua course
      const { data: courseData, error: courseError } =
        await supabase
          .from("courses")
          .select("*")
          .order("created_at", { ascending: true });

      if (!courseError) {
        setCourses(courseData || []);
      }

      // 🧾 Ambil enrollment user
      if (user) {
        const { data: enrollmentData } = await supabase
          .from("enrollments")
          .select("course_id")
          .eq("user_id", user.id);

        setEnrolled(
          (enrollmentData || []).map((e) => e.course_id)
        );
      }

      setLoading(false);
    };

    init();
  }, []);

  const handleEnroll = async (courseId) => {
    if (!user) return;

    // ✅ Jika sudah ambil → langsung masuk
    if (enrolled.includes(courseId)) {
      router.push(`/user/courses/${courseId}`);
      return;
    }

    // ➕ Insert enrollment
    const { error } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
    });

    if (error) {
      alert("Gagal mengambil course");
      return;
    }

    // ➕ Init progress
    await supabase.from("course_progress").insert({
      user_id: user.id,
      course_id: courseId,
      progress: 0,
      completed: false,
    });

    setEnrolled((prev) => [...prev, courseId]);

    router.push(`/user/courses/${courseId}`);
  };

  if (loading) return null;

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* HEADER */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold mb-2">
          Semua Course
        </h1>
        <p className="text-gray-600">
          Pilih course yang ingin kamu pelajari
        </p>
      </div>

      {/* LIST */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((course) => {
          const isEnrolled = enrolled.includes(course.id);

          return (
            <div
              key={course.id}
              className="bg-white border rounded-xl p-6 flex flex-col hover:shadow transition"
            >
              <span className="text-xs mb-2 px-2 py-1 rounded bg-sky-100 text-sky-700 w-fit">
                {course.level}
              </span>

              <h2 className="text-lg font-semibold mb-2">
                {course.title}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                {course.description}
              </p>

              <button
                onClick={() => handleEnroll(course.id)}
                className="mt-auto bg-sky-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-sky-700"
              >
                {isEnrolled
                  ? "Lanjutkan Belajar"
                  : "Ambil Course"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
