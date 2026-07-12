"use client";

import { tr } from "@/lib/translations";

function initials(name) {
  return (name || "?").trim().charAt(0).toUpperCase();
}

function Card({ item, lang }) {
  const name = item[`name_${lang}`] || item.name_en;
  const review = item[`review_${lang}`] || item.review_en;

  return (
    <div className="ts-card">
      {item.photo_url ? (
        <img src={item.photo_url} alt={name} className="ts-photo" />
      ) : (
        <div className="ts-photo ts-photo-fallback">{initials(name)}</div>
      )}
      <p className="ts-quote">&ldquo;{review}&rdquo;</p>
      <p className="ts-name">{name}</p>
    </div>
  );
}

export default function TestimonialsSection({ lang = "en", testimonials = [] }) {
  if (testimonials.length === 0) return null;

  const t = tr(lang).home.testimonials;
  // Duplicate the list so the track can loop seamlessly at the halfway point.
  const track = [...testimonials, ...testimonials];
  // Scales with card count so the per-card pace stays roughly constant.
  const duration = Math.max(testimonials.length * 3, 10);
  // Card width (300px) + horizontal margin (12px * 2) = 324px per card.
  const halfWidthPx = testimonials.length * 324;

  return (
    <>
      <style>{`
        @keyframes tsScroll {
          from { left: -${halfWidthPx}px; }
          to   { left: 0px; }
        }
        .ts-track {
          position: relative;
          animation: tsScroll ${duration}s linear infinite;
        }
        .ts-card {
          flex: 0 0 auto;
          width: 300px;
          min-height: 260px;
          background: #ffffff;
          border-radius: 20px;
          border: 1px solid rgba(44,96,142,0.08);
          box-shadow: 0 8px 30px rgba(44,96,142,0.08), 0 2px 8px rgba(0,0,0,0.03);
          padding: 28px 24px;
          margin: 0 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }
        .ts-photo {
          width: 64px;
          height: 64px;
          border-radius: 9999px;
          object-fit: cover;
          border: 3px solid rgba(30,122,98,0.12);
          flex-shrink: 0;
        }
        .ts-photo-fallback {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 800;
          font-size: 1.3rem;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
        }
        .ts-quote {
          margin-top: 16px;
          flex: 1;
          font-size: 0.9rem;
          line-height: 1.6;
          max-height: 6.4em;
          color: #4b5563;
          font-style: italic;
          overflow: hidden;
        }
        .ts-name {
          margin-top: 14px;
          font-weight: 700;
          font-size: 0.9rem;
          color: #1a4a3a;
        }
      `}</style>

      <section className="w-full py-14 sm:py-20 overflow-hidden" style={{ background: "linear-gradient(160deg, rgba(44,96,142,0.05) 0%, rgba(30,122,98,0.04) 100%)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-8 text-center">
          <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1e7a62]/70">
            {t.eyebrow}
          </p>
          <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-[#1a4a3a] leading-tight">
            {t.title}{" "}
            <span style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              {t.titleAccent}
            </span>
          </h2>
          <div className="mt-3 mx-auto h-1 w-12 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
          <p className="mt-4 text-sm text-gray-500 font-medium">{t.subtitle}</p>
        </div>

        <div className="mt-10 sm:mt-14 w-full overflow-hidden">
          <div className="ts-track flex w-max">
            {track.map((item, idx) => (
              <Card key={`${item.id}-${idx}`} item={item} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
