"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { TAG_THEMES } from "@/lib/tagThemes";

const LANGS = [
  { key: "en", label: "English" },
  { key: "hi", label: "हिन्दी" },
  { key: "mr", label: "मराठी" },
];

// Shared form for Events and Updates — the two are structurally identical
// (tag/title/desc per language, a date, a colour theme, a published flag),
// differing only in which date column and API base path they use.
export default function TagItemForm({ initial = null, dateField, apiBase, listHref, dateLabel }) {
  const router = useRouter();
  const isEdit = !!initial;

  const [activeLang, setActiveLang] = useState("en");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const initialTheme = TAG_THEMES.find((t) => t.color === initial?.tag_color) || TAG_THEMES[0];

  const [form, setForm] = useState({
    tag_en: initial?.tag_en || "",
    tag_hi: initial?.tag_hi || "",
    tag_mr: initial?.tag_mr || "",
    title_en: initial?.title_en || "",
    title_hi: initial?.title_hi || "",
    title_mr: initial?.title_mr || "",
    desc_en: initial?.desc_en || "",
    desc_hi: initial?.desc_hi || "",
    desc_mr: initial?.desc_mr || "",
    [dateField]: initial?.[dateField] ? String(initial[dateField]).slice(0, 10) : "",
    tag_color: initialTheme.color,
    tag_bg: initialTheme.bg,
    is_published: initial?.is_published ?? true,
  });

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title_en.trim()) { setError("English title is required."); return; }
    setSaving(true);
    setError("");

    const url = isEdit ? `${apiBase}/${initial.id}` : apiBase;
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);

    if (data.success) {
      router.push(listHref);
      router.refresh();
    } else {
      setError(data.error || "Something went wrong.");
    }
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40";

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
            <label className="block text-sm font-semibold text-gray-700 mb-1">Tag ({l.label}) <span className="text-gray-400 font-normal">e.g. Health Camp, Workshop</span></label>
            <input
              type="text"
              value={form[`tag_${l.key}`]}
              onChange={(e) => set(`tag_${l.key}`, e.target.value)}
              placeholder={`Category label in ${l.label}`}
              className={inputClass}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title ({l.label}) {l.key === "en" && <span className="text-red-500">*</span>}
            </label>
            <input
              type="text"
              value={form[`title_${l.key}`]}
              onChange={(e) => set(`title_${l.key}`, e.target.value)}
              placeholder={`Title in ${l.label}`}
              className={inputClass}
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-1">Description ({l.label})</label>
            <textarea
              value={form[`desc_${l.key}`]}
              onChange={(e) => set(`desc_${l.key}`, e.target.value)}
              rows={4}
              placeholder={`Description in ${l.label}`}
              className={inputClass}
            />
          </div>
        </div>
      ))}

      {/* Shared fields */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">{dateLabel}</label>
        <input
          type="date"
          value={form[dateField]}
          onChange={(e) => set(dateField, e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Tag Colour</label>
        <div className="flex gap-3 flex-wrap">
          {TAG_THEMES.map((theme) => (
            <button
              key={theme.label}
              type="button"
              onClick={() => { set("tag_color", theme.color); set("tag_bg", theme.bg); }}
              className="flex items-center gap-2 px-3 py-2 rounded-xl border-2 text-sm font-semibold transition"
              style={{
                borderColor: form.tag_color === theme.color ? theme.color : "transparent",
                background: theme.bg,
                color: theme.color,
              }}
            >
              <span className="w-3 h-3 rounded-full" style={{ background: theme.color }} />
              {theme.label}
            </button>
          ))}
        </div>
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
          {saving ? "Saving…" : isEdit ? "Save Changes" : "Publish"}
        </button>
        <button
          type="button"
          onClick={() => router.push(listHref)}
          className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
