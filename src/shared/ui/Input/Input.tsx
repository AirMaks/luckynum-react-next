"use client";

import cn from "classnames";
import { InputHTMLAttributes, memo, ChangeEvent, forwardRef } from "react";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string;
    ref: any;
    onChange?: (value: string, e?: any) => void;
    autofocus?: boolean;
    rounded?: boolean;
    border?: boolean;
    focusOutline?: boolean;
}

export const Input = memo(
    forwardRef((props: InputProps, ref) => {
        const { className, value, onChange, type = "text", placeholder, rounded = true, border = true, focusOutline, ...otherProps } = props;
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
                    cls.input,
                    {
                        [cls.rounded]: rounded,
                        [cls.border]: border,
                        [cls.outlined]: focusOutline
                    },
                    [className]
                )}
                placeholder={placeholder}
                {...otherProps}
            />
        );
    })
);
