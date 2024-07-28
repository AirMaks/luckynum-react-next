import cn from "classnames";
import { ButtonHTMLAttributes, FC } from "react";
import cls from "./Button.module.scss";
import Loader from "../Loader/Loader";

export enum ButtonTheme {
    CLEAR = "clear",
    CLEAR_INVERTED = "clearInverted",
    OUTLINE = "outline",
    BACKGROUND = "background",
    BACKGROUND_INVERTED = "backgroundInverted"
}

export enum ButtonSize {
    m = "size_m",
    l = "size_l",
    xl = "size_xl"
}

interface LoaderOptionsProps {
    loaderSize?: string;
    loaderType?: string;
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    classContainer?: string;
    theme?: ButtonTheme;
    square?: boolean;
    size?: ButtonSize;
    rounded?: boolean;
    bold?: boolean;
    semibold?: boolean;
    small?: boolean;
    w100?: boolean;
    yellow?: boolean;
    red?: boolean;
    blue?: boolean;
    green?: boolean;
    black?: boolean;
    grey?: boolean;
    loader?: boolean;
    border?: boolean;
    loaderOptions?: LoaderOptionsProps;
}

export const Button: FC<ButtonProps> = props => {
    const {
        className,
        classContainer,
        children,
        size = ButtonSize.m,
        rounded,
        bold,
        small,
        semibold,
        w100,
        yellow,
        red,
        blue,
        green,
        black,
        grey,
        disabled,
        loader,
        border,
        loaderOptions,
        ...otherProps
    } = props;

    return (
        <div className={cn("position-relative", { [cls.w100]: w100 }, [classContainer])}>
            <button
                className={cn("text-center w-full transition-all ease-in-out duration-300", {}, [className])}
                type="button"
                {...otherProps}
                disabled={disabled}>
                {children}
            </button>
            {loader && <Loader size={loaderOptions?.loaderSize} type={loaderOptions?.loaderType} />}
        </div>
    );
};
