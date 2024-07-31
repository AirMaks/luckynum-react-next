"use client";

import { StoreProvider } from "./StoreProvider";
import { FontProvider } from "./FontProvider";
import { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

interface Props {
    children: ReactNode;
}
export function Providers({ children }: Props) {
    return (
        <StoreProvider>
            <FontProvider>
                <ThemeProvider attribute="class" defaultTheme="system">
                    {children}
                </ThemeProvider>
            </FontProvider>
        </StoreProvider>
    );
}