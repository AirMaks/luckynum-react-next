import cn from "classnames";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { Portal } from "shared/ui/Portal/Portal";
// import { useTheme } from "app/providers";
// import { useFont } from "app/providers";
import cls from "./Sidebar.module.scss";

interface SidebarProps {
    className?: string;
    children?: ReactNode;
    isOpen?: boolean;
    onClose?: () => void;
    lazy?: boolean;
}

const ANIMATION_DELAY = 300;

export const Sidebar = (props: SidebarProps) => {
    const { className, children, isOpen, onClose, lazy } = props;

    const [isClosing, setIsClosing] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const timerRef = useRef<ReturnType<typeof setTimeout>>();
    // const { theme } = useTheme();
    // const { font } = useFont();

    useEffect(() => {
        if (isOpen) {
            setIsMounted(true);
        }
        return () => setIsMounted(false);
    }, [isOpen]);

    const closeHandler = useCallback(() => {
        if (onClose) {
            setIsClosing(true);
            timerRef.current = setTimeout(() => {
                onClose();
                setIsClosing(false);
            }, ANIMATION_DELAY);
        }
    }, [onClose]);

    const onKeyDown = useCallback(
        (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                closeHandler();
            }
        },
        [closeHandler]
    );

    useEffect(() => {
        if (isOpen) {
            window.addEventListener("keydown", onKeyDown);
        }

        return () => {
            clearTimeout(timerRef.current);
            window.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen, onKeyDown]);

    const mods: any = {
        [cls.opened]: isOpen,
        [cls.isClosing]: isClosing
    };

    if (lazy && !isMounted) {
        return null;
    }

    return (
        <Portal selector="sidebar" isOpen={isOpen}>
            <div
                className={cn(
                    cls.Sidebar,
                    {
                        "w-[320px]": isOpen
                    },
                    ["bg-white position-fixed top-[60px] bottom-[26px] h-[calc(100%-60px)] border-gray-200 dark:border-gray-600", className]
                )}>
                {children}
            </div>
        </Portal>
    );
};
