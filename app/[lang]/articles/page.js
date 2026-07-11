import Link from "next/link";
import Image from "next/image";
import { getArticles } from "@/lib/queries/articles";
import { tr } from "@/lib/translations";

function stripHtml(html) {
  return (html || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim();
}

export default async function ArticlesPage({ params }) {
  const { lang } = await params;
  const t = tr(lang).articles;
  const articles = await getArticles({ publishedOnly: true });

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-8 py-10 sm:py-14">
        <p className="text-xs sm:text-sm font-bold tracking-widest uppercase text-[#1e7a62]/70">{t.eyebrow}</p>
        <h1 className="mt-2 text-3xl sm:text-5xl font-extrabold text-[#1a4a3a] leading-tight">{t.title}</h1>
        <div className="mt-4 h-1 w-14 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />
        <p className="mt-4 text-sm sm:text-base text-gray-500">{t.subtitle}</p>

        {articles.length === 0 && (
          <p className="mt-12 text-gray-400">{t.noArticles}</p>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((a) => {
            const title = a[`title_${lang}`] || a.title_en;
            const content = stripHtml(a[`content_${lang}`] || a.content_en || "");
            const excerpt = content.length > 120 ? content.slice(0, 120) + "..." : content;

            return (
              <Link key={a.slug} href={`/${lang}/articles/${a.slug}`} className="group block">
                <div className="h-full bg-white rounded-2xl border border-gray-100 shadow hover:shadow-lg transition overflow-hidden flex flex-col">
                  {a.image_url && (
                    <div className="relative w-full aspect-video overflow-hidden">
                      <Image src={a.image_url} alt={title} fill className="object-cover group-hover:scale-105 transition duration-500" sizes="(max-width: 640px) 100vw, 33vw" />
                    </div>
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </p>
                    <h2 className="font-bold text-[#265957] text-base sm:text-lg leading-snug group-hover:text-[#1e7a62] transition">{title}</h2>
                    {excerpt && <p className="mt-2 text-sm text-gray-500 leading-relaxed flex-1">{excerpt}</p>}
                    <span className="mt-4 text-sm font-semibold text-[#1e7a62] group-hover:underline">{t.readMore} →</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
