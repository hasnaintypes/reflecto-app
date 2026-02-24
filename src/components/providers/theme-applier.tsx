"use client";

import { useEffect } from "react";
import { usePreferencesStore } from "@/stores/use-preferences-store";

export function ThemeApplier() {
  const preferences = usePreferencesStore((state) => state.preferences);

  useEffect(() => {
    if (!preferences?.preferences) return;

    const fontSize = (preferences.preferences.fontSize as string) ?? "medium";
    const root = document.documentElement;

    // Define scaling factors
    const scales: Record<string, string> = {
      small: "0.9",
      medium: "1",
      large: "1.1",
    };

    root.style.setProperty("--font-scale", scales[fontSize] ?? "1");

    // Apply font-size to the root element for rem units
    // Base is 16px, so 1rem = 16px * scale
    root.style.fontSize = `${100 * parseFloat(scales[fontSize] ?? "1")}%`;
  }, [preferences]);

  return null;
}
