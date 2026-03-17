import { useState } from 'react';
import { formatTime } from './helpers/formatTime';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { settingsToForm } from './helpers/settingsToForm';
import type { TimerSettings } from './types';
import './App.css'

function App() {
  const { settings, updateSettings } = useSettings();
  const { timeLeft, isRunning, toggle, reset } = useTimer(settings);
  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  const [localSettings, setLocalSettings] = useState(() => settingsToForm(settings));

  const handleUpdateSettings = () => {
    const newSettings: TimerSettings = {
      pomodoro: Number(localSettings.pomodoro) || settings.pomodoro,
      shortBreak: Number(localSettings.shortBreak) || settings.shortBreak,
      longBreak: Number(localSettings.longBreak) || settings.longBreak,
      longBreakInterval: Number(localSettings.longBreakInterval) || settings.longBreakInterval,
    }

    updateSettings(newSettings)

    setLocalSettings(settingsToForm(newSettings));
  }

  return (
    <div>
      <div className='timer'>
        {formatTime(timeLeft)};
      </div>
      <div className='controls'>
        <button type='button' className='toggleBtn' onClick={() => toggle()}>{!isRunning ? 'Start' : 'Pause'}</button>
        <button type='button' className='resetBtn' onClick={() => reset()}>Reset</button>

      </div>
      {/* <button type='button' className='settingsBtn' onClick={() => setSettingsOpen(!isSettingsOpen)}></button> */}

      <div className='settings'>
        <input
          type='number'
          placeholder='Pomodoro'
          value={localSettings.pomodoro}
          onChange={(e) => setLocalSettings({
            ...localSettings,
            pomodoro: e.target.value,
          })}
        />
        <input
          type='number'
          placeholder='Short Break'
          value={localSettings.shortBreak}
          onChange={(e) => setLocalSettings({
            ...localSettings,
            shortBreak: e.target.value,
          })}
        />
        <input
          type='number'
          placeholder='Long Break'
          value={localSettings.longBreak}
          onChange={(e) => setLocalSettings({
            ...localSettings,
            longBreak: e.target.value,
          })}
        />
        <input
          type='number'
          placeholder='Long Break Interval'
          value={localSettings.longBreakInterval}
          onChange={(e) => setLocalSettings({
            ...localSettings,
            longBreakInterval: e.target.value,
          })}
        />
        <button className='saveSettings' onClick={handleUpdateSettings}>Save</button>
      </div>
    </div>
  )
}

export default App
