import type { Mode } from "@/types";

export function switchMode(mode: Mode, pomodoroCount: number) {
    let nextMode: Mode;
    if (mode === 'work') {
        nextMode = pomodoroCount === 3 ? 'longBreak' : 'shortBreak';
    } else {
        nextMode = 'work';
    }

    return nextMode;

}