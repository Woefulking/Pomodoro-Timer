import type { Settings as settingsType, TimerSettings } from '@/types';
import { useEffect, useState } from 'react';
import { settingsToForm } from '@/helpers/settingsToForm';
import { Input } from '../Input/Input';
import type { SoundType } from '@/hooks/useAudio';
import clsx from 'clsx';
import cls from './Settings.module.scss';

interface SettingsProps {
    settings: settingsType;
    isSettingsOpen: boolean;
    volume: number;
    onChangeVolume: (volume: number) => void;
    playSound: (sound: SoundType) => void;
    onCloseSettings: () => void;
    onUpdateSettings: (newSettings: settingsType) => void;
}

export const Settings = (props: SettingsProps) => {
    const { settings, isSettingsOpen, volume, onChangeVolume, playSound, onCloseSettings, onUpdateSettings } = props;

    const [localSettings, setLocalSettings] = useState(() => settingsToForm(settings));

    const handleUpdateSettings = () => {
        const newSettings: TimerSettings = {
            pomodoro: Number(localSettings.pomodoro) || settings.pomodoro,
            shortBreak: Number(localSettings.shortBreak) || settings.shortBreak,
            longBreak: Number(localSettings.longBreak) || settings.longBreak,
            longBreakInterval: Number(localSettings.longBreakInterval) || settings.longBreakInterval,
        };

        onUpdateSettings(newSettings);
        setLocalSettings(settingsToForm(newSettings));
        onCloseSettings();
    }

    useEffect(() => {
        if (isSettingsOpen) {
            setLocalSettings(settingsToForm(settings));
        }
    }, [isSettingsOpen, settings]);

    return (
        <div className={clsx(cls.overlay, { [cls.fadeOut]: !isSettingsOpen })}>
            <div className={clsx(cls.content)}>
                <div className={clsx(cls.settings)}>
                    <div className={clsx(cls.header)}>
                        <h2 className={clsx(cls.title)}>Settings</h2>
                        <button
                            type='button'
                            className={clsx(cls.close)}
                            onClick={() => {
                                playSound('click');
                                onCloseSettings();
                            }}
                        >
                            X
                        </button>
                    </div>

                    <div className={clsx(cls.time)}>
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

                    <div className={clsx(cls.interval)}>
                        <Input
                            type='number'
                            className={clsx(cls.horizontal)}
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
                    <div className={clsx(cls.volume)}>
                        <Input
                            type='range'
                            className={clsx(cls.horizontal)}
                            name='volume'
                            label='Volume'
                            placeholder='Volume'
                            min="0"
                            max="100"
                            step="1"
                            value={String(volume)}
                            onChange={(value: string) => onChangeVolume(Number(value))}
                        />
                    </div>
                </div>

                <button
                    type='button'
                    className={clsx(cls.save)}
                    onClick={() => {
                        handleUpdateSettings();
                        playSound('click');
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}