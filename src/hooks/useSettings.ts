import type { Settings } from "@/types";
import { useState } from "react";

const defaultSettings: Settings = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 15,
    longBreakInterval: 4,
    volume: 75,
};

export function useSettings() {
    const [settings, setSettings] = useState<Settings>(() => {
        const savedSettings = localStorage.getItem('settings');

        if (savedSettings) {
            return JSON.parse(savedSettings) as Settings;
        }
        return defaultSettings;
    });

    const updateSettings = (partial: Partial<Settings>) => {
        setSettings(prev => {
            const next = { ...prev, ...partial };
            localStorage.setItem('settings', JSON.stringify(next));
            return next;
        });
    };

    return { settings, updateSettings };

}