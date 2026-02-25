import { NextResponse } from "next/server";

import { callLaravelApi } from "@/lib/server-api";

type SignupType = "agency" | "developer";

type SignupRequestBody = {
  name?: string;
  email?: string;
  password?: string;
  type?: SignupType;
};

type SignupResponsePayload = {
  status: boolean;
  data: {
    id: number | string;
    name: string;
    email: string;
  };
  message: string;
};

const isValidType = (type: string | undefined): type is SignupType => {
  return type === "agency" || type === "developer";
};

export const POST = async (request: Request): Promise<NextResponse> => {
  let body: SignupRequestBody;

  try {
    body = (await request.json()) as SignupRequestBody;
  } catch {
    return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
  }

  if (!body.name || !body.email || !body.password || !isValidType(body.type)) {
    return NextResponse.json(
      { message: "name, email, password and valid type are required" },
      { status: 400 },
    );
  }

  const upstreamResponse = await callLaravelApi("/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: body.name,
      email: body.email,
      password: body.password,
      type: body.type,
    }),
  });

  const payload = (await upstreamResponse.json()) as SignupResponsePayload;

  if (!upstreamResponse.ok) {
    return NextResponse.json(
      { message: payload.message ?? "Signup failed" },
      { status: upstreamResponse.status },
    );
  }


  if (payload.status !== true || !payload.data) {
    return NextResponse.json({ message: "Invalid signup response" }, { status: 502 });
  }

  return NextResponse.json(
    payload,
    { status: 200 },
  );
};
