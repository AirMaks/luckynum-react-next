"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const YandexAd = ({ className }: any) => {
    const pathname = usePathname();

    useEffect(() => {
        if (window.yaContextCb && window.Ya) {
            setTimeout(() => {
                window.yaContextCb.push(() => {
                    window.Ya.Context.AdvManager.render({
                        blockId: "R-A-11866944-1",
                        renderTo: "yandex_rtb_R-A-11866944-1"
                    });
                });
            }, 1000);
        }
    }, [pathname]);

    return <div id="yandex_rtb_R-A-11866944-1" className={className}></div>;
};

export default YandexAd;