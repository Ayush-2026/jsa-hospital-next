"use client";

import Link from "next/link";
import Image from "next/image";

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export default function ArticlesSection({ lang, articles = [] }) {
  if (articles.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes articleFadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .article-card {
          animation: articleFadeUp 0.5s ease both;
        }
        .article-card:nth-child(2) { animation-delay: 0.1s; }
        .article-card:nth-child(3) { animation-delay: 0.2s; }
      `}</style>

      <section className="w-full py-14 sm:py-20" style={{ background: "linear-gradient(160deg, rgba(30,122,98,0.04) 0%, rgba(44,96,142,0.06) 100%)" }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-8">

          {/* Header */}
          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1e7a62]/70">
                Hospital Articles
              </p>
              <h2 className="mt-1 text-2xl sm:text-4xl font-extrabold text-[#1a4a3a] leading-tight">
                Latest <span style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>Articles</span>
              </h2>
              <div className="mt-3 h-1 w-12 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
            </div>
            <Link
              href={`/${lang}/articles`}
              className="text-sm font-semibold text-[#1e7a62] hover:underline whitespace-nowrap"
            >
              View All Articles →
            </Link>
          </div>

          {/* Cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.slice(0, 3).map((a) => {
              const title = a[`title_${lang}`] || a.title_en;
              const content = stripHtml(a[`content_${lang}`] || a.content_en || "");
              const excerpt = content.length > 100 ? content.slice(0, 100) + "..." : content;

              return (
                <Link key={a.slug} href={`/${lang}/articles/${a.slug}`} className="group block article-card">
                  <div className="h-full bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col">
                    {a.image_url ? (
                      <div className="relative w-full aspect-video overflow-hidden">
                        <Image
                          src={a.image_url}
                          alt={title}
                          fill
                          className="object-cover group-hover:scale-105 transition duration-500"
                          sizes="(max-width: 640px) 100vw, 33vw"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-video flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(30,122,98,0.08), rgba(44,96,142,0.10))" }}>
                        <span className="text-4xl">📰</span>
                      </div>
                    )}
                    <div className="p-5 flex flex-col flex-1">
                      <p className="text-xs text-gray-400 mb-2">
                        {new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                      </p>
                      <h3 className="font-bold text-[#265957] text-base leading-snug group-hover:text-[#1e7a62] transition line-clamp-2">
                        {title}
                      </h3>
                      {excerpt && (
                        <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1 line-clamp-3">{excerpt}</p>
                      )}
                      <span className="mt-4 text-sm font-semibold text-[#1e7a62] group-hover:underline">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

        </div>
      </section>
    </>
  );
}
