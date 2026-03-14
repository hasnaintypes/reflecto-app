"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2, Check, X } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import useAuth from "@/hooks/use-auth";
import { AUTH_ERRORS } from "@/constants/errors";
import type { AuthFormProps, AuthFormState } from "@/types";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Contains a number", test: (p: string) => /\d/.test(p) },
] as const;

export function AuthForm({ type, className }: AuthFormProps) {
  const { handleSubmit, loading } = useAuth();
  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [socialLoading, setSocialLoading] = useState<string | null>(null);
  const router = useRouter();

  const passwordChecks = useMemo(
    () => PASSWORD_RULES.map((rule) => ({ ...rule, passed: rule.test(authFormState.password) })),
    [authFormState.password],
  );
  const allPasswordChecksPassed = passwordChecks.every((c) => c.passed);
  const passwordTouched = authFormState.password.length > 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAuthFormState((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loadingToast = toast.loading(
      type === "signin" ? "Signing you in..." : "Creating your account...",
    );

    try {
      const result = await handleSubmit(type, authFormState);
      toast.dismiss(loadingToast);

      if (
        result &&
        typeof result === "object" &&
        "error" in result &&
        result.error
      ) {
        const errorStr = String(result.error);
        const isKnownError = (Object.values(AUTH_ERRORS) as string[]).includes(
          errorStr,
        );
        const errorMessage = isKnownError
          ? errorStr
          : AUTH_ERRORS.INVALID_CREDENTIALS;
        toast.error(errorMessage);
      } else if (type === "signup") {
        toast.success("Check your email to verify your account.");
      } else {
        toast.success("Welcome back!");
        router.push("/write");
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      if (
        axios.isAxiosError(error) &&
        typeof error.response?.data?.error === "string"
      ) {
        toast.error(error.response.data.error);
      } else {
        toast.error(AUTH_ERRORS.SERVER_ERROR);
      }
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    const loadingToast = toast.loading(`Connecting with ${provider}...`);

    try {
      const result = await signIn(provider, {
        callbackUrl: "/write",
        redirect: false,
      });

      toast.dismiss(loadingToast);

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}`);
      } else if (result?.url) {
        toast.success(`Successfully connected with ${provider}!`);
        router.push(result.url);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(`Something went wrong with ${provider} login`);
    } finally {
      setSocialLoading(null);
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleFormSubmit}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">
          {type === "signin" ? "Login to your account" : "Create a new account"}
        </h1>
        <p className="text-muted-foreground text-sm text-balance">
          {type === "signin"
            ? "Enter your email below to login to your account"
            : "Enter your details below to create your account"}
        </p>
      </div>
      <div className="grid gap-6">
        {type === "signup" && (
          <div className="grid gap-3">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              required
              value={authFormState.name}
              onChange={handleInputChange}
              disabled={loading}
            />
          </div>
        )}
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            value={authFormState.email}
            onChange={handleInputChange}
            disabled={loading}
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            {type === "signin" && (
              <button
                type="button"
                className="ml-auto cursor-pointer text-sm underline-offset-4 hover:underline"
                onClick={async () => {
                  const email = authFormState.email;
                  if (!email) {
                    toast.error("Please enter your email address first.");
                    return;
                  }
                  const loadingToast = toast.loading("Sending reset link...");
                  try {
                    await axios.post("/api/auth/forgot-password", { email });
                    toast.dismiss(loadingToast);
                    toast.success("Check your email for reset instructions.");
                  } catch {
                    toast.dismiss(loadingToast);
                    toast.error("Something went wrong. Please try again.");
                  }
                }}
              >
                Forgot your password?
              </button>
            )}
          </div>
          <Input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={authFormState.password}
            onChange={handleInputChange}
            disabled={loading}
          />
          {type === "signup" && passwordTouched && (
            <ul className="mt-2 space-y-1 text-xs">
              {passwordChecks.map((check) => (
                <li key={check.label} className="flex items-center gap-1.5">
                  {check.passed ? (
                    <Check className="h-3 w-3 text-green-500" />
                  ) : (
                    <X className="h-3 w-3 text-red-500" />
                  )}
                  <span className={check.passed ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}>
                    {check.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading || socialLoading !== null || (type === "signup" && !allPasswordChecksPassed)}
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {type === "signin" ? "Signing in..." : "Creating account..."}
            </>
          ) : type === "signin" ? (
            "Login"
          ) : (
            "Create account"
          )}
        </Button>
        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
          onClick={() => handleSocialLogin("google")}
          disabled={socialLoading !== null || loading}
        >
          {socialLoading === "google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={16}
              height={16}
              className="h-4 w-4"
            />
          )}
          Login with Google
        </Button>
        <Button
          variant="outline"
          className="w-full cursor-pointer"
          type="button"
          onClick={() => handleSocialLogin("discord")}
          disabled={socialLoading !== null || loading}
        >
          {socialLoading === "discord" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Image
              src="/icons/discord.svg"
              alt="Discord"
              width={30}
              height={30}
              className="h-6 w-6"
            />
          )}
          Login with Discord
        </Button>
      </div>
      <div className="text-center text-sm">
        {type === "signin" ? (
          <>
            Don&apos;t have an account?{" "}
            <button
              type="button"
              className="cursor-pointer underline underline-offset-4"
              onClick={() => router.push("/auth/sign-up")}
            >
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button
              type="button"
              className="cursor-pointer underline underline-offset-4"
              onClick={() => router.push("/auth/sign-in")}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </form>
  );
}
