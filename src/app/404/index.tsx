"use client";

import cn from "classnames";
import cls from "./404.module.scss";
import { AppLink } from "shared/ui/AppLink/AppLink";

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    return (
        <>
            <div className={cn(cls.NotFoundPage, {}, [className])}>
                <h1 className={cn("", {}, [className])}>Страница не найдена.</h1>
                <p>Извините, запрашиваемая страница не найдена.</p>
                <AppLink href={"/"}>Вернуться на главную</AppLink>
            </div>
        </>
    );
};

export default NotFoundPage;
