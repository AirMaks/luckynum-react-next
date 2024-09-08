"use client";

import { useState } from "react";
import { Menu } from "widgets/Menu";
import { Providers } from "app/providers";
import { Navbar } from "widgets/Navbar";
import YandexAd from "./adds";
import { Suspense } from "react";
import { useRouter } from "next/navigation";

export const App = ({
    children
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [isOpenSettings, setIsOpenSettings] = useState(false);
    const domain = typeof window !== "undefined" ? window.location.origin : "";

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
            <div className="overflow-y-auto flex flex-col h-[calc(100vh-56px)]">
                <div className="flex-1">
                    {domain === "https://lucky-num.ru" && (
                        <Suspense fallback={<></>}>
                            <YandexAd className="max-w-[960px] h-[70px] mx-auto pt-[20px] max-sm:px-[10px] max-sm:pt-[0]" />
                        </Suspense>
                    )}
                    {children}
                </div>
            </div>
        </Providers>
    );
};
