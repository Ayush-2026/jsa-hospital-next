import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS updates (
        id           SERIAL PRIMARY KEY,
        tag_en       TEXT,
        tag_hi       TEXT,
        tag_mr       TEXT,
        title_en     TEXT NOT NULL,
        title_hi     TEXT,
        title_mr     TEXT,
        desc_en      TEXT,
        desc_hi      TEXT,
        desc_mr      TEXT,
        update_date  DATE,
        tag_color    TEXT DEFAULT '#2c608e',
        tag_bg       TEXT DEFAULT 'rgba(44,96,142,0.1)',
        is_published BOOLEAN DEFAULT true,
        created_at   TIMESTAMP DEFAULT NOW()
      )
    `;
    return NextResponse.json({ success: true, message: "Updates table ready." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
