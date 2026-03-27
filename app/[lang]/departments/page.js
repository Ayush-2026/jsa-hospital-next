// app/[lang]/departments/page.js
import { getDepartments } from "@/lib/queries/departments";
import DepartmentGrid from "@/components/departments/DepartmentGrid";

export default async function DepartmentsPage({ params }) {
  const { lang } = await params;
  const safeLang = (lang || "en").toLowerCase();
  const departments = await getDepartments();

  return (
    <div
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265957] tracking-tight">Our Departments</h1>
        <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">
          Explore our specialized centres of clinical excellence.
        </p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: 'linear-gradient(to right, #1e7a62, #2c608e)' }} />

        <DepartmentGrid departments={departments} lang={safeLang} />
      </div>
    </div>
  );
}
