"use client";

import cn from "classnames";
import cls from "./404.module.scss";
import { useTranslation } from "react-i18next";
import { AppLink } from "shared/ui/AppLink/AppLink";

interface NotFoundPageProps {
    className?: string;
}

const NotFoundPage = ({ className }: NotFoundPageProps) => {
    const { t } = useTranslation("not-found");
    return (
        <>
            <div className={cn(cls.NotFoundPage, {}, [className])}>
                <h1 className={cn("", {}, [className])}>{t("Страница не найдена.")}</h1>
                <p>{t("Извините, запрашиваемая страница не найдена.")}</p>
                <AppLink href={"/"}> {t("Вернуться на главную")}</AppLink>
            </div>
        </>
    );
};

export default NotFoundPage;
