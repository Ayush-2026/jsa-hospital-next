"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const LANGS = [
  { key: "en", label: "English" },
  { key: "hi", label: "हिन्दी" },
  { key: "mr", label: "मराठी" },
];

export default function TestimonialForm({ initial = null }) {
  const router = useRouter();
  const isEdit = !!initial;

  const [activeLang, setActiveLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name_en: initial?.name_en || "",
    name_hi: initial?.name_hi || "",
    name_mr: initial?.name_mr || "",
    review_en: initial?.review_en || "",
    review_hi: initial?.review_hi || "",
    review_mr: initial?.review_mr || "",
    photo_url: initial?.photo_url || "",
    is_published: initial?.is_published ?? true,
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name_en.trim()) { setError("English name is required."); return; }
    if (!form.review_en.trim()) { setError("English review is required."); return; }
    setSaving(true);
    setError("");

    const url = isEdit ? `/api/admin/testimonials/${initial.id}` : "/api/admin/testimonials";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);

    if (data.success) {
      router.push("/admin/testimonials");
      router.refresh();
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
      {/* Language tabs */}
      <div className="flex gap-2 mb-6">
        {LANGS.map((l) => (
          <button
            key={l.key}
            type="button"
            onClick={() => setActiveLang(l.key)}
            className={`px-5 py-2 rounded-xl font-semibold text-sm transition ${
              activeLang === l.key ? "text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            style={activeLang === l.key ? { background: "linear-gradient(to right, #1e7a62, #2c608e)" } : {}}
          >
            {l.label}
          </button>
        ))}
      </div>

      {/* Per-language fields */}
      {LANGS.map((l) => (
        <div key={l.key} className={activeLang === l.key ? "block" : "hidden"}>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Name ({l.label}) {l.key === "en" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={form[`name_${l.key}`]}
              onChange={(e) => set(`name_${l.key}`, e.target.value)}
              placeholder={`Patient name in ${l.label}`}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Review ({l.label}) {l.key === "en" && <span className="text-red-500">*</span>}
              <span className="text-gray-400 font-normal"> — keep it short, about 3–4 lines</span>
            </label>
            <textarea
              value={form[`review_${l.key}`]}
              onChange={(e) => set(`review_${l.key}`, e.target.value)}
              rows={4}
              placeholder={`Testimonial text in ${l.label}`}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40"
            />
          </div>
        </div>
      ))}

      {/* Shared fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL <span className="text-gray-400 font-normal">(optional, shown as a circular photo)</span></label>
        <input
          type="text"
          value={form.photo_url}
          onChange={(e) => set("photo_url", e.target.value)}
          placeholder="https://..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40"
        />
      </div>

      <div className="mb-6 flex items-center gap-3">
        <input
          type="checkbox"
          id="is_published"
          checked={form.is_published}
          onChange={(e) => set("is_published", e.target.checked)}
          className="w-4 h-4 accent-[#1e7a62]"
        />
        <label htmlFor="is_published" className="text-sm font-semibold text-gray-700">Published (visible on website)</label>
      </div>

      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm disabled:opacity-60 transition"
          style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
        >
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish Testimonial"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/testimonials")}
          className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
