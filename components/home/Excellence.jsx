"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { tr } from "@/lib/translations";

function getVisibleCount() {
  if (typeof window === "undefined") return 4;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 4;
}

export default function Excellence({ lang = "en", departments = [] }) {
  const t = tr(lang).home.excellence;
  const items = useMemo(() => departments.slice(0, 6), [departments]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const update = () => setVisibleCount(getVisibleCount());
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxIndex = Math.max(0, items.length - visibleCount);
  const canPrev = index > 0;
  const canNext = index < maxIndex;

  useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const visibleItems = items.slice(index, index + visibleCount);

  return (
    <>
      <style>{`
        @keyframes excOrb {
          0%,100% { transform: scale(1) translate(0,0); }
          50%      { transform: scale(1.1) translate(-10px, 8px); }
        }
        @keyframes excFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes deptCardIn {
          from { opacity:0; transform:translateY(16px) scale(0.97); }
          to   { opacity:1; transform:translateY(0) scale(1); }
        }

        .exc-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #edf9f4 0%, #f0f7ff 60%, #eef4fb 100%);
        }
        .exc-orb1 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:380px; height:380px; top:-80px; right:-60px;
          background: radial-gradient(circle, rgba(30,122,98,0.08) 0%, transparent 70%);
          animation: excOrb 10s ease-in-out infinite;
        }
        .exc-orb2 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:300px; height:300px; bottom:-60px; left:-40px;
          background: radial-gradient(circle, rgba(44,96,142,0.07) 0%, transparent 70%);
          animation: excOrb 12s ease-in-out 3s infinite reverse;
        }

        /* dot grid */
        .exc-dots {
          position:absolute; inset:0; pointer-events:none;
          background-image: radial-gradient(rgba(30,122,98,0.1) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.5;
        }

        /* heading accent */
        .exc-title-grad {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .exc-underline {
          display: block;
          margin: 10px auto 0;
          width: 64px; height: 3px; border-radius: 999px;
          background: linear-gradient(to right, #1e7a62, #2c608e);
        }

        /* dept card */
        .dept-card {
          position: relative;
          overflow: hidden;
          width: 170px; height: 170px;
          background: white;
          border: 1.5px solid rgba(30,122,98,0.1);
          box-shadow: 0 4px 20px rgba(44,96,142,0.08);
          border-radius: 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px 12px;
          cursor: pointer;
          animation: deptCardIn 0.45s ease both;
        }
        @media (min-width: 640px) {
          .dept-card { width: 200px; height: 200px; }
        }
        @media (min-width: 768px) {
          .dept-card { width: 215px; height: 215px; }
        }

        .dept-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          border-radius: inherit;
          opacity: 0;
          transition: opacity 0.32s ease;
          z-index: 0;
        }
        @media (hover: hover) {
          .dept-card:hover::before { opacity: 1; }
          .dept-card:hover {
            transform: translateY(-8px) scale(1.04);
            box-shadow: 0 20px 48px rgba(30,122,98,0.28), 0 6px 18px rgba(44,96,142,0.15);
            border-color: transparent;
          }
          .dept-card:hover .dept-icon { background: rgba(255,255,255,0.18); transform: scale(1.12); }
          .dept-card:hover .dept-name { color: #ffffff; }
          .dept-card:hover .dept-desc { color: rgba(255,255,255,0.75); }
        }
        @media (hover: none) {
          .dept-card:active { transform: scale(0.96); }
        }

        .dept-card > * { position: relative; z-index: 1; }
        .dept-card { transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease; }

        .dept-icon {
          background: linear-gradient(135deg, rgba(30,122,98,0.1), rgba(44,96,142,0.08));
          transition: transform 0.35s ease, background 0.35s ease;
        }
        .dept-name { color: #111827; font-weight: 800; transition: color 0.35s ease; }
        .dept-desc { color: #6b7280; transition: color 0.35s ease; }

        /* nav buttons */
        .exc-nav-btn {
          width: 40px; height: 40px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          border: none; cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease;
        }
        .exc-nav-btn.active {
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          box-shadow: 0 6px 18px rgba(30,122,98,0.35);
          color: white;
        }
        .exc-nav-btn.active:hover { transform: scale(1.1); box-shadow: 0 10px 24px rgba(30,122,98,0.4); }
        .exc-nav-btn.inactive { background: white; box-shadow: 0 2px 8px rgba(0,0,0,0.08); opacity: 0.45; cursor: not-allowed; color: #9ca3af; }
        @media (min-width: 640px) { .exc-nav-btn { width: 48px; height: 48px; } }

        /* view more */
        .view-more-btn {
          position: relative; overflow: hidden;
          border: 1.5px solid rgba(30,122,98,0.3);
          border-radius: 999px;
          padding: 11px 32px;
          font-size: 0.9rem; font-weight: 700;
          color: #1e7a62; background: white;
          cursor: pointer;
          transition: box-shadow 0.35s ease, color 0.3s ease, border-color 0.3s ease, transform 0.25s ease;
          box-shadow: 0 2px 12px rgba(30,122,98,0.1);
        }
        @media (min-width: 640px) { .view-more-btn { font-size: 1rem; padding: 12px 40px; } }
        .view-more-btn::before {
          content: '';
          position: absolute;
          top: 50%; left: 50%;
          width: 0; height: 0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.5s cubic-bezier(0.4,0,0.2,1), height 0.5s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .view-more-btn:hover::before { width: 520px; height: 520px; }
        .view-more-btn:hover { color: white; border-color: transparent; box-shadow: 0 14px 36px rgba(30,122,98,0.3); transform: translateY(-2px); }
        .view-more-btn span { position: relative; z-index: 1; }
      `}</style>

      <section className="exc-section w-full">
        <div className="exc-orb1" />
        <div className="exc-orb2" />
        <div className="exc-dots" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 pt-10 sm:pt-16 pb-12 sm:pb-20">

          {/* Heading */}
          <div className="text-center animation" style={{ animation: "excFadeUp 0.6s ease both" }}>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1e7a62] mb-2">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-[#1a1a2e]">
              {t.headingPrefix}{" "}
              <span className="exc-title-grad">{t.title}</span>
            </h2>
            <span className="exc-underline" />
            <p className="mt-4 text-xs sm:text-sm md:text-base text-gray-500 font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Carousel */}
          <div className="mt-10 sm:mt-14 flex items-center justify-center gap-2 sm:gap-5">

            {/* Prev */}
            <button
              onClick={() => canPrev && setIndex((i) => i - 1)}
              disabled={!canPrev}
              aria-label="Previous departments"
              className={`exc-nav-btn ${canPrev ? "active" : "inactive"}`}
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Cards */}
            <div className="flex-1 overflow-hidden">
              <div className={`mx-auto flex justify-center ${visibleCount === 1 ? "gap-3" : "gap-3 sm:gap-5"}`}>
                {visibleItems.map((dept, i) => (
                  <Link key={dept.slug} href={`/${lang}/departments/${dept.slug}`}>
                    <div className="dept-card" style={{ animationDelay: `${i * 80}ms` }}>
                      <div className="dept-icon mx-auto h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl">
                        {dept.icon || "🏥"}
                      </div>
                      <h3 className="dept-name mt-3 text-sm sm:text-base md:text-lg text-center leading-tight">
                        {dept[`name_${lang}`] || dept.name_en || dept.name}
                      </h3>
                      <p className="dept-desc mt-1 text-[11px] sm:text-xs md:text-sm line-clamp-2 text-center font-medium">
                        {dept[`short_desc_${lang}`] || dept.short_desc || "Specialized care & advanced treatment."}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Next */}
            <button
              onClick={() => canNext && setIndex((i) => i + 1)}
              disabled={!canNext}
              aria-label="Next departments"
              className={`exc-nav-btn ${canNext ? "active" : "inactive"}`}
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Dot indicators */}
          {maxIndex > 0 && (
            <div className="flex justify-center gap-2 mt-6">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to page ${i + 1}`}
                  style={{
                    height: 6,
                    width: i === index ? 24 : 6,
                    borderRadius: 999,
                    background: i === index
                      ? "linear-gradient(to right, #1e7a62, #2c608e)"
                      : "rgba(30,122,98,0.2)",
                    transition: "width 0.3s ease, background 0.3s ease",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          )}

          {/* View More */}
          <div className="mt-10 sm:mt-14 text-center">
            <Link href={`/${lang}/departments`}>
              <button className="view-more-btn">
                <span>{t.viewAll}</span>
              </button>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
