"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, TestTube2, PhoneCall } from "lucide-react";
import { tr } from "@/lib/translations";

const cardsMeta = [
  { icon: Stethoscope, href: (lang) => `/${lang}/consultation`, as: "link" },
  { icon: TestTube2,   href: (lang) => `/${lang}/book-tests`,   as: "link" },
  { icon: PhoneCall,   href: () => "tel:+919999999999",         as: "a"    },
];

const MedicalAssistance = ({ lang = "en" }) => {
  const t = tr(lang).home.medicalAssistance;
  const cards = cardsMeta.map((meta, i) => ({ ...meta, ...t.cards[i] }));
  return (
    <>
      <style>{`
        @keyframes maShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        @keyframes maPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(30,122,98,0.35); }
          50%      { box-shadow: 0 0 0 10px rgba(30,122,98,0); }
        }
        @keyframes maFadeUp {
          from { opacity:0; transform: translateY(24px); }
          to   { opacity:1; transform: translateY(0); }
        }
        @keyframes maOrb {
          0%,100% { transform: scale(1) translate(0,0); }
          50%      { transform: scale(1.12) translate(8px,-8px); }
        }
        .ma-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #f0faf6 0%, #ffffff 45%, #edf9f4 100%);
        }
        .ma-orb1 {
          position: absolute; pointer-events: none; border-radius: 50%;
          width: 420px; height: 420px; top: -120px; left: -100px;
          background: radial-gradient(circle, rgba(30,122,98,0.09) 0%, transparent 70%);
          animation: maOrb 9s ease-in-out infinite;
        }
        .ma-orb2 {
          position: absolute; pointer-events: none; border-radius: 50%;
          width: 320px; height: 320px; bottom: -80px; right: -60px;
          background: radial-gradient(circle, rgba(44,96,142,0.08) 0%, transparent 70%);
          animation: maOrb 11s ease-in-out 2s infinite reverse;
        }
        .ma-card-wrap {
          animation: maFadeUp 0.55s ease both;
        }
        .ma-card {
          position: relative;
          overflow: hidden;
          background: white;
          border: 1.5px solid rgba(30,122,98,0.12);
          box-shadow: 0 4px 20px rgba(44,96,142,0.08);
          border-radius: 20px;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1),
                      box-shadow 0.3s ease, border-color 0.3s ease;
          cursor: pointer;
        }
        .ma-card::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: inherit;
          z-index: 0;
        }
        .ma-card > * { position: relative; z-index: 1; }

        /* shine pseudo */
        .ma-card::before {
          content: '';
          position: absolute;
          top: -50%; left: -120%;
          width: 60%; height: 200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
          transform: skewX(-15deg);
          z-index: 2;
        }

        .ma-icon-wrap {
          width: 60px; height: 60px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          background: linear-gradient(135deg, rgba(30,122,98,0.1), rgba(44,96,142,0.1));
          transition: background 0.35s ease, transform 0.35s ease;
        }
        .ma-icon { transition: color 0.3s ease; color: #1e7a62; }

        .ma-label {
          font-weight: 700;
          font-size: 1rem;
          color: #1a1a2e;
          transition: color 0.3s ease;
        }
        .ma-sub {
          font-size: 0.78rem;
          color: #6b7280;
          transition: color 0.3s ease;
        }

        .ma-arrow {
          width: 28px; height: 28px; border-radius: 50%;
          background: rgba(30,122,98,0.08);
          display: flex; align-items: center; justify-content: center;
          transition: background 0.3s ease, transform 0.3s ease;
          color: #1e7a62;
          font-size: 1rem;
          font-weight: 700;
        }

        /* ── hover only on real pointer devices (mouse) ── */
        @media (hover: hover) {
          .ma-card:hover::after { opacity: 1; }
          .ma-card:hover {
            transform: translateY(-10px) scale(1.04);
            box-shadow: 0 24px 52px rgba(30,122,98,0.28), 0 6px 20px rgba(44,96,142,0.15);
            border-color: transparent;
          }
          .ma-card:hover::before { animation: maShine 0.55s ease forwards; }
          .ma-card:hover .ma-icon-wrap { background: rgba(255,255,255,0.2); transform: scale(1.12) rotate(-6deg); }
          .ma-card:hover .ma-icon   { color: white; }
          .ma-card:hover .ma-label  { color: white; }
          .ma-card:hover .ma-sub    { color: rgba(255,255,255,0.8); }
          .ma-card:hover .ma-arrow  { background: rgba(255,255,255,0.25); color: white; transform: translateX(4px); }
        }

        /* ── tap feedback on touch devices ── */
        @media (hover: none) {
          .ma-card:active {
            transform: scale(0.97);
            box-shadow: 0 2px 8px rgba(30,122,98,0.15);
          }
        }

        .ma-divider {
          width: 56px; height: 3px; border-radius: 999px;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          margin: 10px auto 0;
        }
      `}</style>

      <section className="ma-section w-full">
        <div className="ma-orb1" />
        <div className="ma-orb2" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 pt-12 sm:pt-20 pb-4 sm:pb-6">

          {/* Heading */}
          <div className="text-center">
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1e7a62] mb-2">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
              {t.title}
            </h2>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold leading-tight"
              style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.titleAccent}
            </h2>
            <div className="ma-divider" />
            <p className="mt-4 text-xs sm:text-base text-gray-500 font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Cards */}
          <div className="mt-10 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-3xl mx-auto">
            {cards.map(({ icon: Icon, label, sub, href, as: Tag }, i) => {
              const inner = (
                <div
                  className="ma-card flex items-center gap-4 sm:flex-col sm:items-center sm:justify-center sm:gap-4 p-5 sm:p-8 w-full"
                  style={{ minHeight: "clamp(88px, 12vw, 200px)" }}
                >
                  <div className="ma-icon-wrap shrink-0">
                    <Icon className="ma-icon w-7 h-7 sm:w-8 sm:h-8" strokeWidth={1.6} />
                  </div>
                  <div className="flex-1 sm:text-center">
                    <div className="ma-label">{label}</div>
                    <div className="ma-sub mt-0.5">{sub}</div>
                  </div>
                  <div className="ma-arrow shrink-0 sm:hidden">→</div>
                </div>
              );

              return (
                <div key={label} className="ma-card-wrap" style={{ animationDelay: `${i * 120}ms` }}>
                  {Tag === "link"
                    ? <Link href={href(lang)} className="block">{inner}</Link>
                    : <a href={href(lang)} className="block">{inner}</a>
                  }
                </div>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
};

export default MedicalAssistance;
