"use client";

import React from "react";
import Link from "next/link";
import { Stethoscope, TestTube2, PhoneCall } from "lucide-react";

const cards = [
  { icon: Stethoscope, label: "Book Consultation", href: (lang) => `/${lang}/consultation`, as: "link" },
  { icon: TestTube2,   label: "Book Test",         href: (lang) => `/${lang}/book-tests`,  as: "link" },
  { icon: PhoneCall,   label: "Call Us",            href: () => "tel:+919999999999",         as: "a"    },
];

const MedicalAssistance = ({ lang = "en" }) => {
  return (
    <>
      <style>{`
        @keyframes swipeShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        .ma-card {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #1e7a62 0%, #2c608e 100%);
          border: 1px solid rgba(255,255,255,0.15);
          box-shadow: 0 8px 24px rgba(44,96,142,0.25);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .ma-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -120%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            120deg,
            transparent 20%,
            rgba(255,255,255,0.28) 50%,
            transparent 80%
          );
          transform: skewX(-15deg);
          transition: none;
        }
        .ma-card:hover::before {
          animation: swipeShine 0.6s ease forwards;
        }
        .ma-card:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 16px 36px rgba(30,122,98,0.35);
        }
        .ma-icon {
          transition: transform 0.3s ease;
        }
        .ma-card:hover .ma-icon {
          transform: scale(1.18) rotate(-6deg);
        }
      `}</style>

      <section className="w-full bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-16 text-center">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-[#265957]">
            Need Medical Assistance? Take the First Step.
          </h2>
          <p className="mt-2 sm:mt-3 text-xs sm:text-lg font-medium text-gray-500">
            Advanced healthcare with modern technology
          </p>

          <div className="mt-7 sm:mt-14 flex flex-wrap justify-center gap-4 sm:gap-12">
            {cards.map(({ icon: Icon, label, href, as: Tag }) => {
              const inner = (
                <div className="ma-card rounded-2xl text-white flex flex-col items-center justify-center cursor-pointer w-28 h-20 sm:w-48 sm:h-36 gap-2 sm:gap-3">
                  <Icon className="ma-icon w-5 h-5 sm:w-9 sm:h-9" strokeWidth={1.7} />
                  <span className="text-[10px] sm:text-base font-semibold text-center px-2 relative z-10">
                    {label}
                  </span>
                </div>
              );

              return Tag === "link" ? (
                <Link key={label} href={href(lang)}>{inner}</Link>
              ) : (
                <a key={label} href={href(lang)}>{inner}</a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default MedicalAssistance;
