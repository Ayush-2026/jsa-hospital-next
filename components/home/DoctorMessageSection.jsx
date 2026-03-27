"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { doctorMessagesMock } from "@/lib/data/doctorMessageMock";

export default function DoctorMessageSection({ lang = "en" }) {
  return (
    <section className="relative w-full py-14 sm:py-20 bg-gradient-to-b from-[#dff3ff] via-[#edf9ff] to-[#f7f2ff]">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Heading */}
        <h2 className="text-center text-2xl sm:text-4xl md:text-5xl font-bold text-[#265957]">
          What our Doctors have to say
        </h2>

        {/* Cards wrapper */}
        <div className="mt-12 sm:mt-16 flex flex-col gap-10 sm:gap-16">
          {doctorMessagesMock.map((doc, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={doc.id}
                className={`w-full ${
                  // Wider cards overall
                  "max-w-[980px] md:max-w-[1040px]"
                } ${
                  // Push left card slightly left, right card slightly right
                  isLeft
                    ? "mr-auto md:mr-auto md:-translate-x-6"
                    : "ml-auto md:ml-auto md:translate-x-6"
                } transform`}
              >
                <div className="rounded-[28px] sm:rounded-[34px] p-6 sm:p-10 bg-gradient-to-r from-[#1e7a62] to-[#2c608e] text-white shadow-[0_18px_45px_rgba(0,0,0,0.18)]">
                  {/* Small header text */}
                  <p className="text-xs sm:text-sm opacity-90">
                    Message from Doctor
                  </p>
                  <p className="text-[10px] sm:text-xs opacity-80">
                    Lighthouse of Healthcare
                  </p>

                  {/* Content row */}
                  <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row gap-5 sm:gap-8 items-start">
                    {/* Image */}
                    <div className="relative w-24 h-28 sm:w-40 sm:h-44 md:w-44 md:h-48 rounded-xl overflow-hidden bg-white/95 shrink-0">
                      <Image
                        src={doc.image}
                        alt={doc.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 96px, 180px"
                      />
                    </div>

                    {/* Text */}
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-2xl font-bold leading-snug">
                        {doc.name}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm opacity-85">
                        {doc.designation}
                      </p>

                      <p className="mt-4 text-sm sm:text-base leading-relaxed opacity-95">
                        {doc.message}
                      </p>

                      <div className="mt-5 sm:mt-7">
                        <Link href={`/${lang}/doctors`}>
                          <button className="bg-white text-[#0b63c7] text-xs sm:text-sm px-5 sm:px-6 py-2 rounded-lg hover:bg-gray-100 transition">
                            Read More
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-12 sm:mt-16 text-center">
          <Link href={`/${lang}/doctors`}>
            <button className="border border-gray-700 px-6 py-2.5 rounded-full text-sm sm:text-base hover:bg-blue-500 hover:text-white transition">
              View all doctors
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
