import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { db } from "@/server/db";
import createRateLimit from "next-rate-limit";
import { AUTH_ERRORS } from "@/constants/errors";

const rateLimit = createRateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const rateLimitHeaders = rateLimit.checkNext(request, 5);
    if (rateLimitHeaders.get("x-rl-remaining") === "0") {
      return NextResponse.json(
        { success: false, error: AUTH_ERRORS.TOO_MANY_REQUESTS },
        { status: 429, headers: rateLimitHeaders },
      );
    }

    const requestBody: unknown = await request.json();
    const validationResult = signupSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: AUTH_ERRORS.INVALID_INPUT },
        { status: 400 },
      );
    }

    const { name, email, password } = validationResult.data;
    const userExists = await db.user.findUnique({ where: { email } });
    if (userExists) {
      return NextResponse.json(
        { success: false, error: AUTH_ERRORS.EMAIL_EXISTS },
        { status: 400 },
      );
    }

    const hashedPassword = await hash(password, 12);
    const createdUser = await db.user.create({
      data: { name, email, hashedPassword },
    });

    return NextResponse.json({
      success: true,
      data: { id: createdUser.id, email: createdUser.email },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: AUTH_ERRORS.SERVER_ERROR },
      { status: 500 },
    );
  }
}
