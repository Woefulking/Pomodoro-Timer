import { useEffect, useRef, useState } from 'react';
import { settings } from './useLocalStorage';
import type { Mode } from '@/types';
import { switchMode } from '@/helpers/switchMode';

export function useTimer() {
  const [mode, setMode] = useState<Mode>('work');
  const [timeLeft, setTimeLeft] = useState<number>(settings[mode]);
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
    const nextMode = switchMode(mode, pomodoroCount.current);

    if (mode === 'work') {
      pomodoroCount.current++;
    }

    setMode(nextMode);
    setTimeLeft(settings[nextMode]);

    endTime.current = Date.now() + settings[nextMode] * 1000;
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
    setTimeLeft(settings[mode]);
    endTime.current = null
  }

  return { timeLeft, toggle, isRunning, reset }
}
