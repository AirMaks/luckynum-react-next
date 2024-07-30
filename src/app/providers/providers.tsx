"use client";

import { StoreProvider } from "./StoreProvider";
import { FontProvider } from "./FontProvider";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { YandexMetrica } from "./YandexMetrika";

interface Props {
    children: ReactNode;
}
export function Providers({ children }: Props) {
    return (
        <StoreProvider>
            <FontProvider>
                <ThemeProvider attribute="class" defaultTheme="system">
                    <YandexMetrica>{children}</YandexMetrica>
                </ThemeProvider>
            </FontProvider>
        </StoreProvider>
    );
}
