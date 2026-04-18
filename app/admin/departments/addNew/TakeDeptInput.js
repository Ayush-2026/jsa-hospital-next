"use client";
import { useState } from "react";
import slugify from "slugify";
import { useRouter } from "next/navigation";

export default function EditFormDept({}) {
  const [name_en, setName_en] = useState('');
  const [name_hi, setName_hi] = useState('');
  const [name_mr, setName_mr] = useState('');
  const [short_desc, setShort_desc] = useState('');
  const [short_desc_hi, setShort_desc_hi] = useState('');
  const [short_desc_mr, setShort_desc_mr] = useState('');
  const [description_en, setDescription_en] = useState('');
  const [description_hi, setDescription_hi] = useState('');
  const [description_mr, setDescription_mr] = useState('');
  const [image_url, setImage_url] = useState('');
  const [cover_image, setCover_image] = useState('');
  const [icon, setIcon] = useState("");
  const [is_active, setIs_active] = useState(true);
  const router = useRouter();

  const handleSave = async () => {
    const newSlug = slugify(name_en, { strict: true, lower: true });
    await fetch(`/api/admin/departments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name_en,
        cover_image,
        name_hi,
        name_mr,
        short_desc,
        short_desc_hi,
        short_desc_mr,
        description_en,
        description_hi,
        description_mr,
        image_url,
        icon,
        slug: newSlug,
        is_active,
      }),
    });
    router.push("/admin/departments");
  };

  const inputClass =
    "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";
  const field = (label, value, setter, big = false) => (
    <div className="mb-5">
      <label className={labelClass}>{label}</label>
      {big ? (
        <textarea
          value={value || ""}
          onChange={(e) => setter(e.target.value)}
          rows={8}
          className={inputClass}
        />
      ) : (
        <input
          value={value || ""}
          onChange={(e) => setter(e.target.value)}
          className={inputClass}
        />
      )}
    </div>
  );

  return (
    <div
      className="min-h-screen py-10"
      style={{
        background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#265957] mb-1">
          Add New Department
        </h2>
        <p className="text-sm text-gray-400 mb-6">
          Changes will reflect on the public site immediately after saving.
        </p>
        <div className="h-px bg-gray-100 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
          {field("Name (English)", name_en, setName_en)}
          {field("Name (Hindi)", name_hi, setName_hi)}
          {field("Name (Marathi)", name_mr, setName_mr)}
        </div>

        {field("Icon (emoji)", icon, setIcon)}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
          {field("Short Desc (English)", short_desc, setShort_desc)}
          {field("Short Desc (Hindi)", short_desc_hi, setShort_desc_hi)}
          {field("Short Desc (Marathi)", short_desc_mr, setShort_desc_mr)}
        </div>
        {field(
          "Description (English)",
          description_en,
          setDescription_en,
          true,
        )}
        {field("Description (Hindi)", description_hi, setDescription_hi, true)}
        {field(
          "Description (Marathi)",
          description_mr,
          setDescription_mr,
          true,
        )}
        {field("Image URL", image_url, setImage_url)}
        {field("Cover Image URL", cover_image, setCover_image)}

        <div className="mb-5 flex items-center gap-3">
          <label className={labelClass + " mb-0"}>Active</label>
          <input
            type="checkbox"
            checked={is_active}
            onChange={(e) => setIs_active(e.target.checked)}
            className="w-4 h-4 accent-[#1e7a62] cursor-pointer"
          />
          <span className="text-xs text-gray-400">{is_active ? "Visible on site" : "Hidden from site"}</span>
        </div>

        <button
          onClick={handleSave}
          className="mt-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
        >
          Add Department
        </button>
      </div>
    </div>
  );
}
