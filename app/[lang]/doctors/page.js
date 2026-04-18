import { getDoctors } from "@/lib/queries/doctors";
import { getDepartments } from "@/lib/queries/departments";
import DoctorsFilter from "./DoctorsFilter";
import { tr } from "@/lib/translations";

export default async function DoctorsPage({ params }) {
  const { lang } = await params;
  const [doctors, departments] = await Promise.all([getDoctors(), getDepartments()]);
  const activeDoctors = doctors.filter((d) => d.is_active);
  const t = tr(lang);

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265957] tracking-tight">
          {t.doctors.title}
        </h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">
          {t.doctors.subtitle}
        </p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

        <DoctorsFilter doctors={activeDoctors} departments={departments} lang={lang} t={t.doctors} />
      </div>
    </div>
  );
}
