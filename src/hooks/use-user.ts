
"use client";

import { useCallback, useEffect } from "react";
import { api } from "@/trpc/react";
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/use-user-store";


/**
 * Custom hook for user profile management via tRPC userRouter.
 * Exposes: profile, updateUser, deactivateUser, deleteUser
 */
export function useUser() {
  const { status, data: session } = useSession();

  // Only fetch profile if authenticated
  const isAuthenticated = status === "authenticated";
  const profileQuery = api.user.getProfile.useQuery(undefined, {
    retry: false,
    enabled: isAuthenticated,
  });
  // Extract a stable primitive for useEffect dependencies
  const profileId = profileQuery.data ? profileQuery.data.id : null;

  // Zustand store
  const { profile, setProfile, clearProfile } = useUserStore();

  // Hydrate Zustand store only when authenticated and data is present
  useEffect(() => {
    if (isAuthenticated && profileQuery.data) {
      setProfile(profileQuery.data);
    } else if (status === "unauthenticated") {
      clearProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, profileId, status, setProfile, clearProfile]);

  // Mutations with stable handlers
  const updateUser = api.user.updateUser.useMutation({
    onSuccess: (data) => {
      setProfile(data);
    },
  });
  const deactivateUser = api.user.deactivateUser.useMutation({
    onSuccess: () => {
      clearProfile();
    },
  });
  const deleteUser = api.user.deleteUser.useMutation({
    onSuccess: () => {
      clearProfile();
    },
  });

  // Optionally, you can wrap mutation calls in useCallback for stable references
  const handleUpdateUser = useCallback(
    (input: Parameters<typeof updateUser.mutate>[0], options?: Parameters<typeof updateUser.mutate>[1]) =>
      updateUser.mutate(input, options),
    [updateUser],
  );
  const handleDeactivateUser = useCallback(
    (options?: Parameters<typeof deactivateUser.mutate>[1]) =>
      deactivateUser.mutate(undefined, options),
    [deactivateUser],
  );
  const handleDeleteUser = useCallback(
    (options?: Parameters<typeof deleteUser.mutate>[1]) =>
      deleteUser.mutate(undefined, options),
    [deleteUser],
  );

  return {
    profile: profileQuery,
    user: profile,
    updateUser,
    deactivateUser,
    deleteUser,
    handleUpdateUser,
    handleDeactivateUser,
    handleDeleteUser,
    session,
    status,
  };
}
