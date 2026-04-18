import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import slugify from "slugify";
import { revalidateTag } from "next/cache";

export async function POST(request) {
  console.log("POST hit");
  const response = await request.json();
  console.log("body:", response);
  const {
    name_en,
    name_hi,
    name_mr,
    specialization_en,
    specialization_hi,
    specialization_mr,
    bio_en,
    bio_hi,
    bio_mr,
    image_url,
    redirect_link,
    department_id,
    is_active,
  } = response;
  const slug = slugify(name_en, { strict: true, lower: true });
  try {
    const rows = await sql`INSERT INTO doctors 
  (slug, name_en, name_hi, name_mr, specialization_en, specialization_hi, specialization_mr,
   bio_en, bio_hi, bio_mr, image_url, redirect_link, department_id, is_active)
  VALUES 
  (${slug}, ${name_en}, ${name_hi}, ${name_mr}, ${specialization_en}, ${specialization_hi}, ${specialization_mr},
   ${bio_en}, ${bio_hi}, ${bio_mr}, ${image_url}, ${redirect_link}, ${department_id}, ${is_active})`;

    revalidateTag("doctors");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.log("error",err.message)
    return NextResponse.json({ success: false });
  }
}
