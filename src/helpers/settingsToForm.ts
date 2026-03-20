import type { Settings } from "@/types";

export function settingsToForm(settings: Settings) {
    return {
        pomodoro: settings.pomodoro.toString(),
        shortBreak: settings.shortBreak.toString(),
        longBreak: settings.longBreak.toString(),
        longBreakInterval: settings.longBreakInterval.toString(),
        volume: settings.volume.toString(),
    }
}