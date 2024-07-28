import cn from "classnames";
import cls from "./Loader.module.scss";
import { FC } from "react";

interface LoaderProps {
    className?: string;
    size?: string;
    type?: string;
}
export const Loader: FC<LoaderProps> = ({ className, size = "s", type = "spinner" }) => {
    return (
        <div className={cn("", { [cls[size]]: true, [cls[type]]: true }, [className])}>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
    );
};

export default Loader;
