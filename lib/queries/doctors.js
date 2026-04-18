// lib/queries/doctors.js
import { sql } from "@/lib/db";
import { unstable_cache } from "next/cache";

export const getDoctors = unstable_cache(
  async ({ activeOnly = true } = {}) => {
    const rows = await sql`
      SELECT
        id,
        slug,
        name_en,
        name_hi,
        name_mr,
        specialization_en,
        specialization_hi,
        specialization_mr,
        image_url,
        is_active,
        department_id
      FROM doctors
      WHERE ${activeOnly} IS FALSE OR is_active = true
      ORDER BY name_en ASC
    `;
    return rows || [];
  },
  ["doctors-list"],
  { revalidate: 3600, tags: ["doctors"] }
);


export const getDoctorBySlug = unstable_cache(
  async (slug) => {
    const rows = await sql`
      SELECT *
      FROM doctors
      WHERE slug = ${slug}
      LIMIT 1
    `;
    return rows?.[0] || null;
  },
  ["doctor-by-slug"],
  { revalidate: 3600, tags: ["doctors"] }
);


export const getDoctorsByDepartmentUuid = (departmentUuid) =>
  unstable_cache(
    async () => {
      const rows = await sql`
        SELECT
          id,
          slug,
          name_en,
          name_hi,
          name_mr,
          specialization_en,
          specialization_hi,
          specialization_mr,
          image_url,
          redirect_link
        FROM doctors
        WHERE department_id = ${departmentUuid}
        ORDER BY name_en ASC
      `;
      return rows || [];
    },
    [`doctors-by-department-${departmentUuid}`],
    { revalidate: 3600, tags: ["doctors"] }
  )();
