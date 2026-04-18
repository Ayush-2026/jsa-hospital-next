'use client';

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import TextCursor from "@/components/ui/TextCursor";
import { tr } from "@/lib/translations";

const Heading = ({ lang = "en" }) => {
  const headingRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = tr(lang);

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    const newPath = pathname.replace(`/${lang}`, `/${newLang}`);
    router.push(newPath);
  };
  return (
    <div ref={headingRef} className="relative overflow-hidden" style={{ background: "linear-gradient(135deg, #f0faf6 0%, #eef4fb 50%, #f0faf6 100%)" }}>

      <style>{`
        @keyframes floatBlob1 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(18px,-12px) scale(1.08); }
          66%      { transform: translate(-10px,8px) scale(0.95); }
        }
        @keyframes floatBlob2 {
          0%,100% { transform: translate(0,0) scale(1); }
          33%      { transform: translate(-14px,10px) scale(1.05); }
          66%      { transform: translate(10px,-14px) scale(0.97); }
        }
        @keyframes floatBlob3 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(8px,16px) scale(1.06); }
        }
        @keyframes crossFloat {
          0%,100% { transform: translateY(0px) rotate(0deg); opacity: 0.07; }
          50%      { transform: translateY(-8px) rotate(8deg); opacity: 0.13; }
        }
        @keyframes crossFloat2 {
          0%,100% { transform: translateY(0px) rotate(0deg); opacity: 0.06; }
          50%      { transform: translateY(6px) rotate(-6deg); opacity: 0.11; }
        }
        @keyframes shimmerText {
          0%   { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes headFadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lightRay {
          0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
          13%  { transform: translateX(-30%)  skewX(-15deg); opacity: 1; }
          14%  { opacity: 1; }
          26%  { transform: translateX(100%)  skewX(-15deg); opacity: 0; }
          100% { transform: translateX(100%)  skewX(-15deg); opacity: 0; }
        }
        .heading-wrap {
          animation: headFadeIn 0.5s ease both;
          position: relative;
        }
        .heading-title {
          background: linear-gradient(90deg, #0d5c47, #1e7a62, #2c608e, #1e7a62, #0d5c47);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmerText 4s linear infinite;
          filter: drop-shadow(0 2px 12px rgba(30,122,98,0.18));
        }
        .med-cross   { animation: crossFloat  5s ease-in-out       infinite; }
        .med-cross-2 { animation: crossFloat2 6s ease-in-out 1s    infinite; }
        .med-cross-3 { animation: crossFloat  7s ease-in-out 2s    infinite; }
        .blob-1 { animation: floatBlob1  8s ease-in-out infinite; }
        .blob-2 { animation: floatBlob2 10s ease-in-out infinite; }
        .blob-3 { animation: floatBlob3 12s ease-in-out infinite; }
        .light-ray-wrap {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 5;
        }
        .light-ray {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            105deg,
            transparent 20%,
            rgba(255,255,255,0.15) 38%,
            rgba(255,255,255,0.38) 50%,
            rgba(255,255,255,0.15) 62%,
            transparent 80%
          );
          animation: lightRay 8s linear infinite;
        }
        .logo-card {
          border-radius: 16px;
          padding: 6px;
          background: white;
          box-shadow:
            0 0 0 1.5px rgba(30,122,98,0.18),
            0 4px 20px rgba(30,122,98,0.15),
            0 1px 4px rgba(44,96,142,0.10);
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        .logo-card:hover {
          box-shadow:
            0 0 0 2px rgba(30,122,98,0.35),
            0 8px 32px rgba(30,122,98,0.22),
            0 2px 8px rgba(44,96,142,0.14);
        }
      `}</style>

      {/* ── Animated gradient blobs ── */}
      <div className="blob-1" style={{
        position: "absolute", top: "-60px", right: "-60px",
        width: "260px", height: "260px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,122,98,0.13) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="blob-2" style={{
        position: "absolute", bottom: "-40px", left: "-40px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(44,96,142,0.11) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div className="blob-3" style={{
        position: "absolute", top: "10px", left: "38%",
        width: "140px", height: "140px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(30,122,98,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* ── Dot grid pattern ── */}
      <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.45 }} aria-hidden="true">
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1.5" cy="1.5" r="1.2" fill="#1e7a62" opacity="0.18" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>

      {/* ── Floating medical cross icons ── */}
      <svg className="med-cross" style={{ position: "absolute", top: "12px", left: "12%", pointerEvents: "none" }} width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="10" y="0" width="8" height="28" rx="3" fill="#1e7a62" />
        <rect x="0" y="10" width="28" height="8" rx="3" fill="#1e7a62" />
      </svg>
      <svg className="med-cross-2" style={{ position: "absolute", bottom: "10px", right: "14%", pointerEvents: "none" }} width="22" height="22" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="10" y="0" width="8" height="28" rx="3" fill="#2c608e" />
        <rect x="0" y="10" width="28" height="8" rx="3" fill="#2c608e" />
      </svg>
      <svg className="med-cross-3" style={{ position: "absolute", top: "30%", right: "4%", pointerEvents: "none" }} width="16" height="16" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="10" y="0" width="8" height="28" rx="3" fill="#1e7a62" />
        <rect x="0" y="10" width="28" height="8" rx="3" fill="#1e7a62" />
      </svg>

      {/* ── Sweeping light ray ── */}
      <div className="light-ray-wrap">
        <div className="light-ray" />
      </div>


      {/* ── Medical cross cursor trail ── */}
      <TextCursor text="+" spacing={55} maxPoints={8} exitDuration={0.35} removalInterval={35} boundaryRef={headingRef} />

      {/* ── Top accent gradient bar ── */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "3px",
        background: "linear-gradient(to right, transparent, #1e7a62, #2c608e, transparent)",
        opacity: 0.6,
      }} />

      {/* ── Main content ── */}
      <div className="heading-wrap flex items-center gap-2 sm:gap-4 relative z-10 px-3 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-7 pb-6 sm:pb-8">

        {/* Logo — clean white card, no echo rings */}
        <Link href={`/${lang}`} className="shrink-0 group">
          <div className="logo-card group-hover:scale-105">
            <Image
              src="/upLogo.png"
              alt="Balaji LifeCare Logo"
              width={120}
              height={120}
              priority
              className="w-10 h-10 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain"
            />
          </div>
        </Link>

        {/* Title block */}
        <div className="flex-1 min-w-0 text-center">
          <h1 className="heading-title text-xl sm:text-4xl md:text-6xl font-extrabold leading-tight tracking-tight truncate">
            JSA Hospital
          </h1>
          <p className="text-[9px] sm:text-xs md:text-sm font-bold mt-0.5 tracking-widest uppercase"
            style={{ color: "#2c608e" }}>
            Unit of Balaji HealthCare
          </p>

          {/* Tagline pill */}
          <div className="hidden sm:inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold tracking-wide"
            style={{
              background: "linear-gradient(to right, rgba(30,122,98,0.08), rgba(44,96,142,0.08))",
              border: "1px solid rgba(30,122,98,0.18)",
              color: "#265957",
            }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(to right,#1e7a62,#2c608e)", display: "inline-block" }} />
            {t.heading.tagline}
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "linear-gradient(to right,#2c608e,#1e7a62)", display: "inline-block" }} />
          </div>
        </div>

        {/* Language selector */}
        <div className="shrink-0">
          <select
            value={lang}
            onChange={handleLangChange}
            className="text-[10px] sm:text-sm border border-gray-200 rounded-xl px-1.5 py-1 sm:px-3 sm:py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40 bg-white/80 shadow-md cursor-pointer backdrop-blur"
            style={{ boxShadow: "0 2px 8px rgba(30,122,98,0.12)" }}>
            <option value="en">EN</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">MR</option>
          </select>
        </div>

      </div>
    </div>
  );
};

export default Heading;
