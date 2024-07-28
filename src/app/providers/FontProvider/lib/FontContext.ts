"use client";

import { createContext } from "react";

export enum Font {
    REGULAR = "app_regular",
    BOLD = "app_bold"
}

export interface FontContextProps {
    font?: Font;
    setFont?: (theme: Font) => void;
}

export const FontContext = createContext<FontContextProps>({});

export const LOCAL_STORAGE_FONT_KEY = "font";
