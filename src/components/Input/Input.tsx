import { useEffect, useState, type HTMLInputTypeAttribute, type InputHTMLAttributes } from "react";
import clsx from 'clsx';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    type?: HTMLInputTypeAttribute
    label?: string;
    value: number;
    className?: string;
    placeholder: string;
    min?: number;
    max?: number;
    step?: number;
    onChange: (value: number) => void;
}

export const Input = (props: InputProps) => {
    const { type, label, value, name, disabled, className, placeholder, min = 1, max = 60, step = 1, onChange, ...otherProps } = props;

    const [inputValue, setInputValue] = useState(String(value));

    useEffect(() => {
        setInputValue(String(value));
    }, [value]);

    const clamp = (val: number) => Math.min(max, Math.max(min, val));

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        const num = Number(inputValue);

        if (inputValue === '' || Number.isNaN(num)) {
            const clamped = clamp(min);
            onChange(clamped);
            setInputValue(String(clamped));
            return;
        }

        const clamped = clamp(num);
        onChange(clamped);
        setInputValue(String(clamped));
    };

    const increment = () => {
        const base = Number(inputValue) || min;
        const next = clamp(base + step);
        onChange(next);
        setInputValue(String(next));
    };

    const decrement = () => {
        const base = Number(inputValue) || min;
        const next = clamp(base - step);
        onChange(next);
        setInputValue(String(next));
    };

    return (
        <div className={clsx(cls.wrapper, className)}>
            {label && <label className={clsx(cls.label)} htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={inputValue}
                disabled={disabled}
                onBlur={handleBlur}
                onChange={handleChange}
                className={clsx(cls.input, { [cls.disabled]: disabled })}
                {...otherProps}
            />
            <div className={clsx(cls.controls)}>
                <button type="button" className={clsx(cls.arrow, cls.up)} onClick={increment}>
                    <img src="src/assets/images/arrow-up.png" alt="increase" />
                </button>
                <button type="button" className={clsx(cls.arrow, cls.down)} onClick={decrement}>
                    <img src="src/assets/images/arrow-down.png" alt="decrease" />
                </button>
            </div>

        </div >
    )
}