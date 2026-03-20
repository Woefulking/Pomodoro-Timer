import { useSettings } from './hooks/useSettings';
import { useAudio } from './hooks/useAudio';
import { Timer } from './components/Timer/Timer';
import { Settings } from './components/Settings/Settings';
import { useState } from 'react';
import './App.css';

function App() {
  const { settings, updateSettings } = useSettings();
  const { volume } = settings;
  const { play, stop } = useAudio(volume);

  const [isSettingsOpen, setSettingsOpen] = useState<boolean>(false);

  //@TODO 
  //Подумать какую анимацию лучше сделать для кнопки настроек
  //Удалить ненужный импорт svgr
  //Добавить сохранение настроек громкости в localStorage
  //Сделать кастомный  input range и input number

  return (
    <div className='app'>
      <Timer settings={settings} audio={{ play, stop }} onOpenSettings={() => setSettingsOpen(true)} />
      {isSettingsOpen &&
        <Settings
          settings={settings}
          isSettingsOpen={isSettingsOpen}
          playSound={play}
          onUpdateSettings={updateSettings}
          onCloseSettings={() => setSettingsOpen(false)}
        />
      }
    </div >
  )
}

export default App
