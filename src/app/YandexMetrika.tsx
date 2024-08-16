function convertParam(boolValue: any, defaultValue: any) {
    return (boolValue === undefined ? defaultValue : boolValue) ? "true" : "false";
}

function YandexMetrikaTag({ yid, clickmap = true, trackLinks = true, accurateTrackBounce = true, webvisor = true }: any) {
    clickmap = convertParam(clickmap, true);
    trackLinks = convertParam(trackLinks, true);
    accurateTrackBounce = convertParam(accurateTrackBounce, true);
    webvisor = convertParam(webvisor, true);

    const scriptInjectorHTML = `
      (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
    `;

    return (
        <script
            dangerouslySetInnerHTML={{
                __html: `
              ${scriptInjectorHTML}
              ym(${yid}, "init", {
                  clickmap:${clickmap},
                  trackLinks:${trackLinks},
                  accurateTrackBounce:${accurateTrackBounce},
                  webvisor:${webvisor}
              });
        `
            }}
        />
    );
}

function YandexMetrikaPixel({ yid }: any) {
    const pixelSource = `https://mc.yandex.ru/watch/${yid}`;
    return (
        <noscript>
            <div>
                <img src={pixelSource} style={{ position: "absolute", left: "-9999px" }} alt="" />
            </div>
        </noscript>
    );
}

export default function YandexMetrika({ yid, clickmap = true, trackLinks = true, accurateTrackBounce = true, webvisor = true }: any) {
    return (
        <>
            <YandexMetrikaTag yid={yid} clickmap={clickmap} trackLinks={trackLinks} accuracyTrackBounce={accurateTrackBounce} webvisor={webvisor} />
            <YandexMetrikaPixel yid={yid} />
        </>
    );
}
