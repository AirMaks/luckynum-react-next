import cn from "classnames";
import { AppLink, AppLinkTheme } from "shared/ui/AppLink/AppLink";
import ListIcon from "shared/assets/icons/menu/list.svg";
import cls from "./Menu.module.scss";
import DiceIcon from "shared/assets/icons/menu/dice.svg";
import CalcIcon from "shared/assets/icons/menu/calculator.svg";
import CreditCardIcon from "shared/assets/icons/menu/credit-card.svg";
import { Sidebar } from "shared/ui/Sidebar/Sidebar";
import { memo } from "react";
import { usePathname } from "next/navigation";
import PercentCalcIcon from "shared/assets/icons/menu/percent-calc.svg";
import PasswordIcon from "shared/assets/icons/menu/password.svg";

interface MenuProps {
    className?: string;
    isOpenMenu?: boolean;
    onClickMenuItem?: () => void;
}

export const Menu = memo(({ isOpenMenu, onClickMenuItem }: MenuProps) => {
    const pathname = usePathname();

    return (
        <Sidebar isOpen={isOpenMenu} className={cn("right-[0] border-l !z-[1002]", { [cls.opened]: isOpenMenu }, [])}>
            <nav className={cls.items}>
                <ul>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/"}
                            className={cn(cls.link, { [cls.active]: pathname === "/" })}
                            onClick={onClickMenuItem}>
                            <DiceIcon className={cls.icon} />
                            <span className={cls.link_text}>Случайное число</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/choose-from-list"}
                            className={cn(cls.link, { [cls.active]: pathname === "/choose-from-list" })}
                            onClick={onClickMenuItem}>
                            <ListIcon className={cls.icon} />
                            <span className={cls.link_text}>Выбрать из списка</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/mortgage-calculator"}
                            className={cn(cls.link, { [cls.active]: pathname === "/mortgage-calculator" })}
                            onClick={onClickMenuItem}>
                            <CalcIcon className={cls.icon} />
                            <span className={cls.link_text}>Калькулятор ипотеки</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/credit-calculator"}
                            className={cn(cls.link, { [cls.active]: pathname === "/credit-calculator" })}
                            onClick={onClickMenuItem}>
                            <CreditCardIcon className={cls.icon} />
                            <span className={cls.link_text}>Кредитный калькулятор</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/percent-calculator"}
                            className={cn(cls.link, { [cls.active]: pathname === "/percent-calculator" })}
                            onClick={onClickMenuItem}>
                            <PercentCalcIcon className={cls.icon} />
                            <span className={cls.link_text}>Калькулятор процентов</span>
                        </AppLink>
                    </li>
                    <li>
                        <AppLink
                            theme={AppLinkTheme.SECONDARY}
                            href={"/generator-parolei"}
                            className={cn(cls.link, { [cls.active]: pathname === "/generator-parolei" })}
                            onClick={onClickMenuItem}>
                            <PasswordIcon className={cls.icon} />
                            <span className={cls.link_text}>Генератор паролей</span>
                        </AppLink>
                    </li>
                </ul>
            </nav>
        </Sidebar>
    );
});
