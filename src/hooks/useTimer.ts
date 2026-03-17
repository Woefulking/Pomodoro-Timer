import { useEffect, useRef, useState } from 'react';
import type { Mode, TimerSettings } from '@/types';
import { switchMode } from '@/helpers/switchMode';

export function useTimer({ pomodoro, shortBreak, longBreak, longBreakInterval }: TimerSettings) {

  const durations: Record<Mode, number> = {
    pomodoro,
    shortBreak,
    longBreak
  }

  const [mode, setMode] = useState<Mode>('pomodoro');
  const [timeLeft, setTimeLeft] = useState<number>(durations[mode]);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const pomodoroCount = useRef(0);
  const endTime = useRef<number | null>(null);

  //Таймер
  useEffect(() => {
    if (!isRunning) return;

    const timer = setInterval(() => {
      if (endTime.current) {
        let remaining = Math.ceil((endTime.current - Date.now()) / 1000);
        setTimeLeft(remaining);
      }
    }, 1000)

    return () => clearInterval(timer);
  }, [isRunning]);

  //Остановка таймера и смена режима работы
  useEffect(() => {
    if (timeLeft >= 0) return;

    setIsRunning(false);

    if (mode === 'pomodoro') {
      pomodoroCount.current++;
    }

    const nextMode = switchMode(mode, pomodoroCount.current, longBreakInterval);

    setMode(nextMode);
    setTimeLeft(durations[nextMode]);

    endTime.current = Date.now() + durations[nextMode] * 1000;
  }, [timeLeft]);


  const toggle = () => {
    if (!isRunning) {
      endTime.current = Date.now() + timeLeft * 1000;
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }

  //Сброс таймера
  const reset = () => {
    setIsRunning(false);
    setTimeLeft(durations[mode]);
    endTime.current = null
  }

  return { timeLeft, toggle, isRunning, reset }
}
