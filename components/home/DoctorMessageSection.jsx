"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { doctorMessagesMock } from "@/lib/data/doctorMessageMock";
import { tr } from "@/lib/translations";

const statValues = ["15+", "98%", "10K+"];

export default function DoctorMessageSection({ lang = "en" }) {
  const t = tr(lang).home.doctorMessage;
  const stats = statValues.map((value, i) => ({ value, label: t.statsLabels[i] }));
  return (
    <>
      <style>{`
        @keyframes dmOrb {
          0%,100% { transform: scale(1) translate(0,0); }
          50%      { transform: scale(1.12) translate(12px,-10px); }
        }
        @keyframes dmFadeUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes dmCardIn {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes dmLineDraw {
          from { height: 0; opacity:0; }
          to   { height: 100%; opacity:1; }
        }
        @keyframes dmPulse {
          0%,100% { transform:scale(1); opacity:0.6; }
          50%      { transform:scale(1.3); opacity:1; }
        }
        @keyframes dmFloat {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%      { transform:translateY(-10px) rotate(6deg); }
        }
        @keyframes dmFloat2 {
          0%,100% { transform:translateY(0px) rotate(0deg); }
          50%      { transform:translateY(8px) rotate(-5deg); }
        }
        @keyframes shimmerImg {
          0%   { left:-120%; }
          100% { left:130%; }
        }

        .dm-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(160deg, #dff3ff 0%, #eaf6ff 40%, #ede9ff 100%);
        }

        /* Side decorative vertical lines */
        .dm-line-left, .dm-line-right {
          position: absolute;
          top: 10%;
          width: 1.5px;
          height: 80%;
          background: linear-gradient(to bottom, transparent, rgba(30,122,98,0.25), rgba(44,96,142,0.2), transparent);
          animation: dmLineDraw 1.5s ease both;
        }
        .dm-line-left  { left: 6%; }
        .dm-line-right { right: 6%; }

        /* Dots on the lines */
        .dm-line-dot {
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          left: 50%; transform: translateX(-50%);
          box-shadow: 0 0 0 3px rgba(30,122,98,0.15);
          animation: dmPulse 2.5s ease-in-out infinite;
        }

        /* Floating side icons */
        .dm-side-icon {
          position: absolute;
          opacity: 0.12;
          pointer-events: none;
        }
        .dm-float-a { animation: dmFloat  5s ease-in-out infinite; }
        .dm-float-b { animation: dmFloat2 6s ease-in-out 1s infinite; }
        .dm-float-c { animation: dmFloat  7s ease-in-out 2s infinite; }

        /* Orbs */
        .dm-orb1 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:450px; height:450px; top:-100px; right:-80px;
          background: radial-gradient(circle, rgba(44,96,142,0.09) 0%, transparent 70%);
          animation: dmOrb 10s ease-in-out infinite;
        }
        .dm-orb2 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:350px; height:350px; bottom:-80px; left:-60px;
          background: radial-gradient(circle, rgba(30,122,98,0.08) 0%, transparent 70%);
          animation: dmOrb 13s ease-in-out 3s infinite reverse;
        }

        /* Card */
        .dm-card {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          background: white;
          box-shadow: 0 8px 40px rgba(44,96,142,0.11), 0 2px 8px rgba(0,0,0,0.05);
          border: 1px solid rgba(44,96,142,0.07);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          animation: dmCardIn 0.55s ease both;
        }
        @media (hover: hover) {
          .dm-card:hover {
            transform: translateY(-7px);
            box-shadow: 0 24px 60px rgba(44,96,142,0.17), 0 4px 16px rgba(0,0,0,0.07);
          }
          .dm-card:hover .dm-img-wrap::after {
            animation: shimmerImg 0.6s ease forwards;
          }
        }
        .dm-card-stripe {
          position:absolute; top:0; left:0; right:0; height:4px;
          background: linear-gradient(to right, #1e7a62, #2c608e);
        }

        /* Image */
        .dm-img-wrap {
          position: relative;
          flex-shrink: 0;
          border-radius: 18px;
          overflow: hidden;
          background: linear-gradient(135deg, rgba(30,122,98,0.1), rgba(44,96,142,0.1));
          border: 2px solid rgba(30,122,98,0.12);
        }
        .dm-img-wrap::after {
          content:'';
          position:absolute;
          top:-50%; left:-120%;
          width:60%; height:200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.3) 50%, transparent 80%);
          transform: skewX(-15deg);
          z-index: 2;
        }

        /* Quote */
        .dm-bigquote {
          font-size: 6rem;
          line-height: 0.8;
          font-family: Georgia, serif;
          font-weight: 900;
          background: linear-gradient(135deg,#1e7a62,#2c608e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          opacity: 0.12;
          position: absolute;
          top: -4px; left: -6px;
          pointer-events: none;
          user-select: none;
        }

        /* Badge */
        .dm-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #1e7a62;
          background: linear-gradient(to right, rgba(30,122,98,0.08), rgba(44,96,142,0.08));
          border: 1px solid rgba(30,122,98,0.15);
          margin-bottom: 12px;
        }

        /* Designation gradient */
        .dm-desig {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
          font-size: 0.82rem;
        }
        @media (min-width:640px) { .dm-desig { font-size: 0.92rem; } }

        /* Read more btn */
        .dm-read-btn {
          position:relative; overflow:hidden;
          display:inline-flex; align-items:center; gap:6px;
          padding: 8px 22px;
          border-radius: 999px;
          font-size: 0.78rem; font-weight: 700;
          color: #1e7a62;
          background: white;
          border: 1.5px solid rgba(30,122,98,0.25);
          cursor: pointer;
          transition: color 0.3s ease, border-color 0.3s ease,
                      box-shadow 0.3s ease, transform 0.25s ease;
          box-shadow: 0 2px 10px rgba(30,122,98,0.08);
        }
        .dm-read-btn::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg,#1e7a62,#2c608e);
          opacity:0; transition:opacity 0.3s ease; border-radius:inherit; z-index:0;
        }
        .dm-read-btn:hover::before { opacity:1; }
        .dm-read-btn:hover { color:white; border-color:transparent; transform:translateY(-1px); box-shadow: 0 8px 20px rgba(30,122,98,0.25); }
        .dm-read-btn span { position:relative; z-index:1; }

        /* Stat pills */
        .dm-stat {
          text-align:center;
          padding: 12px 18px;
          border-radius: 16px;
          background: white;
          border: 1px solid rgba(30,122,98,0.1);
          box-shadow: 0 2px 12px rgba(44,96,142,0.07);
          flex: 1;
        }
        .dm-stat-val {
          font-size: 1.3rem; font-weight: 900;
          background: linear-gradient(to right,#1e7a62,#2c608e);
          -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
        }
        @media(min-width:640px) { .dm-stat-val { font-size: 1.6rem; } }
        .dm-stat-label { font-size: 0.68rem; color:#6b7280; font-weight:600; margin-top:2px; }

        /* View all btn */
        .dm-view-btn {
          position:relative; overflow:hidden;
          padding: 13px 40px;
          border-radius: 999px;
          font-weight: 700; font-size: 0.95rem;
          color: white;
          background: linear-gradient(135deg,#1e7a62,#2c608e);
          box-shadow: 0 6px 24px rgba(30,122,98,0.35);
          border: none; cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          letter-spacing: 0.02em;
        }
        .dm-view-btn:hover { transform:translateY(-2px); box-shadow:0 14px 36px rgba(30,122,98,0.42); }

        .dm-divider {
          display:block; width:52px; height:3px; border-radius:999px;
          background: linear-gradient(to right,#1e7a62,#2c608e);
          margin: 10px auto 0;
        }
      `}</style>

      <section className="dm-section w-full">
        <div className="dm-orb1" />
        <div className="dm-orb2" />

        {/* Left decorative line */}
        <div className="dm-line-left hidden lg:block">
          <div className="dm-line-dot" style={{ top:"20%", animationDelay:"0s" }} />
          <div className="dm-line-dot" style={{ top:"50%", animationDelay:"0.8s" }} />
          <div className="dm-line-dot" style={{ top:"80%", animationDelay:"1.6s" }} />
        </div>
        {/* Left floating icons */}
        <svg className="dm-side-icon dm-float-a hidden lg:block" style={{ left:"2%", top:"15%", width:48, height:48 }} viewBox="0 0 40 40" fill="none">
          <rect x="15" y="2" width="10" height="36" rx="4" fill="#1e7a62"/>
          <rect x="2" y="15" width="36" height="10" rx="4" fill="#1e7a62"/>
        </svg>
        <svg className="dm-side-icon dm-float-b hidden lg:block" style={{ left:"3%", top:"55%", width:38, height:38 }} viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="14" stroke="#2c608e" strokeWidth="3"/>
          <path d="M14 20 C14 20 16 14 20 14 C24 14 26 26 30 26" stroke="#2c608e" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="dm-side-icon dm-float-c hidden lg:block" style={{ left:"7%", top:"78%", width:30, height:30 }} viewBox="0 0 40 36" fill="#1e7a62">
          <path d="M20 34 C20 34 2 22 2 11 C2 5.5 6.5 1 12 1 C15.5 1 18.5 2.8 20 5.5 C21.5 2.8 24.5 1 28 1 C33.5 1 38 5.5 38 11 C38 22 20 34 20 34Z"/>
        </svg>

        {/* Right decorative line */}
        <div className="dm-line-right hidden lg:block">
          <div className="dm-line-dot" style={{ top:"25%", animationDelay:"0.4s" }} />
          <div className="dm-line-dot" style={{ top:"55%", animationDelay:"1.2s" }} />
          <div className="dm-line-dot" style={{ top:"82%", animationDelay:"2s" }} />
        </div>
        {/* Right floating icons */}
        <svg className="dm-side-icon dm-float-b hidden lg:block" style={{ right:"2%", top:"12%", width:44, height:44 }} viewBox="0 0 40 40" fill="none">
          <rect x="4" y="15" width="32" height="10" rx="5" stroke="#2c608e" strokeWidth="2.5"/>
          <line x1="20" y1="15" x2="20" y2="25" stroke="#2c608e" strokeWidth="2.5"/>
        </svg>
        <svg className="dm-side-icon dm-float-a hidden lg:block" style={{ right:"3%", top:"50%", width:36, height:36 }} viewBox="0 0 40 40" fill="none">
          <path d="M10 6 C10 6 6 6 6 12 L6 22 C6 28 12 32 18 32 C24 32 30 28 30 22 L30 22" stroke="#1e7a62" strokeWidth="2.5" strokeLinecap="round"/>
          <circle cx="30" cy="30" r="5" stroke="#1e7a62" strokeWidth="2.5"/>
        </svg>
        <svg className="dm-side-icon dm-float-c hidden lg:block" style={{ right:"6%", top:"75%", width:32 }} viewBox="0 0 30 50" fill="none">
          <path d="M5 2 C5 2 25 12 25 25 C25 38 5 48 5 48" stroke="#2c608e" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M25 2 C25 2 5 12 5 25 C5 38 25 48 25 48" stroke="#2c608e" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="5" y1="14" x2="25" y2="14" stroke="#2c608e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="5" y1="25" x2="25" y2="25" stroke="#2c608e" strokeWidth="2" strokeLinecap="round"/>
          <line x1="5" y1="36" x2="25" y2="36" stroke="#2c608e" strokeWidth="2" strokeLinecap="round"/>
        </svg>

        <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-8 py-14 sm:py-20">

          {/* Heading */}
          <div className="text-center" style={{ animation:"dmFadeUp 0.6s ease both" }}>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1e7a62] mb-2">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
              {t.title}{" "}
              <span style={{ background:"linear-gradient(to right,#1e7a62,#2c608e)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
                {t.titleAccent}
              </span>{" "}
              {t.titleEnd}
            </h2>
            <span className="dm-divider" />
            <p className="mt-4 text-xs sm:text-sm text-gray-500 font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Stats row */}
          <div className="mt-8 sm:mt-10 flex gap-3 sm:gap-4" style={{ animation:"dmFadeUp 0.6s ease 0.15s both" }}>
            {stats.map(({ value, label }) => (
              <div key={label} className="dm-stat">
                <div className="dm-stat-val">{value}</div>
                <div className="dm-stat-label">{label}</div>
              </div>
            ))}
          </div>

          {/* Cards */}
          <div className="mt-10 sm:mt-12 flex flex-col gap-6 sm:gap-7">
            {doctorMessagesMock.map((doc, index) => (
              <div key={doc.id} className="dm-card" style={{ animationDelay:`${index * 160}ms` }}>
                <div className="dm-card-stripe" />

                <div className="p-6 sm:p-8">
                  {/* Badge */}
                  <div className="dm-badge">
                    <span style={{ width:6,height:6,borderRadius:"50%",background:"linear-gradient(to right,#1e7a62,#2c608e)",display:"inline-block",flexShrink:0 }} />
                    {t.badge}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 items-start">
                    {/* Image */}
                    <div className="dm-img-wrap w-24 h-28 sm:w-36 sm:h-44 md:w-44 md:h-52">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover"
                        sizes="(max-width:640px) 96px, 176px"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1 relative pt-1">
                      <span className="dm-bigquote">"</span>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-extrabold text-[#1a1a2e] leading-snug">
                        {doc.name}
                      </h3>
                      <p className="dm-desig mt-1">{doc[`designation_${lang}`] || doc.designation_en}</p>

                      <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed italic">
                        &ldquo;{doc[`message_${lang}`] || doc.message_en}&rdquo;
                      </p>

                      {/* Divider line */}
                      <div style={{ width:"100%", height:"1px", background:"linear-gradient(to right, rgba(30,122,98,0.15), transparent)", margin:"16px 0" }} />

                      <Link href={`/${lang}/doctors`}>
                        <button className="dm-read-btn">
                          <span>{t.readProfile}</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View all */}
          <div className="mt-12 sm:mt-14 text-center">
            <Link href={`/${lang}/doctors`}>
              <button className="dm-view-btn">{t.viewAll}</button>
            </Link>
          </div>

        </div>
      </section>
    </>
  );
}
