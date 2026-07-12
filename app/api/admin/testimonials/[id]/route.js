import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const rows = await sql`SELECT * FROM testimonials WHERE id = ${id} LIMIT 1`;
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
      name_en, name_hi, name_mr,
      review_en, review_hi, review_mr,
      photo_url, is_published,
    } = await request.json();

    await sql`
      UPDATE testimonials SET
        name_en      = ${name_en},
        name_hi      = ${name_hi || null},
        name_mr      = ${name_mr || null},
        review_en    = ${review_en},
        review_hi    = ${review_hi || null},
        review_mr    = ${review_mr || null},
        photo_url    = ${photo_url || null},
        is_published = ${is_published ?? true}
      WHERE id = ${id}
    `;

    revalidateTag("testimonials");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    await sql`DELETE FROM testimonials WHERE id = ${id}`;
    revalidateTag("testimonials");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
