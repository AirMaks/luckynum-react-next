/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";

function convertParam(boolValue: any, defaultValue: any) {
    return (boolValue === undefined ? defaultValue : boolValue) ? "true" : "false";
}

function loadYandexMetrika(yid: string, clickmap: string, trackLinks: string, accurateTrackBounce: string, webvisor: string) {
    const scriptInjectorHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

      ym(${yid}, "init", {
          clickmap: ${clickmap},
          trackLinks: ${trackLinks},
          accurateTrackBounce: ${accurateTrackBounce},
          webvisor: ${webvisor}
      });
    `;
    const script = document.createElement("script");
    script.innerHTML = scriptInjectorHTML;
    document.body.appendChild(script);
}

function YandexMetrikaComponent({ yid, clickmap, trackLinks, accurateTrackBounce, webvisor }: any) {
    useEffect(() => {
        if (typeof window !== "undefined") {
            const events = ["click", "scroll", "touchstart"];
            let loaded = false;

            const loadMetrikaOnEvent = (event: Event) => {
                if (!loaded) {
                    loadYandexMetrika(yid, clickmap, trackLinks, accurateTrackBounce, webvisor);
                    loaded = true;
                    events.forEach(event => window.removeEventListener(event, loadMetrikaOnEvent));
                    document.removeEventListener("mouseenter", loadMetrikaOnEvent, true);
                }
            };

            events.forEach(event => window.addEventListener(event, loadMetrikaOnEvent));

            document.addEventListener("mouseenter", loadMetrikaOnEvent, true);

            return () => {
                events.forEach(event => window.removeEventListener(event, loadMetrikaOnEvent));
                document.removeEventListener("mouseenter", loadMetrikaOnEvent, true);
            };
        }
    }, [yid, clickmap, trackLinks, accurateTrackBounce, webvisor]);

    return (
        <noscript>
            <div>
                <img src={`https://mc.yandex.ru/watch/${yid}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
        </noscript>
    );
}

const YandexMetrika = dynamic(() => Promise.resolve(YandexMetrikaComponent), {
    ssr: false
});

export default function YandexMetrikaWrapper({ yid, clickmap = true, trackLinks = true, accurateTrackBounce = true, webvisor = true }: any) {
    clickmap = convertParam(clickmap, true);
    trackLinks = convertParam(trackLinks, true);
    accurateTrackBounce = convertParam(accurateTrackBounce, true);
    webvisor = convertParam(webvisor, true);

    return <YandexMetrika yid={yid} clickmap={clickmap} trackLinks={trackLinks} accurateTrackBounce={accurateTrackBounce} webvisor={webvisor} />;
}
