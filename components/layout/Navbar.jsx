"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = ({ lang }) => {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", path: "" },
    { label: "About Us", path: "/about-us" },
    { label: "Find a Doctor", path: "/doctors" },
    { label: "Departments", path: "/departments" },
    { label: "Book Tests", path: "/book-tests" },
  ];

  return (
    <>
      <style>{`
        @keyframes navPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(30,122,98,0.35); }
          50%       { box-shadow: 0 0 0 6px rgba(30,122,98,0); }
        }
        .nav-active {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          animation: navPulse 2.2s ease-in-out infinite;
        }
        .nav-inactive {
          position: relative;
          overflow: hidden;
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
        .nav-inactive:hover::after { opacity: 1; }
        .nav-inactive:hover { color: white; transform: translateY(-2px); }
        .nav-inactive span { position: relative; z-index: 1; }
        .nav-link {
          display: inline-flex;
          align-items: center;
          padding: 7px 18px;
          border-radius: 999px;
          font-weight: 700;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        @media (min-width: 640px) {
          .nav-link { padding: 8px 22px; }
        }
        @media (min-width: 768px) {
          .nav-link { padding: 10px 28px; }
        }
      `}</style>

      <nav className="overflow-x-auto whitespace-nowrap mt-5 sm:mt-8 mb-8 bg-white">
        <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 md:gap-4 text-[8px] sm:text-xs md:text-base px-2 sm:px-6 md:px-16 lg:px-32 py-2">
          {navItems.map((item) => {
            const href = `/${lang}${item.path}`;
            const isActive = item.path === ""
              ? pathname === `/${lang}` || pathname === `/${lang}/`
              : pathname === href;

            return isActive ? (
              <Link
                key={item.path}
                href={href}
                className="nav-link nav-active text-white"
              >
                {item.label}
              </Link>
            ) : (
              <Link
                key={item.path}
                href={href}
                className="nav-link nav-inactive text-gray-700"
              >
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
