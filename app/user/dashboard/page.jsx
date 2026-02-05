"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function UserDashboardPage() {
  const router = useRouter();
  const courseRef = useRef(null);

  const [courses, setCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        /* ===== AUTH ===== */
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.replace("/auth/login");
          return;
        }

        /* ===== ENROLLMENTS + COURSE DATA ===== */
        const { data: enrolled } = await supabase
          .from("enrollments")
          .select(
            `
            course_id,
            courses (
              id,
              title,
              description,
              level
            )
          `
          )
          .eq("user_id", user.id);

        if (!enrolled || enrolled.length === 0) {
          setCourses([]);
          return;
        }

        const courseIds = enrolled.map((e) => e.course_id);

        /* ===== TOTAL LESSON PER COURSE ===== */
        const { data: lessonData } = await supabase
          .from("lessons")
          .select("id, course_id")
          .in("course_id", courseIds);

        /* ===== COMPLETED LESSONS ===== */
        const { data: completedData } = await supabase
          .from("lesson_progress")
          .select("lesson_id")
          .eq("user_id", user.id)
          .eq("completed", true);

        /* ===== BUILD MAP ===== */
        const lessonCountMap = {};
        const completedCountMap = {};

        (lessonData || []).forEach((l) => {
          lessonCountMap[l.course_id] =
            (lessonCountMap[l.course_id] || 0) + 1;
        });

        (completedData || []).forEach((p) => {
          const lesson = lessonData?.find(
            (l) => l.id === p.lesson_id
          );
          if (!lesson) return;

          completedCountMap[lesson.course_id] =
            (completedCountMap[lesson.course_id] || 0) + 1;
        });

        if (isMounted) {
          setCourses(
            enrolled.map((e) => {
              const total = lessonCountMap[e.course_id] || 0;
              const completed =
                completedCountMap[e.course_id] || 0;

              const progress =
                total === 0
                  ? 0
                  : Math.round((completed / total) * 100);

              return {
                id: e.courses.id,
                title: e.courses.title,
                description: e.courses.description,
                level: e.courses.level,
                progress,
              };
            })
          );
        }

        /* ===== POPULAR COURSES ===== */
        const { data: popular } = await supabase
          .from("courses")
          .select("id, title, description, level")
          .order("created_at", { ascending: false })
          .limit(3);

        if (isMounted && popular) {
          setPopularCourses(popular);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (loading) return null;

  return (
    <div className="space-y-14">
      {/* ================= ACTIVE COURSES ================= */}
      <section>
        <h2 className="text-xl font-semibold mb-4">
          Course yang Sedang Dipelajari
        </h2>

        {courses.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border">
            <p className="text-gray-600 mb-4">
              Kamu belum mengambil course apa pun
            </p>
            <button
              onClick={() =>
                courseRef.current?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="bg-sky-600 text-white px-6 py-2 rounded-lg text-sm"
            >
              Ambil Course Sekarang
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl p-5 border hover:shadow transition"
              >
                <span className="text-xs bg-sky-100 text-sky-700 px-2 py-1 rounded">
                  {course.level}
                </span>

                <h3 className="font-semibold mt-2">
                  {course.title}
                </h3>

                <p className="text-sm text-gray-600 mb-4">
                  {course.description}
                </p>

                <div className="mb-4">
                  <div className="w-full bg-gray-200 h-2 rounded">
                    <div
                      className="bg-sky-600 h-2 rounded"
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Progress {course.progress}%
                  </p>
                </div>

                <button
                  onClick={() =>
                    router.push(`/user/courses/${course.id}`)
                  }
                  className="text-sm bg-sky-600 text-white px-4 py-2 rounded-lg"
                >
                  Lanjutkan Belajar
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ================= POPULAR COURSES ================= */}
      <section ref={courseRef}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Course Pilihan
          </h2>
          <button
            onClick={() => router.push("/user/courses")}
            className="text-sm text-sky-700 hover:underline"
          >
            Lihat semua
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {popularCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white rounded-xl p-5 border hover:shadow transition"
            >
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {course.level}
              </span>

              <h3 className="font-semibold mt-2">
                {course.title}
              </h3>

              <p className="text-sm text-gray-600 mb-4">
                {course.description}
              </p>

              <button
                onClick={() =>
                  router.push(`/user/courses/${course.id}`)
                }
                className="text-sm border px-4 py-2 rounded-lg hover:bg-gray-50"
              >
                Detail
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
