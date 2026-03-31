import { useEffect, useRef } from "react";
import alarmSound from '@/assets/sounds/alarm.mp3';
import clickSound from '@/assets/sounds/click.mp3';

export type SoundType = 'alarm' | 'click';

const sounds: Record<SoundType, string> = {
    alarm: alarmSound,
    click: clickSound,
};

export function useAudio(volume: number) {
    const audioMapRef = useRef<Record<SoundType, HTMLAudioElement> | null>(null);

    useEffect(() => {
        audioMapRef.current = {
            alarm: new Audio(sounds.alarm),
            click: new Audio(sounds.click),
        };
    }, []);

    useEffect(() => {
        if (audioMapRef.current) {
            Object.values(audioMapRef.current).forEach(audio => {
                audio.volume = volume / 100;
            });
        }
    }, [volume]);

    const play = (sound: SoundType) => {
        const audio = audioMapRef.current?.[sound];
        if (!audio) return;

        audio.currentTime = 0;
        audio.play();
    };

    const stop = (sound: SoundType) => {
        const audio = audioMapRef.current?.[sound];
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
    };

    return { play, stop };
}