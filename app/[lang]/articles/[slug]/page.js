import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticles } from "@/lib/queries/articles";
import { tr } from "@/lib/translations";

export async function generateStaticParams() {
  const articles = await getArticles({ publishedOnly: true });
  const langs = ["en", "hi", "mr"];
  return langs.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}

export default async function ArticleDetailPage({ params }) {
  const { lang, slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article || !article.is_published) return notFound();

  const t = tr(lang).articles;
  const title = article[`title_${lang}`] || article.title_en;
  const content = article[`content_${lang}`] || article.content_en || "";

  return (
    <main className="w-full bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-8 py-10 sm:py-14">

        {/* Back link */}
        <Link href={`/${lang}/articles`} className="text-sm text-[#1e7a62] font-semibold hover:underline">
          ← {t.backToArticles}
        </Link>

        {/* Date */}
        <p className="mt-4 text-xs text-gray-400">
          {new Date(article.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
        </p>

        {/* Title */}
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-[#1a4a3a] leading-tight">{title}</h1>
        <div className="mt-4 h-1 w-14 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

        {/* Cover image */}
        {article.image_url && (
          <div className="mt-6 relative w-full aspect-video rounded-2xl overflow-hidden">
            <Image src={article.image_url} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 768px" priority />
          </div>
        )}

        {/* Rich text content */}
        <div
          className="mt-8 prose prose-sm sm:prose max-w-none
            prose-headings:text-[#265957] prose-headings:font-bold
            prose-p:text-gray-700 prose-p:leading-relaxed
            prose-li:text-gray-700 prose-a:text-[#1e7a62]
            prose-blockquote:border-l-[#1e7a62] prose-blockquote:text-gray-500"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </main>
  );
}
