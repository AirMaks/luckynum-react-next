import cn from "classnames";
import cls from "./PageLoader.module.scss";
import Loader from "shared/ui/Loader/Loader";

interface PageLoaderProps {
    className?: string;
}
export const PageLoader = ({ className }: PageLoaderProps) => {
    return (
        <div className={cn(cls.PageLoader, {}, [className])}>
            <Loader type="dots" size="m" />
        </div>
    );
};
