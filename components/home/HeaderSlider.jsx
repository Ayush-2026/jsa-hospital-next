"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { tr } from "@/lib/translations";

/* ── tiny inline SVG icons ── */
const IconStethoscope = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="5" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M10 6 C10 6 6 6 6 12 L6 22 C6 28 12 32 18 32 C24 32 30 28 30 22 L30 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M10 6 L16 6 C16 6 16 14 10 14 C4 14 4 6 10 6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconCross = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <rect x="15" y="2" width="10" height="36" rx="4"/>
    <rect x="2" y="15" width="36" height="10" rx="4"/>
  </svg>
);
const IconPill = ({ className }) => (
  <svg className={className} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="4" y="15" width="32" height="10" rx="5" stroke="currentColor" strokeWidth="2.5"/>
    <line x1="20" y1="15" x2="20" y2="25" stroke="currentColor" strokeWidth="2.5"/>
  </svg>
);
const IconDNA = ({ className }) => (
  <svg className={className} viewBox="0 0 30 50" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 2 C5 2 25 12 25 25 C25 38 5 48 5 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M25 2 C25 2 5 12 5 25 C5 38 25 48 25 48" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <line x1="5" y1="14" x2="25" y2="14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="5" y1="25" x2="25" y2="25" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    <line x1="5" y1="36" x2="25" y2="36" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);
const IconHeart = ({ className }) => (
  <svg className={className} viewBox="0 0 40 36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 34 C20 34 2 22 2 11 C2 5.5 6.5 1 12 1 C15.5 1 18.5 2.8 20 5.5 C21.5 2.8 24.5 1 28 1 C33.5 1 38 5.5 38 11 C38 22 20 34 20 34Z"/>
  </svg>
);

const statValues = ["500+", "50K+", "24/7", "30+"];

