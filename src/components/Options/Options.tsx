import clsx from "clsx";
import cls from './Options.module.scss';
import { OPTIONS, type Mode } from "@/types";
import type { SoundType } from "@/hooks/useAudio";

interface OptionsProps {
    className?: string;
    mode: Mode;
    onPlaySound: (sound: SoundType) => void;
    onChangeMode: (mode: Mode) => void;
}

export const Options = (props: OptionsProps) => {
    const { className, mode, onPlaySound, onChangeMode } = props;
    return (
        <div className={clsx(cls.options, className)}>
            {OPTIONS.map((option) => (
                <button
                    key={option.mode}
                    type="button"
                    className={clsx(cls.button, mode === option.mode && [cls.active, cls[mode]])}
                    onClick={() => {
                        onChangeMode(option.mode);
                        onPlaySound('click');
                    }}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}