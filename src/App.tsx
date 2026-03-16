import './App.css'
import { formatTime } from './helpers/formatTime';
import { useTimer } from './hooks/useTimer';

function App() {

  const { timeLeft, isRunning, toggle, reset } = useTimer();
  return (
    <div>
      <div className='controls'>
        <div className='timer'>
          {formatTime(timeLeft)};
        </div>
        <button type='button' className='toggle' onClick={() => toggle()}>{!isRunning ? 'Start' : 'Pause'}</button>
        <button type='button' className='reset' onClick={() => reset()}>Reset</button>
      </div>
    </div>
  )
}

export default App