const HeaderSlider = ({ images = [], lang = "en", doctors = [], departments = [] }) => {
  const t = tr(lang).home.slider;
  const stats = statValues.map((value, i) => ({ value, label: t.stats[i] }));
  const slides = useMemo(() => {
    if (!images || images.length === 0) {
      return ["/slider/slide1.jpg", "/slider/slide2.jpg", "/slider/slide3.jpg"];
    }
    return images;
  }, [images]);

  const router = useRouter();
  const [current, setCurrent] = useState(0);

  // Search
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const searchRef = useRef(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return { doctors: [], departments: [] };
    const matchedDoctors = doctors.filter((d) => {
      const name = (d[`name_${lang}`] || d.name_en || "").toLowerCase();
      const spec = (d[`specialization_${lang}`] || d.specialization_en || "").toLowerCase();
      return name.includes(q) || spec.includes(q);
    }).slice(0, 5);
    const matchedDepts = departments.filter((d) => {
      const name = (d[`name_${lang}`] || d.name_en || "").toLowerCase();
      return name.includes(q);
    }).slice(0, 4);
    return { doctors: matchedDoctors, departments: matchedDepts };
  }, [query, doctors, departments, lang]);

  const hasResults = results.doctors.length > 0 || results.departments.length > 0;

  useEffect(() => {
    function handleClick(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setOpen(false);
    }
    function handleKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => { document.removeEventListener("mousedown", handleClick); document.removeEventListener("keydown", handleKey); };
  }, []);

  const goPrev = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((p) => (p + 1) % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => setCurrent((p) => (p + 1) % slides.length), 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section
      className="mt-3 sm:mt-5 w-full py-3 sm:py-6 md:py-10 relative"
      style={{ background: "linear-gradient(135deg, #1e7a62 0%, #1a6b7a 40%, #2c608e 100%)" }}
    >
      <style>{`
        @keyframes floatA {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(-14px) rotate(8deg); }
        }
        @keyframes floatB {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          50%      { transform: translateY(10px) rotate(-6deg); }
        }
        @keyframes floatC {
          0%,100% { transform: translateY(0px) rotate(0deg); }
          33%      { transform: translateY(-8px) rotate(5deg); }
          66%      { transform: translateY(6px) rotate(-4deg); }
        }
        @keyframes pulseRing {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.9); opacity: 0; }
        }
        @keyframes hbLine {
          0%   { stroke-dashoffset: 400; }
          60%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -400; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .fa { animation: floatA 5s ease-in-out infinite; }
        .fb { animation: floatB 6s ease-in-out infinite; }
        .fc { animation: floatC 7s ease-in-out infinite; }
        .hb-path { stroke-dasharray: 400; animation: hbLine 3s ease-in-out infinite; }
        .stat-card { animation: fadeSlideUp 0.6s ease both; }
      `}</style>

      {/* ── Background floating medical icons ── */}
      {/* Left cluster */}
      <div className="fa absolute left-4 sm:left-10 top-8 text-white/10 hidden sm:block" style={{ width: 64, height: 64 }}>
        <IconStethoscope className="w-16 h-16" />
      </div>
      <div className="fb absolute left-2 sm:left-16 bottom-12 text-white/10 hidden sm:block" style={{ width: 44 }}>
        <IconDNA className="w-11 h-auto" />
      </div>
      <div className="fc absolute left-1/4 top-4 text-white/8 hidden md:block" style={{ width: 36 }}>
        <IconCross className="w-9 h-9" />
      </div>

      {/* Right cluster */}
      <div className="fb absolute right-4 sm:right-10 top-10 text-white/10 hidden sm:block" style={{ width: 52 }}>
        <IconHeart className="w-13 h-auto" />
      </div>
      <div className="fa absolute right-2 sm:right-20 bottom-10 text-white/10 hidden sm:block" style={{ width: 40 }}>
        <IconPill className="w-10 h-10" />
      </div>
      <div className="fc absolute right-1/4 top-6 text-white/8 hidden md:block" style={{ width: 30 }}>
        <IconCross className="w-8 h-8" />
      </div>

      {/* Heartbeat SVG across background */}
      <svg
        className="absolute inset-x-0 hidden sm:block"
        style={{ bottom: 0, width: "100%", height: 48, pointerEvents: "none", opacity: 0.12 }}
        viewBox="0 0 1200 48" preserveAspectRatio="none"
      >
        <path
          className="hb-path"
          d="M0,24 L150,24 L200,24 L220,4 L240,44 L260,4 L280,44 L300,24 L350,24
             L500,24 L520,24 L540,4 L560,44 L580,4 L600,44 L620,24 L680,24
             L850,24 L870,24 L890,4 L910,44 L930,4 L950,44 L970,24 L1050,24 L1200,24"
          fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round"
        />
      </svg>

      {/* Pulse ring decoration */}
      <div className="absolute hidden sm:block" style={{ left: "8%", top: "50%", transform: "translateY(-50%)" }}>
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.2)", animation:"pulseRing 2.4s ease-out infinite" }} />
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.15)", animation:"pulseRing 2.4s ease-out 0.8s infinite" }} />
        <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <IconHeart className="w-6 h-6 text-white/60" />
        </div>
      </div>
      <div className="absolute hidden sm:block" style={{ right: "8%", top: "50%", transform: "translateY(-50%)" }}>
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.2)", animation:"pulseRing 2.8s ease-out 0.4s infinite" }} />
        <span style={{ position:"absolute", inset:0, borderRadius:"50%", border:"2px solid rgba(255,255,255,0.15)", animation:"pulseRing 2.8s ease-out 1.2s infinite" }} />
        <div style={{ width:52, height:52, borderRadius:"50%", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <IconCross className="w-6 h-6 text-white/60" />
        </div>
      </div>

      {/* ── Search bar ── */}
      <div className="relative z-50 mx-auto w-full max-w-4xl px-4">
        <div ref={searchRef} className="relative mx-auto w-full max-w-2xl">
          <input
            className="w-full rounded-full border border-white/40 bg-white/10 px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-base text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/40 backdrop-blur-sm"
            placeholder="Search doctors, departments…"
            value={query ?? ""}
            onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
            onFocus={() => setOpen(true)}
          />
          <Search className="absolute right-3 sm:right-4 top-1/2 h-4 w-4 sm:h-5 sm:w-5 -translate-y-1/2 text-white/90" />

          {/* Dropdown */}
          {open && query.trim().length >= 2 && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 border border-gray-100">
              {!hasResults ? (
                <p className="text-sm text-gray-400 text-center py-6">No results found for &quot;{query}&quot;</p>
              ) : (
                <>
                  {results.doctors.length > 0 && (
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Doctors</p>
                      {results.doctors.map((doc) => (
                        <div key={doc.slug}
                          onMouseDown={(e) => { e.preventDefault(); setOpen(false); setQuery(""); router.push(`/${lang}/doctors/${doc.slug}`); }}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#1e7a62]/5 active:bg-[#1e7a62]/10 transition-colors group">
                          <span className="w-9 h-9 rounded-full bg-[#1e7a62]/10 flex items-center justify-center text-[#1e7a62] text-sm font-bold shrink-0 group-hover:bg-[#1e7a62] group-hover:text-white transition-colors">
                            {(doc[`name_${lang}`] || doc.name_en || "?")[0]}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1e7a62] transition-colors truncate">{doc[`name_${lang}`] || doc.name_en}</p>
                            <p className="text-xs text-gray-400 truncate">{doc[`specialization_${lang}`] || doc.specialization_en}</p>
                          </div>
                          <span className="text-gray-300 group-hover:text-[#1e7a62] transition-colors text-sm">→</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {results.departments.length > 0 && (
                    <div className={results.doctors.length > 0 ? "border-t border-gray-100" : ""}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 px-4 pt-3 pb-1">Departments</p>
                      {results.departments.map((dept) => (
                        <div key={dept.slug}
                          onMouseDown={(e) => { e.preventDefault(); setOpen(false); setQuery(""); router.push(`/${lang}/departments/${dept.slug}`); }}
                          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-[#2c608e]/5 active:bg-[#2c608e]/10 transition-colors group">
                          <span className="w-9 h-9 rounded-full bg-[#2c608e]/10 flex items-center justify-center text-lg shrink-0">
                            {dept.icon || "🏥"}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 group-hover:text-[#2c608e] transition-colors truncate">{dept[`name_${lang}`] || dept.name_en}</p>
                            <p className="text-xs text-gray-400 truncate">{dept[`short_desc_${lang}`] || dept.short_desc}</p>
                          </div>
                          <span className="text-gray-300 group-hover:text-[#2c608e] transition-colors text-sm">→</span>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Headline + tagline ── */}
      <div className="relative z-10 mt-3 sm:mt-5 text-center px-4">
        <h2 className="text-lg sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight drop-shadow-md">
          {t.headline} <span style={{ color: "#a7f3d0" }}>{t.headlineAccent}</span>
        </h2>
        <p className="mt-1 sm:mt-2 text-[11px] sm:text-sm md:text-base text-white/75 tracking-wide font-medium">
          {t.tagline}
        </p>
      </div>

      {/* ── Slider ── */}
      <div className="relative z-10 mx-auto mt-3 sm:mt-5 w-full max-w-7xl px-3 sm:px-4">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] border border-white/20 sm:border-2 sm:border-white/25">
          <div
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div key={i} className="relative min-w-full">
                <div className="relative h-56 sm:h-110 md:h-140 lg:h-170">
                  <Image src={src} alt={`Slide ${i + 1}`} fill className="object-cover" priority={i === 0} sizes="100vw" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            ))}
          </div>

          {slides.length > 1 && (
            <>
              <button onClick={goPrev} aria-label="Previous slide"
                className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-1.5 sm:p-2.5 backdrop-blur hover:bg-white/45 transition">
                <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </button>
              <button onClick={goNext} aria-label="Next slide"
                className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/30 p-1.5 sm:p-2.5 backdrop-blur hover:bg-white/45 transition">
                <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </button>
            </>
          )}

          {slides.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} aria-label={`Go to slide ${i + 1}`}
                  className={`h-1.5 sm:h-2.5 rounded-full transition-all ${i === current ? "bg-white w-5 sm:w-6" : "bg-white/45 w-1.5 sm:w-2.5 hover:bg-white/70"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Stats row ── */}
      <div className="relative z-10 mx-auto mt-4 sm:mt-6 max-w-3xl px-4">
        <div className="grid grid-cols-4 gap-1 sm:gap-4">
          {stats.map(({ value, label }, i) => (
            <div
              key={label}
              className="stat-card text-center"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="text-base sm:text-2xl md:text-3xl font-extrabold text-white leading-tight">{value}</div>
              <div className="text-[9px] sm:text-xs text-white/70 font-medium mt-0.5 leading-tight">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeaderSlider;
