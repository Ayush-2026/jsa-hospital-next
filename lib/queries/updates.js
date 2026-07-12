import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getUpdates = unstable_cache(
  async ({ publishedOnly = true } = {}) => {
    const rows = await sql`
      SELECT id, tag_en, tag_hi, tag_mr, title_en, title_hi, title_mr,
             desc_en, desc_hi, desc_mr, update_date, tag_color, tag_bg,
             is_published, created_at
      FROM updates
      WHERE ${publishedOnly} IS FALSE OR is_published = true
      ORDER BY update_date DESC NULLS LAST
    `;
    return rows || [];
  },
  ["updates-list"],
  { revalidate: 3600, tags: ["updates"] }
);
