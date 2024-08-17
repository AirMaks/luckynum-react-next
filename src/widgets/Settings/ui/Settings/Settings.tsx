"use client";

import cn from "classnames";
import { useTranslation } from "react-i18next";
import cls from "./Settings.module.scss";
import GifIcon from "shared/assets/icons/settings/gif.svg";
import MyGifIcon from "shared/assets/icons/settings/link.svg";
import { LangSwitcher } from "widgets/LangSwitcher/LangSwitcher";
import { ThemeSwitcher } from "widgets/ThemeSwitcher";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
// import { FontSwitcher } from "widgets/FontSwitcher";
import InfoIcon from "shared/assets/icons/settings/read.svg";
import { usePathname } from "next/navigation";

interface SidebarProps {
    className?: string;
    isOpenSettings?: boolean;
    openAnimations?: () => void;
    openOwnAnimation?: () => void;
    openRandomNumberInfo?: () => void;
    openRandomWordInfo?: () => void;
    openCalcInfo?: () => void;
    enlargeFont?: () => void;
}

export const Settings = (props: SidebarProps) => {
    const { t } = useTranslation();
    const pathname = usePathname();
    const { className, isOpenSettings, openAnimations, openOwnAnimation, openRandomNumberInfo, openRandomWordInfo, openCalcInfo } = props;
    return (
        <Sidebar isOpen={isOpenSettings} className={cn("border-", { [cls.opened]: isOpenSettings }, ["border-r", className])}>
            <div className="flex flex-col justify-between min-h-[100%] px-[20px]">
                <div className="flex flex-col py-[10px]">
                    {/* <div className={cls.item} onClick={openAnimations}>
                        <GifIcon width={20} height={20} className={cls.fill} />
                        <span className={cls.item_text}>{t("Анимация")}</span>
                    </div>
                    <div className={cn(cls.item, {}, ["hr"])} onClick={openOwnAnimation}>
                        <MyGifIcon className={cls.fill} width={20} height={20} />
                        <span className={cls.item_text}>{t("Своя анимация")}</span>
                    </div> */}
                    {/* {pathname === "/" ? (
                        <div className={cls.item} onClick={openRandomNumberInfo}>
                            <InfoIcon className={cls.fill} width={20} height={20} />
                            <span className={cls.item_text}>{t("Как пользоваться генератором случайных чисел")}</span>
                        </div>
                    ) : pathname === "/choose-from-list" ? (
                        <div className={cls.item} onClick={openRandomWordInfo}>
                            <InfoIcon className={cls.fill} width={20} height={20} />
                            <span className={cls.item_text}>{t("Как пользоваться генератором случайных слов")}</span>
                        </div>
                    ) : pathname === "/credit-calculator" ? (
                        <div className={cls.item} onClick={openCalcInfo}>
                            <InfoIcon className={cls.fill} width={20} height={20} />
                            <span className={cls.item_text}>{t("Как пользоваться кредитным калькулятором")}</span>
                        </div>
                    ) : (
                        <></>
                    )} */}
                </div>
                <div className={cls.footer}>
                    {/* <ThemeSwitcher /> */}
                    {/* <FontSwitcher />
                    <LangSwitcher /> */}
                </div>
            </div>
        </Sidebar>
    );
};
