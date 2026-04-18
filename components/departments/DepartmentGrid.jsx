"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

function useInView(ref) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return inView;
}

function DeptCard({ dept, lang, index }) {
  const ref = useRef(null);
  const inView = useInView(ref);

  // stagger: each card delays by 60ms × index within its row (group of 4)
  const delay = (index % 4) * 80;

  return (
    <div
      ref={ref}
      className="dept-page-card"
      style={{
        transitionDelay: inView ? `${delay}ms` : "0ms",
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
      }}
    >
      <Link href={`/${lang}/departments/${dept.slug}`} className="block h-full">
        <div className="text-4xl sm:text-5xl mb-4">{dept.icon}</div>
        <div className="dept-page-name text-sm sm:text-[15px] font-extrabold text-gray-900 tracking-tight leading-snug">
          {dept[`name_${lang}`] || dept.name_en}
        </div>
        <div className="dept-page-desc mt-2 text-[11px] sm:text-xs font-medium text-gray-400 line-clamp-2 leading-relaxed">
          {dept[`short_desc_${lang}`] || dept.short_desc || "Specialized care & advanced treatment."}
        </div>
      </Link>
    </div>
  );
}

export default function DepartmentGrid({ departments, lang }) {
  return (
    <>
      <style>{`
        .dept-page-card {
          background: white;
          border: 1.5px solid rgba(30,122,98,0.18);
          border-radius: 18px;
          padding: 28px 18px 24px;
          min-height: 170px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
          transition:
            opacity 0.5s ease,
            transform 0.5s ease,
            box-shadow 0.35s ease,
            border-color 0.35s ease;
          box-shadow: 0 2px 12px rgba(44,96,142,0.09);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        @media (min-width: 640px) {
          .dept-page-card { min-height: 190px; padding: 32px 22px 26px; }
        }
        .dept-page-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(30,122,98,0.12), rgba(44,96,142,0.12));
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          z-index: 0;
        }
        .dept-page-card:hover::before { opacity: 1; }
        .dept-page-card:hover {
          transform: scale(1.05) translateY(-5px) !important;
          box-shadow: 0 20px 48px rgba(30,122,98,0.24), 0 4px 16px rgba(44,96,142,0.15);
          border-color: rgba(30,122,98,0.4);
        }
        .dept-page-card > a { display: flex; flex-direction: column; height: 100%; }
        .dept-page-card > a > * { position: relative; z-index: 1; }
        .dept-page-name { transition: color 0.3s ease; }
        .dept-page-card:hover .dept-page-name { color: #1e7a62; }
        .dept-page-desc { transition: color 0.3s ease; }
        .dept-page-card:hover .dept-page-desc { color: #2c608e; opacity: 0.9; }
      `}</style>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
        {departments.map((d, i) => (
          <DeptCard key={d.slug} dept={d} lang={lang} index={i} />
        ))}
      </div>
    </>
  );
}
