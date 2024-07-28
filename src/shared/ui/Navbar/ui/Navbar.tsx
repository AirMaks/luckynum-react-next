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

const Navbar = ({ className, onToggleMenu, onToggleSettings, isOpenMenu, isOpenSettings }: NavbarProps) => {
    return (
        <div className={cn(cls.Navbar, {}, [className])}>
            <div className={cls.Burger}>
                {isOpenSettings ? (
                    <CloseIcon width={30} height={30} onClick={onToggleSettings} className={cn(cls.Settings, { [cls.roll]: isOpenSettings })} />
                ) : (
                    <SettingsIcon width={30} height={30} onClick={onToggleSettings} className={cn(cls.Settings, { [cls.roll]: isOpenSettings })} />
                )}
                <Burger opened={isOpenMenu} onClick={onToggleMenu} />
            </div>
        </div>
    );
};

export default Navbar;
