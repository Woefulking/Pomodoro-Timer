export type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

export const OPTIONS: { mode: Mode; label: string }[] = [
    { mode: 'pomodoro', label: 'Pomodoro' },
    { mode: 'shortBreak', label: 'Short Break' },
    { mode: 'longBreak', label: 'Long Break' },
];

export interface TimerSettings {
    pomodoro: number,
    shortBreak: number,
    longBreak: number,
    longBreakInterval: number,
}

export interface Settings extends TimerSettings {
    volume: number,
    notification?: string,
    background?: string;
}
