import cn from "classnames";
import cls from "./Textarea.module.scss";
import { TextareaHTMLAttributes, memo, ChangeEvent, FocusEvent } from "react";

type HTMLTextareaProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "value" | "onChange" | "onFocus" | "onBlur">;
interface TextareaProps extends HTMLTextareaProps {
    className?: string;
    style?: {};
    onChange?: (value: string) => void;
    onFocus?: (value: string) => void;
    onBlur?: (value: string) => void;
    color?: string;
    spellcheck?: boolean;
    ariaLabel?: string;
    id: string;
}

export const Textarea = memo((props: TextareaProps, ref) => {
    // eslint-disable-next-line react/prop-types
    const { className, onChange, onFocus, onBlur, children, style, spellcheck, id, ariaLabel } = props;
    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onChange?.(e.target.value);
    };
    const onFocusHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
        onFocus?.(e.target.value);
    };

    const onBlurHandler = (e: FocusEvent<HTMLTextAreaElement>) => {
        onBlur?.(e.target.value);
    };
    return (
        <textarea
            id={id}
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
