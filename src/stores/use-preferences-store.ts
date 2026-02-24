import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AppPreferences {
  dayEndsAt?: string;
  spellChecking?: boolean;
  autoHideNav?: boolean;
  bulletedMode?: boolean;
  specialDates?: boolean;
  newlineOnEnter?: boolean;
  collapseLongBullets?: boolean;
  bulletTimestamps?: boolean;
  highlightTagsAndMentions?: boolean;
  autocomplete?: boolean;
  streak?: boolean;
  itemIndicators?: boolean;
  showItemsInEntries?: boolean;
  enableDreams?: boolean;
  inlineMode?: boolean;
  collapseLongDreams?: boolean;
  enableNotes?: boolean;
  [key: string]: string | boolean | number | null | undefined;
}

export interface UserPreferences {
  theme: string;
  fontSize: string;
  notificationEnabled: boolean;
  dailyReminderTime: string | null;
  preferences: AppPreferences;
}

interface PreferencesState {
  preferences: UserPreferences | null;
  isLoading: boolean;
  setPreferences: (prefs: UserPreferences) => void;
  updateLocalPreference: (
    key: string,
    value: string | boolean | number | null,
    isJson?: boolean,
  ) => void;
  setLoading: (isLoading: boolean) => void;
}

export const usePreferencesStore = create<PreferencesState>()(
  persist(
    (set) => ({
      preferences: null,
      isLoading: true,
      setPreferences: (prefs) => set({ preferences: prefs, isLoading: false }),
      updateLocalPreference: (key, value, isJson = false) =>
        set((state) => {
          if (!state.preferences) return state;

          if (isJson) {
            return {
              preferences: {
                ...state.preferences,
                preferences: {
                  ...state.preferences.preferences,
                  [key]: value,
                },
              },
            };
          }

          return {
            preferences: {
              ...state.preferences,
              [key as keyof UserPreferences]: value,
            },
          };
        }),
      setLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "reflecto-preferences",
    },
  ),
);
