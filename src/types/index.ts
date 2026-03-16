export type Mode = 'pomodoro' | 'shortBreak' | 'longBreak';

export interface TimerSettings {
    pomodoro: number,
    shortBreak: number,
    longBreak: number,
}

export interface Settings extends TimerSettings {
    longBrealInterval?: number,
    notification?: string,
    background?: string;
}
