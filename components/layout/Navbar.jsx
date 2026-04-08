"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ lang }) => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home",          short: "Home",    path: ""            },
    { label: "About Us",      short: "About",   path: "/about-us"   },
    { label: "Find a Doctor", short: "Doctors", path: "/doctors"    },
    { label: "Departments",   short: "Depts",   path: "/departments"},
    { label: "Book Tests",    short: "Tests",   path: "/book-tests" },
  ];

  return (
    <>
      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(30,122,98,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(30,122,98,0);  }
        }
        .nav-active {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          animation: navPulse 2.2s ease-in-out infinite;
          color: white;
          white-space: nowrap;
        }
        .nav-inactive {
          position: relative;
          overflow: hidden;
          color: #374151;
          white-space: nowrap;
        }
        .nav-inactive::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to right, #1e7a62, #2c608e);
          opacity: 0;
          transition: opacity 0.3s ease;
          border-radius: inherit;
          z-index: 0;
        }
        .nav-inactive:hover::after  { opacity: 1; }
        .nav-inactive:hover         { color: white; transform: translateY(-2px); }
        .nav-inactive span          { position: relative; z-index: 1; }
        .nav-link {
          display: inline-flex;
          align-items: center;
          border-radius: 999px;
          font-weight: 700;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          /* mobile */
          padding: 6px 14px;
          font-size: 11px;
        }
        @media (min-width: 640px) {
          .nav-link { padding: 8px 20px; font-size: 13px; }
        }
        @media (min-width: 768px) {
          .nav-link { padding: 10px 28px; font-size: 15px; }
        }
        /* hide scrollbar on mobile strip */
        .nav-scroll::-webkit-scrollbar { display: none; }
        .nav-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <nav className="bg-white border-b border-gray-100 shadow-sm mb-4 sm:mb-8">
        <div className="nav-scroll overflow-x-auto">
          <div className="flex items-center justify-between sm:justify-center gap-1 sm:gap-2 md:gap-4 px-3 sm:px-6 md:px-16 lg:px-32 py-2.5 sm:py-3 w-full">
            {navItems.map((item) => {
              const href = `/${lang}${item.path}`;
              const isActive = item.path === ""
                ? pathname === `/${lang}` || pathname === `/${lang}/`
                : pathname === href;

              const labelEl = (
                <>
                  <span className="sm:hidden">{item.short}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </>
              );

              return isActive ? (
                <Link key={item.path} href={href} className="nav-link nav-active">
                  {labelEl}
                </Link>
              ) : (
                <Link key={item.path} href={href} className="nav-link nav-inactive">
                  <span className="sm:hidden relative z-10">{item.short}</span>
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
