"use client";

import { useState } from "react";
import { Menu } from "widgets/Menu";
import { Providers } from "app/providers";
import { Navbar } from "widgets/Navbar";

export const App = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSettings, setIsOpenSettings] = useState(false);

    const onToggleMenu = () => {
        setIsOpenMenu((prev: any) => !prev);
        setIsOpenSettings(false);
    };
    const onToggleSettings = () => {
        setIsOpenSettings((prev: any) => !prev);
        setIsOpenMenu(false);
    };

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
            <div className="overflow-y-auto flex flex-col h-[calc(100vh-60px)] max-sm:h-[calc(100dvh-60px)] transition-[height] pb-[20px]">
                <div className="flex-1">{children}</div>
            </div>
        </Providers>
    );
};
