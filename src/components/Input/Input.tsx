import { useEffect, useState, type HTMLInputTypeAttribute, type InputHTMLAttributes } from "react";
import arrowUpImage from '@/assets/images/arrow-up.png';
import arrowDownImage from '@/assets/images/arrow-down.png';
import clsx from 'clsx';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    type?: HTMLInputTypeAttribute
    label?: string;
    value: number;
    className?: string;
    placeholder: string;
    onChange: (value: number) => void;
}

export const Input = (props: InputProps) => {
    const { type, label, value, name, disabled, className, placeholder, onChange, ...otherProps } = props;

    const [inputValue, setInputValue] = useState(String(value));
    const min = 1;

    useEffect(() => {
        setInputValue(String(value));
    }, [value]);

    const normalize = (val: number) => {
        return val < min ? min : val;
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleBlur = () => {
        const num = Number(inputValue);

        if (inputValue === '' || Number.isNaN(num)) {
            onChange(min);
            setInputValue(String(min));
            return;
        }

        const normalized = normalize(num);
        onChange(normalized);
        setInputValue(String(normalized));
    };

    const increment = () => {
        const base = Number(inputValue) || min;
        const next = base + 1;
        onChange(next);
        setInputValue(String(next));
    };

    const decrement = () => {
        const base = Number(inputValue) || min;
        const next = normalize(base - 1);
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
                    <img src={arrowUpImage} alt="increase" />
                </button>
                <button type="button" className={clsx(cls.arrow, cls.down)} onClick={decrement}>
                    <img src={arrowDownImage} alt="decrease" />
                </button>
            </div>
        </div >
    )
}