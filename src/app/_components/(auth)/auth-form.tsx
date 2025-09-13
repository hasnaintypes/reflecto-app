"use client";

import type React from "react";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import useAuth from "@/hooks/use-auth";
import { AUTH_ERRORS } from "@/constants/errors";
import type { AuthFormProps, AuthFormState } from "@/types";

export function AuthForm({ type, className }: AuthFormProps) {
  const { handleSubmit, loading } = useAuth();
  const [authFormState, setAuthFormState] = useState<AuthFormState>({
    name: "",
    email: "",
    password: "",
  });
  const [socialLoading, setSocialLoading] = useState<string | null>(null);

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
        const isKnownError = (Object.values(AUTH_ERRORS) as string[]).includes(
          result.error,
        );
        const errorMessage = isKnownError
          ? result.error
          : AUTH_ERRORS.INVALID_CREDENTIALS;
        toast.error(errorMessage);
      } else {
        toast.success(
          type === "signin" ? "Welcome back!" : "Account created successfully!",
        );
        window.location.href = "/dashboard";
      }
    } catch {
      toast.dismiss(loadingToast);
      toast.error(AUTH_ERRORS.SERVER_ERROR);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    setSocialLoading(provider);
    const loadingToast = toast.loading(`Connecting with ${provider}...`);

    try {
      const result = await signIn(provider, {
        callbackUrl: "/dashboard",
        redirect: false,
      });

      toast.dismiss(loadingToast);

      if (result?.error) {
        toast.error(`Failed to sign in with ${provider}`);
      } else if (result?.url) {
        toast.success(`Successfully connected with ${provider}!`);
        window.location.href = result.url;
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
                onClick={() =>
                  toast.info(
                    "Password reset functionality would be implemented here",
                  )
                }
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
        </div>
        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={loading || socialLoading !== null}
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
              onClick={() => (window.location.href = "/auth/sign-up")}
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
              onClick={() => (window.location.href = "/auth/sign-in")}
            >
              Sign in
            </button>
          </>
        )}
      </div>
    </form>
  );
}
