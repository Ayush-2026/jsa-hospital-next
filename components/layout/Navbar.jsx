"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tr } from "@/lib/translations";

const Navbar = ({ lang }) => {
  const pathname = usePathname();
  const t = tr(lang);

  const navItems = [
    { label: t.nav.home,        short: t.nav.homeShort,        path: "",             icon: "🏠" },
    { label: t.nav.about,       short: t.nav.aboutShort,       path: "/about-us",    icon: "ℹ️" },
    { label: t.nav.doctors,     short: t.nav.doctorsShort,     path: "/doctors",     icon: "👨‍⚕️" },
    { label: t.nav.departments, short: t.nav.departmentsShort, path: "/departments", icon: "🏥" },
    { label: t.nav.tests,       short: t.nav.testsShort,       path: "/book-tests",  icon: "🧪" },
  ];

  return (
    <>
      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(30,122,98,0.4); }
          50%       { box-shadow: 0 0 0 7px rgba(30,122,98,0); }
        }
        @keyframes navShine {
          0%   { left: -120%; }
          100% { left: 130%;  }
        }
        @keyframes navFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .navbar-wrap {
          background: white;
          box-shadow: 0 6px 28px rgba(44,96,142,0.10), 0 1.5px 0 rgba(30,122,98,0.07);
          position: relative;
          animation: navFadeIn 0.4s ease both;
        }
        .nav-active {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          animation: navPulse 2.2s ease-in-out infinite;
          color: white !important;
          box-shadow: 0 4px 16px rgba(30,122,98,0.35);
          white-space: nowrap;
        }
        .nav-inactive {
          position: relative;
          overflow: hidden;
          color: #4b5563;
          white-space: nowrap;
          background: transparent;
          border: 1.5px solid transparent;
          transition: color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
        }
        .nav-inactive::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          z-index: 0;
        }
        .nav-inactive::after {
          content: '';
          position: absolute;
          top: -50%; left: -120%;
          width: 55%; height: 200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%);
          transform: skewX(-15deg);
          z-index: 1;
        }
        .nav-inactive:hover::before { opacity: 1; }
        .nav-inactive:hover::after { animation: navShine 0.55s ease forwards; }
        .nav-inactive:hover {
          color: white !important;
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(30,122,98,0.25);
          border-color: transparent;
        }
        .nav-inactive > * { position: relative; z-index: 2; }
        .nav-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          border-radius: 999px;
          font-weight: 700;
          letter-spacing: 0.01em;
          transition: transform 0.25s ease, box-shadow 0.25s ease, color 0.25s ease;
          padding: 6px 12px;
          font-size: 11px;
        }
        @media (min-width: 640px) {
          .nav-link { padding: 9px 20px; font-size: 13px; gap: 6px; }
        }
        @media (min-width: 768px) {
          .nav-link { padding: 10px 26px; font-size: 15.5px; gap: 7px; }
        }
        @media (min-width: 1024px) {
          .nav-link { padding: 11px 30px; font-size: 17px; }
        }
        .nav-icon {
          font-size: 13px;
          display: none;
        }
        @media (min-width: 768px) {
          .nav-icon { display: inline; }
        }
        .nav-scroll::-webkit-scrollbar { display: none; }
        .nav-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="navbar-wrap">
        <div className="nav-scroll overflow-x-auto">
          <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 md:gap-3 px-3 sm:px-6 md:px-16 lg:px-24 py-3 sm:py-3.5 w-full">
            {navItems.map((item) => {
              const href = `/${lang}${item.path}`;
              const isActive = item.path === ""
                ? pathname === `/${lang}` || pathname === `/${lang}/`
                : pathname === href;

              return isActive ? (
                <Link key={item.path} href={href} className="nav-link nav-active">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              ) : (
                <Link key={item.path} href={href} className="nav-link nav-inactive">
                  <span className="nav-icon">{item.icon}</span>
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
