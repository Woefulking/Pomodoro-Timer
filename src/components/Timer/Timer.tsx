import clsx from 'clsx';
import cls from './Timer.module.scss';
import { formatTime } from '@/helpers/formatTime';
import type { Settings } from '@/types';
import { useTimer } from '@/hooks/useTimer';
import type { SoundType } from '@/hooks/useAudio';
import { TomatoFalls } from '../TomatoFall/TomatoFall';
import { useEffect } from 'react';

interface TimerProps {
    settings: Settings;
    onOpenSettings: () => void;
    audio: {
        play: (sound: SoundType, volume: number) => void;
        stop: (sound: SoundType) => void;
    }
}

export const Timer = (props: TimerProps) => {
    const { settings, onOpenSettings, audio } = props;
    const { timeLeft, mode, isRunning, toggle, reset } = useTimer(settings);

    const isPomodoro = mode === 'pomodoro';

    useEffect(() => {
        if (timeLeft < 0) {
            audio.play('alarm', settings.volume);
        }
    }, [timeLeft]);

    return (
        <div className={clsx(cls.content, cls[mode])}>
            <div className={clsx(cls.timer)}>
                <div className={clsx(cls.timeLeft)}>
                    {formatTime(timeLeft)}
                </div>
                <div className={clsx(cls.controls)}>
                    <button
                        type='button'
                        className={clsx(cls.button, cls[mode])}
                        onClick={() => {
                            if (!isRunning) {
                                audio.stop('alarm');
                            }
                            toggle();
                            audio.play('click', settings.volume);
                        }}
                    >
                        {!isRunning ? 'Start' : 'Pause'}
                    </button>
                    <button
                        type='button'
                        className={clsx(cls.button, cls[mode])}
                        onClick={() => {
                            if (!isRunning) {
                                audio.stop('alarm');
                            }

                            reset();
                            audio.play('click', settings.volume);
                        }}
                    >
                        Reset
                    </button>

                </div>

                <button
                    type='button'
                    className={clsx(cls.settings)}
                    onClick={onOpenSettings}
                >
                    <img
                        src='src/assets/images/settings.png'
                        // style={{ transform: `rotate(${rotation}deg)` }}
                        alt='settings'
                    />
                </button>
            </div>
            {
                isRunning && isPomodoro && (
                    <TomatoFalls />
                )
            }
        </div >
    )
}