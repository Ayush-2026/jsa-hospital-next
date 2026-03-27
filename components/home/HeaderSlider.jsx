"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";

const HeaderSlider = ({ images = [] }) => {
  const slides = useMemo(() => {
    // fallback images (put these in /public/slider/)
    if (!images || images.length === 0) {
      return ["/slider/slide1.jpg", "/slider/slide2.jpg", "/slider/slide3.jpg"];
    }
    return images;
  }, [images]);

  const [current, setCurrent] = useState(0);

  const goPrev = () =>
    setCurrent((p) => (p - 1 + slides.length) % slides.length);
  const goNext = () => setCurrent((p) => (p + 1) % slides.length);

  useEffect(() => {
    if (slides.length <= 1) return;
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length);
    }, 3500);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="mt-5 w-full py-6 sm:py-10" style={{ background: 'linear-gradient(to right, #1e7a62, #2c608e)' }}>
      {/* Search bar */}
      <div className="mx-auto w-full max-w-4xl px-4">
        <div className="relative mx-auto w-full max-w-2xl">
          <input
            className="w-full rounded-full border border-white/40 bg-white/10 px-5 py-2.5 text-sm sm:text-base text-white placeholder:text-white/70 outline-none focus:ring-2 focus:ring-white/40"
            placeholder="Search"
          />
          <Search className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/90" />
        </div>
      </div>

      {/* Slider */}
      <div className="mx-auto mt-7 sm:mt-7 w-full max-w-7xl px-4">
        <div className="relative overflow-hidden rounded-[40px] bg-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.25)] border-2 border-white/30">
          {/* Track */}
          <div
            className="flex transition-transform duration-900 ease-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {slides.map((src, i) => (
              <div key={i} className="relative min-w-full">
                <div className="relative h-[280px] sm:h-[460px] md:h-[620px]">
                  <Image
                    src={src}
                    alt={`Slide ${i + 1}`}
                    fill
                    className="object-cover"
                    priority={i === 0}
                    sizes="100vw"
                  />
                  {/* Subtle overlay to match the dark UI vibe */}
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </div>
            ))}
          </div>

          {/* Arrows */}
          {slides.length > 1 && (
            <>
              <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/35 p-2.5 backdrop-blur hover:bg-white/45 transition"
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <button
                onClick={goNext}
                aria-label="Next slide"
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/35 p-2.5 backdrop-blur hover:bg-white/45 transition"
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}

          {/* Dots */}
          {slides.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === current ? "bg-white" : "bg-white/45 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeaderSlider;
