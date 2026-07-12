import { NextResponse } from "next/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS testimonials (
        id           SERIAL PRIMARY KEY,
        name_en      TEXT NOT NULL,
        name_hi      TEXT,
        name_mr      TEXT,
        review_en    TEXT NOT NULL,
        review_hi    TEXT,
        review_mr    TEXT,
        photo_url    TEXT,
        is_published BOOLEAN DEFAULT true,
        created_at   TIMESTAMP DEFAULT NOW()
      )
    `;
    return NextResponse.json({ success: true, message: "Testimonials table ready." });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
