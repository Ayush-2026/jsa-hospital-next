"use client";

import React from "react";

export default function TalkToOurTeam() {
  const googleMapsUrl =
    "https://www.google.com/maps/search/?api=1&query=JSA+Hospital+Nagpur";

  return (
    <>
      <style>{`
        @keyframes mapPing {
          0%   { transform: scale(1);    opacity: 1;   }
          70%  { transform: scale(2.4);  opacity: 0;   }
          100% { transform: scale(2.4);  opacity: 0;   }
        }
        @keyframes mapBobble {
          0%, 100% { transform: translateY(0px);  }
          50%       { transform: translateY(-6px); }
        }
        @keyframes roadDraw {
          from { stroke-dashoffset: 300; }
          to   { stroke-dashoffset: 0;   }
        }
        .map-ping       { animation: mapPing   1.8s ease-out infinite; }
        .map-bobble     { animation: mapBobble 2.2s ease-in-out infinite; }
        .road-draw      { animation: roadDraw  2s ease forwards; }
        .locate-btn {
          position: relative;
          overflow: hidden;
          background: white;
          color: #1e7a62;
          font-weight: 700;
          padding: 10px 28px;
          border-radius: 10px;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }
        .locate-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 28px rgba(0,0,0,0.22);
        }
      `}</style>

      <section className="w-full py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-8">
          <div
            className="text-white rounded-2xl overflow-hidden shadow-xl"
            style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 items-stretch">

              {/* Left: Call CTA */}
              <div className="flex flex-col items-center justify-center text-center gap-6 p-8 sm:p-12">

                {/* Animated help icon */}
                <div className="relative flex items-center justify-center">
                  {/* outer pulse rings */}
                  <span className="absolute w-32 h-32 rounded-full bg-white/10 map-ping" style={{ animationDelay: "0s" }} />
                  <span className="absolute w-24 h-24 rounded-full bg-white/15 map-ping" style={{ animationDelay: "0.6s" }} />
                  {/* icon circle */}
                  <div className="relative z-10 w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white/20 border-2 border-white/40 flex items-center justify-center shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                    </svg>
                  </div>
                </div>

                {/* Text */}
                <div>
                  <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase opacity-75">
                    We&apos;re always here for you
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-4xl font-bold leading-tight">
                    Talk to Our Team
                  </h2>
                  <p className="mt-3 text-sm sm:text-base opacity-80 max-w-xs mx-auto leading-relaxed">
                    Our care team is available <strong>24/7</strong>. One call is all it takes — we&apos;re ready to help you find the right care.
                  </p>
                </div>

                {/* Big call button */}
                <a
                  href="tel:+919999999999"
                  className="locate-btn flex items-center gap-3 text-base sm:text-lg px-8 py-4 rounded-2xl"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 sm:w-6 sm:h-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24c1.12.37 2.33.57 3.58.57a1 1 0 011 1V20a1 1 0 01-1 1C10.61 21 3 13.39 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.58a1 1 0 01-.25 1.01l-2.2 2.2z"/>
                  </svg>
                  Call Us Now
                </a>

                <p className="text-xs opacity-60">+91 9999999999 &nbsp;·&nbsp; Available 24 / 7</p>
              </div>

              {/* Right: Map illustration + address */}
              <div className="flex flex-col items-center justify-center gap-5 p-6 sm:p-10 border-t border-white/20 md:border-t-0 md:border-l md:border-white/20">

                {/* Animated map SVG */}
                <div className="relative w-full max-w-65 sm:max-w-75">
                  <svg
                    viewBox="0 0 300 200"
                    className="w-full rounded-xl"
                    style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)" }}
                  >
                    {/* Grid lines */}
                    {[40, 80, 120, 160].map((y) => (
                      <line key={y} x1="0" y1={y} x2="300" y2={y} stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    ))}
                    {[60, 120, 180, 240].map((x) => (
                      <line key={x} x1={x} y1="0" x2={x} y2="200" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
                    ))}

                    {/* Roads */}
                    <path
                      d="M0,100 Q75,95 150,100 Q225,105 300,100"
                      fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="6" strokeLinecap="round"
                      className="road-draw" strokeDasharray="300" strokeDashoffset="300"
                    />
                    <path
                      d="M150,0 Q155,50 150,100 Q145,150 150,200"
                      fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="4" strokeLinecap="round"
                      className="road-draw" strokeDasharray="300" strokeDashoffset="300"
                      style={{ animationDelay: "0.4s" }}
                    />
                    <path
                      d="M60,0 Q65,60 80,100 Q95,140 90,200"
                      fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" strokeLinecap="round"
                      className="road-draw" strokeDasharray="300" strokeDashoffset="300"
                      style={{ animationDelay: "0.7s" }}
                    />

                    {/* Ping ring */}
                    <circle cx="150" cy="100" r="10" fill="rgba(255,255,255,0.2)" className="map-ping" />

                    {/* Pin base dot */}
                    <circle cx="150" cy="107" r="4" fill="white" opacity="0.9" />

                    {/* Animated pin */}
                    <g className="map-bobble" style={{ transformOrigin: "150px 90px" }}>
                      <path
                        d="M150,60 C138,60 128,70 128,82 C128,96 150,112 150,112 C150,112 172,96 172,82 C172,70 162,60 150,60 Z"
                        fill="white"
                      />
                      <circle cx="150" cy="82" r="7" fill="#1e7a62" />
                    </g>
                  </svg>
                </div>

                {/* Address */}
                <div className="text-center text-sm sm:text-base text-white/90 leading-relaxed px-2">
                  <p className="font-bold text-white text-base sm:text-lg mb-1">JSA Hospital</p>
                  <p>123 Medical Center Drive,</p>
                  <p>Healthcare District, Nagpur,</p>
                  <p>Maharashtra – 440001</p>
                </div>

                {/* Locate button */}
                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                  <button className="locate-btn flex items-center gap-2 text-sm sm:text-base">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                    </svg>
                    Locate Us
                  </button>
                </a>

              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
