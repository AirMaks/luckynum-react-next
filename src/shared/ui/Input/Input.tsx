"use client";

import cn from "classnames";
import { InputHTMLAttributes, memo, ChangeEvent, forwardRef } from "react";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    ref: any;
    onChange?: (value: string, e?: any) => void;
    autofocus?: boolean;
    rounded?: boolean;
    border?: boolean;
}

export const Input = memo(
    forwardRef((props: InputProps, ref) => {
        const { className, value, onChange, type = "text", placeholder, rounded = true, border = true, ...otherProps } = props;
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            onChange?.(e.target.value, e);
        };

        return (
            <input
                // ref={ref}
                type={type}
                value={value}
                onChange={onChangeHandler}
                className={cn(
                    "bg-transparent border-0 outline-none w-full p-[4px]",
                    {
                        rounded: rounded,
                        "!border border-black": border
                    },
                    [className]
                )}
                placeholder={placeholder}
                {...otherProps}
            />
        );
    })
);
