import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getTestimonials = unstable_cache(
  async ({ publishedOnly = true } = {}) => {
    const rows = await sql`
      SELECT id, name_en, name_hi, name_mr,
             review_en, review_hi, review_mr,
             photo_url, is_published, created_at
      FROM testimonials
      WHERE ${publishedOnly} IS FALSE OR is_published = true
      ORDER BY created_at DESC
    `;
    return rows || [];
  },
  ["testimonials-list"],
  { revalidate: 3600, tags: ["testimonials"] }
);
