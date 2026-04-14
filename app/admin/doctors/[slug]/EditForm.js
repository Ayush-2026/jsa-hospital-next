'use client'
import { useState } from "react"
import { useRouter } from "next/navigation";

export default function EditForm({doctor}) {
  

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
const [department_id, setDepartment_id] = useState(doctor.department_id);
const [redirect_link, setRedirect_link] = useState(doctor.redirect_link);
const router = useRouter();

  const handleSave = async ()=>{

  await fetch(`/api/admin/doctors/${doctor.slug}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name_en,name_hi,name_mr,specialization_en,specialization_hi,specialization_mr,bio_en,bio_hi,bio_mr,
      image_url,is_active,department_id,redirect_link
    }),
  });
  router.push("/admin/doctors");


  }
  
  
    return (
    <>
    
  <div className="max-w-3xl mx-auto p-8">
    <h2 className="text-2xl font-bold text-[#265957] mb-6">Edit Doctor</h2>

    {/* Name */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Name (English)</label>
      <input value={name_en} onChange={(e) => setName_en(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Name (Hindi)</label>
      <input value={name_hi} onChange={(e) => setName_hi(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Name (Marathi)</label>
      <input value={name_mr} onChange={(e) => setName_mr(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>

    {/* Specialization */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization (English)</label>
      <input value={specialization_en} onChange={(e) => setSpecialization_en(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization (Hindi)</label>
      <input value={specialization_hi} onChange={(e) => setSpecialization_hi(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization (Marathi)</label>
      <input value={specialization_mr} onChange={(e) => setSpecialization_mr(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>

    {/* Bio */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Bio (English)</label>
      <textarea value={bio_en} onChange={(e) => setBio_en(e.target.value)} rows={3} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Hindi)</label>
      <textarea value={bio_hi} onChange={(e) => setBio_hi(e.target.value)} rows={3} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Bio (Marathi)</label>
      <textarea value={bio_mr} onChange={(e) => setBio_mr(e.target.value)} rows={3} className="w-full border rounded-xl px-4 py-2" />
    </div>

    {/* Other */}
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
      <input value={image_url || ""} onChange={(e) => setImage_url(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Redirect Link</label>
      <input value={redirect_link || ""} onChange={(e) => setRedirect_link(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Department ID</label>
      <input value={department_id || ""} onChange={(e) => setDepartment_id(e.target.value)} className="w-full border rounded-xl px-4 py-2" />
    </div>
    <div className="mb-6 flex items-center gap-3">
      <input type="checkbox" checked={is_active} onChange={(e) => setIs_active(e.target.checked)} className="w-4 h-4" />
      <label className="text-sm font-medium text-gray-700">Active (visible on website)</label>
    </div>

    {/* Save */}
    <button
      onClick={handleSave}
      className="px-6 py-3 rounded-xl text-white font-semibold"
      style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
    >
      Save Changes
    </button>
  </div>


    </>
  )
}
