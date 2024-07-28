"use client";

import cn from "classnames";
import Link, { LinkProps } from "next/link";
import { FC } from "react";
import { usePathname } from "next/navigation";

export enum AppLinkTheme {
    PRIMARY = "primary",
    SECONDARY = "secondary"
}
interface AppLinkProps extends LinkProps {
    className?: string;
    theme?: AppLinkTheme;
    href: string;
    children: React.ReactNode;
}
export const AppLink: FC<AppLinkProps> = props => {
    const { href, className, children, theme, ...otherProps } = props;
    const pathname = usePathname();
    return (
        <Link href={href} {...otherProps} className={cn({ "": href === pathname }, [className])}>
            {children}
        </Link>
    );
};
