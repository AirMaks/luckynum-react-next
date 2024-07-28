"use client";

import LightIcon from "shared/assets/icons/settings/theme-light.svg";
import DarkIcon from "shared/assets/icons/settings/theme-dark.svg";
import cls from "./ThemeSwitcher.module.scss";
import cn from "classnames";
import { useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = ({ className }: ThemeSwitcherProps) => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div className={cn(cls.ThemeSwitcher, {}, [className])} onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? <LightIcon /> : <DarkIcon />}
        </div>
    );
};
