"use client";

import { useCallback } from "react";
import { signIn as nextSignIn, signOut as nextSignOut } from "next-auth/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import useAuthStore from "@/stores/use-auth-store";

type AuthType = "signin" | "signup";
type SignUpInput = { name: string; email: string; password: string };
type SignInInput = { email: string; password: string };

export default function useAuth() {
  const { signOut: setAuthSignOut } = useAuthStore();

  // Sign up mutation
  const signUpMutation = useMutation({
    mutationFn: async (formData: SignUpInput) => {
      const res = await axios.post<{
        success: boolean;
        data?: {
          id: string;
          email: string;
          name?: string | null;
          image?: string | null;
        };
        error?: string;
      }>("/api/auth/sign-up", formData);
      return res.data;
    },
  });

  // Sign in mutation
  const signInMutation = useMutation({
    mutationFn: async (formData: SignInInput) => {
      const result = await nextSignIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: formData.email,
        password: formData.password,
      });
      return result;
    },
  });

  // Unified submit handler
  const handleSubmit = useCallback(
    async (type: AuthType, formData: Record<string, string>) => {
      const email = formData.email ?? "";
      const password = formData.password ?? "";
      const name = formData.name ?? "";
      if (type === "signin") {
        return signInMutation.mutateAsync({ email, password });
      } else {
        const signUpResult = await signUpMutation.mutateAsync({
          name,
          email,
          password,
        });
        // Return signup result directly — don't auto-sign-in (email verification required)
        return signUpResult;
      }
    },
    [signInMutation, signUpMutation],
  );

  const handleSignOut = useCallback(() => {
    setAuthSignOut();
    void nextSignOut({ callbackUrl: "/" });
  }, [setAuthSignOut]);

  return {
    handleSubmit,
    signOut: handleSignOut,
    loading: signUpMutation.isPending || signInMutation.isPending,
    error: signUpMutation.error ?? signInMutation.error,
    signUpMutation,
    signInMutation,
  };
}
