import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { db } from "@/server/db";
import { sendEmail } from "@/lib/email/send";
import { env } from "@/env";
import createRateLimit from "next-rate-limit";
import { AUTH_ERRORS } from "@/constants/errors";

const rateLimit = createRateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain uppercase, lowercase, and a number",
    ),
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

    const hashedPassword = await hash(password, env.HASH_SALT_ROUNDS);
    const createdUser = await db.user.create({
      data: { name, email, hashedPassword },
    });

    // Generate verification token and store it
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send verification email
    const verifyUrl = `${env.NEXTAUTH_URL ?? ""}/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;

    await sendEmail({
      to: email,
      subject: "Verify your email — Reflecto",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Welcome to Reflecto, ${name}!</h1>
          <p>Please verify your email address to complete your registration.</p>
          <div style="margin-top: 30px;">
            <a href="${verifyUrl}"
               style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Verify Email
            </a>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            This link expires in 24 hours. If you didn't create this account, you can ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      data: { id: createdUser.id, email: createdUser.email },
      message: "Account created. Please check your email to verify.",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: AUTH_ERRORS.SERVER_ERROR },
      { status: 500 },
    );
  }
}
