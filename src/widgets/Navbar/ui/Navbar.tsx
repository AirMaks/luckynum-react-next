import cn from "classnames";
import cls from "./Navbar.module.scss";
import Burger from "shared/ui/Burger/Burger";
import SettingsIcon from "shared/assets/icons/navbar/settings.svg";
import CloseIcon from "shared/assets/icons/navbar/close.svg";

interface NavbarProps {
    className?: string;
    onToggleMenu?: () => void;
    onToggleSettings?: () => void;
    isOpenMenu?: boolean;
    isOpenSettings?: boolean;
}

export const Navbar = ({ onToggleMenu, onToggleSettings, isOpenMenu, isOpenSettings }: NavbarProps) => {
    return (
        <div className="z-[1001] dark:bg-stone-800 border-b dark:border-gray-600 h-[60px] sticky top-[0] w-full bg-white flex justify-between p-[20px] items-center">
            <div className="contents">
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
