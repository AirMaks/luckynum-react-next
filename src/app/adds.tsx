"use client";

import { useEffect } from "react";

const YandexAd = ({ className }: any) => {
    useEffect(() => {
        if (window.yaContextCb && window.Ya) {
            window.yaContextCb.push(() => {
                window.Ya.Context.AdvManager.render({
                    blockId: "R-A-11866944-1",
                    renderTo: "yandex_rtb_R-A-11866944-1"
                });
            });
        }
    }, []);

    return <div id="yandex_rtb_R-A-11866944-1" className={className}></div>;
};

export default YandexAd;
