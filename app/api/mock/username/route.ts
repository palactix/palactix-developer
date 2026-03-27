import { NextRequest, NextResponse } from "next/server";

const TAKEN_USERNAMES = new Set(["palactix", "admin", "agency", "demo", "test", "support", "api", "app"]);

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ available: false, message: "Invalid JSON" }, { status: 400 });
  }

  const username =
    typeof body === "object" && body !== null && "username" in body
      ? String((body as { username: unknown }).username ?? "")
      : "";

  if (!username || username.length < 3) {
    return NextResponse.json({ available: false, message: "Username must be at least 3 characters" }, { status: 400 });
  }

  if (!/^[a-z0-9-]+$/.test(username.toLowerCase())) {
    return NextResponse.json({ available: false, message: "Only letters, numbers and hyphens allowed" }, { status: 400 });
  }

  const normalized = username.toLowerCase().trim();
  const available = !TAKEN_USERNAMES.has(normalized);

  // Simulate realistic API latency
  await new Promise((resolve) => setTimeout(resolve, 350));

  return NextResponse.json({ available, username: normalized });
}
