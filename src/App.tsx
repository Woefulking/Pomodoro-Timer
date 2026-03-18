import { useEffect, useState } from 'react';
import { formatTime } from './helpers/formatTime';
import { useTimer } from './hooks/useTimer';
import { useSettings } from './hooks/useSettings';
import { settingsToForm } from './helpers/settingsToForm';
import type { TimerSettings } from './types';
import { Input } from './components/Input/Input';
import './App.scss';

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

  return (
    <div className='App'>
      {!isSettingsOpen && (
        <div className='timer'>
          <div className='pomodoro'>
            {formatTime(timeLeft)}
          </div>
          <div className='controls'>
            <button type='button' className='button' onClick={() => toggle()}>{!isRunning ? 'Start' : 'Pause'}</button>
            <button type='button' className='button' onClick={() => reset()}>Reset</button>

          </div>

          <button type='button' className='settingsBtn' onClick={() => setSettingsOpen(true)}></button>
        </div>
      )}

      {isSettingsOpen && (
        <div className='settings'>

          <div className='settingsHeader'>
            <h2 className='settingsTitle'>Settings</h2>
            <button type='button' className='settingsClose' onClick={() => setSettingsOpen(false)}>X</button>
          </div>

          <div className='settingsTime'>
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

          <div className='settingsInteval'>
            <Input
              type='number'
              className='settingsHorizontal'
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

          <button type='button' className='settingsSave' onClick={handleUpdateSettings}>Save</button>
        </div>
      )}
    </div>
  )
}

export default App
