import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";
import slugify from "slugify";

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, slug, title_en, title_hi, title_mr,
             image_url, is_published, created_at
      FROM articles
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
      title_en, title_hi, title_mr,
      content_en, content_hi, content_mr,
      image_url, is_published,
    } = await request.json();

    const slug = slugify(title_en, { lower: true, strict: true });

    await sql`
      INSERT INTO articles
        (slug, title_en, title_hi, title_mr, content_en, content_hi, content_mr, image_url, is_published)
      VALUES
        (${slug}, ${title_en}, ${title_hi || null}, ${title_mr || null},
         ${content_en || null}, ${content_hi || null}, ${content_mr || null},
         ${image_url || null}, ${is_published ?? true})
    `;

    revalidateTag("articles");
    return NextResponse.json({ success: true, slug });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
