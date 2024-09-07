import cn from "classnames";
import cls from "./Navbar.module.scss";
import Burger from "shared/ui/Burger/Burger";
import SettingsIcon from "shared/assets/icons/navbar/settings.svg";
import CloseIcon from "shared/assets/icons/navbar/close.svg";
import Link from "next/link";
import Image from "next/image";

interface NavbarProps {
    className?: string;
    onToggleMenu?: () => void;
    onToggleSettings?: () => void;
    isOpenMenu?: boolean;
    isOpenSettings?: boolean;
}

export const Navbar = ({ onToggleMenu, onToggleSettings, isOpenMenu, isOpenSettings }: NavbarProps) => {
    return (
        <div className="z-[1001] border-b h-[60px] sticky top-[0] w-full bg-[#f7f7f7] shadow shadow-sm flex justify-between p-[20px] max-sm:px-[15px] items-center">
            <div className="contents">
                <Link href="/" className="absolute left-[50%] translate-x-[-50%]">
                    <img src="/img/logo.svg" alt="lucky num calculation" width={148} height={32} />
                </Link>
                {/* {isOpenSettings ? (
                    <CloseIcon
                        width={30}
                        height={30}
                        onClick={onToggleSettings}
                        className={cn("cursor-pointer fill-stone-800", { [cls.roll]: isOpenSettings })}
                    />
                ) : (
                    <SettingsIcon
                        width={30}
                        height={30}
                        onClick={onToggleSettings}
                        className={cn("cursor-pointer fill-stone-800", { [cls.roll]: isOpenSettings })}
                    />
                )} */}
                <Burger opened={isOpenMenu} onClick={onToggleMenu} className="!ml-auto" />
            </div>
        </div>
    );
};
