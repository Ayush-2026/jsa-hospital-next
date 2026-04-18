import Link from 'next/link'
import { getDepartments } from '@/lib/queries/departments'
import DeleteDeptButton from './DeleteDeptButton'
import { Plus } from 'lucide-react'

export default async function DepartmentsPage() {
  const departments = await getDepartments();
  const pick = (row, key) => row[`${key}_en`]

  return (
    <>
      <style>{`
        .dept-admin-card {
          background: white;
          border-radius: 18px;
          border: 1.5px solid rgba(30,122,98,0.12);
          padding: 24px 20px 18px;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 2px 12px rgba(44,96,142,0.07);
          position: relative;
          overflow: hidden;
        }
        .dept-admin-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30,122,98,0.06), rgba(44,96,142,0.06));
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
        }
        .dept-admin-card:hover::before { opacity: 1; }
        .dept-admin-card:hover {
          box-shadow: 0 12px 36px rgba(30,122,98,0.18), 0 4px 16px rgba(44,96,142,0.10);
          transform: translateY(-3px);
          border-color: rgba(30,122,98,0.3);
        }
        .btn-edit {
          padding: 6px 16px;
          border-radius: 10px;
          font-size: 0.8rem;
          font-weight: 600;
          color: white;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          transition: opacity 0.2s ease, transform 0.2s ease;
          position: relative;
          z-index: 1;
        }
        .btn-edit:hover { opacity: 0.9; transform: translateY(-1px); }
        .dept-add-card {
          background: white;
          border-radius: 18px;
          border: 1.5px dashed rgba(30,122,98,0.3);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 160px;
          cursor: pointer;
          transition: box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          color: #1e7a62;
        }
        .dept-add-card:hover {
          background: rgba(30,122,98,0.04);
          border-color: #1e7a62;
          box-shadow: 0 8px 24px rgba(30,122,98,0.12);
        }
      `}</style>

      <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 sm:px-8 py-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265957] tracking-tight">Departments</h1>
          <p className="mt-2 text-sm sm:text-base font-medium text-gray-500">Add, edit and delete departments.</p>
          <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {departments.map((d) => (
              <div key={d.slug} className="dept-admin-card">
                <div className="text-4xl mb-3" style={{ position: 'relative', zIndex: 1 }}>{d.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1" style={{ position: 'relative', zIndex: 1 }}>{pick(d, "name")}</h3>
                <p className="text-xs text-gray-400 truncate mb-4" style={{ position: 'relative', zIndex: 1 }}>{d.short_desc}</p>
                <div className="flex gap-2 mt-auto" style={{ position: 'relative', zIndex: 1 }}>
                  <Link href={`/admin/departments/${d.slug}`} className="btn-edit">Edit</Link>
                  <DeleteDeptButton slug={d.slug} />
                </div>
              </div>
            ))}

            <Link href="/admin/departments/addNew">
              <div className="dept-add-card">
                <Plus size={40} strokeWidth={1.5} />
                <p className="mt-3 font-semibold text-base">Add new department</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
