import { useSettings } from './hooks/useSettings';
import { useAudio } from './hooks/useAudio';
import { Timer } from './components/Timer/Timer';
import { Settings } from './components/Settings/Settings';
import { useState } from 'react';
import { useTimer } from './hooks/useTimer';
import { Options } from './components/Options/Options';
import clsx from 'clsx';
import cls from './App.module.scss';
import { TomatoFalls } from './components/TomatoFall/TomatoFall';

function App() {
  const { settings, updateSettings } = useSettings();
  const audio = useAudio(settings.volume);
  const timer = useTimer(settings);

  const { timeLeft, mode, isRunning, toggle, reset, changeMode } = timer;
  const { play, stop, } = audio;

  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const isPomodoro = mode === 'pomodoro';

  //@TODO
  //3) Подумать над анимациями для отдыха и длинного отдыха. Ну или забить вообще
  //4) Начать занимастья Electron и подумать над размерами приложения

  return (
    <div className={clsx(cls.app, cls[mode])}>
      <div className={clsx(cls.content)}>
        <Options mode={mode} onPlaySound={play} onChangeMode={changeMode} />
        <Timer
          timeLeft={timeLeft}
          mode={mode}
          isRunning={isRunning}
          onToggle={toggle}
          onReset={reset}
          audio={{ play, stop }}
          onOpenSettings={() => setSettingsOpen(true)}
        />
        {isSettingsOpen &&
          <Settings
            settings={settings}
            playSound={play}
            onUpdateSettings={updateSettings}
            onCloseSettings={() => setSettingsOpen(false)}
          />
        }
      </div>
      {
        isRunning && isPomodoro && (
          <TomatoFalls />
        )
      }
    </div >
  )
}

export default App
