import { NextResponse, type NextRequest } from "next/server";
import { db } from "@/server/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    if (!token || !email) {
      return NextResponse.redirect(
        new URL("/auth/verify-email?error=Missing token or email", request.url),
      );
    }

    // Look up the verification token
    const verificationToken = await db.verificationToken.findFirst({
      where: { identifier: email, token },
    });

    if (!verificationToken) {
      return NextResponse.redirect(
        new URL(
          "/auth/verify-email?error=Invalid or expired token",
          request.url,
        ),
      );
    }

    // Check expiration
    if (new Date() > verificationToken.expires) {
      // Clean up expired token
      await db.verificationToken.delete({
        where: {
          identifier_token: {
            identifier: verificationToken.identifier,
            token: verificationToken.token,
          },
        },
      });
      return NextResponse.redirect(
        new URL(
          "/auth/verify-email?error=Token has expired. Please sign up again.",
          request.url,
        ),
      );
    }

    // Mark user email as verified
    await db.user.update({
      where: { email },
      data: { emailVerified: new Date() },
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

    return NextResponse.redirect(
      new URL("/auth/sign-in?verified=true", request.url),
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.redirect(
      new URL("/auth/verify-email?error=Something went wrong", request.url),
    );
  }
}
