"use client";

import React from "react";
import {
  Settings,
  Cloud,
  Monitor,
  BookOpen,
  Moon,
  Pin,
  Hash,
  Sparkles,
  Type,
  TextCursorInput,
  Flame,
  Layout,
  SpellCheck,
  Bell,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/trpc/react";
import { toast } from "sonner";

interface SettingItemProps {
  icon: React.ElementType;
  title: string;
  description: string;
  isCloud?: boolean;
  isMonitor?: boolean;
  children: React.ReactNode;
  isPro?: boolean;
}

const SettingItem = ({
  title,
  description,
  isCloud,
  isMonitor,
  children,
  isPro,
}: SettingItemProps) => (
  <div className="group flex items-start justify-between py-6">
    <div className="space-y-1">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-bold tracking-[0.1em] text-zinc-200">
          {title}
        </h4>
        <div className="flex items-center gap-1.5 opacity-40">
          {isCloud && <Cloud size={12} />}
          {isMonitor && <Monitor size={12} />}
          {isPro && (
            <span className="bg-muted rounded-sm px-1 py-0.5 text-[8px] font-bold tracking-widest text-[#34D399] uppercase">
              PRO <span className="font-serif lowercase italic">i</span>
            </span>
          )}
        </div>
      </div>
      <p className="text-muted-foreground/60 max-w-md text-[13px] leading-relaxed">
        {description}
      </p>
    </div>
    <div className="flex h-full items-center pt-1">{children}</div>
  </div>
);

const SectionHeader = ({
  icon: IconComp,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) => (
  <div className="border-border/10 mb-6 flex items-center gap-3 border-b pb-4">
    <IconComp size={16} className="text-muted-foreground/40" />
    <h3 className="text-muted-foreground/60 text-[10px] font-bold tracking-[0.3em] uppercase">
      {title}
    </h3>
  </div>
);

import { usePreferencesStore } from "@/stores/use-preferences-store";

export default function SettingsPage() {
  const { preferences, isLoading, updateLocalPreference } =
    usePreferencesStore();
  const updateMutation = api.user.updatePreferences.useMutation({
    onError: (err) => {
      toast.error("Failed to update settings: " + err.message);
      // Optional: Revert local change on error if necessary
    },
  });

  const topLevelKeys = [
    "theme",
    "fontSize",
    "notificationEnabled",
    "dailyReminderTime",
  ] as const;

  type TopLevelKey = (typeof topLevelKeys)[number];

  const getPref = <T,>(key: string, defaultValue: T): T => {
    if (topLevelKeys.includes(key as TopLevelKey)) {
      const val = preferences?.[key as TopLevelKey];
      return (val as T) ?? defaultValue;
    }
    if (!preferences?.preferences) return defaultValue;
    const val = preferences.preferences[key];
    return (val as T) ?? defaultValue;
  };

  const togglePref = (key: string) => {
    const current = getPref(key, false);
    const newValue = !current;

    const isTopLevel = topLevelKeys.includes(key as TopLevelKey);

    // Update store locally for immediate feedback
    updateLocalPreference(key, newValue, !isTopLevel);

    // Sync with backend
    updateMutation.mutate(
      isTopLevel ? { [key]: newValue } : { preferences: { [key]: newValue } },
    );
  };

  const setPrefValue = (
    key: string,
    value: string | boolean | number | null,
  ) => {
    const isTopLevel = topLevelKeys.includes(key as TopLevelKey);

    // Update store locally
    updateLocalPreference(key, value, !isTopLevel);

    // Sync with backend
    updateMutation.mutate(
      isTopLevel ? { [key]: value } : { preferences: { [key]: value } },
    );
  };

  if (isLoading && !preferences)
    return (
      <div className="animate-pulse py-20 text-center font-mono text-xs tracking-widest text-zinc-500 uppercase">
        Calibrating Essence...
      </div>
    );

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 mx-auto max-w-3xl space-y-16 px-6 pt-20 pb-24 duration-1000">
      {/* Header Section */}
      <header className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div className="space-y-1">
          <p className="text-[10px] font-bold tracking-[0.3em] text-[#34D399] uppercase">
            Workspace
          </p>
          <h1 className="text-foreground font-serif text-5xl font-medium tracking-tight italic">
            Settings
          </h1>
        </div>
      </header>

      {/* --- General --- */}
      <section>
        <SectionHeader icon={Settings} title="General" />
        <div className="divide-border/5 divide-y">
          <SettingItem
            icon={Layout}
            title="Day ends at"
            isCloud
            description="Entries until this hour will be added to the previous day. Use 1-11am or leave blank for midnight."
          >
            <div className="flex items-center gap-3">
              <Select
                value={(getPref("dayEndsAt", "0") as string) || "0"}
                onValueChange={(v) => setPrefValue("dayEndsAt", v)}
              >
                <SelectTrigger className="border-border/20 bg-muted/5 h-9 w-20 rounded-lg">
                  <SelectValue placeholder="0" />
                </SelectTrigger>
                <SelectContent className="border-border/20 bg-card">
                  <SelectItem value="0" className="cursor-pointer">
                    0
                  </SelectItem>
                  {Array.from({ length: 11 }).map((_, i) => (
                    <SelectItem
                      key={i + 1}
                      value={(i + 1).toString()}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-muted-foreground/60 text-sm font-bold">
                AM
              </span>
            </div>
          </SettingItem>

          <SettingItem
            icon={SpellCheck}
            title="Spell checking"
            isMonitor
            description="If activated, the app will use the device's spell checking for inputs."
          >
            <Switch
              checked={getPref("spellChecking", true) as boolean}
              onCheckedChange={() => togglePref("spellChecking")}
            />
          </SettingItem>

          <SettingItem
            icon={Bell}
            title="Daily Reminder"
            isCloud
            description="Receive a daily notification to reflect on your day."
          >
            <div className="flex items-center gap-4">
              <input
                type="time"
                value={
                  (getPref("dailyReminderTime", "20:00") as string) || "20:00"
                }
                onChange={(e) =>
                  setPrefValue("dailyReminderTime", e.target.value)
                }
                className="border-border/20 bg-muted/5 text-foreground focus:border-border/40 h-9 rounded-lg border px-2 text-sm outline-none"
              />
              <Switch
                checked={getPref("notificationEnabled", true) as boolean}
                onCheckedChange={() => togglePref("notificationEnabled")}
              />
            </div>
          </SettingItem>

          <SettingItem
            icon={Type}
            title="Font size"
            isMonitor
            description="Adjust the base font- and icon size of the app."
          >
            <Select
              value={(getPref("fontSize", "medium") as string) || "medium"}
              onValueChange={(v) => setPrefValue("fontSize", v)}
            >
              <SelectTrigger className="border-border/20 bg-muted/5 h-9 w-32 rounded-lg">
                <SelectValue placeholder="Default" />
              </SelectTrigger>
              <SelectContent className="border-border/20 bg-card">
                <SelectItem value="small" className="cursor-pointer">
                  Small
                </SelectItem>
                <SelectItem value="medium" className="cursor-pointer">
                  Default
                </SelectItem>
                <SelectItem value="large" className="cursor-pointer">
                  Large
                </SelectItem>
              </SelectContent>
            </Select>
          </SettingItem>

          <SettingItem
            icon={Layout}
            title="Auto-hide navigation"
            isMonitor
            description="Hide navigation by default and only show it when hovering over the left edge of the screen (desktop only)."
          >
            <Switch
              checked={getPref("autoHideNav", false) as boolean}
              onCheckedChange={() => togglePref("autoHideNav")}
            />
          </SettingItem>
        </div>
      </section>

      {/* --- Journaling --- */}
      <section>
        <SectionHeader icon={BookOpen} title="Journaling" />
        <div className="divide-border/5 divide-y">
          <SettingItem
            icon={Layout}
            title="Bulleted Mode"
            isMonitor
            description="Start matches with a bullet point by default for rapid journaling."
          >
            <Switch
              checked={getPref("bulletedMode", true) as boolean}
              onCheckedChange={() => togglePref("bulletedMode")}
            />
          </SettingItem>

          <SettingItem
            icon={Sparkles}
            title="Special dates"
            isCloud
            description="Display your birthday, public holidays, etc. together with the entry date."
          >
            <Switch
              checked={getPref("specialDates", false) as boolean}
              onCheckedChange={() => togglePref("specialDates")}
            />
          </SettingItem>

          <SettingItem
            icon={TextCursorInput}
            title="Newline on Enter"
            isMonitor
            description="Use the 'Enter' key for new lines in dreams and bullets. By default, 'Enter' saves and 'Shift+Enter' creates a new line."
          >
            <Switch
              checked={getPref("newlineOnEnter", false) as boolean}
              onCheckedChange={() => togglePref("newlineOnEnter")}
            />
          </SettingItem>

          <SettingItem
            icon={Type}
            title="Collapse long bullets"
            isMonitor
            description="Collapse bullets with more than 5 lines in list views."
          >
            <Switch
              checked={getPref("collapseLongBullets", true) as boolean}
              onCheckedChange={() => togglePref("collapseLongBullets")}
            />
          </SettingItem>

          <SettingItem
            icon={Monitor}
            title="Bullet timestamps"
            isMonitor
            description="Display timestamps beneath bullets in detail mode."
          >
            <Switch
              checked={getPref("bulletTimestamps", false) as boolean}
              onCheckedChange={() => togglePref("bulletTimestamps")}
            />
          </SettingItem>

          <SettingItem
            icon={Hash}
            title="Highlight tags and mentions"
            isMonitor
            description="Mark tags and people with * / * in your entries and link them to details."
          >
            <Switch
              checked={getPref("highlightTagsAndMentions", true) as boolean}
              onCheckedChange={() => togglePref("highlightTagsAndMentions")}
            />
          </SettingItem>

          <SettingItem
            icon={Sparkles}
            title="Autocomplete"
            isMonitor
            description="Show autocomplete suggestions for #tags and @people while typing."
          >
            <Switch
              checked={getPref("autocomplete", true) as boolean}
              onCheckedChange={() => togglePref("autocomplete")}
            />
          </SettingItem>

          <SettingItem
            icon={Flame}
            title="Streak"
            isMonitor
            isPro
            description="Display your entry status over the last 7 days on top of your journal."
          >
            <Switch
              checked={getPref("streak", false) as boolean}
              onCheckedChange={() => togglePref("streak")}
            />
          </SettingItem>

          <SettingItem
            icon={Sparkles}
            title="Item indicators"
            isCloud
            description="Show indicators for entries with attachments or linked items."
          >
            <Switch
              checked={getPref("itemIndicators", true) as boolean}
              onCheckedChange={() => togglePref("itemIndicators")}
            />
          </SettingItem>

          <SettingItem
            icon={BookOpen}
            title="Show items in entries"
            isCloud
            description="Display notes, wisdom, and ideas inside entry details."
          >
            <Switch
              checked={getPref("showItemsInEntries", true) as boolean}
              onCheckedChange={() => togglePref("showItemsInEntries")}
            />
          </SettingItem>
        </div>
      </section>

      {/* --- Dreams --- */}
      <section>
        <SectionHeader icon={Moon} title="Dreams" />
        <div className="divide-border/5 divide-y">
          <SettingItem
            icon={Moon}
            title="Enable Dreams"
            isCloud
            description="Toggle the dream journaling feature globally."
          >
            <Switch
              checked={getPref("enableDreams", true) as boolean}
              onCheckedChange={() => togglePref("enableDreams")}
            />
          </SettingItem>

          <SettingItem
            icon={Layout}
            title="Inline mode"
            isMonitor
            description="Always display dream input along bullets in entries."
          >
            <Switch
              checked={getPref("inlineMode", false) as boolean}
              onCheckedChange={() => togglePref("inlineMode")}
            />
          </SettingItem>

          <SettingItem
            icon={Type}
            title="Collapse long dreams"
            isMonitor
            description="Collapse dreams with more than 5 lines in list views."
          >
            <Switch
              checked={getPref("collapseLongDreams", true) as boolean}
              onCheckedChange={() => togglePref("collapseLongDreams")}
            />
          </SettingItem>
        </div>
      </section>

      {/* --- Notes --- */}
      <section>
        <SectionHeader icon={Pin} title="Notes" />
        <div className="divide-border/5 divide-y">
          <SettingItem
            icon={Pin}
            title="Enable Notes"
            isCloud
            description="Toggle the notes capturing feature globally."
          >
            <Switch
              checked={getPref("enableNotes", true) as boolean}
              onCheckedChange={() => togglePref("enableNotes")}
            />
          </SettingItem>
        </div>
      </section>
    </div>
  );
}
