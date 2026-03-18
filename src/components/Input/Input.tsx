import type { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import clsx from 'clsx';
import cls from './Input.module.scss';

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange'>

interface InputProps extends HTMLInputProps {
    type?: HTMLInputTypeAttribute
    label?: string;
    value: string;
    className?: string;
    placeholder: string;
    onChange: (value: string) => void;
}

export const Input = (props: InputProps) => {
    const { type, label, value, name, disabled, className, placeholder, onChange, ...otherProps } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={clsx(cls.wrapper, className)}>
            {label && <label className={clsx(cls.label)} htmlFor={name}>{label}</label>}
            <input
                type={type}
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChangeHandler}
                placeholder={placeholder}
                className={clsx(cls.input, { [cls.disabled]: disabled })}
                {...otherProps}
            />
        </div >
    )
}