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
  const { signIn: setAuthSignIn, signOut: setAuthSignOut } = useAuthStore();

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
      // If sign in is successful, set user in store (dummy user for now, should be replaced with real user data)
      if (result && typeof result === "object" && "ok" in result && result.ok) {
        setAuthSignIn({
          id: formData.email,
          email: formData.email,
          name: null,
          image: null,
        });
      }
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
        // If sign up returns user data, set it in store
        if (signUpResult && signUpResult.success && signUpResult.data) {
          setAuthSignIn({
            id: signUpResult.data.id,
            email: signUpResult.data.email,
            name: signUpResult.data.name ?? null,
            image: signUpResult.data.image ?? null,
          });
        }
        return signInMutation.mutateAsync({ email, password });
      }
    },
    [signInMutation, signUpMutation, setAuthSignIn],
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
