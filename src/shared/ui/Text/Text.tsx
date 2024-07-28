import cn from "classnames";
import cls from "./Text.module.scss";

interface TextProps {
    className?: string;
    text?: string;
    small?: boolean;
    middle?: boolean;
    large?: boolean;
    semibold?: boolean;
    bold?: boolean;
    center?: boolean;
    right?: boolean;
    style?: {};
    color?: string;
}

export const Text = (props: TextProps) => {
    const { className, text, small, middle, large, bold, semibold, center, right, style, color } = props;

    return (
        <>
            {text && (
                <p
                    style={style}
                    className={cn(
                        cls.Text,
                        {
                            [cls.semibold]: semibold,
                            [cls.bold]: bold,
                            [cls.small]: small,
                            [cls.middle]: middle,
                            [cls.large]: large,
                            [cls.center]: center,
                            [cls.right]: right,
                            // [cls[color]]: true
                        },
                        [className]
                    )}>
                    {text}
                </p>
            )}
        </>
    );
};
