// app/[lang]/departments/[slug]/page.js
import { notFound } from "next/navigation";
import Link from "next/link";
import { getDepartmentBySlug, getDepartments } from "@/lib/queries/departments";
import { getDoctorsByDepartmentUuid } from "@/lib/queries/doctors";
import { tr } from "@/lib/translations";

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
  const t = tr(lang).departments;

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0%   { left: -120%; }
          100% { left: 130%; }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        .dept-hero-banner {
          position: relative;
          width: 100%;
          height: 280px;
          overflow: hidden;
          border-radius: 0 0 32px 32px;
        }
        @media (min-width: 640px) { .dept-hero-banner { height: 360px; } }
        @media (min-width: 1024px) { .dept-hero-banner { height: 420px; } }
        .dept-hero-banner img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .dept-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(30,122,98,0.55) 100%);
        }
        .dept-hero-text {
          position: absolute;
          bottom: 32px;
          left: 32px;
          color: white;
          animation: fadeUp 0.7s ease both;
        }
        .dept-content {
          animation: fadeUp 0.6s ease 0.2s both;
        }
        .dept-desc-card {
          background: white;
          border-radius: 20px;
          border: 1.5px solid rgba(30,122,98,0.12);
          padding: 28px 32px;
          box-shadow: 0 4px 24px rgba(44,96,142,0.08);
          position: relative;
          overflow: hidden;
        }
        .dept-desc-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 4px;
          height: 100%;
          background: linear-gradient(to bottom, #1e7a62, #2c608e);
          border-radius: 4px 0 0 4px;
        }
        .dept-doc-card {
          background: white;
          border: 1.5px solid rgba(30,122,98,0.12);
          border-radius: 18px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease, border-color 0.3s ease;
          box-shadow: 0 2px 12px rgba(44,96,142,0.08);
          animation: fadeUp 0.5s ease both;
        }
        .dept-doc-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 20px 48px rgba(30,122,98,0.22), 0 4px 16px rgba(44,96,142,0.12);
          border-color: rgba(30,122,98,0.35);
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
          padding: 11px 14px;
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
        .dept-doc-book-btn:hover::after { animation: shimmer 0.55s ease forwards; }
        .dept-doc-book-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(30,122,98,0.38);
        }
        .dept-doc-book-btn span { position: relative; z-index: 1; }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #1e7a62;
          transition: gap 0.2s ease;
        }
        .back-link:hover { gap: 10px; }
        .section-title {
          font-size: 1.4rem;
          font-weight: 800;
          color: #265957;
          position: relative;
          display: inline-block;
          padding-bottom: 8px;
        }
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 40px; height: 3px;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          border-radius: 4px;
        }
      `}</style>

      {/* Hero Banner */}
      {dept.cover_image && (
        <div className="dept-hero-banner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={dept.cover_image} alt={deptName} />
          <div className="dept-hero-overlay" />
          <div className="dept-hero-text">
            <div className="text-4xl mb-2">{dept.icon}</div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight drop-shadow-lg">{deptName}</h1>
            <p className="text-white/80 text-sm mt-1">{pickLang(lang, dept, "short_desc")}</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-8 dept-content">

        {/* Back link */}
        <Link href={`/${lang}/departments`} className="back-link">
          {t.backToDepartments}
        </Link>

        {/* Title (if no cover image) */}
        {!dept.cover_image && (
          <div className="mt-6 flex items-center gap-3">
            <div className="text-4xl">{dept.icon}</div>
            <div>
              <h1 className="text-3xl font-extrabold text-[#265957]">{deptName}</h1>
              <p className="text-sm text-gray-400 mt-1">{pickLang(lang, dept, "short_desc")}</p>
            </div>
          </div>
        )}

        {/* Description */}
        {deptDesc && (
          <div className="dept-desc-card mt-8">
            <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm sm:text-base">{deptDesc}</p>
          </div>
        )}

        {/* Doctors */}
        <div className="mt-12">
          <h2 className="section-title">{t.doctorsInDept}</h2>

          {doctors.length === 0 ? (
            <p className="mt-6 text-gray-500">{t.noDoctors}</p>
          ) : (
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {doctors.map((doc, i) => {
                const doctorName = pickLang(lang, doc, "name");
                const spec = pickLang(lang, doc, "specialization");
                return (
                  <div key={doc.id} className="dept-doc-card" style={{ animationDelay: `${i * 80}ms` }}>
                    <Link href={`/${lang}/doctors/${doc.slug}`} className="block flex-1 p-4">
                      {doc.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={doc.image_url} alt={doctorName} className="w-full h-48 object-cover rounded-xl" />
                      )}
                      <div className="mt-3 font-bold text-base text-gray-900">{doctorName}</div>
                      {spec && <div className="text-xs text-gray-500 mt-1 font-medium">{spec}</div>}
                    </Link>
                    <a href={doc.redirect_link || `/${lang}/consultation?doctor=${encodeURIComponent(doc.slug)}`} target={doc.redirect_link ? "_blank" : "_self"} className="dept-doc-book-btn">
                      <span>{t.bookAppointment}</span>
                    </a>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
