import "styles/globals.scss";
import { Jura } from "next/font/google";
import { App } from "./app";
import YandexMetrika from "./YandexMetrika";
import cn from "classnames";
import { Metadata } from "next";
import { Suspense } from "react";

const jura = Jura({ subsets: ["cyrillic", "latin"], display: "swap" });

export const metadata: Metadata = {
    metadataBase: new URL("https://lucky-num.ru"),
    alternates: {
        canonical: "./"
    }
};
export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ru" className={cn([jura.className, "overscroll-none overflow-hidden h-[100%] fixed right-0 top-0 left-0 bottom-0"])}>
            <head>
                <meta name="yandex-verification" content="b2606e0b53f2e31f" />
                <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
                <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
            </head>
            <body className="bg-lightbg text-black dark:bg-stone-800 dark:text-white overflow-hidden h-[100%]">
                <App>{children}</App>
                <Suspense fallback={<></>}>
                    <YandexMetrika yid={88160252} clickmap={true} trackLinks={true} accurateTrackBounce={true} webvisor={true} />
                </Suspense>
                <script>window.yaContextCb=window.yaContextCb||[]</script>
                <script src="https://yandex.ru/ads/system/context.js" defer></script>
            </body>
        </html>
    );
}
