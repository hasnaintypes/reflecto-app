import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import crypto from "crypto";
import { db } from "@/server/db";
import { resend } from "@/lib/resend/client";
import { env } from "@/env";
import createRateLimit from "next-rate-limit";

const rateLimit = createRateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const forgotPasswordSchema = z.object({
  email: z.string().email(),
});

export async function POST(request: NextRequest) {
  try {
    // Rate limit: 3 requests per 60s
    const rateLimitHeaders = rateLimit.checkNext(request, 3);
    if (rateLimitHeaders.get("x-rl-remaining") === "0") {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists, a reset link has been sent.",
        },
        { status: 200, headers: rateLimitHeaders },
      );
    }

    const requestBody: unknown = await request.json();
    const validationResult = forgotPasswordSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: true,
          message: "If an account exists, a reset link has been sent.",
        },
        { status: 200 },
      );
    }

    const { email } = validationResult.data;
    const user = await db.user.findUnique({ where: { email } });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({
        success: true,
        message: "If an account exists, a reset link has been sent.",
      });
    }

    // Generate token
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    await db.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    // Send reset email
    const resetUrl = `${env.NEXTAUTH_URL ?? ""}/auth/reset-password?token=${token}&email=${encodeURIComponent(email)}`;

    await resend.emails.send({
      from: "Reflecto <onboarding@resend.dev>",
      to: email,
      subject: "Reset your password — Reflecto",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Password Reset</h1>
          <p>You requested a password reset for your Reflecto account.</p>
          <div style="margin-top: 30px;">
            <a href="${resetUrl}"
               style="background-color: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="margin-top: 20px; color: #666; font-size: 0.9em;">
            This link expires in 1 hour. If you didn't request this, you can safely ignore this email.
          </p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({
      success: true,
      message: "If an account exists, a reset link has been sent.",
    });
  }
}
