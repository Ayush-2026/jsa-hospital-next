import { NextResponse } from "next/server";
import { sql } from "@/lib/db";
import { revalidateTag } from "next/cache";
import slugify from "slugify";

export async function GET(request, { params }) {
  const { slug } = await params;
  try {
    const rows = await sql`SELECT * FROM articles WHERE slug = ${slug} LIMIT 1`;
    if (!rows?.[0]) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(rows[0]);
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { slug } = await params;
  try {
    const {
      title_en, title_hi, title_mr,
      content_en, content_hi, content_mr,
      image_url, is_published,
    } = await request.json();

    const newSlug = slugify(title_en, { lower: true, strict: true });

    await sql`
      UPDATE articles SET
        slug         = ${newSlug},
        title_en     = ${title_en},
        title_hi     = ${title_hi || null},
        title_mr     = ${title_mr || null},
        content_en   = ${content_en || null},
        content_hi   = ${content_hi || null},
        content_mr   = ${content_mr || null},
        image_url    = ${image_url || null},
        is_published = ${is_published ?? true}
      WHERE slug = ${slug}
    `;

    revalidateTag("articles");
    return NextResponse.json({ success: true, slug: newSlug });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const { slug } = await params;
  try {
    await sql`DELETE FROM articles WHERE slug = ${slug}`;
    revalidateTag("articles");
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
