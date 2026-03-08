"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!token || !email) {
      toast.error("Invalid reset link.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post<{ success: boolean; error?: string }>(
        "/api/auth/reset-password",
        { token, email, password },
      );

      if (res.data.success) {
        setSuccess(true);
        toast.success("Password reset successfully!");
      } else {
        toast.error(res.data.error ?? "Something went wrong.");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="flex w-full max-w-xs flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-bold">Password Reset!</h1>
          <p className="text-muted-foreground text-sm">
            Your password has been reset successfully. You can now sign in with
            your new password.
          </p>
          <Button asChild className="w-full">
            <Link href="/auth/sign-in">Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!token || !email) {
    return (
      <div className="flex min-h-svh items-center justify-center p-6">
        <div className="flex w-full max-w-xs flex-col items-center gap-6 text-center">
          <h1 className="text-2xl font-bold">Invalid Link</h1>
          <p className="text-muted-foreground text-sm">
            This password reset link is invalid or has expired.
          </p>
          <Button asChild variant="outline" className="w-full">
            <Link href="/auth/sign-in">Back to Sign In</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-xs flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Reset Your Password</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your new password below.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter new password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Resetting...
              </>
            ) : (
              "Reset Password"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-svh items-center justify-center">
          <Loader2 className="text-muted-foreground h-6 w-6 animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </Suspense>
  );
}
