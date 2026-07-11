import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS articles (
        id          SERIAL PRIMARY KEY,
        slug        TEXT UNIQUE NOT NULL,
        title_en    TEXT NOT NULL,
        title_hi    TEXT,
        title_mr    TEXT,
        content_en  TEXT,
        content_hi  TEXT,
        content_mr  TEXT,
        image_url   TEXT,
        is_published BOOLEAN DEFAULT true,
        created_at  TIMESTAMP DEFAULT NOW()
      )
    `;
    return NextResponse.json({ success: true, message: "Articles table ready." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
