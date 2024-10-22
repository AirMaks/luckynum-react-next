"use client";

import cn from "classnames";
import { InputHTMLAttributes, memo, ChangeEvent, forwardRef } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | boolean;
    onChange?: (value: any, e?: ChangeEvent<HTMLInputElement>) => void;
    autofocus?: boolean;
    rounded?: boolean;
    border?: boolean;
    ariaLabel?: string;
}

export const Input = memo(
    forwardRef<HTMLInputElement, InputProps>((props, ref) => {
        const { className, value, onChange, type = "text", placeholder, rounded = true, border = true, ariaLabel, ...otherProps } = props;

        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newValue = type === "checkbox" ? e.target.checked : e.target.value;
            onChange?.(newValue, e);
        };

        return (
            <input
                ref={ref}
                type={type}
                checked={type === "checkbox" ? (value as boolean) : undefined}
                value={type !== "checkbox" ? (value as string) : undefined}
                onChange={onChangeHandler}
                aria-label={ariaLabel}
                className={cn(
                    "bg-transparent border-0 outline-none w-full p-[4px]",
                    {
                        rounded: rounded,
                        "!border border-gray-700": border
                    },
                    [className]
                )}
                placeholder={placeholder}
                {...otherProps}
            />
        );
    })
);
