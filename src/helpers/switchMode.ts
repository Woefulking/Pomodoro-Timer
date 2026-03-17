import type { Mode } from "@/types";

export function switchMode(mode: Mode, pomodoroCount: number, longBreakInterval: number) {
    let nextMode: Mode;
    if (mode === 'pomodoro') {
        nextMode = pomodoroCount % longBreakInterval === 0 ? 'longBreak' : 'shortBreak';
    } else {
        nextMode = 'pomodoro';
    }

    return nextMode;

}