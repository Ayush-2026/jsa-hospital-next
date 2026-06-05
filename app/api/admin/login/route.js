import { NextResponse } from "next/server";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();

  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const passwordMatch = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);

  if (!passwordMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = await createToken();

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
  });



  return response;
}
