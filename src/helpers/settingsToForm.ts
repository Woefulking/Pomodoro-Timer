import type { Settings } from "@/types";

export function settingsToForm(settings: Omit<Settings, 'volume'>) {
    return {
        pomodoro: settings.pomodoro.toString(),
        shortBreak: settings.shortBreak.toString(),
        longBreak: settings.longBreak.toString(),
        longBreakInterval: settings.longBreakInterval.toString(),
    }
}