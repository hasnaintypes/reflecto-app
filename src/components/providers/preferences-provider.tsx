"use client";

import { useEffect } from "react";
import { api } from "@/trpc/react";
import {
  usePreferencesStore,
  type UserPreferences,
} from "@/stores/use-preferences-store";
import { useSession } from "next-auth/react";

export function PreferencesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { status } = useSession();
  const setPreferences = usePreferencesStore((state) => state.setPreferences);
  const setLoading = usePreferencesStore((state) => state.setLoading);

  const { data: fetchedPrefs, isLoading } = api.user.getPreferences.useQuery(
    undefined,
    {
      enabled: status === "authenticated",
      staleTime: Infinity,
    },
  );

  useEffect(() => {
    if (fetchedPrefs) {
      setPreferences(fetchedPrefs as unknown as UserPreferences);
    }
    setLoading(isLoading);
  }, [fetchedPrefs, isLoading, setPreferences, setLoading]);

  return <>{children}</>;
}
