'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function EditForm({ doctor, departments_edit }) {
  const [name_en, setName_en] = useState(doctor.name_en);
  const [name_hi, setName_hi] = useState(doctor.name_hi);
  const [name_mr, setName_mr] = useState(doctor.name_mr);
  const [specialization_en, setSpecialization_en] = useState(doctor.specialization_en);
  const [specialization_hi, setSpecialization_hi] = useState(doctor.specialization_hi);
  const [specialization_mr, setSpecialization_mr] = useState(doctor.specialization_mr);
  const [bio_en, setBio_en] = useState(doctor.bio_en);
  const [bio_hi, setBio_hi] = useState(doctor.bio_hi);
  const [bio_mr, setBio_mr] = useState(doctor.bio_mr);
  const [image_url, setImage_url] = useState(doctor.image_url);
  const [is_active, setIs_active] = useState(doctor.is_active);
  const [department, setDepartment] = useState(doctor.department_id || "");
  const [redirect_link, setRedirect_link] = useState(doctor.redirect_link);
  const router = useRouter();

  const handleSave = async () => {
    await fetch(`/api/admin/doctors/${doctor.slug}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name_en, name_hi, name_mr, specialization_en, specialization_hi, specialization_mr, bio_en, bio_hi, bio_mr, image_url, is_active, department_id: department, redirect_link }),
    });
    router.push("/admin/doctors");
  };

  const inputClass = "w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40";
  const labelClass = "block text-sm font-medium text-gray-600 mb-1";

  const field = (label, value, setter, big = false) => (
    <div className="mb-5">
      <label className={labelClass}>{label}</label>
      {big
        ? <textarea value={value || ""} onChange={(e) => setter(e.target.value)} rows={8} className={inputClass} />
        : <input value={value || ""} onChange={(e) => setter(e.target.value)} className={inputClass} />
      }
    </div>
  );

  return (
    <div className="min-h-screen py-10" style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-[#265957] mb-1">Edit Doctor</h2>
        <p className="text-sm text-gray-400 mb-6">Changes will reflect on the public site immediately after saving.</p>
        <div className="h-px bg-gray-100 mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {field("Name (English)", name_en, setName_en)}
          {field("Name (Hindi)", name_hi, setName_hi)}
          {field("Name (Marathi)", name_mr, setName_mr)}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {field("Specialization (English)", specialization_en, setSpecialization_en)}
          {field("Specialization (Hindi)", specialization_hi, setSpecialization_hi)}
          {field("Specialization (Marathi)", specialization_mr, setSpecialization_mr)}
        </div>

        {field("Bio (English)", bio_en, setBio_en, true)}
        {field("Bio (Hindi)", bio_hi, setBio_hi, true)}
        {field("Bio (Marathi)", bio_mr, setBio_mr, true)}
        {field("Image URL", image_url, setImage_url)}
        {field("Redirect Link (Booking)", redirect_link, setRedirect_link)}

        <div className="mb-5">
          <label className={labelClass}>Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)} className={inputClass}>
            <option value="">Select Department</option>
            {departments_edit.map((d) => (
              <option key={d.uuid_id} value={d.uuid_id}>{d.name_en}</option>
            ))}
          </select>
        </div>

        <div className="mb-6 flex items-center gap-3">
          <input type="checkbox" checked={is_active} onChange={(e) => setIs_active(e.target.checked)} className="w-4 h-4 accent-[#1e7a62]" />
          <label className="text-sm font-medium text-gray-700">Active (visible on website)</label>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90"
          style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
