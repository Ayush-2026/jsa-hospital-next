import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const rows = await sql`SELECT * FROM updates WHERE id = ${id} LIMIT 1`;
    if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const {
      tag_en, tag_hi, tag_mr,
      title_en, title_hi, title_mr,
      desc_en, desc_hi, desc_mr,
      update_date, tag_color, tag_bg, is_published,
    } = await request.json();

    await sql`
      UPDATE updates SET
        tag_en       = ${tag_en || null},
        tag_hi       = ${tag_hi || null},
        tag_mr       = ${tag_mr || null},
        title_en     = ${title_en},
        title_hi     = ${title_hi || null},
        title_mr     = ${title_mr || null},
        desc_en      = ${desc_en || null},
        desc_hi      = ${desc_hi || null},
        desc_mr      = ${desc_mr || null},
        update_date  = ${update_date || null},
        tag_color    = ${tag_color || "#2c608e"},
        tag_bg       = ${tag_bg || "rgba(44,96,142,0.1)"},
        is_published = ${is_published ?? true}
      WHERE id = ${id}
    `;

    revalidateTag("updates");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await sql`DELETE FROM updates WHERE id = ${id}`;
    revalidateTag("updates");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
