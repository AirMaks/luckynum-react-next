import cn from "classnames";
import { useTranslation } from "react-i18next";
import cls from "./LangSwitcher.module.scss";
import English from "shared/assets/icons/settings/english.svg";
import Russian from "shared/assets/icons/settings/russian.svg";
import { useEffect } from "react";
interface LangSwitcherProps {
    className?: string;
}

export const LangSwitcher = ({ className }: LangSwitcherProps) => {
    const { i18n } = useTranslation();
    useEffect(() => {
        const currentLanguage = i18n.language;
        if (!currentLanguage) i18n.language = "ru";
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const toggle = async () => {
        const currentLanguage = i18n.language;
        i18n.changeLanguage(currentLanguage === "ru" ? "en" : "ru");
    };

    return (
        <>
            {i18n.language === "ru" ? (
                <English className={cn(cls.LangSwitcher, {}, [className])} onClick={toggle} />
            ) : (
                <Russian className={cn(cls.LangSwitcher, {}, [className])} onClick={toggle} />
            )}
        </>
    );
};
