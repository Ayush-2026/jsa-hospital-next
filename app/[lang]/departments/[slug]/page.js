// app/[lang]/departments/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartmentBySlug, getDepartments } from "@/lib/queries/departments";
import { getDoctorsByDepartmentUuid } from "@/lib/queries/doctors";

export async function generateStaticParams() {
  const departments = await getDepartments();
  const langs = ["en", "hi", "mr"];
  return langs.flatMap((lang) =>
    departments.map((d) => ({ lang, slug: d.slug }))
  );
}

function pickLang(lang, obj, keyBase) {
  if (lang === "hi") return obj[`${keyBase}_hi`] || obj[`${keyBase}_en`] || "";
  if (lang === "mr") return obj[`${keyBase}_mr`] || obj[`${keyBase}_en`] || "";
  return obj[`${keyBase}_en`] || "";
}



export default async function DepartmentDetail({ params }) {
  const { lang, slug } = await params;

  const dept = await getDepartmentBySlug(slug);
  if (!dept) return notFound();

  const deptName = pickLang(lang, dept, "name");
  const deptDesc = pickLang(lang, dept, "description");

  const doctors = await getDoctorsByDepartmentUuid(dept.uuid_id);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10">
      <Link
        href={`/${lang}/departments`}
        className="text-sm text-blue-700 hover:underline"
      >
        ← Back to Departments
      </Link>

      {/* Horizontal image */}
      <div className="mt-4 overflow-hidden rounded-2xl border bg-gray-50">
        {dept.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={dept.image_url}
            alt={deptName}
            className="w-full h-44 sm:h-56 md:h-64 object-cover"
          />
        ) : (
          <div className="w-full h-44 sm:h-56 md:h-64 grid place-items-center text-gray-500">
            No image
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="text-3xl">{dept.icon}</div>
        <h1 className="text-3xl font-bold text-[#265957]">{deptName}</h1>
      </div>

      {/* Long description - keep line breaks */}
      <p className="mt-5 text-gray-700 leading-relaxed whitespace-pre-line">
        {deptDesc || "Description coming soon."}
      </p>

      <h2 className="mt-10 text-xl font-semibold text-[#265957]">
        Doctors in this department
      </h2>

      <style>{`
        @keyframes deptDocShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        .dept-doc-card {
          background: white;
          border: 1px solid rgba(30,122,98,0.12);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 2px 10px rgba(44,96,142,0.08);
        }
        .dept-doc-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 16px 36px rgba(30,122,98,0.2), 0 4px 12px rgba(44,96,142,0.12);
          border-color: rgba(30,122,98,0.3);
        }
        .dept-doc-book-btn {
          position: relative;
          overflow: hidden;
          display: block;
          text-align: center;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          color: white;
          font-weight: 700;
          font-size: 0.8rem;
          padding: 10px 14px;
          transition: box-shadow 0.25s ease, transform 0.25s ease;
          box-shadow: 0 3px 10px rgba(30,122,98,0.25);
        }
        .dept-doc-book-btn::after {
          content: '';
          position: absolute;
          top: -50%; left: -120%;
          width: 55%; height: 200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%);
          transform: skewX(-15deg);
        }
        .dept-doc-book-btn:hover::after { animation: deptDocShine 0.55s ease forwards; }
        .dept-doc-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(30,122,98,0.38);
        }
        .dept-doc-book-btn span { position: relative; z-index: 1; }
      `}</style>

      {doctors.length === 0 ? (
        <p className="mt-2 text-gray-600">
          No doctors listed under this department yet.
        </p>
      ) : (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doc) => {
            const doctorName = pickLang(lang, doc, "name");
            const spec = pickLang(lang, doc, "specialization");

            return (
              <div key={doc.id} className="dept-doc-card">
                {/* Clickable top section → doctor profile */}
                <Link href={`/${lang}/doctors/${doc.slug}`} className="block flex-1 p-4">
                  {doc.image_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={doc.image_url}
                      alt={doctorName}
                      className="w-full h-44 object-cover rounded-xl"
                    />
                  )}
                  <div className="mt-3 font-bold text-base text-gray-900">{doctorName}</div>
                  {spec && (
                    <div className="text-xs text-gray-500 mt-1 font-medium">{spec}</div>
                  )}
                </Link>

                {/* Book appointment button */}
                <Link
                  href={`/${lang}/consultation?doctor=${encodeURIComponent(doc.slug)}`}
                  className="dept-doc-book-btn"
                >
                  <span>Book Appointment</span>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
