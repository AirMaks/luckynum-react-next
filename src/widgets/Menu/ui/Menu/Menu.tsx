import cn from "classnames";
import { useTranslation } from "react-i18next";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import ListIcon from "shared/assets/icons/menu/list.svg";
import cls from "./Menu.module.scss";
import DiceIcon from "shared/assets/icons/menu/dice.svg";
import CalcIcon from "shared/assets/icons/menu/calculator.svg";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import { memo } from "react";
import { usePathname } from "next/navigation";

interface MenuProps {
    className?: string;
    isOpenMenu?: boolean;
    onClickMenuItem?: () => void;
}

export const Menu = memo(({ className, isOpenMenu, onClickMenuItem }: MenuProps) => {
    const { t } = useTranslation();
    const pathname = usePathname();

    return (
        <Sidebar isOpen={isOpenMenu} className={cn("right-[0] border-l", { [cls.opened]: isOpenMenu }, [])}>
            <nav className={cls.items}>
                <ul>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/"}
                            className={cn(cls.link, { [cls.active]: pathname === "/" })}
                            onClick={onClickMenuItem}>
                            <DiceIcon className={cls.icon} />
                            <span className={cls.link_text}>{t("Случайное число")}</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/choose-from-list"}
                            className={cn(cls.link, { [cls.active]: pathname === "/choose-from-list" })}
                            onClick={onClickMenuItem}>
                            <ListIcon className={cls.icon} />
                            <span className={cls.link_text}>{t("Выбрать из списка")}</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/credit-calculator"}
                            className={cn(cls.link, { [cls.active]: pathname === "/credit-calculator" })}
                            onClick={onClickMenuItem}>
                            <CalcIcon className={cls.icon} />
                            <span className={cls.link_text}>{t("Кредитный калькулятор")}</span>
                        </AppLink>
                    </li>
                </ul>
            </nav>
        </Sidebar>
    );
});
