export type Mode = 'work' | 'shortBreak' | 'longBreak';

export type Settings = Record<Mode, number>;

export interface TimerState {
  mode: Mode;
  timeLeft: number;
  isRunning: boolean;
  pomodoroCount: number;
  settings: Settings;
}
