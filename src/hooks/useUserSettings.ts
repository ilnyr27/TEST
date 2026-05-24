"use client";

import { useEffect, useState, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useUser } from "./useUser";
import type { AIProvider, ThemeSetting } from "@/types/database";

export interface UserSettings {
  ai_provider: AIProvider;
  criticism_mode: boolean;
  language: "ru" | "en";
  theme: ThemeSetting;
}

const defaultSettings: UserSettings = {
  ai_provider: "deepseek",
  criticism_mode: false,
  language: "ru",
  theme: "system",
};

export function useUserSettings() {
  const { user } = useUser();
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  // Load settings from Supabase
  useEffect(() => {
    if (!user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSettings(defaultSettings);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("profiles")
      .select("ai_provider, criticism_mode, language, theme")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) {
          // eslint-disable-next-line react-hooks/set-state-in-effect
          setSettings({
            ai_provider: data.ai_provider || "deepseek",
            criticism_mode: data.criticism_mode || false,
            language: data.language || "ru",
            theme: data.theme || "system",
          });
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setLoading(false);
      });
  }, [user]);

  // Update a single setting
  const updateSetting = useCallback(
    async <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
      setSettings((prev) => ({ ...prev, [key]: value }));

      if (!user) return;

      const supabase = createClient();
      await supabase
        .from("profiles")
        .update({ [key]: value, updated_at: new Date().toISOString() })
        .eq("id", user.id);
    },
    [user]
  );

  return { settings, loading, updateSetting };
}
