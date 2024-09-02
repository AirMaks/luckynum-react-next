"use client";

import { useState } from "react";
import { Menu } from "widgets/Menu";
import { Settings } from "widgets/Settings";
import { Providers } from "app/providers";
import { Navbar } from "widgets/Navbar";
// import { useFont } from "app/providers";
import { Animations, OwnAnimation } from "features/Animations";
import { usePathname } from "next/navigation";
import { RandomNumberInfo } from "features/Animations/ui/RandomNumberInfo/RandomNumberInfo";
import { RandomWordInfo } from "features/Animations/ui/RandomWordInfo/RandomWordInfo";
import { CalcInfo } from "features/Animations/ui/CalcInfo/CalcInfo";

export const App = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const pathname = usePathname();
    // const { font } = useFont();
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const [isOpenAnimations, setIsOpenAnimations] = useState(false);
    const [isOpenOwnAnimation, setIsOpenOwnAnimation] = useState(false);
    const [isOpenRandomNumberInfo, setIsOpenRandomNumberInfo] = useState(false);
    const [isOpenRandomWordInfo, setIsOpenRandomWordInfo] = useState(false);
    const [isOpenCalcInfo, setIsOpenCalcInfo] = useState(false);

    const onToggleMenu = () => {
        setIsOpenMenu(prev => !prev);
        setIsOpenSettings(false);
        setIsOpenRandomNumberInfo(false);
        setIsOpenRandomWordInfo(false);
        setIsOpenCalcInfo(false);
        setIsOpenAnimations(false);
        setIsOpenCalcInfo(false);
        setIsOpenOwnAnimation(false);
    };
    const onToggleSettings = () => {
        setIsOpenSettings(prev => !prev);
        setIsOpenMenu(false);
        setIsOpenAnimations(false);
        setIsOpenOwnAnimation(false);
        setIsOpenRandomNumberInfo(false);
        setIsOpenRandomWordInfo(false);
        setIsOpenCalcInfo(false);
    };
    const onToggleAnimation = () => setIsOpenAnimations(true);
    const onToggleOwnAnimation = () => setIsOpenOwnAnimation(true);
    const onClose = () => {
        setIsOpenAnimations(false);
        setIsOpenOwnAnimation(false);
        setIsOpenRandomNumberInfo(false);
        setIsOpenRandomWordInfo(false);
        setIsOpenCalcInfo(false);
    };
    const onToggleRandomNumberInfo = () => setIsOpenRandomNumberInfo(true);
    const onToggleRandomWordInfo = () => setIsOpenRandomWordInfo(true);
    const onToggleCalcInfo = () => setIsOpenCalcInfo(true);

    const onClickMenuItem = () => {
        if (typeof window !== "undefined") {
            if (window.innerWidth <= 530) {
                setIsOpenMenu(false);
            }
        }
    };
    return (
        <Providers>
            <Navbar isOpenMenu={isOpenMenu} isOpenSettings={isOpenSettings} onToggleMenu={onToggleMenu} onToggleSettings={onToggleSettings} />
            <Menu isOpenMenu={isOpenMenu} onClickMenuItem={onClickMenuItem} />
            {/* <Settings
                isOpenSettings={isOpenSettings}
                openAnimations={onToggleAnimation}
                openOwnAnimation={onToggleOwnAnimation}
                openRandomNumberInfo={onToggleRandomNumberInfo}
                openRandomWordInfo={onToggleRandomWordInfo}
                openCalcInfo={onToggleCalcInfo}
            /> */}
            {/* <Animations isOpenAnimations={isOpenAnimations} onClose={onClose} /> */}
            {/* <OwnAnimation isOpenOwnAnimation={isOpenOwnAnimation} onClose={onClose} />*/}
            {/* {pathname === "/" && <RandomNumberInfo isOpenRandomNumberInfo={isOpenRandomNumberInfo} onClose={onClose} />} */}
            {/*pathname === "/choose-from-list" && <RandomWordInfo isOpenRandomWordInfo={isOpenRandomWordInfo} onClose={onClose} />}
            {pathname === "/credit-calculator" && <CalcInfo isOpenCalcInfo={isOpenCalcInfo} onClose={onClose} />} */}
            <div className="overflow-y-auto pb-[100px]">{children}</div>
        </Providers>
    );
};
