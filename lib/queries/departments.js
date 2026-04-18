// lib/queries/departments.js
import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getDepartments = unstable_cache(
  async () => {
    const rows = await sql`
      SELECT
        uuid_id,
        slug,
        icon,
        short_desc,
        short_desc_hi,
        short_desc_mr,
        name_en,
        name_hi,
        name_mr
      FROM departments
      WHERE is_active = true
      ORDER BY name_en ASC
    `;
    return rows || [];
  },
  ["departments-list"],
  { revalidate: 3600, tags: ["departments"] }
);

export const getDepartmentBySlug = unstable_cache(
  async (slug) => {
    const rows = await sql`
      SELECT
        uuid_id,
        slug,
        icon,
        image_url,
        short_desc,
        short_desc_hi,
        short_desc_mr,
        name_en,
        name_hi,
        name_mr,
        description_en,
        description_hi,
        description_mr,
        cover_image,
        is_active
      FROM departments
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows?.[0] || null;
  },
  ["department-by-slug"],
  { revalidate: 3600, tags: ["departments"] }
);
