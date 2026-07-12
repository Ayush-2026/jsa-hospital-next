"use client";
import Link from "next/link";
import { tr } from "@/lib/translations";

function formatDate(dateStr) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function CardItem({ item, lang, dateField, ctaText, ctaHref, lineColor }) {
  const tag = item[`tag_${lang}`] || item.tag_en;
  const title = item[`title_${lang}`] || item.title_en;
  const desc = item[`desc_${lang}`] || item.desc_en;
  const date = formatDate(item[dateField]);

  return (
    <div className="eu-item relative flex gap-4 py-4 px-1">
      {/* Timeline dot + line */}
      <div className="flex flex-col items-center gap-1 pt-1" style={{ flexShrink: 0 }}>
        <div className="eu-dot" style={{ background: lineColor }} />
        <div className="eu-vline" style={{ background: `linear-gradient(to bottom, ${lineColor}55, transparent)` }} />
      </div>

      <div className="flex-1 min-w-0 pb-2">
        {/* Top row: tag + date */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {tag && (
            <span className="eu-tag" style={{ color: item.tag_color, background: item.tag_bg, border: `1px solid ${item.tag_color}22` }}>
              {tag}
            </span>
          )}
          {date && <span className="eu-date">{date}</span>}
        </div>

        <h4 className="eu-title">{title}</h4>

        {desc && <p className="eu-desc mt-1.5">{desc}</p>}

        <Link href={ctaHref} className="eu-read-link">
          {ctaText} <span className="eu-arrow">→</span>
        </Link>
      </div>
    </div>
  );
}

export default function EventsUpdatesSection({ lang = "en", events = [], updates = [] }) {
  const t = tr(lang).home.events;
  const eventsData = events.slice(0, 3);
  const updatesData = updates.slice(0, 3);

  if (eventsData.length === 0 && updatesData.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes euOrb {
          0%,100% { transform: scale(1) translate(0,0); }
          50%      { transform: scale(1.1) translate(-8px,10px); }
        }
        @keyframes euFadeUp {
          from { opacity:0; transform:translateY(20px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes euShine {
          0%   { left: -120%; }
          100% { left: 130%; }
        }
        @keyframes euCardIn {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }

        .eu-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, #f5f9ff 0%, #ffffff 50%, #f0faf6 100%);
        }
        .eu-orb1 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:400px; height:400px; top:-100px; left:-80px;
          background: radial-gradient(circle, rgba(44,96,142,0.07) 0%, transparent 70%);
          animation: euOrb 11s ease-in-out infinite;
        }
        .eu-orb2 {
          position:absolute; pointer-events:none; border-radius:50%;
          width:320px; height:320px; bottom:-60px; right:-60px;
          background: radial-gradient(circle, rgba(30,122,98,0.07) 0%, transparent 70%);
          animation: euOrb 9s ease-in-out 2s infinite reverse;
        }
        .eu-dot-grid {
          position:absolute; inset:0; pointer-events:none;
          background-image: radial-gradient(rgba(44,96,142,0.08) 1px, transparent 1px);
          background-size: 30px 30px;
          opacity: 0.5;
        }

        .eu-title-grad {
          background: linear-gradient(to right, #1e7a62, #2c608e);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .eu-underline {
          display:block; margin:10px auto 0;
          width:56px; height:3px; border-radius:999px;
          background: linear-gradient(to right, #1e7a62, #2c608e);
        }

        /* Panel card */
        .eu-panel {
          position: relative;
          overflow: hidden;
          background: white;
          border-radius: 24px;
          border: 1.5px solid rgba(44,96,142,0.08);
          box-shadow: 0 8px 40px rgba(44,96,142,0.09), 0 2px 8px rgba(0,0,0,0.04);
          animation: euCardIn 0.55s ease both;
          transition: box-shadow 0.3s ease, transform 0.3s ease;
        }
        @media (hover: hover) {
          .eu-panel:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 56px rgba(44,96,142,0.14), 0 4px 16px rgba(0,0,0,0.06);
          }
        }

        /* Panel header stripe */
        .eu-panel-header {
          padding: 18px 22px 14px;
          border-bottom: 1px solid rgba(44,96,142,0.07);
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .eu-panel-title {
          font-size: 1.05rem; font-weight: 800; color: #1a1a2e;
        }
        @media (min-width:640px) { .eu-panel-title { font-size: 1.15rem; } }

        /* Top accent bar */
        .eu-panel-stripe {
          position:absolute; top:0; left:0; right:0; height:3px;
          border-radius: 24px 24px 0 0;
        }

        /* Item styles */
        .eu-dot {
          width: 10px; height: 10px; border-radius: 50%;
          flex-shrink: 0; margin-top: 2px;
          box-shadow: 0 0 0 3px rgba(30,122,98,0.1);
        }
        .eu-vline {
          width: 1.5px; flex: 1; min-height: 24px;
          border-radius: 999px;
        }
        .eu-tag {
          font-size: 0.68rem; font-weight: 700;
          padding: 2px 10px; border-radius: 999px;
          letter-spacing: 0.04em; text-transform: uppercase;
          flex-shrink: 0;
        }
        .eu-date {
          font-size: 0.72rem; color: #9ca3af; font-weight: 500;
          margin-left: auto;
        }
        .eu-title {
          font-size: 0.875rem; font-weight: 700; color: #111827;
          line-height: 1.35;
        }
        @media (min-width:640px) { .eu-title { font-size: 0.95rem; } }
        .eu-desc {
          font-size: 0.78rem; color: #6b7280; line-height: 1.6;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        @media (min-width:640px) { .eu-desc { font-size: 0.82rem; } }
        .eu-read-link {
          display: inline-flex; align-items: center; gap: 4px;
          margin-top: 8px;
          font-size: 0.75rem; font-weight: 700; color: #1e7a62;
          transition: gap 0.2s ease, opacity 0.2s ease;
        }
        .eu-read-link:hover { opacity: 0.75; gap: 8px; }
        .eu-arrow { display:inline-block; transition: transform 0.2s ease; }
        .eu-read-link:hover .eu-arrow { transform: translateX(2px); }

        /* divider between items */
        .eu-item + .eu-item { border-top: 1px solid rgba(44,96,142,0.06); }

        .eu-empty {
          padding: 20px 22px 24px;
          font-size: 0.85rem;
          color: #9ca3af;
        }

        /* View button */
        .eu-view-btn {
          position: relative; overflow: hidden;
          display: block; text-align: center;
          padding: 11px 0;
          border-radius: 14px;
          font-weight: 700; font-size: 0.88rem;
          color: white;
          border: none; cursor: pointer;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }
        .eu-view-btn::before {
          content:''; position:absolute; inset:0;
          background: linear-gradient(135deg, #1e7a62, #2c608e);
          transition: opacity 0.3s ease;
        }
        .eu-view-btn::after {
          content:'';
          position:absolute; top:-50%; left:-120%;
          width:55%; height:200%;
          background: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.28) 50%, transparent 80%);
          transform: skewX(-15deg); z-index:1;
        }
        .eu-view-btn span { position:relative; z-index:2; }
        @media (hover: hover) {
          .eu-view-btn:hover::after { animation: euShine 0.55s ease forwards; }
          .eu-view-btn:hover { transform:translateY(-3px); box-shadow:0 14px 36px rgba(30,122,98,0.38); }
        }
      `}</style>

      <section className="eu-section w-full">
        <div className="eu-orb1" />
        <div className="eu-orb2" />
        <div className="eu-dot-grid" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-8 py-14 sm:py-20">

          {/* Heading */}
          <div className="text-center" style={{ animation: "euFadeUp 0.6s ease both" }}>
            <p className="text-xs sm:text-sm font-semibold tracking-widest uppercase text-[#1e7a62] mb-2">
              {t.eyebrow}
            </p>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
              {t.title}{" "}
              <span className="eu-title-grad">{t.titleAccent}</span>
            </h2>
            <span className="eu-underline" />
            <p className="mt-4 text-xs sm:text-sm text-gray-500 font-medium">
              {t.subtitle}
            </p>
          </div>

          {/* Two panels */}
          <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-7">

            {/* Events panel */}
            <div className="eu-panel flex flex-col" style={{ animationDelay: "0ms" }}>
              <div className="eu-panel-stripe" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
              <div className="eu-panel-header">
                <span className="eu-panel-title">{t.eventsPanel}</span>
              </div>

              {eventsData.length > 0 ? (
                <div className="px-4 sm:px-6 py-2">
                  {eventsData.map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      lang={lang}
                      dateField="event_date"
                      lineColor="#1e7a62"
                      ctaText={t.learnMore}
                      ctaHref={`/${lang}/events`}
                    />
                  ))}
                </div>
              ) : (
                <p className="eu-empty">No upcoming events right now.</p>
              )}

              <div className="px-4 sm:px-6 pb-5 pt-1 mt-auto">
                <Link href={`/${lang}/events`} className="eu-view-btn">
                  <span>{t.viewEvents}</span>
                </Link>
              </div>
            </div>

            {/* Updates panel */}
            <div className="eu-panel flex flex-col" style={{ animationDelay: "120ms" }}>
              <div className="eu-panel-stripe" style={{ background: "linear-gradient(to right, #2c608e, #7c3aed)" }} />
              <div className="eu-panel-header">
                <span className="eu-panel-title">{t.updatesPanel}</span>
              </div>

              {updatesData.length > 0 ? (
                <div className="px-4 sm:px-6 py-2">
                  {updatesData.map((item) => (
                    <CardItem
                      key={item.id}
                      item={item}
                      lang={lang}
                      dateField="update_date"
                      lineColor="#2c608e"
                      ctaText={t.readMore}
                      ctaHref={`/${lang}/updates`}
                    />
                  ))}
                </div>
              ) : (
                <p className="eu-empty">No updates right now.</p>
              )}

              <div className="px-4 sm:px-6 pb-5 pt-1 mt-auto">
                <Link href={`/${lang}/updates`} className="eu-view-btn">
                  <span style={{ position: "relative", zIndex: 2 }}>{t.viewUpdates}</span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
