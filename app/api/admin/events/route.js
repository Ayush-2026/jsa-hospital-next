import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET() {
  try {
    const rows = await sql`
      SELECT id, tag_en, tag_hi, tag_mr, title_en, title_hi, title_mr,
             desc_en, desc_hi, desc_mr, event_date, tag_color, tag_bg,
             is_published, created_at
      FROM events
      ORDER BY event_date DESC NULLS LAST
    `;
    return NextResponse.json(rows || []);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const {
      tag_en, tag_hi, tag_mr,
      title_en, title_hi, title_mr,
      desc_en, desc_hi, desc_mr,
      event_date, tag_color, tag_bg, is_published,
    } = await request.json();

    await sql`
      INSERT INTO events
        (tag_en, tag_hi, tag_mr, title_en, title_hi, title_mr,
         desc_en, desc_hi, desc_mr, event_date, tag_color, tag_bg, is_published)
      VALUES
        (${tag_en || null}, ${tag_hi || null}, ${tag_mr || null},
         ${title_en}, ${title_hi || null}, ${title_mr || null},
         ${desc_en || null}, ${desc_hi || null}, ${desc_mr || null},
         ${event_date || null}, ${tag_color || "#1e7a62"}, ${tag_bg || "rgba(30,122,98,0.1)"},
         ${is_published ?? true})
    `;

    revalidateTag("events");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
