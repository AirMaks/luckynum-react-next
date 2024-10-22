import cn from "classnames";
import cls from "./Textarea.module.scss";
import { TextareaHTMLAttributes, memo, ChangeEvent, FocusEvent, useEffect, useRef } from "react";

type HTMLTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "onFocus" | "onBlur">;

interface TextareaProps extends HTMLTextareaProps {
    className?: string;
    style?: {};
    value?: string;
    onChange?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
    color?: string;
    spellcheck?: boolean;
    ariaLabel?: string;
    id: string;
    autofocus?: boolean;
}

export const Textarea = memo((props: TextareaProps) => {
    const { className, onChange, onFocus, onBlur, children, style, spellcheck, id, ariaLabel, autofocus, value } = props;
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };

    const onFocusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(e.target.value);
    };

    const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(e.target.value);
    };

    useEffect(() => {
        if (autofocus && textareaRef.current) {
            textareaRef.current.focus();
            if (value) {
                textareaRef.current.setSelectionRange(value.length, value.length);
            }
        }
    }, [autofocus, value]);

    return (
        <textarea
            ref={textareaRef}
            id={id}
            value={value}
            onChange={onChangeHandler}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            style={style}
            aria-label={ariaLabel}
            spellCheck={spellcheck}
            className={cn(cls.Textarea, {}, [className])}>
            {children}
        </textarea>
    );
});
