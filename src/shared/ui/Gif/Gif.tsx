"use client";

import cn from "classnames";
import Image from "next/image";

interface GifProps {
    src: string;
    className?: string;
}

export const Gif = ({ src, className }: GifProps) => {
    return <Image src={src} className={cn("", {}, [className])} alt={src} />;
};
