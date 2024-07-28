"use client";

import { FC, ReactNode, useMemo, useState } from "react";
import { LOCAL_STORAGE_FONT_KEY, Font, FontContext } from "../lib/FontContext";

const defaultFont = ((typeof window !== "undefined" && localStorage.getItem(LOCAL_STORAGE_FONT_KEY)) as Font) || Font.REGULAR;

interface FontProviderProps {
    initialFont?: Font;
    children?: ReactNode;
}

const ThemeProvider: FC<FontProviderProps> = (props: FontProviderProps) => {
    const { initialFont, children } = props;

    const [font, setFont] = useState<Font>(initialFont || defaultFont);

    const defaultProps = useMemo(
        () => ({
            font,
            setFont
        }),
        [font]
    );

    return <FontContext.Provider value={defaultProps}>{children}</FontContext.Provider>;
};

export default ThemeProvider;
