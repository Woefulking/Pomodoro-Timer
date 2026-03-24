import { useSettings } from './hooks/useSettings';
import { useAudio } from './hooks/useAudio';
import { Timer } from './components/Timer/Timer';
import { Settings } from './components/Settings/Settings';
import { useState } from 'react';
import './App.css';
import { useTimer } from './hooks/useTimer';

function App() {
  const { settings, updateSettings } = useSettings();
  const audio = useAudio(settings.volume);
  const timer = useTimer(settings);

  const { timeLeft, mode, isRunning, toggle, reset } = timer;
  const { play, stop, } = audio;

  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  return (
    <div className='app'>
      <Timer
        timeLeft={timeLeft}
        mode={mode}
        isRunning={isRunning}
        onToggle={toggle}
        onReset={reset}
        audio={{ play, stop, volume: settings.volume }}
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
    </div >
  )
}

export default App
