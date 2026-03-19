import { useEffect, useRef, useState } from 'react';
import { formatTime } from './helpers/formatTime';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { settingsToForm } from './helpers/settingsToForm';
import type { TimerSettings } from './types';
import { Input } from './components/Input/Input';
import { TomatoFalls } from './components/TomatoFall/TomatoFall';
import clsx from 'clsx';
import cls from './App.module.scss';

function App() {
  const { settings, updateSettings } = useSettings();
  const { timeLeft, mode, isRunning, toggle, reset } = useTimer(settings);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);
  const [localSettings, setLocalSettings] = useState(() => settingsToForm(settings));

  const [rotation, setRotation] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const isPomodoro = mode === 'pomodoro';

  const buttonPressRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    buttonPressRef.current = new Audio('src/assets/sounds/button-press.mp3');
  }, [])

  const handleUpdateSettings = () => {
    const newSettings: TimerSettings = {
      pomodoro: Number(localSettings.pomodoro) || settings.pomodoro,
      shortBreak: Number(localSettings.shortBreak) || settings.shortBreak,
      longBreak: Number(localSettings.longBreak) || settings.longBreak,
      longBreakInterval: Number(localSettings.longBreakInterval) || settings.longBreakInterval,
    };

    updateSettings(newSettings);

    setLocalSettings(settingsToForm(newSettings));

    setSettingsOpen(false);
  }

  useEffect(() => {
    if (isSettingsOpen) {
      setLocalSettings(settingsToForm(settings));
    }
  }, [isSettingsOpen, settings]);

  useEffect(() => {
    if (!isHovering) return;

    const interval = setInterval(() => {
      setRotation(prev => prev + 5);
    }, 32);

    return () => clearInterval(interval);
  }, [isHovering])


  //@TODO 
  //Подумать какую анимацию лучше сделать для кнопки настроек
  //Удалить ненужный импорт svgr
  //Добавить настройки громкости оповещения

  return (
    <div className={clsx(cls.app, cls[mode])}>
      {!isSettingsOpen && (
        <div className={clsx(cls.timer)}>
          <div className={clsx(cls.timeLeft)}>
            {formatTime(timeLeft)}
          </div>
          <div className={clsx(cls.controls)}>
            <button
              type='button'
              className={clsx(cls.button, cls[mode])}
              onClick={() => {
                toggle();
                buttonPressRef.current?.play();
              }}
            >
              {!isRunning ? 'Start' : 'Pause'}
            </button>
            <button
              type='button'
              className={clsx(cls.button, cls[mode])}
              onClick={() => {
                reset();
                buttonPressRef.current?.play();
              }}
            >
              Reset
            </button>

          </div>

          <button
            type='button'
            className={clsx(cls.settingsOpen)}
            onClick={() => setSettingsOpen(true)}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <img
              src='src/assets/images/settings.png'
              style={{ transform: `rotate(${rotation}deg)` }}
              alt='settings'
            />
          </button>

        </div>
      )}

      {isSettingsOpen && (
        <div className={clsx(cls.settings)}>

          <div className={clsx(cls.settingsHeader)}>
            <h2 className={clsx(cls.settingsTitle)}>Settings</h2>
            <button type='button' className={clsx(cls.settingsClose)} onClick={() => setSettingsOpen(false)}>X</button>
          </div>

          <div className={clsx(cls.settingsTime)}>
            <Input
              type='number'
              name='pomodoro'
              label='Pomodoro'
              placeholder='Pomodoro time'
              value={localSettings.pomodoro}
              onChange={(value: string) => setLocalSettings(prev => ({
                ...prev,
                pomodoro: value,
              }))}
            />
            <Input
              type='number'
              name='shortBreak'
              label='Short Break'
              placeholder='Short break time'
              value={localSettings.shortBreak}
              onChange={(value: string) => setLocalSettings(prev => ({
                ...prev,
                shortBreak: value,
              }))}
            />
            <Input
              type='number'
              name='longBreak'
              label='Long Break'
              placeholder='Long break time'
              value={localSettings.longBreak}
              onChange={(value: string) => setLocalSettings(prev => ({
                ...prev,
                longBreak: value,
              }))}
            />
          </div>

          <div className={clsx(cls.settingsInterval)}>
            <Input
              type='number'
              className={clsx(cls.settingsHorizontal)}
              name='longBreakInterval'
              label='Long Break Interval'
              placeholder='Long break interval timer'
              value={localSettings.longBreakInterval}
              onChange={(value: string) => setLocalSettings(prev => ({
                ...prev,
                longBreakInterval: value,
              }))}
            />
          </div>

          <button
            type='button'
            className={clsx(cls.settingsSave)}
            onClick={() => {
              handleUpdateSettings();
              buttonPressRef.current?.play();
            }}
          >
            Save
          </button>
        </div>
      )}

      {isRunning && isPomodoro && (
        <TomatoFalls />
      )}
    </div>
  )
}

export default App
