import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, name_en, name_hi, name_mr,
             review_en, review_hi, review_mr,
             photo_url, is_published, created_at
      FROM testimonials
      ORDER BY created_at DESC
    `;
    return NextResponse.json(rows || []);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      name_en, name_hi, name_mr,
      review_en, review_hi, review_mr,
      photo_url, is_published,
    } = await request.json();

    await sql`
      INSERT INTO testimonials
        (name_en, name_hi, name_mr, review_en, review_hi, review_mr, photo_url, is_published)
      VALUES
        (${name_en}, ${name_hi || null}, ${name_mr || null},
         ${review_en}, ${review_hi || null}, ${review_mr || null},
         ${photo_url || null}, ${is_published ?? true})
    `;

    revalidateTag("testimonials");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
