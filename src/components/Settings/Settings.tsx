import type { Settings as settingsType } from '@/types';
import { useState } from 'react';
import { Input } from '../Input/Input';
import type { SoundType } from '@/hooks/useAudio';
import clsx from 'clsx';
import cls from './Settings.module.scss';
import { Range } from '../Range/Range';

interface SettingsProps {
    settings: settingsType;
    playSound: (sound: SoundType, volume: number) => void;
    onCloseSettings: () => void;
    onUpdateSettings: (partial: Partial<settingsType>) => void;
}

export const Settings = (props: SettingsProps) => {
    const { settings, playSound, onCloseSettings, onUpdateSettings } = props;
    const [localSettings, setLocalSettings] = useState(settings);

    const handleChangeSettings = (key: keyof settingsType, value: string | number) => {
        setLocalSettings(prev => ({ ...prev, [key]: value }));
    }

    const handleSaveSettings = () => {
        onUpdateSettings({
            pomodoro: Number(localSettings.pomodoro),
            shortBreak: Number(localSettings.shortBreak),
            longBreak: Number(localSettings.longBreak),
            longBreakInterval: Number(localSettings.longBreakInterval),
        });
        onCloseSettings();
    };

    return (
        <div className={clsx(cls.overlay)}>
            <div className={clsx(cls.content)}>
                <div className={clsx(cls.settings)}>
                    <div className={clsx(cls.header)}>
                        <h2 className={clsx(cls.title)}>Settings</h2>
                        <button
                            type='button'
                            className={clsx(cls.close)}
                            onClick={() => {
                                playSound('click', Number(settings.volume));
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
                            onChange={(value: number) => handleChangeSettings('pomodoro', value)}
                        />
                        <Input
                            type='number'
                            name='shortBreak'
                            label='Short Break'
                            placeholder='Short break time'
                            value={localSettings.shortBreak}
                            onChange={(value: number) => handleChangeSettings('shortBreak', value)}
                        />
                        <Input
                            type='number'
                            name='longBreak'
                            label='Long Break'
                            placeholder='Long break time'
                            value={localSettings.longBreak}
                            onChange={(value: number) => handleChangeSettings('longBreak', value)}
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
                            onChange={(value: number) => handleChangeSettings('longBreakInterval', value)}
                        />
                    </div>
                    <div className={clsx(cls.volume)}>
                        <Range
                            name='volume'
                            label='Volume'
                            min={0}
                            max={100}
                            step={1}
                            value={settings.volume}
                            onChange={(value: string) => onUpdateSettings({ ...settings, volume: Number(value) })}
                        />

                    </div>
                </div>

                <button
                    type='button'
                    className={clsx(cls.save)}
                    onClick={() => {
                        playSound('click', settings.volume);
                        handleSaveSettings();
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    )
}