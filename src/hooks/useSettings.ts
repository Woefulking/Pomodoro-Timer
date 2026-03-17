import type { Settings } from "@/types";
import { useState } from "react";

export const defaultSettings: Settings = {
    pomodoro: 3,
    shortBreak: 1,
    longBreak: 2,
    longBreakInterval: 4,
};

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(() => {
        const savedSettings = localStorage.getItem('settings');

        if (savedSettings) {
            return JSON.parse(savedSettings) as Settings;
        }
        return defaultSettings;
    });

    const updateSettings = (newSettings: Settings) => {
        setSettings(newSettings);
        localStorage.setItem('settings', JSON.stringify(newSettings));
    }

    return { settings, updateSettings }

}