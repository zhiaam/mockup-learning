"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function CourseDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedLessons, setCompletedLessons] = useState([]);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      /* AUTH */
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/auth/login");
        return;
      }

      setUser(user);

      /* COURSE */
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!courseData) {
        router.push("/courses");
        return;
      }

      setCourse(courseData);

      /* ENROLLMENT CHECK */
      const { data: enrollment } = await supabase
        .from("enrollments")
        .select("id")
        .eq("user_id", user.id)
        .eq("course_id", id)
        .maybeSingle();

      if (!enrollment) {
        router.push("/courses");
        return;
      }

      /* LESSONS */
      const { data: lessonData } = await supabase
        .from("lessons")
        .select("*")
        .eq("course_id", id)
        .order("order_index", { ascending: true });

      const lessonsList = lessonData || [];
      setLessons(lessonsList);

      /* ✅ PROGRESS (KHUSUS COURSE INI) */
      const lessonIds = lessonsList.map((l) => l.id);

      const { data: progressData } = await supabase
        .from("lesson_progress")
        .select("lesson_id")
        .eq("user_id", user.id)
        .in("lesson_id", lessonIds)
        .eq("completed", true);

      const completedIds = (progressData || []).map(
        (p) => p.lesson_id
      );

      setCompletedLessons(completedIds);

      /* ✅ SET ACTIVE LESSON DENGAN BENAR */
      const nextIndex = lessonsList.findIndex(
        (l) => !completedIds.includes(l.id)
      );

      setActiveLessonIndex(
        nextIndex === -1 ? lessonsList.length - 1 : nextIndex
      );

      setLoading(false);
    };

    init();
  }, [id, router]);

  if (loading || !course || lessons.length === 0) return null;

  const totalLessons = lessons.length;
  const activeLesson = lessons[activeLessonIndex];

  const progressPercent = Math.round(
    (completedLessons.length / totalLessons) * 100
  );

  const isCourseCompleted = progressPercent === 100;


  const isLessonUnlocked = (index) =>
    index === 0 || completedLessons.includes(lessons[index - 1].id);

  /* COMPLETE LESSON */
  const completeLesson = async () => {
    const lessonId = activeLesson.id;
    if (completedLessons.includes(lessonId)) return;

    await supabase.from("lesson_progress").upsert({
      user_id: user.id,
      lesson_id: lessonId,
      completed: true,
      completed_at: new Date(),
    });

    const newCompleted = [...completedLessons, lessonId];
    setCompletedLessons(newCompleted);

    const newProgress = Math.round(
      (newCompleted.length / totalLessons) * 100
    );

    await supabase.from("course_progress").upsert({
      user_id: user.id,
      course_id: id,
      progress: newProgress,
      completed: newProgress === 100,
      updated_at: new Date(),
    });

    if (activeLessonIndex < totalLessons - 1) {
      setActiveLessonIndex(activeLessonIndex + 1);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
      {/* SIDEBAR */}
      <aside className="border rounded-xl p-4">
        <h3 className="font-medium mb-4">Lesson</h3>
        <ul className="space-y-2">
          {lessons.map((lesson, index) => {
            const unlocked = isLessonUnlocked(index);
            const completed = completedLessons.includes(lesson.id);

            return (
              <li
                key={lesson.id}
                onClick={() => unlocked && setActiveLessonIndex(index)}
                className={`px-3 py-2 rounded text-sm flex justify-between items-center
                  ${
                    index === activeLessonIndex
                      ? "bg-black text-white"
                      : unlocked
                      ? "hover:bg-gray-100 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed"
                  }`}
              >
                <span>{lesson.title}</span>
                <span className="text-xs">
                  {completed
                    ? "✓"
                    : isCourseCompleted && index === lessons.length - 1
                    ? "🏁"
                    : unlocked
                    ? ""
                    : "🔒"}
                </span>

              </li>
            );
          })}
        </ul>
      </aside>

      {/* MAIN */}
      <main className="md:col-span-3">
        <h1 className="text-2xl font-semibold">{course.title}</h1>
        <p className="text-gray-600 mb-4">{course.description}</p>

        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-black h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Progress {progressPercent}%
          </p>
        </div>

        <div className="aspect-video rounded-xl overflow-hidden bg-black mb-6">
          <iframe
            key={activeLesson.video_id}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${activeLesson.video_id}`}
            title={activeLesson.title}
            allowFullScreen
          />
        </div>

        <h2 className="text-xl font-medium mb-3">
          {activeLesson.title}
        </h2>

        {isCourseCompleted ? (
          <div className="mt-6 border rounded-xl p-5 bg-green-50">
            <h3 className="font-semibold text-green-700 mb-1">
              🎉 Course Selesai
            </h3>
            <p className="text-sm text-green-700 mb-4">
              Kamu telah menyelesaikan seluruh lesson pada course ini
            </p>
            <button
              onClick={() => router.push("/user/dashboard")}
              className="bg-green-600 text-white px-6 py-2 rounded-lg text-sm"
            >
              Kembali ke Dashboard
            </button>
          </div>
        ) : (
          <button
            onClick={completeLesson}
            disabled={completedLessons.includes(activeLesson.id)}
            className="bg-black text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50"
          >
            Tandai Lesson Selesai
          </button>
        )}

      </main>
    </div>
  );
}
