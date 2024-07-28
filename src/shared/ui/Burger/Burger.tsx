import cn from "classnames";
import { ButtonTheme } from "../Button/Button";
import cls from "./Burger.module.scss";
import { FC } from "react";

interface BurgerProps {
    className?: string;
    theme?: ButtonTheme;
    opened?: boolean;
    onClick?: () => void;
}
const Burger: FC<BurgerProps> = props => {
    const { className, opened, onClick, ...otherProps } = props;
    return (
        <div className={cn("dark:text-slate-500", { [cls.open]: opened }, [cls.Burger, className])} {...otherProps} onClick={onClick}>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
            <span className="bg-stone-800"></span>
        </div>
    );
};

export default Burger;
