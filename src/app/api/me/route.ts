import { NextRequest, NextResponse } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Token is missings" }, { status: 401 });
  }

  const backendResponse = await fetch(baseURL + "/api/auth/me", {
    method: "GET",
    headers: {
      Authorization: authHeader,
    },
    credentials: "include",
  });

  const data = await backendResponse.json();

  if (!backendResponse.ok) {
    return NextResponse.json(data, { status: backendResponse.status });
  }

  return NextResponse.json(data);
}
