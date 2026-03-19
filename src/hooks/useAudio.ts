import { useEffect, useRef, useState } from "react"

export type SoundType = 'alarm' | 'click';

const sounds: Record<SoundType, string> = {
    alarm: 'src/assets/sounds/alarm.mp3',
    click: 'src/assets/sounds/click.mp3',
};

export function useAudio() {
    const [volume, setVolume] = useState(75);

    const audioMapRef = useRef<Record<SoundType, HTMLAudioElement> | null>(null);

    useEffect(() => {
        audioMapRef.current = {
            alarm: new Audio(sounds.alarm),
            click: new Audio(sounds.click),
        };
    }, []);

    const play = (sound: SoundType) => {
        const audio = audioMapRef.current?.[sound];
        if (!audio) return;

        audio.currentTime = 0;
        audio.volume = volume / 100;
        audio.play();
    };

    const stop = (sound: SoundType) => {
        const audio = audioMapRef.current?.[sound];
        if (!audio) return;

        audio.pause();
        audio.currentTime = 0;
    };

    const changeVolume = (volume: number) => {
        setVolume(volume);
    }

    return { volume, setVolume, play, stop, changeVolume };
}