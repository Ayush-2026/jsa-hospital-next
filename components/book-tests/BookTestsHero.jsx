"use client";

import { useEffect, useState } from "react";

export default function BookTestsHero({ phoneNumberDial, phoneNumberDisplay }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <style>{`
        @keyframes revealUp {
          from { opacity: 0; transform: translateY(36px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        @keyframes revealLeft {
          from { opacity: 0; transform: translateX(36px); }
          to   { opacity: 1; transform: translateX(0);    }
        }
        @keyframes callShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        @keyframes pulseRing {
          0%  { transform: scale(1);   opacity: 0.6; }
          70% { transform: scale(1.7); opacity: 0;   }
          100%{ transform: scale(1.7); opacity: 0;   }
        }
        @keyframes floatY {
          0%,100% { transform: translateY(0px);  }
          50%      { transform: translateY(-10px); }
        }
        @keyframes bobble {
          0%,100% { transform: translateY(0px) rotate(0deg);  }
          50%      { transform: translateY(-6px) rotate(3deg); }
        }
        @keyframes drip {
          0%   { transform: scaleY(0); opacity: 0; transform-origin: top; }
          60%  { transform: scaleY(1); opacity: 1; transform-origin: top; }
          85%  { transform: scaleY(1); opacity: 1; }
          100% { transform: scaleY(0); opacity: 0; transform-origin: bottom; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }
        @keyframes dash {
          to { stroke-dashoffset: 0; }
        }
        @keyframes blink {
          0%,100% { opacity:1; } 50% { opacity:0.3; }
        }

        .hero-tag   { animation: revealUp   0.6s ease both; animation-delay: 0.1s;  }
        .hero-h1    { animation: revealUp   0.7s ease both; animation-delay: 0.25s; }
        .hero-para  { animation: revealLeft 0.7s ease both; animation-delay: 0.4s;  }
        .hero-btn   { animation: revealUp   0.7s ease both; animation-delay: 0.55s; }
        .hero-note  { animation: revealUp   0.6s ease both; animation-delay: 0.7s;  }

        .call-btn {
          position: relative; overflow: hidden;
          display: inline-flex; align-items: center; gap: 10px;
          background: white; color: #1e7a62;
          font-weight: 800; font-size: 1rem;
          padding: 14px 32px; border-radius: 14px;
          box-shadow: 0 6px 24px rgba(0,0,0,0.18);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .call-btn::after {
          content: '';
          position: absolute; top: -50%; left: -120%;
          width: 55%; height: 200%;
          background: linear-gradient(120deg, transparent 20%, rgba(30,122,98,0.12) 50%, transparent 80%);
          transform: skewX(-15deg);
        }
        .call-btn:hover::after { animation: callShine 0.55s ease forwards; }
        .call-btn:hover { transform: translateY(-4px); box-shadow: 0 14px 36px rgba(0,0,0,0.22); }
        .call-btn span { position: relative; z-index: 1; }

        .pulse-ring {
          position: absolute; inset: 0; border-radius: 50%;
          background: rgba(255,255,255,0.35);
          animation: pulseRing 2s ease-out infinite;
        }
        .illus-float  { animation: floatY  4s ease-in-out infinite; }
        .illus-bobble { animation: bobble  3.5s ease-in-out infinite; }
        .illus-spin   { animation: spin-slow 12s linear infinite; transform-origin: center; }
        .illus-drip   { animation: drip 2.8s ease-in-out infinite; }
        .illus-drip2  { animation: drip 2.8s ease-in-out infinite; animation-delay: 1.4s; }
        .illus-blink  { animation: blink 2s ease-in-out infinite; }
        .ecg-path {
          stroke-dasharray: 300;
          stroke-dashoffset: 300;
          animation: dash 2s ease forwards infinite;
        }
      `}</style>

      <section className="relative w-full flex flex-col md:flex-row"
        style={{ background: "linear-gradient(160deg, rgba(30,122,98,0.08) 0%, rgba(44,96,142,0.10) 100%)" }}
      >
        {/* decorative blobs */}
        <span className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl" />
        <span className="pointer-events-none absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-white/5 blur-3xl" />

        {/* ── Left: animated illustration ── */}
        <div className="relative w-full md:w-1/2 min-h-[40vh] md:min-h-0 flex items-center justify-center p-10">
          <svg viewBox="0 0 400 460" className="w-full max-w-xs sm:max-w-sm md:max-w-md" fill="none" xmlns="http://www.w3.org/2000/svg">

            {/* ── Background circles ── */}
            <circle cx="200" cy="230" r="180" fill="rgba(30,122,98,0.06)" />
            <circle cx="200" cy="230" r="140" fill="rgba(44,96,142,0.05)" />

            {/* ── Spinning dashed ring ── */}
            <circle cx="200" cy="230" r="165" stroke="rgba(30,122,98,0.18)"
              strokeWidth="1.5" strokeDasharray="8 6" className="illus-spin" />

            {/* ── Large test tube (centre, floating) ── */}
            <g className="illus-float">
              <rect x="178" y="100" width="44" height="130" rx="22" fill="rgba(30,122,98,0.08)" stroke="#1e7a62" strokeWidth="2"/>
              <rect x="180" y="178" width="40" height="50" rx="0" fill="rgba(30,122,98,0.18)"/>
              <rect x="180" y="205" width="40" height="23" rx="0" fill="rgba(30,122,98,0.32)"/>
              <path d="M180,228 Q180,250 200,250 Q220,250 220,228 Z" fill="rgba(30,122,98,0.32)"/>
              <rect x="172" y="92" width="56" height="16" rx="8" fill="#1e7a62" opacity="0.85"/>
              <circle cx="193" cy="195" r="4" fill="#1e7a62" opacity="0.35" className="illus-blink"/>
              <circle cx="207" cy="210" r="2.5" fill="#2c608e" opacity="0.3" className="illus-blink" style={{animationDelay:"0.7s"}}/>
              <rect x="197" y="250" width="6" height="14" rx="3" fill="rgba(30,122,98,0.4)" className="illus-drip"/>
            </g>

            {/* ── Small test tube left (bobble) ── */}
            <g className="illus-bobble" style={{transformOrigin:"130px 310px"}}>
              <rect x="112" y="260" width="30" height="80" rx="15" fill="rgba(44,96,142,0.08)" stroke="#2c608e" strokeWidth="1.5"/>
              <rect x="114" y="300" width="26" height="38" rx="0" fill="rgba(44,96,142,0.2)"/>
              <path d="M114,325 Q114,342 127,342 Q140,342 140,325 Z" fill="rgba(44,96,142,0.2)"/>
              <rect x="108" y="253" width="38" height="12" rx="6" fill="#2c608e" opacity="0.75"/>
              <rect x="124" y="342" width="5" height="10" rx="2.5" fill="rgba(44,96,142,0.35)" className="illus-drip2"/>
            </g>

            {/* ── Microscope (right side, bobble) ── */}
            <g className="illus-bobble" style={{transformOrigin:"300px 310px", animationDelay:"0.8s"}}>
              <rect x="278" y="240" width="18" height="36" rx="9" fill="rgba(30,122,98,0.15)" stroke="#1e7a62" strokeWidth="1.5"/>
              <path d="M287,276 L287,330" stroke="#1e7a62" strokeWidth="4" strokeLinecap="round"/>
              <rect x="265" y="328" width="44" height="8" rx="4" fill="#1e7a62" opacity="0.7"/>
              <ellipse cx="287" cy="355" rx="28" ry="8" fill="rgba(30,122,98,0.5)"/>
              <path d="M287,298 L287,325" stroke="#2c608e" strokeWidth="6" strokeLinecap="round"/>
              <path d="M287,333 L280,360 M287,333 L294,360" stroke="rgba(44,96,142,0.3)" strokeWidth="1.5" strokeDasharray="3 2"/>
            </g>

            {/* ── DNA helix (left-centre) ── */}
            <g style={{opacity:0.75}}>
              {[0,1,2,3,4].map(i => (
                <g key={i}>
                  <ellipse cx={110} cy={170 + i*24} rx={18} ry={6}
                    fill="none" stroke={i%2===0 ? "#1e7a62" : "#2c608e"} strokeWidth="1.5"
                    transform={i%2===0 ? "" : "scale(-1,1) translate(-220,0)"}
                  />
                  <line x1="92" y1={170+i*24} x2="128" y2={170+i*24}
                    stroke="rgba(30,122,98,0.3)" strokeWidth="1"/>
                </g>
              ))}
            </g>

            {/* ── ECG line (bottom) ── */}
            <g style={{opacity:0.7}}>
              <path
                d="M50,390 L90,390 L105,365 L115,415 L130,375 L145,390 L350,390"
                stroke="#1e7a62" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                className="ecg-path"
              />
            </g>

            {/* ── Floating pills ── */}
            <g className="illus-float" style={{animationDelay:"1s"}}>
              <rect x="48" y="130" width="36" height="16" rx="8" fill="rgba(30,122,98,0.12)" stroke="#1e7a62" strokeWidth="1.2"/>
              <line x1="66" y1="130" x2="66" y2="146" stroke="rgba(30,122,98,0.4)" strokeWidth="1"/>
            </g>
            <g className="illus-float" style={{animationDelay:"2s"}}>
              <rect x="316" y="160" width="32" height="14" rx="7" fill="rgba(44,96,142,0.1)" stroke="#2c608e" strokeWidth="1.2"/>
              <line x1="332" y1="160" x2="332" y2="174" stroke="rgba(44,96,142,0.35)" strokeWidth="1"/>
            </g>

            {/* ── Heartbeat dot ── */}
            <circle cx="145" cy="390" r="5" fill="#1e7a62" className="illus-blink"/>

            {/* ── Floating + cross (medical) ── */}
            <g className="illus-float" style={{animationDelay:"1.5s"}}>
              <rect x="336" y="260" width="6" height="20" rx="3" fill="#2c608e" opacity="0.5"/>
              <rect x="330" y="266" width="18" height="6" rx="3" fill="#2c608e" opacity="0.5"/>
            </g>
            <g>
              <rect x="56" y="290" width="5" height="16" rx="2.5" fill="#1e7a62" opacity="0.35"/>
              <rect x="51" y="295" width="15" height="5" rx="2.5" fill="#1e7a62" opacity="0.35"/>
            </g>

          </svg>

          {/* Floating badge */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/70 backdrop-blur-sm border border-[#1e7a62]/20 px-4 py-2 text-[#1e7a62] text-sm font-semibold whitespace-nowrap shadow-sm">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Lab open 24 / 7
            </div>
          </div>
        </div>

        {/* ── Right: animated text panel ── */}
        <div className="relative w-full md:w-1/2 flex items-center justify-center px-8 sm:px-14 py-16 md:py-0 border-t border-black/5 md:border-t-0 md:border-l md:border-black/5">

          <div className={`relative z-10 max-w-md transition-all duration-300 ${visible ? "" : "opacity-0"}`}>

            <p className="hero-tag text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1e7a62]/70">
              Diagnostic Centre
            </p>

            <h1 className="hero-h1 mt-3 text-4xl sm:text-5xl font-extrabold leading-tight tracking-tight" style={{ color: "#1a4a3a" }}>
              Book Lab<br />Tests
            </h1>

            <div className="hero-h1 mt-4 h-1 w-14 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

            <p className="hero-para mt-5 text-sm sm:text-base text-gray-600 leading-relaxed">
              Get accurate diagnostic results from our state-of-the-art laboratory.
              CBC, Thyroid, Lipid, Liver, Kidney, Diabetes and more —
              all from the comfort of your home or our centre.
              <strong className="text-gray-800"> One call is all it takes.</strong>
            </p>

            <div className="hero-btn mt-8">
              <a href={`tel:${phoneNumberDial}`} className="call-btn">
                <span className="relative flex items-center justify-center w-9 h-9 rounded-full bg-gradient-to-br from-[#1e7a62] to-[#2c608e]">
                  <span className="pulse-ring" />
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white relative z-10" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                  </svg>
                </span>
                <span>Call to Book</span>
              </a>
            </div>

            <p className="hero-note mt-4 text-xs text-gray-400">
              {phoneNumberDisplay} &nbsp;·&nbsp; Available 24 / 7
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
