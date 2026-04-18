import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import slugify from 'slugify'
import { revalidateTag } from "next/cache";

export async function POST(request,{params}){
    console.log("POST hit");
    const response = await request.json();
    console.log("body:", response);
    const {
      name_en,
      name_hi,
      name_mr,
      short_desc,
      short_desc_hi,
      short_desc_mr,
      description_en,
      description_hi,
      description_mr,
      image_url,
      cover_image,
      icon,
      is_active,
    } = response;
    const slug = slugify(name_en, { strict: true, lower: true });
    try {
      const rows = await sql`INSERT INTO departments 
  (slug, name, name_en, name_hi, name_mr, short_desc, short_desc_hi, short_desc_mr, description_en, description_hi, description_mr, cover_image, image_url,
   icon, is_active)
  VALUES
  (${slug}, ${name_en}, ${name_en}, ${name_hi}, ${name_mr}, ${short_desc}, ${short_desc_hi}, ${short_desc_mr}, ${description_en}, ${description_hi},
   ${description_mr}, ${cover_image}, ${image_url}, ${icon}, ${is_active})`;

      revalidateTag("departments");
      return NextResponse.json({ success: true });
    } catch (err) {
      console.log("error", err.message);
      return NextResponse.json({ success: false });
    }
}