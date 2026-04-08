import React from "react";
import Image from "next/image";
import Link from "next/link";

const Heading = ({ lang = "en" }) => {
  return (
    <div className="bg-white px-3 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-7 pb-2 sm:pb-3">
      <div className="flex items-center gap-2 sm:gap-4">

        {/* Logo */}
        <Link href={`/${lang}`} className="shrink-0">
          <Image
            src="/upLogo.png"
            alt="Balaji LifeCare Logo"
            width={120}
            height={120}
            priority
            className="w-10 h-10 sm:w-20 sm:h-20 md:w-28 md:h-28 object-contain"
          />
        </Link>

        {/* Title */}
        <div className="flex-1 min-w-0 text-center">
          <h1 className="text-xl sm:text-4xl md:text-6xl font-bold text-gray-900 leading-tight truncate">
            JSA Hospital
          </h1>
          <p className="text-[9px] sm:text-xs md:text-sm text-gray-400 italic mt-0.5 tracking-wide">
            Unit of Balaji HealthCare
          </p>
        </div>

        {/* Language selector */}
        <div className="shrink-0">
          <select className="text-[10px] sm:text-sm border border-gray-300 rounded-lg px-1.5 py-1 sm:px-3 sm:py-1.5 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#1e7a62]/40 bg-white shadow-sm">
            <option value="en">EN</option>
            <option value="hi">हिन्दी</option>
            <option value="mr">MR</option>
          </select>
        </div>

      </div>

      {/* Gradient accent line */}
      <div className="mt-2 sm:mt-3 h-0.5 w-full rounded-full opacity-30"
        style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
    </div>
  );
};

export default Heading;
