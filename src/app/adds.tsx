"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

const YandexAd = ({ className }: any) => {
    const pathname = usePathname();

    useEffect(() => {
        let adLoaded = false;

        const loadAd = () => {
            if (!adLoaded && window.yaContextCb && window.Ya) {
                window.yaContextCb.push(() => {
                    window.Ya.Context.AdvManager.render({
                        blockId: "R-A-11866944-1",
                        renderTo: "yandex_rtb_R-A-11866944-1"
                    });
                });
                adLoaded = true;
                removeEventListeners(); // Убираем слушатели после загрузки рекламы
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
            addEventListeners(); // Добавляем слушатели при рендере компонента
        }

        return () => {
            removeEventListeners(); // Удаляем слушатели при размонтировании компонента
        };
    }, []);

    return <div id="yandex_rtb_R-A-11866944-1" className={className}></div>;
};

export default YandexAd;
