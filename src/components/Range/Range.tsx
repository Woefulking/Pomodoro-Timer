import clsx from "clsx";
import cls from './Range.module.scss';
import { useEffect, useRef, type InputHTMLAttributes } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface RangeProps extends HTMLInputProps {
    label?: string;
    value: number;
    min: number;
    max: number;
    step?: number;
    onChange: (value: string) => void;
    className?: string;
}

export const Range = (props: RangeProps) => {
    const { label, value, name, min, max, step = 1, onChange, className, ...otherProps } = props;
    const rangeRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const range = rangeRef.current;

        if (!range) return;

        const progress = (value / max) * 100;
        range.style.background = `linear-gradient(to right, #a0a4b8 ${progress}%, #e6e6e6 ${progress}%)`;
    }, [value, max]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={clsx(cls.wrapper, className)}>
            {label && <label className={clsx(cls.label)} htmlFor={name}>{`${label} (${value})`}</label>}
            <input
                ref={rangeRef}
                type="range"
                id={name}
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={onChangeHandler}
                className={clsx(cls.range)}
                {...otherProps}
            />
        </div>
    )
}