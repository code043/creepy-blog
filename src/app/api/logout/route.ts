import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout" });

  response.cookies.set("refreshToken", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0),
  });

  return response;
}