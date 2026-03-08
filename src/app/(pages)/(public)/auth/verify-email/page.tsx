import Link from "next/link";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Verify Email | Reflecto",
  description: "Verify your Reflecto email address",
};

export default async function VerifyEmailPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; error?: string }>;
}) {
  const params = await searchParams;
  const verified = params.verified === "true";
  const error = params.error;

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
        {verified ? (
          <>
            <CheckCircle2 className="h-16 w-16 text-green-500" />
            <h1 className="text-2xl font-bold">Email Verified!</h1>
            <p className="text-muted-foreground text-sm">
              Your email has been successfully verified. You can now sign in to
              your account.
            </p>
            <Button asChild className="w-full">
              <Link href="/auth/sign-in">Sign In</Link>
            </Button>
          </>
        ) : error ? (
          <>
            <XCircle className="h-16 w-16 text-red-500" />
            <h1 className="text-2xl font-bold">Verification Failed</h1>
            <p className="text-muted-foreground text-sm">{error}</p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/sign-up">Try Again</Link>
            </Button>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">Check Your Email</h1>
            <p className="text-muted-foreground text-sm">
              We&apos;ve sent you a verification link. Please check your inbox
              and click the link to verify your email address.
            </p>
            <Button asChild variant="outline" className="w-full">
              <Link href="/auth/sign-in">Back to Sign In</Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
