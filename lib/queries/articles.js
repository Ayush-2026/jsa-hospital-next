import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getArticles = unstable_cache(
  async ({ publishedOnly = true } = {}) => {
    const rows = await sql`
      SELECT id, slug, title_en, title_hi, title_mr,
             image_url, is_published, created_at
      FROM articles
      WHERE ${publishedOnly} IS FALSE OR is_published = true
      ORDER BY created_at DESC
    `;
    return rows || [];
  },
  ["articles-list"],
  { revalidate: 3600, tags: ["articles"] }
);

export const getArticleBySlug = unstable_cache(
  async (slug) => {
    const rows = await sql`
      SELECT * FROM articles WHERE slug = ${slug} LIMIT 1
    `;
    return rows?.[0] || null;
  },
  ["article-by-slug"],
  { revalidate: 3600, tags: ["articles"] }
);
