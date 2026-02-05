"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editingCourse, setEditingCourse] = useState(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState("Beginner");

  const [lessons, setLessons] = useState([
    { title: "", url: "" },
  ]);

  /* ================= SLUG GENERATOR ================= */
  const slugify = (text) =>
    text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-");

  /* ================= LOAD COURSES ================= */
  const loadCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select("id, title, description, level")
      .order("created_at", { ascending: false });

    setCourses(data || []);
    setLoading(false);
  };

  useEffect(() => {
    loadCourses();
  }, []);

  /* ================= LESSON HANDLER ================= */
  const updateLesson = (index, field, value) => {
    const updated = [...lessons];
    updated[index][field] = value;
    setLessons(updated);
  };

  const addLessonField = () => {
    setLessons([...lessons, { title: "", url: "" }]);
  };

  /* ================= RESET FORM ================= */
  const resetForm = () => {
    setEditingCourse(null);
    setTitle("");
    setDescription("");
    setLevel("Beginner");
    setLessons([{ title: "", url: "" }]);
  };

  /* ================= SAVE COURSE ================= */
  const handleSaveCourse = async (e) => {
    e.preventDefault();

    if (!title) {
      alert("Judul wajib diisi");
      return;
    }

    let courseId = editingCourse?.id;

    /* ========= UPDATE MODE ========= */
    if (editingCourse) {
      await supabase
        .from("courses")
        .update({ title, description, level })
        .eq("id", courseId);

      // replace lessons
      await supabase
        .from("lessons")
        .delete()
        .eq("course_id", courseId);
    }

    /* ========= CREATE MODE ========= */
    else {
      const baseId = slugify(title);

      const { data: existing } = await supabase
        .from("courses")
        .select("id")
        .ilike("id", `${baseId}%`);

      courseId =
        existing && existing.length > 0
          ? `${baseId}-${existing.length + 1}`
          : baseId;

      const { data, error } = await supabase
        .from("courses")
        .insert({
          id: courseId,
          title,
          description,
          level,
        })
        .select()
        .maybeSingle();

      if (error || !data) {
        alert(error?.message || "Gagal membuat course");
        return;
      }
    }

    /* ========= INSERT LESSONS ========= */
    const lessonPayload = lessons
    .filter((l) => l.title && l.url)
    .map((l, index) => ({
      course_id: courseId,
      title: l.title,
      video_id: l.url,       // pakai kolom yang benar
      order_index: index + 1 // kolom yang benar
    }));


    if (lessonPayload.length > 0) {

      console.log("LESSON PAYLOAD:", lessonPayload);
      
      const { error: lessonError } = await supabase
        .from("lessons")
        .insert(lessonPayload);

      if (lessonError) {
        console.error("LESSON INSERT ERROR:", lessonError);
        alert("Lesson gagal disimpan");
        return;
      }
    }


    alert(editingCourse ? "Course diperbarui" : "Course dibuat");

    resetForm();
    loadCourses();
  };

  /* ================= EDIT COURSE ================= */
  const editCourse = async (course) => {
    setEditingCourse(course);

    setTitle(course.title);
    setDescription(course.description);
    setLevel(course.level);

    const { data: lessonData, error } = await supabase
      .from("lessons")
      .select("title, video_id, order_index")
      .eq("course_id", course.id)
      .order("order_index", { ascending: true });

    console.log("LESSONS:", lessonData, error);


    setLessons(
      lessonData?.map((l) => ({
        title: l.title,
        url: l.video_id,
      })) || [{ title: "", url: "" }]
    );


    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /* ================= DELETE COURSE ================= */
  const deleteCourse = async (id) => {
    if (!confirm("Hapus course ini?")) return;

    // hapus lessons dulu
    const { error: lessonError } = await supabase
      .from("lessons")
      .delete()
      .eq("course_id", id);

    if (lessonError) {
      console.error("Lesson delete error:", lessonError);
      alert("Gagal menghapus lesson");
      return;
    }

    // baru hapus course
    const { error: courseError } = await supabase
      .from("courses")
      .delete()
      .eq("id", id);

    if (courseError) {
      console.error("Course delete error:", courseError);
      alert("Gagal menghapus course");
      return;
    }

    loadCourses();
  };


  if (loading) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      <h1 className="text-2xl font-semibold">
        Manajemen Course
      </h1>

      {/* ================= FORM ================= */}
      <form
        onSubmit={handleSaveCourse}
        className="bg-white border rounded-xl p-6 space-y-4"
      >
        <h2 className="font-semibold text-lg">
          {editingCourse ? "Edit Course" : "Tambah Course"}
        </h2>

        <input
          placeholder="Judul Course"
          className="w-full border px-3 py-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Deskripsi"
          className="w-full border px-3 py-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="border px-3 py-2 rounded"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        {/* LESSON FORM */}
        <div className="space-y-3">
          <p className="font-medium">Lessons</p>

          {lessons.map((lesson, i) => (
            <div key={i} className="grid md:grid-cols-2 gap-3">
              <input
                placeholder={`Lesson ${i + 1}`}
                className="border px-3 py-2 rounded"
                value={lesson.title}
                onChange={(e) =>
                  updateLesson(i, "title", e.target.value)
                }
              />

              <input
                placeholder="Link YouTube"
                className="border px-3 py-2 rounded"
                value={lesson.url}
                onChange={(e) =>
                  updateLesson(i, "url", e.target.value)
                }
              />
            </div>
          ))}

          <button
            type="button"
            onClick={addLessonField}
            className="text-sm text-sky-700 hover:underline"
          >
            + Tambah lesson
          </button>
        </div>

        <div className="flex gap-3">
          <button className="bg-black text-white px-4 py-2 rounded-lg">
            Simpan
          </button>

          {editingCourse && (
            <button
              type="button"
              onClick={resetForm}
              className="border px-4 py-2 rounded-lg"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      {/* ================= COURSE LIST ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        {courses.map((c) => (
          <div
            key={c.id}
            className="bg-white border rounded-xl p-5 space-y-3"
          >
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              {c.level}
            </span>

            <h3 className="font-semibold">{c.title}</h3>

            <p className="text-sm text-gray-600">
              {c.description}
            </p>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => editCourse(c)}
                className="text-sm px-3 py-1 border rounded"
              >
                Edit
              </button>

              <button
                onClick={() => deleteCourse(c.id)}
                className="text-sm px-3 py-1 border rounded text-red-600"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
