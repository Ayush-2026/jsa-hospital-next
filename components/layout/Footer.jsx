import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Footer({ lang = "en" }) {
  return (
    <footer>
      <div className="text-white flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-white/20" style={{ background: 'linear-gradient(to right, #1e7a62, #2c608e)' }}>
        {/* Brand */}
        <div className="w-full md:w-1/3">
          <Link href={`/${lang}`}>
            <Image
              className="w-28 md:w-32"
              src="/assets/bottom-logo.png"
              width={140}
              height={60}
              alt="JSA Hospital Logo"
            />
          </Link>

          <h2 className="mt-3 text-lg font-semibold">JSA Hospital</h2>
          <p className="mt-4 text-sm text-gray-200 leading-relaxed">
            Providing compassionate healthcare with cutting-edge medical
            technology and experienced professionals dedicated to your
            wellbeing.
          </p>
        </div>

        {/* Quick Links */}
        <div className="w-full md:w-1/5">
          <h2 className="font-medium mb-5">Quick Links</h2>
          <ul className="text-sm space-y-2 text-gray-200">
            <li>
              <Link href={`/${lang}`}>Home</Link>
            </li>
            <li>
              <Link href={`/${lang}/about-us`}>About us</Link>
            </li>
            <li>
              <Link href={`/${lang}/doctors`}>Find a Doctor</Link>
            </li>
            <li>
              <Link href={`/${lang}/departments`}>Departments</Link>
            </li>
            <li>
              <Link href={`/${lang}/book-tests`}>Book Tests</Link>
            </li>
          </ul>
        </div>

        {/* Patient Services */}
        <div className="w-full md:w-1/5">
          <h2 className="font-medium mb-5">Patient Services</h2>
          <ul className="text-sm space-y-2 text-gray-200">
            <li>
              <Link href={`/${lang}/consultation`}>Book Appointment</Link>
            </li>
            <li>Lab Reports</li>
            <li>Patient Feedback</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="w-full md:w-1/4">
          <h2 className="font-medium mb-5">Contact Information</h2>
          <div className="text-sm space-y-2 text-gray-200">
            <a href="tel:+919999999999">+91 9999999999</a>
            <p>email@gmail.com</p>
            <p>
              123 Medical Center Drive, Healthcare District, Mumbai, Maharashtra
              400001
            </p>
          </div>
        </div>
      </div>

      <div className="text-white py-4 text-center text-xs md:text-sm" style={{ background: 'linear-gradient(to right, #1e7a62, #2c608e)' }}>
        Copyright 2025 © Balaji LifeCare. All Rights Reserved.
      </div>
    </footer>
  );
}
