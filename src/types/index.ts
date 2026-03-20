export type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

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
