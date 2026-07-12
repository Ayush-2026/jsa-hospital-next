import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getEvents = unstable_cache(
  async ({ publishedOnly = true } = {}) => {
    const rows = await sql`
      SELECT id, tag_en, tag_hi, tag_mr, title_en, title_hi, title_mr,
             desc_en, desc_hi, desc_mr, event_date, tag_color, tag_bg,
             is_published, created_at
      FROM events
      WHERE ${publishedOnly} IS FALSE OR is_published = true
      ORDER BY event_date DESC NULLS LAST
    `;
    return rows || [];
  },
  ["events-list"],
  { revalidate: 3600, tags: ["events"] }
);
