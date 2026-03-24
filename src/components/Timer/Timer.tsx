import clsx from 'clsx';
import cls from './Timer.module.scss';
import { formatTime } from '@/helpers/formatTime';
import type { Mode } from '@/types';
import type { SoundType } from '@/hooks/useAudio';
import { TomatoFalls } from '../TomatoFall/TomatoFall';
import { useEffect } from 'react';

interface TimerProps {
    timeLeft: number;
    mode: Mode;
    isRunning: boolean;
    onToggle: () => void;
    onReset: () => void;
    onOpenSettings: () => void;
    audio: {
        volume: number;
        play: (sound: SoundType, volume: number) => void;
        stop: (sound: SoundType) => void;
    }
}

export const Timer = (props: TimerProps) => {
    const { timeLeft, mode, isRunning, onToggle, onReset, onOpenSettings, audio } = props;

    const isPomodoro = mode === 'pomodoro';

    useEffect(() => {
        if (timeLeft < 0) {
            audio.play('alarm', audio.volume);
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
                            onToggle();
                            audio.play('click', audio.volume);
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

                            onReset();
                            audio.play('click', audio.volume);
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