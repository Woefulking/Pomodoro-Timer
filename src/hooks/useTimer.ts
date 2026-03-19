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
  const startTime = useRef<number | null>(null);
  const endTime = useRef<number | null>(null);

  const currentDuration = durations[mode];
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    alarmRef.current = new Audio('src/assets/sounds/alarm.mp3');
  }, [])

  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(currentDuration);
    }
  }, [currentDuration]);

  //реактивное изменение таймера во время его работы
  useEffect(() => {
    if (!isRunning || !endTime.current) return;

    const elapsed = Date.now() - startTime.current!; // сколько прошло
    const newDuration = durations[mode] * 1000; // новое значение таймера
    const newRemaining = newDuration - elapsed; //сколько останется после изменения времени

    endTime.current = Date.now() + newRemaining;

    setTimeLeft(Math.ceil(newRemaining / 1000));

  }, [pomodoro, shortBreak, longBreak])

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

    if (alarmRef.current) {
      alarmRef.current.play();
    }

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
      startTime.current = Date.now();
      endTime.current = Date.now() + timeLeft * 1000;

      if (alarmRef.current) {
        alarmRef.current.currentTime = 0;
        alarmRef.current.pause();
      }

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

  return { timeLeft, mode, toggle, isRunning, reset }
}