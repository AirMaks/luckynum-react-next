import Burger from "shared/ui/Burger/Burger";
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
        <div className="z-[1001] border-b h-[60px] sticky top-[0] w-full bg-[#f5f5f7] shadow-sm flex justify-between p-[20px] max-sm:px-[15px] items-center">
            <div className="contents">
                <Link href="/" className="absolute left-[50%] translate-x-[-50%]">
                    <Image src="/img/logo.svg" alt="lucky num calculation" width={148} height={32} priority={true} />
                </Link>
                <Burger opened={isOpenMenu} onClick={onToggleMenu} className="!ml-auto" />
            </div>
        </div>
    );
};
