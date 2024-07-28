import cn from "classnames";

interface GifProps {
    src: string;
    className?: string;
}

export const Gif = ({ src, className }: GifProps) => {
    return <img src={src} className={cn("", {}, [className])} />;
};
