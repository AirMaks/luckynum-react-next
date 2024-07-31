"use client";

import "styles/globals.scss";
import { Jura } from "next/font/google";
import { App } from "./app";

const jura = Jura({ subsets: ["cyrillic", "latin"] });

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        // <html lang="ru" suppressHydrationWarning className={jura.className}>
        <html lang="ru" className={jura.className}>
            <head>
                <meta name="yandex-verification" content="b2606e0b53f2e31f" />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=2" />
                <link rel="shortcut icon" href="favicon.svg" type="image/svg+xml" />
            </head>
            <body className="bg-lightbg text-black dark:bg-stone-800 dark:text-white">
                <App>{children}</App>
            </body>
        </html>
    );
}
