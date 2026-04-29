import { NextRequest, NextResponse } from "next/server";
import { signIn } from "@/auth";
import { z } from "zod";

const signinSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = signinSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json({ error: parseResult.error.message }, { status: 400 });
    }

    const { email, password } = parseResult.data;

    await signIn("credentials", { email, password, redirect: false });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.name === "CredentialsSignin") {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    console.error("Signin error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
