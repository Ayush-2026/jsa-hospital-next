"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function DoctorsFilter({ doctors, departments, lang, t }) {
  const [activeDept, setActiveDept] = useState("all");

  const pick = (row, key) => row[`${key}_${lang}`] || row[`${key}_en`];

  const filtered =
    activeDept === "all"
      ? doctors
      : doctors.filter((d) => d.department_id === activeDept);

  return (
    <>
      <style>{`
        @keyframes docBtnShine {
          0%   { left: -120%; }
          100% { left: 130%; }
        }
        .doc-filter-pill {
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          border: 1.5px solid rgba(30,122,98,0.2);
          background: white;
          color: #4b5563;
          transition: background 0.2s ease, color 0.2s ease,
                      border-color 0.2s ease, box-shadow 0.2s ease,
                      transform 0.2s ease;
          white-space: nowrap;
        }
        .doc-filter-pill:hover {
          border-color: #1e7a62;
          color: #1e7a62;
          transform: translateY(-1px);
        }
        .doc-filter-pill.active {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          color: white;
          border-color: transparent;
          box-shadow: 0 4px 14px rgba(30,122,98,0.3);
        }
        .doc-book-btn {
          position: relative;
          overflow: hidden;
          display: block;
          text-align: center;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          color: white;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.75rem;
          padding: 9px 12px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 3px 12px rgba(30,122,98,0.25);
        }
        @media (min-width: 640px) {
          .doc-book-btn { font-size: 0.875rem; padding: 10px 14px; }
        }
        .doc-book-btn::after {
          content: '';
          position: absolute;
          top: -50%; left: -120%;
          width: 55%; height: 200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%);
          transform: skewX(-15deg);
        }
        .doc-book-btn:hover::after { animation: docBtnShine 0.55s ease forwards; }
        .doc-book-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(30,122,98,0.38); }
        .doc-book-btn span { position: relative; z-index: 1; }
      `}</style>

      {/* Department filter pills */}
      <div className="mt-7 flex gap-2 flex-wrap">
        <button
          className={`doc-filter-pill ${activeDept === "all" ? "active" : ""}`}
          onClick={() => setActiveDept("all")}
        >
          {t.allDoctors}
        </button>
        {departments.map((dept) => (
          <button
            key={dept.uuid_id}
            className={`doc-filter-pill ${activeDept === dept.uuid_id ? "active" : ""}`}
            onClick={() => setActiveDept(dept.uuid_id)}
          >
            {dept.icon && <span className="mr-1">{dept.icon}</span>}
            {dept[`name_${lang}`] || dept.name_en}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mt-4 text-xs text-gray-400 font-medium">
        {t.showing} {filtered.length} {filtered.length !== 1 ? t.doctors : t.doctor}
      </p>

      {/* Doctors grid */}
      {filtered.length === 0 ? (
        <div className="mt-12 text-center text-gray-400 font-medium">
          {t.noResults}
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((d) => (
            <div
              key={d.id}
              className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition p-4 flex flex-col"
            >
              <Link href={`/${lang}/doctors/${d.slug}`} className="flex flex-col flex-1">
                <div className="relative w-full aspect-4/5 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src={d.image_url || "/assets/doctor-placeholder.png"}
                    alt={pick(d, "name")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
                <h3 className="mt-3 font-semibold text-gray-900 text-sm sm:text-base">
                  {pick(d, "name")}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-1">
                  {pick(d, "specialization")}
                </p>
              </Link>

              <a
                href={d.redirect_link}
                target="_blank"
                rel="noopener noreferrer"
                className="doc-book-btn mt-3"
              >
                <span>{t.bookAppointment}</span>
              </a>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
