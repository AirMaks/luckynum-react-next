"use client";

import { useEffect } from "react";

const YandexAd = ({ className, id }: { className: string; id: string }) => {
    useEffect(() => {
        let adLoaded = false;

        const loadAd = () => {
            if (!adLoaded && window.yaContextCb && window.Ya) {
                window.yaContextCb.push(() => {
                    window.Ya.Context.AdvManager.render({
                        blockId: id,
                        renderTo: `yandex_rtb_${id}`
                    });
                });
                adLoaded = true;
                removeEventListeners();
            }
        };

        const addEventListeners = () => {
            window.addEventListener("scroll", loadAd, { passive: true });
            window.addEventListener("touchstart", loadAd, { passive: true });
            document.addEventListener("mouseenter", loadAd);
            document.addEventListener("click", loadAd);
            document.addEventListener("DOMContentLoaded", loadAd);
        };

        const removeEventListeners = () => {
            window.removeEventListener("scroll", loadAd);
            window.removeEventListener("touchstart", loadAd);
            document.removeEventListener("mouseenter", loadAd);
            document.removeEventListener("click", loadAd);
            document.removeEventListener("DOMContentLoaded", loadAd);
        };

        if (typeof window !== "undefined") {
            addEventListeners();
        }

        return () => {
            removeEventListeners();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div id={`yandex_rtb_${id}`} className={className}></div>;
};

export default YandexAd;
