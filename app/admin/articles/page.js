import Link from "next/link";
import { getArticles } from "@/lib/queries/articles";
import DeleteArticleButton from "./DeleteArticleButton";
import { Plus } from "lucide-react";

export default async function AdminArticlesPage() {
  const articles = await getArticles({ publishedOnly: false });

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(135deg, #f0faf7 0%, #f4f8ff 100%)" }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#265957] tracking-tight">Articles</h1>
        <p className="mt-2 text-sm text-gray-500">Add, edit, and delete hospital articles.</p>
        <div className="mt-3 h-1 w-16 rounded-full" style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }} />

        <div className="mt-8 flex flex-col gap-4">
          {articles.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl shadow border border-gray-100 p-5 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-gray-900 truncate">{a.title_en}</h3>
                  {!a.is_published && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 font-semibold shrink-0">Draft</span>
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {new Date(a.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <Link
                  href={`/admin/articles/${a.slug}`}
                  className="px-3 py-1 rounded-xl text-white text-sm font-semibold"
                  style={{ background: "linear-gradient(to right, #1e7a62, #2c608e)" }}
                >
                  Edit
                </Link>
                <DeleteArticleButton slug={a.slug} />
              </div>
            </div>
          ))}

          {articles.length === 0 && (
            <p className="text-gray-400 text-sm">No articles yet. Add your first one!</p>
          )}

          <Link href="/admin/articles/addNew">
            <div className="bg-white rounded-2xl shadow border border-gray-100 hover:shadow-lg transition p-6 flex items-center justify-center gap-3 cursor-pointer">
              <Plus size={28} />
              <span className="font-semibold text-lg">Add New Article</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
