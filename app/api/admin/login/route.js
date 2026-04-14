import { NextResponse } from "next/server";
import { verifyPassword, createToken } from "@/lib/auth";

export async function POST(request) {
  const { email, password } = await request.json();
  console.log("entered email:", email);
  console.log("env email:", process.env.ADMIN_EMAIL);
  console.log("match:", email === process.env.ADMIN_EMAIL);
  if (email !== process.env.ADMIN_EMAIL) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const passwordMatch = await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
console.log("password match:", passwordMatch);
console.log("hash:", process.env.ADMIN_PASSWORD_HASH);

  
  
 if (
    !(await verifyPassword(password, process.env.ADMIN_PASSWORD_HASH))
  ) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 },
    );
  }

  const token = await createToken();

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_session", token, {
    httpOnly: true,
    
    maxAge: 7 * 24 * 60 * 60,
  });



  return response;
}
