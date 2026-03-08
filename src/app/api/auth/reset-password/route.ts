import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcryptjs";
import { db } from "@/server/db";
import { env } from "@/env";

const resetPasswordSchema = z.object({
  token: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export async function POST(request: Request) {
  try {
    const requestBody: unknown = await request.json();
    const validationResult = resetPasswordSchema.safeParse(requestBody);
    if (!validationResult.success) {
      return NextResponse.json(
        { success: false, error: "Invalid input." },
        { status: 400 },
      );
    }

    const { token, email, password } = validationResult.data;

    // Look up token
    const verificationToken = await db.verificationToken.findFirst({
      where: { identifier: email, token },
    });

    if (!verificationToken) {
      return NextResponse.json(
        { success: false, error: "Invalid or expired reset token." },
        { status: 400 },
      );
    }

    // Check expiration
    if (new Date() > verificationToken.expires) {
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
      return NextResponse.json(
        { success: false, error: "Reset token has expired. Please request a new one." },
        { status: 400 },
      );
    }

    // Hash new password using env salt rounds
    const hashedPassword = await hash(password, env.HASH_SALT_ROUNDS);

    // Update user's password
    await db.user.update({
      where: { email },
      data: { hashedPassword },
    });

    // Delete the used token
    await db.verificationToken.delete({
      where: {
        identifier_token: {
          identifier: verificationToken.identifier,
          token: verificationToken.token,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
