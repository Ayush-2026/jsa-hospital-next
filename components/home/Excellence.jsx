"use client";

import React, { useMemo, useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

function getVisibleCount() {
  if (typeof window === "undefined") return 4;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  return 4;
}

export default function Excellence({ lang = "en", departments = [] }) {
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
        .dept-card {
          position: relative;
          overflow: hidden;
          width: 180px;
          height: 180px;
          background: #ffffff;
          border: 1px solid rgba(44,96,142,0.12);
          box-shadow: 0 4px 18px rgba(44,96,142,0.10);
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px 14px;
          transition: box-shadow 0.4s ease, transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
          cursor: pointer;
        }
        @media (min-width: 640px) {
          .dept-card { width: 210px; height: 210px; }
        }
        .dept-card::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.55s cubic-bezier(0.4,0,0.2,1),
                      height 0.55s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .dept-card:hover::before {
          width: 420px;
          height: 420px;
        }
        .dept-card:hover {
          transform: scale(1.09) translateY(-6px);
          box-shadow: 0 28px 60px rgba(30,122,98,0.4), 0 8px 24px rgba(44,96,142,0.25), 0 0 0 1px rgba(255,255,255,0.15);
        }
        .dept-card > * { position: relative; z-index: 1; }
        .dept-icon {
          transition: transform 0.35s ease, background 0.35s ease;
          background: #f3f4f6;
        }
        .dept-card:hover .dept-icon {
          background: rgba(255,255,255,0.2);
          transform: scale(1.12);
        }
        .dept-name {
          color: #111827;
          font-weight: 800;
          transition: color 0.35s ease;
        }
        .dept-card:hover .dept-name { color: #ffffff; }
        .dept-desc {
          color: #6b7280;
          transition: color 0.35s ease;
        }
        .dept-card:hover .dept-desc { color: rgba(255,255,255,0.8); }

        .view-more-btn {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(44,96,142,0.35);
          border-radius: 14px;
          padding: 10px 28px;
          font-size: 0.95rem;
          font-weight: 700;
          color: #1e7a62;
          background: #ffffff;
          cursor: pointer;
          transition: box-shadow 0.4s ease, color 0.35s ease, border-color 0.35s ease;
        }
        @media (min-width: 640px) {
          .view-more-btn { font-size: 1.1rem; padding: 11px 36px; }
        }
        .view-more-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.55s cubic-bezier(0.4,0,0.2,1),
                      height 0.55s cubic-bezier(0.4,0,0.2,1);
          z-index: 0;
        }
        .view-more-btn:hover::before {
          width: 520px;
          height: 520px;
        }
        .view-more-btn:hover {
          color: #ffffff;
          border-color: transparent;
          box-shadow: 0 16px 40px rgba(30,122,98,0.32), 0 4px 16px rgba(44,96,142,0.18);
        }
        .view-more-btn span { position: relative; z-index: 1; }
      `}</style>

      <section className="w-full bg-linear-to-b from-[#eaf6ff] via-[#f6fbff] to-white py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#265957] leading-tight">
            Explore Our Centres of Clinical Excellence
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-600">
            Specialized departments with expert doctors and advanced technology
          </p>

          {/* Carousel */}
          <div className="mt-8 sm:mt-10 flex items-center justify-center gap-2 sm:gap-6">
            {/* Left */}
            <button
              onClick={() => canPrev && setIndex((i) => i - 1)}
              disabled={!canPrev}
              className={`h-9 w-9 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shadow-md transition
                ${canPrev ? "bg-white hover:bg-gray-50" : "bg-white/60 opacity-50 cursor-not-allowed"}`}
              aria-label="Previous departments"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>

            {/* Cards */}
            <div className="flex-1 overflow-hidden">
              <div className={`mx-auto flex justify-center ${visibleCount === 1 ? "gap-3" : "gap-3 sm:gap-6"}`}>
                {visibleItems.map((dept) => (
                  <Link
                    key={dept.slug}
                    href={`/${lang}/departments/${dept.slug}`}
                  >
                    <div className="dept-card">
                      <div className="dept-icon mx-auto h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center text-xl sm:text-2xl">
                        {dept.icon || "🏥"}
                      </div>
                      <h3 className="dept-name mt-3 text-sm sm:text-base text-center">
                        {dept.name}
                      </h3>
                      <p className="dept-desc mt-1 font-bold text-[13px] sm:text-xs line-clamp-2 text-center">
                        {dept.short_desc || "Specialized care & advanced treatment."}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Right */}
            <button
              onClick={() => canNext && setIndex((i) => i + 1)}
              disabled={!canNext}
              className={`h-9 w-9 sm:h-12 sm:w-12 rounded-full flex items-center justify-center shadow-md transition
                ${canNext ? "bg-white hover:bg-gray-50" : "bg-white/60 opacity-50 cursor-not-allowed"}`}
              aria-label="Next departments"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-700" />
            </button>
          </div>

          {/* View More */}
          <div className="mt-8 sm:mt-10 mb-8 sm:mb-12">
            <Link href={`/${lang}/departments`}>
              <button className="view-more-btn">
                <span>View More Departments</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
